'use client';

import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import type { Product } from "@/lib/types";
import { PlusCircle } from "lucide-react";

interface AddToCartButtonProps {
    product: Product;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
    const { addToCart } = useCart();
    
    return (
        <Button className="w-full bg-primary hover:bg-primary/90" onClick={() => addToCart(product)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Añadir a Cotización
        </Button>
    )
}
