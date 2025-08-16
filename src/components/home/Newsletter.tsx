export const Newsletter = () => {
	return (
		<div className='relative py-20 text-white bg-slate-400 shadow-xl'>
			{/* IMAGEN DE FONDO */}
			{/* <div
				className='absolute inset-0 h-full bg-center bg-cover opacity-70'
				style={{
					backgroundImage: 'url(/img/background-newsletter.webp)',
				}}
			/> */}

			{/* CONTENIDO DE NEWSLETTER */}
			<div className='container relative z-10 grid p-5 md:p-0 place-items-center'>
				<div className='w-full text-black bg-white p-12 space-y-5 md:w-[50%] lg:w-[40%]'>
					<p className='text-xs font-semibold uppercase'>
						Suscríbete a nuestro boletín y recibe promociones
						exclusivas
					</p>
					<p className='text-xs font-medium w-[80%] leading-5'>
						Introduce tu correo para recibir ofertas
					</p>
					<form className='flex flex-col gap-5 xl:flex-row'>
						<input
							type='email'
							className='w-full px-5 py-3 text-xs font-medium border rounded-full border-slate-200 focus:outline-none'
							placeholder='Correo Electrónico'
						/>

						<button className='py-3 text-xs font-semibold tracking-wider text-white uppercase bg-black rounded-full xl:px-5'>
							Suscribirme
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};
