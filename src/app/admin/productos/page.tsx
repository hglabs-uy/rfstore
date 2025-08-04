'use client';

import { useState, useEffect, useCallback } from "react";
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PlusCircle, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const API_URL = 'http://localhost:3000';

// TIPOS DE DATOS (actualizados según el formato de datos de la API)
export type Categoria = { id: number; nombre: string; };
export type Marca = { id: number; nombre: string; };
// El tipo Variante ha sido eliminado, ya que no se usará.

export type Producto = {
  id: number;
  nombre: string;
  descripcion?: string;
  imagenUrl?: string;
  // Los datos de la API indican que precio está directamente en el objeto Producto.
  // Las relaciones de categoría y marca no se están recibiendo, por lo que las marcamos como opcionales.
  precio: number;
  categoria?: Categoria;
  marca?: Marca;
};

// Esquema de validación para el formulario de productos
const ProductSchema = z.object({
  id: z.number().optional(),
  nombre: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  descripcion: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
  categoriaId: z.string().min(1, 'La categoría es requerida'),
  marcaId: z.string().min(1, 'La marca es requerida'),
  precio: z.coerce.number().min(0, 'El precio no puede ser negativo'),
});

type ProductFormValues = z.infer<typeof ProductSchema>;

export default function AdminProductsPage() {
  const { toast } = useToast();
  const [products, setProducts] = useState<Producto[]>([]);
  const [categories, setCategories] = useState<Categoria[]>([]);
  const [brands, setBrands] = useState<Marca[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Producto | null>(null);
  const [productToDelete, setProductToDelete] = useState<Producto | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    console.log("Iniciando la carga de datos desde la API...");
    setLoading(true);
    try {
      const [productsRes, categoriesRes, brandsRes] = await Promise.all([
        // Solicitamos las relaciones en la llamada a la API
        axios.get<Producto[]>(`${API_URL}/productos`, {
          params: { relations: ['categoria', 'marca'] },
        }),
        axios.get<Categoria[]>(`${API_URL}/categorias`),
        axios.get<Marca[]>(`${API_URL}/marcas`),
      ]);
      
      // La respuesta de la API es un array de productos
      console.log('Respuesta completa de la API de productos:', productsRes.data);
      
      setProducts(productsRes.data);
      setCategories(categoriesRes.data);
      setBrands(brandsRes.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error de la API:", error.message, error.response?.data, error.toJSON());
      } else {
        console.error("Error al cargar los datos desde la API:", error);
      }
      
      toast({
        title: "Error al cargar datos",
        description: "No se pudieron obtener los datos del servidor. Verifique la consola para más detalles.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      nombre: '',
      descripcion: '',
      precio: 0,
      categoriaId: '',
      marcaId: '',
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setSelectedImage(null);
      setPreviewImage(null);
    }
  };

  const handleOpenForm = (product?: Producto) => {
    setSelectedImage(null);
    setPreviewImage(null);
    if (product) {
      setEditingProduct(product);
      form.reset({
        id: product.id,
        nombre: product.nombre,
        descripcion: product.descripcion || '',
        // Accedemos a precio directamente desde el objeto del producto
        precio: product.precio || 0,
        categoriaId: product.categoria?.id?.toString() || '',
        marcaId: product.marca?.id?.toString() || '',
      });
      if (product.imagenUrl) {
        setPreviewImage(`${API_URL}/${product.imagenUrl}`);
      }
    } else {
      setEditingProduct(null);
      form.reset();
    }
    setIsFormOpen(true);
  };

  const onSubmit: SubmitHandler<ProductFormValues> = async (data) => {
    try {
      console.log('Datos del formulario a enviar:', data);

      const formData = new FormData();
      formData.append('nombre', data.nombre);
      formData.append('descripcion', data.descripcion);
      formData.append('categoriaId', data.categoriaId);
      formData.append('marcaId', data.marcaId);
      formData.append('precio', data.precio.toString());
      
      if (selectedImage) {
        formData.append('file', selectedImage);
      }

      if (editingProduct) {
        // Lógica para ACTUALIZAR un producto existente
        await axios.put(`${API_URL}/productos/${editingProduct.id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast({ title: "Producto Actualizado", description: `"${data.nombre}" se ha actualizado.` });
      } else {
        // Lógica para CREAR un producto nuevo
        await axios.post(`${API_URL}/productos`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast({ title: "Producto Creado", description: `"${data.nombre}" se ha añadido a la lista.` });
      }

      setIsFormOpen(false);
      setEditingProduct(null);
      setSelectedImage(null);
      setPreviewImage(null);
      fetchData();
    } catch (error) {
      console.error("Error al guardar el producto:", error);
      toast({
        title: "Error al guardar",
        description: "Hubo un problema al guardar el producto. Verifica los datos.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteProduct = async () => {
    if (!productToDelete) return;
    
    try {
      await axios.delete(`${API_URL}/productos/${productToDelete.id}`);
      toast({
        title: "Producto Eliminado",
        description: `"${productToDelete.nombre}" ha sido eliminado.`,
      });
      fetchData();
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      toast({
        title: "Error al eliminar",
        description: "Hubo un problema al eliminar el producto.",
        variant: "destructive",
      });
    } finally {
      setProductToDelete(null);
    }
  };
  
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Cargando productos...</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Productos</CardTitle>
              <CardDescription>
                Gestiona los productos de tu tienda.
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
                <TableHead className="hidden md:table-cell">Descripción</TableHead>
                <TableHead>Precio Base</TableHead>
                <TableHead className="hidden md:table-cell">Categoría</TableHead>
                <TableHead className="hidden md:table-cell">Marca</TableHead>
                <TableHead>
                  <span className="sr-only">Acciones</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => {
                // El log ya demostró el formato, ahora solo mostramos los datos.
                return (
                  <TableRow key={product.id}>
                    <TableCell className="hidden sm:table-cell">
                      {product.imagenUrl ? (
                        <Image
                          alt={product.nombre || 'Producto sin nombre'}
                          className="aspect-square rounded-md object-cover"
                          height="64"
                          src={`${API_URL}/${product.imagenUrl}`}
                          width="64"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://placehold.co/64x64.png';
                          }}
                        />
                      ) : (
                        <Image
                          alt={product.nombre || 'Producto sin nombre'}
                          className="aspect-square rounded-md object-cover"
                          height="64"
                          src={'https://placehold.co/64x64.png'}
                          width="64"
                        />
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{product.nombre || 'N/A'}</TableCell>
                    <TableCell className="hidden md:table-cell">{product.descripcion || 'N/A'}</TableCell>
                    {/* Corrección para manejar precio como string */}
                    <TableCell>
                      {product.precio
                        ? `$${parseFloat(product.precio.toString()).toFixed(2)}`
                        : 'N/A'}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {product.categoria?.nombre || 'N/A'}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {product.marca?.nombre || 'N/A'}
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
                          <DropdownMenuItem onClick={() => setProductToDelete(product)}>
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
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
                name="nombre"
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
                name="descripcion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción</FormLabel>
                    <FormControl><Textarea placeholder="Descripción detallada del producto" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="precio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Precio</FormLabel>
                      <FormControl><Input type="number" placeholder="999.99" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="categoriaId"
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
                          {categories.map(c => <SelectItem key={c.id} value={c.id.toString()}>{c.nombre}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="marcaId"
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
                          {brands.map(b => <SelectItem key={b.id} value={b.id.toString()}>{b.nombre}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormLabel>Imagen del Producto</FormLabel>
                {previewImage && (
                  <div className="relative w-32 h-32 rounded-md overflow-hidden mb-2">
                    <Image src={previewImage} alt="Vista previa de la imagen" layout="fill" objectFit="cover" />
                  </div>
                )}
                <FormControl>
                  <Input type="file" accept="image/*" onChange={handleImageChange} />
                </FormControl>
                <FormMessage />
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
      
      {/* Diálogo de confirmación para eliminar */}
      <AlertDialog open={!!productToDelete} onOpenChange={(isOpen) => !isOpen && setProductToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro de eliminar este producto?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. El producto "{productToDelete?.nombre}" será eliminado permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setProductToDelete(null)}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteProduct}>Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
