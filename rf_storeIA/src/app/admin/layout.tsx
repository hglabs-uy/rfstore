'use client';

import Link from "next/link";
import {
  Bell,
  Package2,
  Home,
  Package,
  FileText,
  Users,
  Settings,
  Tags,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/icons";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const navLinks = [
    { href: "/admin", label: "Dashboard", icon: Home },
    { href: "/admin/productos", label: "Productos", icon: Package },
    { href: "/admin/categorias", label: "Categorías", icon: Tags },
    { href: "/admin/blog", label: "Blog", icon: FileText },
    { href: "/admin/consultas", label: "Consultas", icon: Users, badge: 3 },
  ];

  return (
    <>
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Logo className="h-6 w-6 text-primary" />
              <span className="">RF STORE</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                  {link.badge && (
                    <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                      {link.badge}
                    </Badge>
                  )}
                </Link>
              ))}
            </nav>
          </div>
          <div className="mt-auto p-4">
             <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/">
                    <LogOut className="mr-2 h-4 w-4" />
                    Volver al Sitio
                </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        {/* Aquí podrías agregar un header para la versión móvil si es necesario */}
        <main className="flex flex-1 flex-col gap-4 bg-muted/40 p-4 lg:gap-8 lg:p-8">
          {children}
        </main>
      </div>
    </div>
    </>
  );
}
