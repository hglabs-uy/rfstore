'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import type { Product } from '@/lib/types';
import { useCart } from '@/contexts/CartContext';
import { AddToCartButton } from './AddToCartButton';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const formattedPrice = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'USD' }).format(product.price);

  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg group">
      <CardHeader className="p-0 relative">
        <Link href={`/tienda/${product.slug}`}>
          <div className="relative aspect-square">
            <Image
              src={product.imageUrls[0]}
              alt={product.name}
              fill
              className="object-contain transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={product.aiHint}
            />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col">
        <CardTitle className="text-base font-headline mb-1 leading-tight h-10">
          <Link href={`/tienda/${product.slug}`} className="hover:text-primary transition-colors">
            {product.name}
          </Link>
        </CardTitle>
        <CardDescription className="text-xs mb-2">{product.shortDescription}</CardDescription>
        <div className="mt-auto">
          <p className="text-lg font-semibold text-primary mb-2">
            {formattedPrice} {product.showIVA && <span className="text-xs font-normal text-muted-foreground">+ IVA</span>}
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <AddToCartButton product={product} />
      </CardFooter>
    </Card>
  );
}
