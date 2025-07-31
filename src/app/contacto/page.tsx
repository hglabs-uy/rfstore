'use client';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';

const ContactSchema = z.object({
  name: z.string().min(2, 'El nombre es requerido'),
  email: z.string().email('El correo electrónico no es válido'),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
});

type ContactFormValues = z.infer<typeof ContactSchema>;

export default function ContactoPage() {
  const { toast } = useToast();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(ContactSchema),
  });

  const onSubmit: SubmitHandler<ContactFormValues> = (data) => {
    console.log('Contact Form Submission:', data);
    toast({
      title: 'Mensaje Enviado',
      description: 'Gracias por contactarnos. Le responderemos a la brevedad.',
    });
    form.reset();
  };

  const phoneNumber = "59899999999"; 
  const message = "Hola, estoy interesado en sus productos y quisiera solicitar más información.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8 md:py-12 flex-grow">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-2">Contacta a RF STORE</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Estamos listos para atender tus consultas y ofrecerte las mejores soluciones tecnológicas para tu empresa.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
              <Card>
                  <CardHeader className='flex-row items-center gap-4'>
                      <Mail className="w-8 h-8 text-primary" />
                      <div>
                          <CardTitle>Correo Electrónico</CardTitle>
                          <CardDescription>Para consultas generales y cotizaciones.</CardDescription>
                      </div>
                  </CardHeader>
                  <CardContent>
                      <a href="mailto:hglabs.uy@gmail.com" className="text-lg text-primary hover:underline">
                          hglabs.uy@gmail.com
                      </a>
                  </CardContent>
              </Card>
              <Card>
                  <CardHeader className='flex-row items-center gap-4'>
                      <Phone className="w-8 h-8 text-primary" />
                      <div>
                          <CardTitle>WhatsApp</CardTitle>
                          <CardDescription>Para una respuesta más rápida.</CardDescription>
                      </div>
                  </CardHeader>
                  <CardContent>
                      <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-lg text-primary hover:underline">
                          +598 99 99 99 99
                      </Link>
                  </CardContent>
              </Card>
               <Card>
                  <CardHeader className='flex-row items-center gap-4'>
                      <Linkedin className="w-8 h-8 text-primary" />
                      <div>
                          <CardTitle>Redes</CardTitle>
                          <CardDescription>Conéctate con nosotros en LinkedIn.</CardDescription>
                      </div>
                  </CardHeader>
                  <CardContent>
                       <Link href="#" target="_blank" rel="noopener noreferrer" className="text-lg text-primary hover:underline">
                          RF STORE en LinkedIn
                      </Link>
                  </CardContent>
              </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Envíenos un Mensaje</CardTitle>
                <CardDescription>Complete el formulario y nos pondremos en contacto.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre Completo</FormLabel>
                          <FormControl>
                            <Input placeholder="Su Nombre" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Correo Electrónico</FormLabel>
                          <FormControl>
                            <Input placeholder="su.email@ejemplo.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mensaje</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Escriba su consulta aquí..." {...field} rows={5} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={form.formState.isSubmitting}>
                      {form.formState.isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-16">
            <Card>
                <CardHeader>
                    <div className='flex items-center gap-4'>
                         <MapPin className="w-8 h-8 text-primary" />
                        <div>
                            <CardTitle>Nuestra Ubicación</CardTitle>
                            <CardDescription>Montevideo, Uruguay, Calle XXXXXXX</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="aspect-video w-full rounded-lg overflow-hidden">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d104724.649396181!2d-56.26224108876404!3d-34.86940348704981!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x959f80ffc63bf7d3%3A0x6b321b2e35d54500!2sMontevideo%2C%20Departamento%20de%20Montevideo%2C%20Uruguay!5e0!3m2!1ses-419!2ses!4v1700000000000!5m2!1ses-419!2ses"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen={false}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </CardContent>
            </Card>
        </div>

      </div>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
