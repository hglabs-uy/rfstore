import { useState } from 'react';
import { LuLoader2 } from 'react-icons/lu';
import { Navigate } from 'react-router-dom';
import { useLogin, useUser } from '../hooks';
import { Loader } from '../components/shared/Loader';

export const LoginPage = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const { mutate, isPending } = useLogin();
	const { session, isLoading } = useUser();

	const onLogin = (e: React.FormEvent) => {
		e.preventDefault();

		mutate({ email, password });
	};

	if (isLoading) return <Loader />;

	if (session) return <Navigate to='/' />;

	return (
		<div className='flex flex-col items-center h-full gap-5 mt-12'>
			<h1 className='text-4xl font-bold capitalize'>
				Iniciar sesión
			</h1>

			<p className='text-sm font-medium'>
				¡Que bueno tenerte de vuelta!
			</p>

			{isPending ? (
				<div className='flex justify-center w-full h-full mt-20'>
					<LuLoader2 className='animate-spin' size={60} />
				</div>
			) : (
				<>
					<form
						className='flex flex-col items-center gap-4 w-full mt-10 sm:w-[400px] lg:w-[500px]'
						onSubmit={onLogin}
					>
						<input
							type='email'
							placeholder='Ingresa tu correo electrónico'
							className='w-full px-5 py-4 text-sm text-black border rounded-full border-slate-200 placeholder:text-black'
							value={email}
							onChange={e => setEmail(e.target.value)}
						/>

						<input
							type='password'
							placeholder='Ingresa tu contraseña'
							className='w-full px-5 py-4 text-sm text-black border rounded-full border-slate-200 placeholder:text-black'
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>

						<button className='w-full py-4 mt-5 text-xs font-semibold tracking-widest text-white uppercase bg-black rounded-full'>
							Iniciar sesión
						</button>
					</form>
				</>
			)}
		</div>
	);
};
