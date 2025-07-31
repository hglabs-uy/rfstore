
'use client';

import { useState } from "react";
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { products as mockProducts, categories, brands } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { PlusCircle, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import type { Product } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

// Esquema de validación para el formulario de productos
const ProductSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  shortDescription: z.string().min(10, 'La descripción corta es requerida'),
  fullDescription: z.string().min(20, 'La descripción completa es requerida'),
  price: z.coerce.number().min(0, 'El precio no puede ser negativo'),
  showIVA: z.boolean().default(true),
  category: z.string().min(1, 'La categoría es requerida'),
  brandId: z.string().min(1, 'La marca es requerida'),
  status: z.enum(['visible', 'hidden']),
  // No validamos URLs de imagen aquí, se manejan por separado.
});

type ProductFormValues = z.infer<typeof ProductSchema>;

export default function AdminProductsPage() {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productToToggle, setProductToToggle] = useState<Product | null>(null);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: '',
      shortDescription: '',
      fullDescription: '',
      price: 0,
      showIVA: true,
      category: '',
      brandId: '',
      status: 'visible',
    },
  });

  const handleOpenForm = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      form.reset({
        id: product.id,
        name: product.name,
        shortDescription: product.shortDescription,
        fullDescription: product.fullDescription,
        price: product.price,
        showIVA: product.showIVA,
        category: product.category,
        brandId: product.brand.id,
        status: product.status,
      });
    } else {
      setEditingProduct(null);
      form.reset();
    }
    setIsFormOpen(true);
  };

  const onSubmit: SubmitHandler<ProductFormValues> = (data) => {
    // NOTA: Esta lógica simula la creación/actualización en el frontend.
    // Al recargar la página, los cambios se perderán.
    // En una aplicación real, aquí se haría la llamada a la API del backend.
    
    const brand = brands.find(b => b.id === data.brandId);
    if (!brand) {
      toast({ title: "Error", description: "Marca no encontrada", variant: "destructive" });
      return;
    }

    if (editingProduct) {
      // Lógica de actualización
      const updatedProduct: Product = {
        ...editingProduct,
        ...data,
        brand,
      };
      setProducts(products.map(p => p.id === editingProduct.id ? updatedProduct : p));
      toast({ title: "Producto Actualizado", description: `"${data.name}" se ha actualizado.` });
    } else {
      // Lógica de creación
      const newProduct: Product = {
        id: `prod-${Date.now()}`, // ID temporal
        slug: data.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''), // Slug temporal
        imageUrls: ['https://placehold.co/600x600.png'], // Imagen de placeholder
        aiHint: 'new product',
        specifications: { 'Info': 'Añadir especificaciones detalladas.' },
        ...data,
        brand,
      };
      setProducts([newProduct, ...products]);
      toast({ title: "Producto Creado", description: `"${data.name}" se ha añadido a la lista.` });
    }
    setIsFormOpen(false);
    setEditingProduct(null);
  };
  
  const handleToggleStatus = () => {
    if (!productToToggle) return;
    
    const newStatus = productToToggle.status === 'visible' ? 'hidden' : 'visible';
    setProducts(products.map(p => 
      p.id === productToToggle.id ? { ...p, status: newStatus } : p
    ));
    toast({
      title: `Estado Actualizado`,
      description: `El producto "${productToToggle.name}" ahora está ${newStatus === 'visible' ? 'visible' : 'oculto'}.`,
    });
    setProductToToggle(null);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Productos</CardTitle>
              <CardDescription>
                Gestiona los productos de tu tienda. Los cambios son locales y se reiniciarán al recargar.
              </CardDescription>
            </div>
            <Button onClick={() => handleOpenForm()}>
              <PlusCircle className="mr-2 h-4 w-4" /> Añadir Producto
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Imagen</span>
                </TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead className="hidden md:table-cell">Categoría</TableHead>
                <TableHead>
                  <span className="sr-only">Acciones</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id} className={product.status === 'hidden' ? 'bg-muted/50' : ''}>
                  <TableCell className="hidden sm:table-cell">
                    <Image
                      alt={product.name}
                      className="aspect-square rounded-md object-cover"
                      height="64"
                      src={(product.imageUrls && product.imageUrls[0]) || 'https://placehold.co/64x64.png'}
                      width="64"
                      data-ai-hint={product.aiHint || ''}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>
                    <Badge variant={product.status === 'visible' ? 'default' : 'outline'}>
                      {product.status === 'visible' ? 'Visible' : 'Oculto'}
                    </Badge>
                  </TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {categories.find(c => c.id === product.category)?.name || product.category}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleOpenForm(product)}>Editar</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setProductToToggle(product)}>
                          {product.status === 'visible' ? 'Ocultar' : 'Hacer Visible'}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Diálogo para Crear/Editar Producto */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingProduct ? 'Editar Producto' : 'Añadir Nuevo Producto'}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto p-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre del Producto</FormLabel>
                    <FormControl><Input placeholder="Ej. Laptop Pro" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="shortDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción Corta</FormLabel>
                    <FormControl><Input placeholder="Ideal para profesionales..." {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="fullDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción Completa</FormLabel>
                    <FormControl><Textarea placeholder="Este producto ofrece un rendimiento excepcional..." {...field} rows={4} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                 <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Precio</FormLabel>
                        <FormControl><Input type="number" placeholder="999.99" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estado</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar estado" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="visible">Visible</SelectItem>
                            <SelectItem value="hidden">Oculto</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
              </div>
               <div className="grid grid-cols-2 gap-4">
                 <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Categoría</FormLabel>
                         <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                <SelectValue placeholder="Seleccionar categoría" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {categories.filter(c => c.id !== 'all').map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="brandId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Marca</FormLabel>
                         <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                <SelectValue placeholder="Seleccionar marca" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {brands.map(b => <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="secondary">Cancelar</Button>
                </DialogClose>
                <Button type="submit">{editingProduct ? 'Guardar Cambios' : 'Crear Producto'}</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Diálogo de confirmación para ocultar/mostrar */}
      <AlertDialog open={!!productToToggle} onOpenChange={(isOpen) => !isOpen && setProductToToggle(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esto cambiará la visibilidad del producto en la tienda. 
              {productToToggle?.status === 'visible' 
                ? ' El producto ya no será visible para los clientes.'
                : ' El producto volverá a ser visible para los clientes.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setProductToToggle(null)}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleToggleStatus}>Confirmar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

    