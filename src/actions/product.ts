import { extractFilePath } from '../helpers';
import { ProductInput } from '../interfaces';
import { supabase } from '../supabase/client';

export const getProducts = async (page: number) => {
    const itemsPerPage = 10;
    const from = (page - 1) * itemsPerPage;
    const to = from + itemsPerPage - 1;

    const {
        data: products,
        error,
        count,
    } = await supabase
        .from('products')
        .select('*, variants(*), brand:brands(*), category:categories(*)', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to);

    if (error) {
        console.log(error.message);
        throw new Error(error.message);
    }

    return { products, count };
};



export const getRecentProducts = async () => {
    const { data: products, error } = await supabase
        .from('products')
        .select('*, variants(*), brand:brands(*), category:categories(*)')
        .order('created_at', { ascending: false })
        .limit(4);

    if (error) {
        console.log(error.message);
        throw new Error(error.message);
    }

    return products;
};

export const getRandomProducts = async () => {
    const { data: products, error } = await supabase
        .from('products')
        .select('*, variants(*), brand:brands(*), category:categories(*)')
        .limit(20);

    if (error) {
        console.log(error.message);
        throw new Error(error.message);
    }

    const randomProducts = products
        .sort(() => 0.5 - Math.random())
        .slice(0, 8);

    return randomProducts;
};

export const getProductBySlug = async (slug: string) => {
    const { data, error } = await supabase
        .from('products')
        .select('*, variants(*), brand:brands(*), category:categories(*)')
        .eq('slug', slug)
        .single();

    if (error) {
        console.log(error.message);
        throw new Error(error.message);
    }

    return data;
};

export const getSimilarProductsByCategory = async (
    categoryId: string,
    excludeProductId: string
) => {
    const { data: products, error } = await supabase
        .from('products')
        .select('*, variants(*), brand:brands(*), category:categories(*)')
        .eq('category_id', categoryId)
        .neq('id', excludeProductId)
        .order('created_at', { ascending: false })
        .limit(4);

    if (error) {
        console.log(error.message);
        throw new Error(error.message);
    }

    return products;
};

export const searchProducts = async (searchTerm: string) => {
    const { data, error } = await supabase
        .from('products')
        .select('*, variants(*), brand:brands(*), category:categories(*)')
        .ilike('name', `%${searchTerm}%`);

    if (error) {
        console.log(error.message);
        throw new Error(error.message);
    }

    return data;
};

/* ********************************** */
/* ADMINISTRADOR          */
/* ********************************** */
export const createProduct = async (productInput: ProductInput) => {
    try {
        console.log('Creating product with input:', productInput);
        
        const { data: product, error: productError } = await supabase
            .from('products')
            .insert({
                name: productInput.name,
                slug: productInput.slug,
                features: productInput.features,
                description: productInput.description,
                images: [],
                brand_id: productInput.brandId,
                category_id: productInput.categoryId,
            })
            .select()
            .single();

        if (productError) {
            console.error('Product creation error:', productError);
            throw new Error(productError.message);
        }
        
        console.log('Product created successfully:', product);

        const folderName = product.id;

        const uploadedImages = await Promise.all(
            productInput.images.map(async image => {
                const { data, error } = await supabase.storage
                    .from('product-images')
                    .upload(`${folderName}/${product.id}-${image.name}`, image);

                if (error) throw new Error(error.message);

                const imageUrl = `${
                    supabase.storage
                        .from('product-images')
                        .getPublicUrl(data.path).data.publicUrl
                }`;

                return imageUrl;
            })
        );

        const { error: updatedError } = await supabase
            .from('products')
            .update({
                images: uploadedImages,
            })
            .eq('id', product.id);

        if (updatedError) throw new Error(updatedError.message);

        const variants = productInput.variants.map(variant => ({
            product_id: product.id,
            stock: variant.stock,
            price: variant.price,
            storage: variant.storage,
            color: variant.color,
            color_name: variant.colorName,
        }));

        const { error: variantsError } = await supabase
            .from('variants')
            .insert(variants);

        if (variantsError) throw new Error(variantsError.message);

        return product;
    } catch (error) {
        console.log(error);
        throw new Error('Error inesperado, Vuelva a intentarlo');
    }
};

