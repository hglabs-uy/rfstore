'use client';

import Link from 'next/link';
import { Linkedin, Twitter, Facebook } from 'lucide-react';
import { Logo } from '@/components/icons';
import { usePathname } from 'next/navigation';

export function Footer() {
  const pathname = usePathname();

  // No renderizar footer en /admin/*
  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-muted text-muted-foreground border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Logo className="h-8 w-8 text-primary" />
              <span className="font-bold font-headline text-xl text-foreground">RF STORE</span>
            </Link>
            <p className="text-sm max-w-xs">
              Su socio estratégico en tecnología y soluciones corporativas.
            </p>
          </div>
          <div className="grid grid-cols-2 md:col-span-2 gap-8">
            <div>
              <h4 className="font-semibold text-foreground mb-4">Navegación</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="hover:text-primary transition-colors">Inicio</Link></li>
                <li><Link href="/tienda" className="hover:text-primary transition-colors">Catálogo</Link></li>
                <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
                <li><Link href="/contacto" className="hover:text-primary transition-colors">Contacto</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Síganos</h4>
              <div className="flex space-x-4">
                <Link href="#" aria-label="LinkedIn" className="hover:text-primary transition-colors"><Linkedin size={20} /></Link>
                <Link href="#" aria-label="Twitter" className="hover:text-primary transition-colors"><Twitter size={20} /></Link>
                <Link href="#" aria-label="Facebook" className="hover:text-primary transition-colors"><Facebook size={20} /></Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} RF STORE. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
