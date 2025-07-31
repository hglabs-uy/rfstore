import { blogPosts } from '@/lib/mock-data';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';
import { ShareButton } from './ShareButton';
import { Separator } from '@/components/ui/separator';

export default function BlogPage() {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8 md:py-12 flex-grow">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-2">Blog de RF STORE: Insights Tecnológicos para tu Negocio</h1>
        </header>

        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col gap-12">
            {blogPosts.map((post) => {
               // A real application would fetch the full URL from environment variables
               const postUrl = `https://example.com/blog/${post.slug}`;

              return (
                <Card key={post.id} className="rounded-lg border">
                  <CardHeader className="p-0">
                     <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4 p-6 pb-0">
                      <div className="flex items-center gap-1.5">
                        <User size={14} />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                      </div>
                    </div>
                     <CardTitle className="text-2xl font-headline mb-4 p-6 pt-2">
                      <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                        {post.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="p-0">
                     {post.imageUrl && (
                      <Link href={`/blog/${post.slug}`}>
                        <div className="relative aspect-video mx-6 mb-4 rounded-lg overflow-hidden">
                          <Image
                            src={post.imageUrl}
                            alt={post.title}
                            fill
                            className="object-cover"
                            data-ai-hint={post.aiHint}
                          />
                        </div>
                      </Link>
                    )}
                    <p className="text-muted-foreground px-6">{post.excerpt}</p>
                  </CardContent>

                  <CardFooter className="p-6 pt-4 flex justify-between items-center">
                    <Link href={`/blog/${post.slug}`} className="font-semibold text-primary hover:underline flex items-center text-sm">
                      Leer más <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                     <ShareButton postUrl={postUrl} postTitle={post.title} />
                  </CardFooter>
                </Card>
            )})}
          </div>
        </div>
      </div>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
