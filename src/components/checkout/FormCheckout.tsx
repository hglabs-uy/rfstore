import { useState } from 'react';
import { useCreateOrder } from '../../hooks';
import { useCartStore } from '../../store/cart.store';
import { ImSpinner2 } from 'react-icons/im';
import toast from 'react-hot-toast';

const FORMSPREE_ID = 'mvgqddop';

export const FormCheckout = () => {
	const { mutate: createOrder, isPending } = useCreateOrder();

	const cleanCart = useCartStore(state => state.cleanCart);
	const cartItems = useCartStore(state => state.items);
	const totalAmount = useCartStore(state => state.totalAmount);

	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [message, setMessage] = useState('');
	const [submitting, setSubmitting] = useState(false);

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!email) {
			toast.error('Ingresá un correo válido');
			return;
		}

		setSubmitting(true);
		try {
			// Enviar datos de contacto a Formspree
			await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email,
					phone,
					message,
					source: 'checkout',
					totalAmount,
				}),
			});

			// Crear la orden como hasta ahora
			const orderInput = {
				address: {
					addressLine1: '',
					addressLine2: '',
					city: '',
					state: '',
					postalCode: '',
					country: '',
				},
				cartItems: cartItems.map(item => ({
					variantId: item.variantId,
					quantity: item.quantity,
					price: item.price,
				})),
				totalAmount,
			};

			toast.success('¡Gracias por elegirnos! Un agente se estará comunicando con usted a la brevedad.', { position: 'bottom-right' });

			createOrder(orderInput, {
				onSuccess: () => {
					cleanCart();
				},
			});
		} catch (err) {
			toast.error('No se pudo enviar tu solicitud. Intenta nuevamente.');
		} finally {
			setSubmitting(false);
		}
	};

	if (isPending) {
		return (
			<div className='flex flex-col gap-3 h-screen items-center justify-center'>
				<ImSpinner2 className='animate-spin h-10 w-10' />

				<p className='text-sm font-medium'>
					Estamos procesando tu pedido
				</p>
			</div>
		);
	}

	return (
		<div>
			<form className='flex flex-col gap-6' onSubmit={onSubmit}>
				<div className='flex flex-col gap-3'>
					<h3 className='text-lg font-semibold tracking-normal'>
						Datos de contacto
					</h3>

					<div className='flex flex-col gap-2'>
						<label className='text-sm font-medium'>Correo electrónico <span className='text-red-500'>*</span></label>
						<input
							type='email'
							className='border border-slate-300 rounded-md p-2'
							placeholder='cliente@correo.com'
							value={email}
							onChange={e => setEmail(e.target.value)}
							required
						/>
					</div>

					<div className='flex flex-col gap-2'>
						<label className='text-sm font-medium'>Teléfono (opcional)</label>
						<input
							type='tel'
							className='border border-slate-300 rounded-md p-2'
							placeholder='099 123 456'
							value={phone}
							onChange={e => setPhone(e.target.value)}
						/>
					</div>

					<div className='flex flex-col gap-2'>
						<label className='text-sm font-medium'>Mensaje (opcional)</label>
						<textarea
							className='border border-slate-300 rounded-md p-2'
							rows={4}
							placeholder='Contanos qué estás buscando o cualquier detalle relevante'
							value={message}
							onChange={e => setMessage(e.target.value)}
						/>
					</div>
				</div>

				<div className='flex flex-col gap-6'>
					<h3 className='font-semibold text-3xl'>
						Resumen del pedido
					</h3>

					{/* El resumen del carrito se renderiza en el panel derecho para desktop
					   y aquí se mantiene el botón principal */}
				</div>

				<button
					type='submit'
					className='bg-black text-white py-3.5 font-bold tracking-wide rounded-md mt-2 disabled:opacity-70'
					disabled={submitting}
				>
					{submitting ? 'Enviando...' : 'Solicitar Cotización'}
				</button>
			</form>
		</div>
	);
};
