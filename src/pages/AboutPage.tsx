import { useForm, ValidationError } from '@formspree/react';
import { Link } from 'react-router-dom';
import { FaWhatsapp, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaRegCommentDots } from 'react-icons/fa';

export const AboutPage = () => {
  const [state, handleSubmit] = useForm('mvgqddop');

  if (state.succeeded) {
    return (
      <div className="max-w-4xl p-6 mx-auto text-center">
        <h2 className="text-3xl font-semibold text-green-500">¡Gracias por tu mensaje!</h2>
        <p className="mt-2 text-gray-200">Nos pondremos en contacto contigo pronto.</p>
        <Link
          to="/"
          className="inline-block px-5 py-3 mt-6 text-white rounded-md bg-slate-900 hover:bg-slate-800"
        >
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-gray-100 bg-gray-950">
      {/* HERO con imagen arriba */}
      <section className="relative w-full overflow-hidden h-60 md:h-80">
        <img
          src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1600&auto=format&fit=crop"
          alt="Contacto"
          className="object-cover w-full h-full opacity-30"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="px-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Contacto</h1>
            <p className="max-w-2xl mt-2 text-gray-300">
              Envíanos tu consulta y te responderemos a la brevedad.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENIDO */}
      <section className="max-w-6xl px-4 py-10 mx-auto md:px-6">
        {/* md:grid-cols-3 => 2/3 + 1/3. En mobile se apilan */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* IZQUIERDA: Formulario (2/3) */}
          <div className="md:col-span-2">
            <div className="w-full p-6 border border-gray-800 rounded-lg shadow-2xl md:p-8 bg-gray-900/70 shadow-cyan-900/10 backdrop-blur">
              <h2 className="mb-6 text-2xl font-semibold">Envíanos tu mensaje</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                    Nombre Completo o Empresa <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    required
                    className="block w-full px-4 py-2 mt-1 text-gray-100 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                    Correo Electrónico <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    className="block w-full px-4 py-2 mt-1 text-gray-100 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
                  />
                  <ValidationError
                    prefix="Email"
                    field="email"
                    errors={state.errors}
                    className="mt-1 text-sm text-red-400"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300">
                    Teléfono <span className="font-normal text-gray-500">(opcional)</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    className="block w-full px-4 py-2 mt-1 text-gray-100 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                    Mensaje <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="block w-full px-4 py-2 mt-1 text-gray-100 bg-gray-800 border border-gray-700 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
                  />
                  <ValidationError
                    prefix="Message"
                    field="message"
                    errors={state.errors}
                    className="mt-1 text-sm text-red-400"
                  />
                </div>

                <button
                  type="submit"
                  disabled={state.submitting}
                  className="flex justify-center w-full px-4 py-3 font-medium text-white rounded-md bg-cyan-600 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-gray-950 disabled:bg-gray-500"
                >
                  {state.submitting ? 'Enviando...' : 'Enviar'}
                </button>
              </form>
            </div>
          </div>

          {/* DERECHA: Aside (1/3) */}
          <aside className="space-y-6 md:col-span-1">
            {/* WhatsApp */}
            <div className="p-6 border border-gray-800 rounded-lg bg-gray-900/50">
              <h3 className="flex items-center gap-2 mb-3 text-lg font-semibold">
                <FaRegCommentDots /> ¿Preferís WhatsApp?
              </h3>
              <p className="mb-4 text-gray-300">
                Escribinos y te respondemos más rápido por WhatsApp.
              </p>
              <a
                href="https://wa.me/59899123456"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 font-medium text-white rounded-md bg-emerald-600 hover:bg-emerald-500"
              >
                <FaWhatsapp /> Hablar por WhatsApp
              </a>
            </div>

            {/* Horarios */}
            <div className="p-6 border border-gray-800 rounded-lg bg-gray-900/50">
              <h3 className="mb-3 text-lg font-semibold">Horario de atención</h3>
              <ul className="space-y-1 text-gray-300">
                <li>Lunes a Viernes: 9:00 – 18:00</li>
                <li>Sábados: 9:00 – 13:00</li>
                <li>Domingos y feriados: cerrado</li>
              </ul>
            </div>

            {/* Datos de contacto */}
            <div className="p-6 border border-gray-800 rounded-lg bg-gray-900/50">
              <h3 className="mb-3 text-lg font-semibold">Datos de contacto</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center gap-2">
                  <FaEnvelope /> contacto@rfstore.com
                </li>
                <li className="flex items-center gap-2">
                  <FaPhoneAlt /> +598 99 123 456
                </li>
                <li className="flex items-center gap-2">
                  <FaMapMarkerAlt /> Montevideo, Uruguay
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};