export const deleteProduct = async (productId: string) => {
    try {
        const { data: variants, error: getVariantsError } = await supabase
            .from('variants')
            .select('id')
            .eq('product_id', productId);
        
        if (getVariantsError) throw new Error(getVariantsError.message);

        const variantIds = variants.map(v => v.id);

        if (variantIds.length > 0) {
            const { error: deleteOrderItemsError } = await supabase
                .from('order_items')
                .delete()
                .in('variant_id', variantIds);
            
            if (deleteOrderItemsError) throw new Error(deleteOrderItemsError.message);
        }

        const { error: variantsError } = await supabase
            .from('variants')
            .delete()
            .eq('product_id', productId);

        if (variantsError) throw new Error(variantsError.message);

        const { data: productImages, error: productImagesError } = await supabase
            .from('products')
            .select('images')
            .eq('id', productId)
            .single();

        if (productImagesError) throw new Error(productImagesError.message);

        const { error: productDeleteError } = await supabase
            .from('products')
            .delete()
            .eq('id', productId);

        if (productDeleteError) throw new Error(productDeleteError.message);

        if (productImages.images.length > 0) {
            const paths = productImages.images
                .map(image => extractFilePath(image))
                .filter((path): path is string => path !== null);

            if (paths.length > 0) {
                const { error: storageError } = await supabase.storage
                    .from('product-images')
                    .remove(paths);

                if (storageError) throw new Error(storageError.message);
            }
        }

        return true;
    } catch (error) {
        throw new Error('No se pudo eliminar el producto debido a un error en la base de datos.');
    }
};

export const updateProduct = async (
    productId: string,
    productInput: ProductInput
) => {
    const { data: currentProduct, error: currentProductError } =
        await supabase
            .from('products')
            .select('images, slug, name')
            .eq('id', productId)
            .single();

    if (currentProductError)
        throw new Error(currentProductError.message);

    const existingImages = currentProduct.images || [];
    const currentSlug = currentProduct.slug;

    let finalSlug = productInput.slug;
    if (productInput.name !== currentProduct.name) {
        try {
            const { generateUniqueSlug } = await import('../helpers');
            finalSlug = await generateUniqueSlug(productInput.name, currentSlug);
        } catch (error) {
            console.error('Error generating unique slug:', error);
            finalSlug = currentSlug;
        }
    }

    const { data: updatedProduct, error: productError } = await supabase
        .from('products')
        .update({
            name: productInput.name,
            slug: finalSlug,
            features: productInput.features,
            description: productInput.description,
            brand_id: productInput.brandId,
            category_id: productInput.categoryId,
        })
        .eq('id', productId)
        .select()
        .single();

    if (productError) throw new Error(productError.message);

    const folderName = productId;

    const validImages = productInput.images.filter(image => image) as [
        File | string
    ];

    const imagesToDelete = existingImages.filter(
        image => !validImages.includes(image)
    );

    const filesToDelete = imagesToDelete
        .map(extractFilePath)
        .filter((path): path is string => path !== null);

    if (filesToDelete.length > 0) {
        const { error: deleteImagesError } = await supabase.storage
            .from('product-images')
            .remove(filesToDelete);

        if (deleteImagesError) {
            console.log(deleteImagesError);
            throw new Error(deleteImagesError.message);
        } else {
            console.log('Imágenes eliminadas con éxito:', filesToDelete);
        }
    }

    const newImages = await Promise.all(
        validImages.map(async image => {
            if (typeof image === 'string') return image;

            const { data, error } = await supabase.storage
                .from('product-images')
                .upload(`${folderName}/${productId}-${image.name}`, image);

            if (error) throw new Error(error.message);

            return `${
                supabase.storage
                    .from('product-images')
                    .getPublicUrl(data.path).data.publicUrl
            }`;
        })
    );

    const { error: updateImagesError } = await supabase
        .from('products')
        .update({ images: newImages })
        .eq('id', productId);

    if (updateImagesError) throw new Error(updateImagesError.message);

    for (const variant of productInput.variants) {
        if (variant.id) {
            const { error: updateVariantError } = await supabase
                .from('variants')
                .update({
                    price: variant.price,
                    stock: variant.stock,
                    storage: variant.storage,
                    color: variant.color,
                    color_name: variant.colorName,
                })
                .eq('id', variant.id);

            if (updateVariantError)
                throw new Error(updateVariantError.message);
        } else {
            const { error: createVariantError } = await supabase
                .from('variants')
                .insert({
                    product_id: productId,
                    price: variant.price,
                    stock: variant.stock,
                    storage: variant.storage,
                    color: variant.color,
                    color_name: variant.colorName,
                });

            if (createVariantError)
                throw new Error(createVariantError.message);
        }
    }

    return updatedProduct;
};