import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Laptop, Server, Network, ShieldCheck, Star, Users, Briefcase } from "lucide-react";
import { blogPosts } from "@/lib/mock-data";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Header />
      <div className="flex flex-col gap-16 md:gap-24 flex-grow">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 py-20 md:py-32 text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4">
              Productos de Alta Calidad y Líderes del Mercado
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-primary-foreground/80 mb-8">
              En RF STORE, ofrecemos soluciones tecnológicas de vanguardia para impulsar la productividad y eficiencia de tu empresa.
            </p>
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
              <Link href="/tienda">
                Explora nuestro Catálogo <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Soluciones Tecnológicas Section */}
        <section className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-center font-headline">Soluciones Tecnológicas para tu Empresa</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">En RF STORE te ayudamos a adquirir la tecnología de punta que tus operaciones necesitan para destacar en el mercado.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Laptop className="w-12 h-12 mb-4 text-primary" />
              <h3 className="text-xl font-bold font-headline mb-2">Laptops y Desktops</h3>
              <p className="text-muted-foreground">Equipos potentes y fiables para cada rol en tu empresa.</p>
            </div>
            <div className="flex flex-col items-center">
              <Server className="w-12 h-12 mb-4 text-primary" />
              <h3 className="text-xl font-bold font-headline mb-2">Servidores y Almacenamiento</h3>
              <p className="text-muted-foreground">Infraestructura robusta para tus datos y aplicaciones críticas.</p>
            </div>
            <div className="flex flex-col items-center">
              <Network className="w-12 h-12 mb-4 text-primary" />
              <h3 className="text-xl font-bold font-headline mb-2">Redes y Conectividad</h3>
              <p className="text-muted-foreground">Soluciones para una comunicación fluida y segura.</p>
            </div>
             <div className="flex flex-col items-center">
              <Briefcase className="w-12 h-12 mb-4 text-primary" />
              <h3 className="text-xl font-bold font-headline mb-2">Periféricos y Accesorios</h3>
              <p className="text-muted-foreground">Complementos que mejoran la productividad y comodidad.</p>
            </div>
          </div>
        </section>
        
        {/* Por Qué Elegir RF STORE Section */}
        <section className="bg-muted py-16">
           <div className="container mx-auto px-4">
             <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-center font-headline">Por Qué Elegir RF STORE</h2>
             </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card>
                <CardHeader className="items-center text-center">
                  <Star className="w-10 h-10 mb-2 text-primary"/>
                  <CardTitle>Productos de Alta Calidad</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p>Solo ofrecemos marcas líderes y productos probados para garantizar el máximo rendimiento.</p>
                </CardContent>
              </Card>
              <Card>
                 <CardHeader className="items-center text-center">
                  <Users className="w-10 h-10 mb-2 text-primary"/>
                  <CardTitle>Asesoramiento Experto</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                   <p>Te guiamos para encontrar la solución tecnológica perfecta para tus necesidades corporativas.</p>
                </CardContent>
              </Card>
              <Card>
                 <CardHeader className="items-center text-center">
                  <ShieldCheck className="w-10 h-10 mb-2 text-primary"/>
                  <CardTitle>Soporte Post-Venta</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p>Nuestro compromiso con tu satisfacción continúa mucho después de tu compra.</p>
                </CardContent>
              </Card>
               <Card>
                 <CardHeader className="items-center text-center">
                  <Star className="w-10 h-10 mb-2 text-primary"/>
                  <CardTitle>Precios Competitivos</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p>Obtén la mejor tecnología del mercado con una excelente relación calidad-precio.</p>
                </CardContent>
              </Card>
            </div>
           </div>
        </section>

        {/* Blog Section */}
        <section className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-center font-headline">Novedades y Tendencias Tecnológicas</h2>
             <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Mantente al día con las últimas innovaciones y consejos tecnológicos para tu negocio.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.slice(0, 3).map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  <div className="relative aspect-video mb-4">
                    <Image src={post.imageUrl} alt={post.title} fill className="rounded-md object-cover" data-ai-hint={post.aiHint} />
                  </div>
                  <CardTitle className="text-xl h-16">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{post.excerpt}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="link" className="p-0">
                    <Link href={`/blog/${post.slug}`}>
                      Leer más <ArrowRight className="ml-2" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

         {/* CTA Final */}
        <section className="container mx-auto px-4 text-center py-16">
            <h2 className="text-3xl font-bold font-headline mb-4">¿Listo para potenciar tu empresa?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                Contacta a nuestros expertos y solicita una cotización personalizada para tus necesidades tecnológicas.
            </p>
            <Button size="lg" asChild>
                <Link href="/tienda">Ir a tienda</Link>
            </Button>
        </section>
      </div>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
