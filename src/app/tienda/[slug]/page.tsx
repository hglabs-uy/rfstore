import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';
import type { Metadata } from 'next';
import { AddToCartButton } from '@/components/store/AddToCartButton';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { products as mockProducts } from '@/lib/mock-data';
import type { Product } from '@/lib/types';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

// NOTA PARA EL DESARROLLADOR:
// En una aplicación real, esta función buscaría los datos del producto
// en un backend o base de datos usando el 'slug'.
// Aquí, la buscamos en nuestros datos de prueba (mock data).
async function getProductBySlug(slug: string): Promise<Product | null> {
  const product = mockProducts.find((p) => p.slug === slug);
  return product || null;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return {
      title: 'Producto no encontrado',
    };
  }

  return {
    title: `${product.name} | RF STORE`,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: [
        {
          url: product.imageUrls[0],
          width: 600,
          height: 600,
          alt: product.name,
        },
      ],
      type: 'website',
    },
  };
}

// NOTA PARA EL DESARROLLADOR:
// Esta función genera las páginas estáticas para cada producto durante la compilación.
// Obtiene los slugs de los datos de prueba.
export async function generateStaticParams() {
  return mockProducts.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }
  
  const formattedPrice = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'USD' }).format(product.price);

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12 flex-grow">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}                                                 
          <div className="w-full">
            <Carousel className="w-full max-w-xl mx-auto">
              <CarouselContent>
                {product.imageUrls.map((url, index) => (
                  <CarouselItem key={index}>
                    <div className="aspect-square relative">
                      <Image
                        src={url}
                        alt={`${product.name} - imagen ${index + 1}`}
                        fill
                        className="object-contain rounded-lg"
                        data-ai-hint={product.aiHint}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          {/* Product Details */}                                         
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold font-headline mb-2">{product.name}</h1>
            <p className="text-lg text-muted-foreground mb-4">{product.brand.name}</p>
            <p className="text-3xl font-bold mb-4">{formattedPrice} <span className="text-base font-normal text-muted-foreground">+ IVA</span></p>
            
            <p className="text-foreground/90 mb-6">{product.fullDescription}</p>

            <AddToCartButton product={product} />

            <div className="mt-8 pt-6 border-t">
              <h2 className="text-xl font-bold font-headline mb-4">Especificaciones Detalladas</h2>
              <ul className="space-y-2 text-sm text-foreground/80">
                {Object.entries(product.specifications).map(([key, value]) => (
                    <li key={key} className="grid grid-cols-2 gap-2">
                        <strong className="font-medium text-foreground/90">{key}:</strong>
                        <span>{value}</span>
                    </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
