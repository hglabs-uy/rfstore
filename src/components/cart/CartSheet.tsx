'use client';

import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Input } from '../ui/input';

export function CartSheetContent() {
  const { cartItems, itemCount, removeFromCart, updateQuantity } = useCart();
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <SheetContent className="flex flex-col">
      <SheetHeader>
        <SheetTitle>Solicitud de Cotización ({itemCount})</SheetTitle>
      </SheetHeader>
      <Separator />
      {itemCount > 0 ? (
        <>
          <ScrollArea className="flex-grow pr-4">
            <div className="flex flex-col gap-4 py-4">
              {cartItems.map((item) => {
                const imageUrl = item.product.imageUrls && item.product.imageUrls.length > 0
                  ? item.product.imageUrls[0]
                  : 'https://placehold.co/64x64.png';
                  
                return (
                <div key={item.product.id} className="flex gap-4 items-center">
                  <Image
                    src={imageUrl}
                    alt={item.product.name}
                    width={64}
                    height={64}
                    className="rounded-md object-cover"
                    data-ai-hint={item.product.aiHint}
                  />
                  <div className="flex-grow">
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      ${item.product.price.toFixed(2)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value) || 0)}
                        className="h-6 w-16 text-center"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromCart(item.product.id)}
                  >
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              )})}
            </div>
          </ScrollArea>
          <Separator />
          <SheetFooter className="mt-4">
            <div className="w-full space-y-4">
              <div className="flex justify-between font-semibold">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <SheetClose asChild>
                <Button asChild className="w-full bg-primary hover:bg-primary/90">
                  <Link href="/cotizacion">Proceder a la Cotización</Link>
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/tienda">Seguir Comprando</Link>
                </Button>
              </SheetClose>
            </div>
          </SheetFooter>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <p className="text-muted-foreground">Tu carrito de cotización está vacío.</p>
          <SheetClose asChild>
            <Button asChild variant="link" className="mt-4">
              <Link href="/tienda">Explorar productos</Link>
            </Button>
          </SheetClose>
        </div>
      )}
    </SheetContent>
  );
}
