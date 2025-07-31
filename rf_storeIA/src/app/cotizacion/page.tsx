'use client';

import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';

const QuoteSchema = z.object({
  name: z.string().min(2, 'El nombre es requerido'),
  email: z.string().email('El correo electrónico no es válido'),
  phone: z.string().optional(),
  company: z.string().min(2, 'El nombre de la empresa es requerido'),
  message: z.string().optional(),
});

type QuoteFormValues = z.infer<typeof QuoteSchema>;

export default function CotizacionPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, itemCount } = useCart();
  const { toast } = useToast();
  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(QuoteSchema),
  });

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const onSubmit: SubmitHandler<QuoteFormValues> = (data) => {
    console.log('Quote Request:', {
      userInfo: data,
      items: cartItems,
      subtotal,
    });
    toast({
      title: 'Solicitud Enviada',
      description: 'Gracias por su interés. Nos pondremos en contacto con usted en breve.',
    });
    form.reset();
    clearCart();
  };
  
  const EmptyCart = () => (
    <div className="container mx-auto px-4 py-12 text-center flex-grow flex flex-col justify-center items-center">
        <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground" />
        <h1 className="mt-4 text-3xl font-bold font-headline">Tu carrito de cotización está vacío</h1>
        <p className="mt-2 text-muted-foreground">Añade productos desde la tienda para solicitar una cotización.</p>
        <Button asChild className="mt-6">
            <Link href="/tienda">Ir a la Tienda</Link>
        </Button>
    </div>
  );

  return (
    <>
    <Header />
    <div className="flex-grow">
      {itemCount === 0 ? <EmptyCart /> : (
        <div className="container mx-auto px-4 py-8 md:py-12">
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-headline mb-2">Solicitud de Cotización</h1>
            <p className="text-lg text-muted-foreground">Revise sus artículos y complete el formulario para recibir una cotización personalizada.</p>
          </header>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Artículos Seleccionados</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                            <TableRow>
                                <TableHead className="hidden md:table-cell">Imagen</TableHead>
                                <TableHead>Artículo</TableHead>
                                <TableHead>Cantidad</TableHead>
                                <TableHead className="text-right">Precio Unit.</TableHead>
                                <TableHead className="text-right">Total</TableHead>
                                <TableHead className="text-right">Acción</TableHead>
                            </TableRow>
                            </TableHeader>
                            <TableBody>
                            {cartItems.map((item) => (
                                <TableRow key={item.product.id}>
                                <TableCell className="hidden md:table-cell">
                                    <Image
                                    src={item.product.imageUrls[0]}
                                    alt={item.product.name}
                                    width={64}
                                    height={64}
                                    className="rounded-md object-cover"
                                    data-ai-hint={item.product.aiHint}
                                    />
                                </TableCell>
                                <TableCell className="font-medium">{item.product.name}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-7 w-7"
                                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                    >
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                    <span>{item.quantity}</span>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-7 w-7"
                                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                    >
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">${item.product.price.toFixed(2)}</TableCell>
                                <TableCell className="text-right">${(item.product.price * item.quantity).toFixed(2)}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.product.id)}>
                                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                                    </Button>
                                </TableCell>
                                </TableRow>
                            ))}
                            <TableRow className="font-bold">
                                <TableCell colSpan={4} className="text-right">Subtotal</TableCell>
                                <TableCell colSpan={2} className="text-right">${subtotal.toFixed(2)}</TableCell>
                            </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
            <div>
                <Card>
                     <CardHeader>
                        <CardTitle>Sus Datos</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nombre Completo</FormLabel>
                                        <FormControl>
                                        <Input placeholder="John Doe" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="company"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Empresa</FormLabel>
                                        <FormControl>
                                        <Input placeholder="ACME Inc." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Correo Electrónico</FormLabel>
                                        <FormControl>
                                        <Input placeholder="john.doe@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Teléfono (Opcional)</FormLabel>
                                        <FormControl>
                                        <Input placeholder="+1 234 567 890" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="message"
                                    render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Mensaje (Opcional)</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Indique aquí cualquier requerimiento especial..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={form.formState.isSubmitting}>
                                    {form.formState.isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
          </div>
        </div>
      )}
    </div>
    <Footer />
    <WhatsAppButton />
  </>
  );
}
