import { useForm, ValidationError } from '@formspree/react';

export const AboutPage = () => {
    const [state, handleSubmit] = useForm("mvgqddop");

    if (state.succeeded) {
        return (
            <div className='text-center p-10 max-w-2xl mx-auto'>
                <h2 className='text-2xl font-semibold text-green-600'>¡Gracias por tu mensaje!</h2>
                <p className='text-gray-950 mt-2'>Nos pondremos en contacto contigo pronto.</p>
            </div>
        );
    }

    return (
        <div className='space-y-8 max-w-4xl mx-auto p-4 md:p-6'>
            <h1 className='text-center text-4xl font-semibold tracking-tight text-black'>
                Envíanos tu mensaje
            </h1>

            {/* Contenedor del formulario con un fondo más oscuro y una sombra sutil */}
            <div className="w-full p-6 md:p-8 rounded-lg bg-gray-800 shadow-2xl shadow-gray-700/50">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        {/* Labels con un color que contraste bien */}
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                            Nombre Completo o Empresa <span className="text-red-400">*</span>
                        </label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            required
                            // Campos de entrada con fondo oscuro, borde claro y texto claro
                            className="mt-1 block w-full px-4 py-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
                            className="mt-1 block w-full px-4 py-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                        <ValidationError 
                            prefix="Email" 
                            field="email" 
                            errors={state.errors} 
                            className="text-red-400 text-sm mt-1" 
                        />
                    </div>

                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-300">
                            Teléfono <span className="text-gray-500 font-normal">(opcional)</span>
                        </label>
                        <input
                            id="phone"
                            type="tel"
                            name="phone"
                            className="mt-1 block w-full px-4 py-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
                            className="mt-1 block w-full px-4 py-2 bg-gray-700 text-gray-200 border border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        ></textarea>
                        <ValidationError 
                            prefix="Message" 
                            field="message" 
                            errors={state.errors} 
                            className="text-red-400 text-sm mt-1" 
                        />
                    </div>

                    <div>
                        {/* Botón con un color de fondo más oscuro y un efecto hover */}
                        <button
                            type="submit"
                            disabled={state.submitting}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm font-medium text-white text-md bg-slate-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:bg-gray-400"
                        >
                            {state.submitting ? 'Enviando...' : 'Enviar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};