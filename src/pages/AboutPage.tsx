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
                Contacto
            </h1>

            <div className="w-full p-6 md:p-8 border rounded-lg bg-slate-100 shadow-md shadow-slate-700">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-black">
                            Nombre Completo o Empresa <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            required
                            className="mt-1 block w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-black">
                            Correo Electrónico <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            required
                            className="mt-1 block w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                        />
                        <ValidationError 
                            prefix="Email" 
                            field="email" 
                            errors={state.errors} 
                            className="text-red-600 text-sm mt-1" 
                        />
                    </div>

                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-black">
                            Teléfono <span className="text-gray-500 font-normal">(opcional)</span>
                        </label>
                        <input
                            id="phone"
                            type="tel"
                            name="phone"
                            className="mt-1 block w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-black">
                            Mensaje <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            required
                            rows={5}
                            className="mt-1 block w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:ring-black focus:border-black"
                        ></textarea>
                        <ValidationError 
                            prefix="Message" 
                            field="message" 
                            errors={state.errors} 
                            className="text-red-600 text-sm mt-1" 
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={state.submitting}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-slate-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:bg-gray-400"
                        >
                            {state.submitting ? 'Enviando...' : 'Enviar'}
                        </button>
                    </div>
                </form>
            </div>

            
        </div>
    );
};