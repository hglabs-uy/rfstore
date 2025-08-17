import { Link, useNavigate, useParams } from 'react-router-dom';
import { useOrder, useUser } from '../hooks';
import { Loader } from '../components/shared/Loader';
import { CiCircleCheck } from 'react-icons/ci';
import { formatPrice } from '../helpers';
import { useEffect } from 'react';
import { supabase } from '../supabase/client';

export const ThankyouPage = () => {
	const { id } = useParams<{ id: string }>();

	const { data, isLoading, isError } = useOrder(Number(id));
	const { isLoading: isLoadingSession } = useUser();

	const navigate = useNavigate();

	useEffect(() => {
		supabase.auth.onAuthStateChange(async (event, session) => {
			if (event === 'SIGNED_OUT' || !session) {
				navigate('/login');
			}
		});
	}, [navigate]);

	if (isError) return <div>Error al cargar la orden</div>;

	if (isLoading || !data || isLoadingSession) return <Loader />;

	const userName = data.customer.full_name || '';

	return (
		<div className='flex flex-col h-screen'>
			<header className='flex flex-col items-center justify-center px-10 py-12 text-black'>
				<Link
					to='/'
					className='self-center text-4xl font-bold tracking-tighter transition-all md:text-5xl'
				>
					<p>
						RF
						<span className='text-cyan-600'>STORE</span>
					</p>
				</Link>
			</header>

			<main className='container flex flex-col items-center flex-1 gap-10'>
				<div className='flex items-center gap-3'>
					<CiCircleCheck size={40} />

					<p className='text-4xl'>
						{userName ? `¡Gracias, ${userName}!` : '¡Gracias!'}
					</p>
				</div>

				<div className='border border-slate-200 w-full p-5 rounded-md space-y-3 md:w-[600px]'>
					<h3 className='font-medium'>Detalles del pedido</h3>

					<div className='flex flex-col gap-5'>
						<ul className='space-y-3'>
							{data.orderItems.map((item, index) => (
								<li
									key={index}
									className='flex items-center justify-between gap-3'
								>
									<div className='flex'>
										<img
											src={item.productImage}
											alt={item.productName}
											className='object-contain w-16 h-16'
										/>
									</div>

									<div className='flex-1 space-y-2'>
										<div className='flex justify-between'>
											<p className='font-semibold'>
												{item.productName}
											</p>
											<p className='mt-1 text-sm font-medium text-gray-600'>
												{formatPrice(item.price)} x {item.quantity}
											</p>
										</div>

										<div className='flex gap-3'>
											<p className='text-[13px] text-gray-600'>
												{item.storage} / {item.color_name}
											</p>
										</div>
									</div>
								</li>
							))}
						</ul>

						<div className='flex justify-between'>
							<span className='font-semibold'>Total:</span>
							<span className='font-semibold'>
								{formatPrice(data.totalAmount)}
							</span>
						</div>
					</div>
				</div>

				<div className='flex flex-col justify-between items-center w-full mb-5 gap-3 sm:flex-row md:w-[600px] md:gap-0'>
					<p className='text-sm'>
						¿Necesitas ayuda? Ponte en contacto con nosotros
					</p>

					<Link
						to='/tienda'
						className='px-5 py-4 text-sm font-semibold tracking-tight text-white bg-black rounded-md'
					>
						Seguir comprando
					</Link>
				</div>
			</main>
		</div>
	);
};
