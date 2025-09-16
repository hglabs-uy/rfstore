import { supabase } from '../supabase/client';
import type { Product, VariantProduct } from '../interfaces';

const PAGE_SIZE = 12;

type Args = {
  brands: string[];
  categories?: string[];
  priceMin?: number;
  priceMax?: number;
  page: number;
  searchTerm?: string;
  sortOrder?: 'asc' | 'desc';
};

export async function getFilteredProducts({
  brands,
  categories = [],
  priceMin,
  priceMax,
  page,
  searchTerm = '',
  sortOrder = 'desc',
}: Args) {
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  // 1) Vista ya ORDENADA + PAGINADA
  let baseQuery = supabase
    .from('products_with_price')
    .select(
      'id, name, slug, images, features, description, created_at, brand_id, category_id, price',
      { count: 'exact' }
    )
    .order('price', { ascending: sortOrder === 'asc' })
    .range(from, to);

  if (brands?.length)      baseQuery = baseQuery.in('brand_id', brands);
  if (categories?.length)  baseQuery = baseQuery.in('category_id', categories);
  if (typeof priceMin === 'number') baseQuery = baseQuery.gte('price', priceMin);
  if (typeof priceMax === 'number') baseQuery = baseQuery.lte('price', priceMax);

  if (searchTerm?.trim()) {
    const ilike = `%${searchTerm.trim()}%`;
    baseQuery = baseQuery.or(`name.ilike.${ilike},slug.ilike.${ilike}`);
  }

  const { data: baseRows, error: baseErr, count } = await baseQuery;
  if (baseErr) throw baseErr;
  if (!baseRows?.length) return { data: [], count: count ?? 0 };

  // 2) Variants del lote (ids sin nulls)
  const ids = baseRows
    .map(r => r.id)
    .filter((id): id is string => typeof id === 'string' && id.length > 0);

  const { data: vars, error: varsErr } = await supabase
    .from('variants')
    .select('id, product_id, price, stock, color, storage')
    .in('product_id', ids);

  if (varsErr) throw varsErr;

  // 2.1) Normalizar al tipo VariantProduct que tu app espera
  const variantsByProduct: Record<string, VariantProduct[]> = {};
  (vars ?? []).forEach(v => {
    const pid = v.product_id as string;
    const vp: VariantProduct = {
      id: v.id as string,
      stock: (v.stock ?? 0) as number,
      price: (v.price ?? 0) as number,
      storage: (v.storage ?? '') as string,
      color: (v.color ?? '#000000') as string,
      // tu DB no tiene color_name → lo derivamos/vaciamos
      color_name: (v as any).color_name ?? '',
    };
    if (!variantsByProduct[pid]) variantsByProduct[pid] = [];
    variantsByProduct[pid].push(vp);
  });

  // 3) Mapear a tu tipo Product (lo que usa prepareProducts)
  const products: Product[] = baseRows
    .filter(r => typeof r.id === 'string' && typeof r.name === 'string' && typeof r.slug === 'string')
    .map(r => {
      const pid = r.id as string;
      return {
        id: pid,
        name: r.name as string,
        slug: r.slug as string,
        images: (r.images ?? []) as string[],
        features: (r.features ?? []) as string[],
        description: (r.description ?? {}) as any, // si tenés tipo Json, castealo a ese
        created_at: r.created_at ?? new Date().toISOString(),
        brand_id: (r.brand_id as string) ?? '',
        category_id: (r.category_id as string) ?? '',
        variants: variantsByProduct[pid] ?? [],
        brand: null,
        category: null,
      };
    });

  return { data: products, count: count ?? 0 };
}
