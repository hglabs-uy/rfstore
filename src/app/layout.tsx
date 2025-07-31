import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/contexts/CartContext';

export const metadata: Metadata = {
  title: 'RF STORE',
  description: 'Soluciones tecnológicas de vanguardia para impulsar la productividad y eficiencia de tu empresa.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
          <CartProvider>
            <div className="flex flex-col min-h-screen">
              {children}
            </div>
            <Toaster />
          </CartProvider>
      </body>
    </html>
  );
}
