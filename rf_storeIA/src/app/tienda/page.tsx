
'use client';

import { useState, useMemo } from 'react';
import { ProductCard } from '@/components/store/ProductCard';
import { categories, brands, products as mockProducts } from '@/lib/mock-data';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Filter, Search } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';
import { Slider } from '@/components/ui/slider';

const PRODUCTS_PER_PAGE = 9;

export default function TiendaPage() {
  // NOTA PARA EL DESARROLLADOR:
  // En una aplicación real, los productos se obtendrían de una API o base de datos.
  // Aquí, usamos los datos de prueba del archivo 'src/lib/mock-data.ts'.
  const [products, setProducts] = useState(mockProducts);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
    setCurrentPage(1);
  };
  
  const handleBrandChange = (brandId: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brandId)
        ? prev.filter((id) => id !== brandId)
        : [...prev, brandId]
    );
    setCurrentPage(1);
  };
  
  // Lógica de filtrado que opera sobre los datos de prueba
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const searchMatch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
      
      const categoryMatch =
        selectedCategories.length === 0 || selectedCategories.includes(product.category);
        
      const brandMatch =
        selectedBrands.length === 0 || (product.brand && selectedBrands.includes(product.brand.id));

      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      const statusMatch = product.status === 'visible';

      return searchMatch && categoryMatch && brandMatch && priceMatch && statusMatch;
    });
  }, [searchQuery, selectedCategories, selectedBrands, priceRange, products]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  }

  const handlePriceChange = (value: [number, number]) => {
    setPriceRange(value);
    setCurrentPage(1);
  };

  const Filters = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Categorías</h3>
        <div className="space-y-2">
          {categories.filter(c => c.id !== 'all').map((category) => (
             <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={`cat-${category.id}`}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() => handleCategoryChange(category.id)}
              />
              <Label htmlFor={`cat-${category.id}`} className="font-normal cursor-pointer">
                {category.name}
              </Label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-3">Marcas</h3>
        <div className="space-y-2">
          {brands.map((brand) => (
             <div key={brand.id} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand.id}`}
                checked={selectedBrands.includes(brand.id)}
                onCheckedChange={() => handleBrandChange(brand.id)}
              />
              <Label htmlFor={`brand-${brand.id}`} className="font-normal cursor-pointer">
                {brand.name}
              </Label>
            </div>
          ))}
        </div>
      </div>
       <div>
        <h3 className="text-lg font-semibold mb-3">Filtro por precio</h3>
        <Slider
          value={priceRange}
          max={10000}
          step={50}
          onValueChange={handlePriceChange}
        />
        <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8 md:py-12 flex-grow">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-2">Nuestro Catálogo: Tecnología de Vanguardia para Empresas</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explora nuestra amplia gama de productos tecnológicos, seleccionados para optimizar la eficiencia y rendimiento de tu negocio.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <aside className="hidden md:block md:col-span-1">
            <div className="sticky top-24">
              <h2 className="text-2xl font-bold font-headline mb-4">Filtros</h2>
              <Filters />
            </div>
          </aside>

          <main className="md:col-span-3">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-grow">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar por nombre o descripción..."
                  className="pl-10 w-full"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="md:hidden">
                    <Filter className="mr-2 h-4 w-4" /> Filtros
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <div className="p-4 overflow-y-auto">
                    <h2 className="text-2xl font-bold font-headline mb-4">Filtros</h2>
                    <Filters />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
             {paginatedProducts.length > 0 ? (
              <div className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                 {totalPages > 1 && (
                    <div className="flex justify-center pt-8">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious 
                                        href="#" 
                                        onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }}
                                        aria-disabled={currentPage === 1}
                                        className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                                    />
                                </PaginationItem>
                                {[...Array(totalPages)].map((_, i) => (
                                    <PaginationItem key={i}>
                                        <PaginationLink 
                                            href="#" 
                                            isActive={currentPage === i + 1}
                                            onClick={(e) => { e.preventDefault(); handlePageChange(i + 1); }}
                                        >
                                            {i + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}
                                <PaginationItem>
                                    <PaginationNext 
                                        href="#" 
                                        onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }}
                                        aria-disabled={currentPage === totalPages}
                                        className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                )}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground">No se encontraron productos que coincidan con su búsqueda.</p>
              </div>
            )}
          </main>
        </div>
      </div>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
