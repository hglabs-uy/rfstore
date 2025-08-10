const brands = [
	{
		image: '/img/brands/brother.png',
		alt: 'Apple',
	},
	{
		image: '/img/brands/hp.png',
		alt: 'Samsung',
	},
	{
		image: '/img/brands/intel.png',
		alt: 'Xiaomi',
	},
	{
		image: '/img/brands/logitech.png',
		alt: 'Realme',
	},
	{
		image: '/img/brands/mikrotik.png',
		alt: 'Huawei',
	},

	{
		image: '/img/brands/samsung.png',
		alt: 'Honor',
	},
];

export const Brands = () => {
	return (
		<div className='flex flex-col items-center gap-3 pt-16 pb-12'>
			<h2 className='font-bold text-2xl'>Marcas con las que trabajamos</h2>

			<p className='w-2/3 text-center text-sm md:text-base'>
				Tenemos lo más moderno en tecnología 
			</p>

			<div className='grid grid-cols-3 gap-6 mt-8 items-center md:grid-cols-6'>
				{brands.map((brand, index) => (
					<div key={index}>
						<img src={brand.image} alt={brand.alt} />
					</div>
				))}
			</div>
		</div>
	);
};
