import { BiChevronRight } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { socialLinks } from '../../constants/links';

export const Footer = () => {
	return (
		<footer className='flex flex-wrap justify-between gap-10 px-12 py-16 mt-10 text-sm bg-gray-950 text-slate-200 md:flex-nowrap'>
			<Link
				to='/'
				className={`text-2xl font-bold tracking-tighter transition-all text-white flex-1`}
			>
				RF STORE
			</Link>

			<div className='flex flex-col flex-1 gap-4'>
				<p className='font-semibold tracking-tighter uppercase'>
					Suscríbete
				</p>
				<p className='text-xs font-medium'>
					Recibe promociones exclusivas
				</p>

				<div className='flex items-center gap-2 px-3 py-2 border border-gray-800 rounded-full'>
					<input
						type='email'
						placeholder='Correo Electrónico'
						className='w-full pl-2 bg-gray-950 text-slate-200 focus:outline-none'
					/>

					<button className='text-slate-200'>
						<BiChevronRight size={20} />
					</button>
				</div>
			</div>

			<div className='flex flex-col flex-1 gap-4'>
				<p className='font-semibold tracking-tighter uppercase'>
					Políticas
				</p>

				<nav className='flex flex-col gap-2 text-xs font-medium'>
					<Link to='/celulares'>Productos</Link>
					<Link to='#' className='text-slate-300 hover:text-white'>
						Políticas de privacidad
					</Link>
					<Link to='#' className='text-slate-300 hover:text-white'>
						Términos de uso
					</Link>
				</nav>
			</div>

			<div className='flex flex-col flex-1 gap-4'>
				<p className='font-semibold tracking-tighter uppercase'>
					Síguenos
				</p>

				<p className='text-xs leading-6'>
					No te pierdas las novedades que RF STORE tiene para
					ti.
				</p>

				<div className='flex'>
					{socialLinks.map(link => (
						<a
							key={link.id}
							href={link.href}
							target='_blank'
							rel='noreferrer'
							className='flex justify-center gap-2 px-10 py-3 transition-all border border-gray-800 itemsflex gap-2-center text-slate-300 hover:bg-white hover:text-gray-950'
						>
							{link.icon}
						</a>
					))}
				</div>
			</div>
		</footer>
	);
};
