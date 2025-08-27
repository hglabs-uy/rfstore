import { useState } from 'react';
import { PreparedProducts } from '../../interfaces';
import { CardProduct } from '../products/CardProduct';

interface Props {
	title: string;
	products: PreparedProducts[];
}

export const ProductGrid = ({ title, products }: Props) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc'); // Precio mayor a menor por defecto

	// Filtrar productos por término de búsqueda
	const filteredProducts = products.filter(product =>
		product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
		product.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
		(product.brandName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
		(product.categoryName || '').toLowerCase().includes(searchTerm.toLowerCase())
	);

	// Ordenar productos por precio
	const sortedProducts = [...filteredProducts].sort((a, b) => {
		if (sortOrder === 'desc') {
			return b.price - a.price; // Mayor a menor
		} else {
			return a.price - b.price; // Menor a mayor
		}
	});

	return (
		<div className='my-32'>
			<h2 className='text-3xl font-semibold text-center mb-8 md:text-4xl lg:text-5xl'>
				{title}
			</h2>

			{/* Buscador */}
			<div className='mb-8 flex justify-center'>
				<div className='relative max-w-2xl w-full'>
					<input
						type='text'
						placeholder='Buscar productos destacados...'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className='w-full px-6 py-4 pl-12 text-lg border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent shadow-sm'
					/>
					<div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
						<svg className='h-6 w-6 text-gray-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
							<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
						</svg>
					</div>
				</div>
			</div>

			{/* Contador de resultados y ordenamiento */}
			<div className='mb-6 flex flex-col sm:flex-row items-center justify-between gap-4'>
				{searchTerm && (
					<div className='text-center sm:text-left'>
						<p className='text-lg text-gray-600'>
							{filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''} para "{searchTerm}"
						</p>
					</div>
				)}
				
				{/* Selector de ordenamiento */}
				<div className='flex items-center gap-3'>
					<label className='text-sm font-medium text-gray-700'>
						Ordenar por precio:
					</label>
					<select
						value={sortOrder}
						onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
						className='px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white'
					>
						<option value='desc'>Mayor a menor</option>
						<option value='asc'>Menor a mayor</option>
					</select>
				</div>
			</div>

			<div className='grid grid-cols-1 gap-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-4'>
				{sortedProducts.map(product => (
					<CardProduct
						key={product.id}
						name={product.name}
						price={product.price}
						colors={product.colors}
						img={product.images[0]}
						slug={product.slug}
						variants={product.variants}
						brandName={product.brandName}
						categoryName={product.categoryName}
					/>
				))}
			</div>
		</div>
	);
};
