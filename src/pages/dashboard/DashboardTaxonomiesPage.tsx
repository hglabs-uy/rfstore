import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createBrand, createCategory, getBrands, getCategories } from '../../actions';

export const DashboardTaxonomiesPage = () => {
	const queryClient = useQueryClient();
	const [brandName, setBrandName] = useState('');
	const [categoryName, setCategoryName] = useState('');

	const { data: brands = [] } = useQuery({ queryKey: ['brands'], queryFn: getBrands });
	const { data: categories = [] } = useQuery({ queryKey: ['categories'], queryFn: getCategories });

	const { mutate: addBrand, isPending: isAddingBrand } = useMutation({
		mutationFn: createBrand,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['brands'] });
			setBrandName('');
		},
	});

	const { mutate: addCategory, isPending: isAddingCategory } = useMutation({
		mutationFn: createCategory,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['categories'] });
			setCategoryName('');
		},
	});

	return (
		<div className='flex flex-col gap-8'>
			
			<h1 className='text-xl font-bold'>Categorías y Marcas</h1>

			<div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
				<div className='p-5 bg-white border border-gray-200 rounded-lg'>
					<h2 className='mb-3 font-semibold'>Marcas</h2>
					<div className='flex gap-2'>
						<input
							type='text'
							placeholder='Nombre de la marca'
							className='flex-1 p-2 border border-gray-300 rounded-md'
							value={brandName}
							onChange={e => setBrandName(e.target.value)}
						/>
						<button
							className='btn-primary'
							disabled={!brandName.trim() || isAddingBrand}
							onClick={() => addBrand(brandName.trim())}
						>
							Agregar
						</button>
					</div>

					<ul className='mt-4 space-y-2 overflow-auto max-h-80'>
						{brands.map(brand => (
							<li key={brand.id} className='text-sm'>{brand.name}</li>
						))}
					</ul>
				</div>

				<div className='p-5 bg-white border border-gray-200 rounded-lg'>
					<h2 className='mb-3 font-semibold'>Categorías</h2>
					<div className='flex gap-2'>
						<input
							type='text'
							placeholder='Nombre de la categoría'
							className='flex-1 p-2 border border-gray-300 rounded-md'
							value={categoryName}
							onChange={e => setCategoryName(e.target.value)}
						/>
						<button
							className='btn-primary'
							disabled={!categoryName.trim() || isAddingCategory}
							onClick={() => addCategory(categoryName.trim())}
						>
							Agregar
						</button>
					</div>

					<ul className='mt-4 space-y-2 overflow-auto max-h-80'>
						{categories.map(category => (
							<li key={category.id} className='text-sm'>{category.name}</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};