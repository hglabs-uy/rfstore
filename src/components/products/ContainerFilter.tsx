import { Separator } from '../shared/Separator';
import { useTaxonomies } from '../../hooks';
import { useState, useEffect } from 'react';

interface Props {
	selectedBrands: string[];
	setSelectedBrands: (brands: string[]) => void;
	selectedCategories: string[];
	setSelectedCategories: (categories: string[]) => void;
	priceMin?: number;
	priceMax?: number;
	setPriceMin: (v?: number) => void;
	setPriceMax: (v?: number) => void;
}

export const ContainerFilter = ({
	selectedBrands,
	setSelectedBrands,
	selectedCategories,
	setSelectedCategories,
	priceMin,
	priceMax,
	setPriceMin,
	setPriceMax,
}: Props) => {
	const { brands, categories } = useTaxonomies();
	const [localMin, setLocalMin] = useState<string>(priceMin?.toString() || '');
	const [localMax, setLocalMax] = useState<string>(priceMax?.toString() || '');

	useEffect(() => {
		setPriceMin(localMin === '' ? undefined : Number(localMin));
	}, [localMin, setPriceMin]);
	useEffect(() => {
		setPriceMax(localMax === '' ? undefined : Number(localMax));
	}, [localMax, setPriceMax]);

	const toggle = (list: string[], setList: (v: string[]) => void, id: string) => {
		if (list.includes(id)) setList(list.filter(b => b !== id));
		else setList([...list, id]);
	};

	return (
		<div className='p-5 border border-slate-200 rounded-lg h-fit col-span-2 lg:col-span-1'>
			<h3 className='font-semibold text-xl mb-4'>Filtros</h3>

			{/* Separador  */}
			<Separator />

			<div className='flex flex-col gap-6'>
				<div className='flex flex-col gap-2'>
					<h3 className='text-lg font-medium text-black'>Marcas</h3>
					<div className='flex flex-col gap-2'>
						{brands.map(brand => (
							<label key={brand.id} className='inline-flex items-center'>
								<input
									type='checkbox'
									className='text-black border-black focus:ring-black accent-black'
									checked={selectedBrands.includes(brand.id)}
									onChange={() => toggle(selectedBrands, setSelectedBrands, brand.id)}
								/>
								<span className='ml-2 text-black text-sm cursor-pointer'>
									{brand.name}
								</span>
							</label>
						))}
					</div>
				</div>

				<div className='flex flex-col gap-2'>
					<h3 className='text-lg font-medium text-black'>Categorías</h3>
					<div className='flex flex-col gap-2'>
						{categories.map(category => (
							<label key={category.id} className='inline-flex items-center'>
								<input
									type='checkbox'
									className='text-black border-black focus:ring-black accent-black'
									checked={selectedCategories.includes(category.id)}
									onChange={() => toggle(selectedCategories, setSelectedCategories, category.id)}
								/>
								<span className='ml-2 text-black text-sm cursor-pointer'>
									{category.name}
								</span>
							</label>
						))}
					</div>
				</div>

				<div className='flex flex-col gap-2'>
					<h3 className='text-lg font-medium text-black'>Precio</h3>
					<div className='flex items-center gap-2'>
						<input
							type='number'
							className='border border-gray-300 rounded-md p-2 w-24'
							placeholder='Mín'
							value={localMin}
							onChange={e => setLocalMin(e.target.value)}
						/>
						<span>-</span>
						<input
							type='number'
							className='border border-gray-300 rounded-md p-2 w-24'
							placeholder='Máx'
							value={localMax}
							onChange={e => setLocalMax(e.target.value)}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
