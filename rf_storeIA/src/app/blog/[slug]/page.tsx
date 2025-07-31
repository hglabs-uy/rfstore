import { blogPosts } from '@/lib/mock-data';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Calendar, User, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';
import type { Metadata } from 'next';
import { ShareButton } from '../ShareButton';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// Generate metadata for the page
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return {
      title: 'Post no encontrado',
    };
  }
  
  // A real application would fetch the full URL from environment variables
  const postUrl = `https://example.com/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: postUrl,
      images: [
        {
          url: post.imageUrl,
          width: 800,
          height: 450,
          alt: post.title,
        },
      ],
      type: 'article',
      article: {
        publishedTime: post.date,
        authors: [post.author],
      },
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.imageUrl],
    },
  };
}


// This function can be used by Next.js to generate static pages at build time
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }
  
  // A real application would fetch the full URL from environment variables
  const postUrl = `https://example.com/blog/${post.slug}`;

  return (
    <>
      <Header />
      <article className="container mx-auto px-4 py-8 md:py-12 max-w-4xl flex-grow">
        <header className="mb-8">
          <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
              data-ai-hint={post.aiHint}
            />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-headline mb-4">{post.title}</h1>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User size={16} />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
               <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
            </div>
          </div>
        </header>

        <div className="prose prose-lg max-w-none text-foreground/90">
          <p className="text-xl leading-relaxed">{post.content}</p>
          {/* In a real app, this would render markdown or rich text */}
        </div>

        <footer className="mt-12 pt-8 border-t">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold">Compartir este artículo</h4>
            <ShareButton postUrl={postUrl} postTitle={post.title} />
          </div>
        </footer>
      </article>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
