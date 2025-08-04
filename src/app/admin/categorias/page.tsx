'use client';

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
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';

interface Item {
  id: number;
  nombre: string;
}

export default function AdminCategoriesAndBrandsPage() {
  const [type, setType] = useState<'categoria' | 'marca'>('categoria');
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estados para el diálogo de creación
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [createError, setCreateError] = useState<string | null>(null);
  
  // Estados para el diálogo de confirmación de eliminación
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Item | null>(null);

  const title = type === 'categoria' ? 'Categorías' : 'Marcas';
  const description = type === 'categoria' ? 'Administra las categorías de productos.' : 'Administra las marcas de productos.';
  const newButtonText = type === 'categoria' ? 'Nueva Categoría' : 'Nueva Marca';
  const apiEndpoint = `http://localhost:3000/${type}s`;

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get(apiEndpoint);
      setItems(response.data);
      setError(null);
    } catch (err) {
      setError(`Error al cargar ${title.toLowerCase()}.`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [type]);

  const handleCreateNewItem = async () => {
    if (!newItemName.trim()) {
      setCreateError('El nombre no puede estar vacío.');
      return;
    }

    setCreateError(null);
    try {
      const response = await axios.post(apiEndpoint, { nombre: newItemName });
      setItems([...items, response.data]);
      setNewItemName('');
      setIsCreateDialogOpen(false);
      console.log(`${title.slice(0, -1)} creada con éxito.`);
    } catch (err) {
      console.error(`Error al crear ${type}:`, err);
      if (axios.isAxiosError(err) && err.response) {
        const backendError = err.response.data;
        if (backendError.message && Array.isArray(backendError.message)) {
          setCreateError(backendError.message.join(', '));
        } else if (backendError.message) {
          setCreateError(backendError.message);
        } else {
          setCreateError(`Error al crear ${type}.`);
        }
      } else {
        setCreateError(`Error de red o desconocido.`);
      }
    }
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    
    setIsDeleteDialogOpen(false);

    try {
      await axios.delete(`${apiEndpoint}/${itemToDelete.id}`);
      setItems(items.filter(item => item.id !== itemToDelete.id));
      setItemToDelete(null);
      console.log(`${title.slice(0, -1)} eliminada con éxito.`);
    } catch (err) {
      console.error(`Error al eliminar ${type}:`, err);
    }
  };

  const handleOpenDeleteDialog = (item: Item) => {
    setItemToDelete(item);
    setIsDeleteDialogOpen(true);
  };

  if (loading) {
    return <div>Cargando {title.toLowerCase()}...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center mb-4">
          <div className="space-x-2">
            <Button 
              variant={type === 'categoria' ? 'default' : 'outline'} 
              onClick={() => { setType('categoria'); setCreateError(null); }}
            >
              Ver Categorías
            </Button>
            <Button 
              variant={type === 'marca' ? 'default' : 'outline'} 
              onClick={() => { setType('marca'); setCreateError(null); }}
            >
              Ver Marcas
            </Button>
          </div>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" /> {newButtonText}
          </Button>
        </div>
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>ID</TableHead>
              <TableHead>
                <span className="sr-only">Acciones</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.nombre}</TableCell>
                <TableCell>{item.id}</TableCell>
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
                      <DropdownMenuItem onClick={() => handleOpenDeleteDialog(item)}>
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      
      {/* Diálogo de Creación */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nueva {title.slice(0, -1)}</DialogTitle>
            <DialogDescription>
              Introduce el nombre de la nueva {title.slice(0, -1).toLowerCase()}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nombre
              </Label>
              <Input
                id="name"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                className="col-span-3"
                placeholder={`Nombre de la ${title.slice(0, -1).toLowerCase()}`}
              />
            </div>
            {createError && (
              <p className="text-sm text-red-500 mt-2 col-span-4 text-center">{createError}</p>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleCreateNewItem}>
              Guardar {title.slice(0, -1)}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo de Confirmación de Eliminación */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar eliminación</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que quieres eliminar "{itemToDelete?.nombre}"? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancelar</Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>Eliminar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}