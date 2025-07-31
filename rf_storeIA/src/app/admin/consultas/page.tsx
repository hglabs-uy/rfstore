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
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data for inquiries
const inquiries = [
  {
    id: "QRY-001",
    name: "Carlos Pérez",
    company: "Tech Solutions",
    email: "carlos.perez@techsolutions.com",
    date: "2024-07-20",
    status: "new",
  },
  {
    id: "QRY-002",
    name: "Laura Gómez",
    company: "Innovate Co.",
    email: "laura.gomez@innovate.co",
    date: "2024-07-19",
    status: "read",
  },
  {
    id: "QRY-003",
    name: "Juan Rodríguez",
    company: "Global Corp",
    email: "juan.r@globalcorp.net",
    date: "2024-07-18",
    status: "answered",
  },
    {
    id: "QRY-004",
    name: "Ana Fernández",
    company: "Creative Minds",
    email: "ana.f@creativeminds.io",
    date: "2024-07-21",
    status: "new",
  },
  {
    id: "QRY-005",
    name: "Miguel Ángel",
    company: "Data Systems",
    email: "miguel.angel@datasystems.com",
    date: "2024-07-20",
    status: "new",
  },
];

export default function AdminInquiriesPage() {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'new':
        return 'default';
      case 'read':
        return 'secondary';
      case 'answered':
        return 'outline';
      default:
        return 'outline';
    }
  }

  const getStatusLabel = (status: string) => {
     switch (status) {
      case 'new':
        return 'Nueva';
      case 'read':
        return 'Leída';
      case 'answered':
        return 'Respondida';
      default:
        return 'Desconocido';
    }
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Consultas</CardTitle>
        <CardDescription>
          Revisa y gestiona las consultas de los clientes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Empresa</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="hidden md:table-cell">Fecha</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>
                <span className="sr-only">Acciones</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inquiries.map((inquiry) => (
              <TableRow key={inquiry.id}>
                <TableCell className="font-medium">{inquiry.name}</TableCell>
                <TableCell>{inquiry.company}</TableCell>
                <TableCell className="hidden sm:table-cell">{inquiry.email}</TableCell>
                <TableCell className="hidden md:table-cell">
                   {new Date(inquiry.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(inquiry.status)}>
                    {getStatusLabel(inquiry.status)}
                  </Badge>
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
                      <DropdownMenuItem>Ver Detalles</DropdownMenuItem>
                      <DropdownMenuItem>Marcar como Leída</DropdownMenuItem>
                      <DropdownMenuItem>Archivar</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
