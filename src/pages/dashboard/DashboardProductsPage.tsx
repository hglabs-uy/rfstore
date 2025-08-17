import { Link } from 'react-router-dom';
import { TableProduct } from '../../components/dashboard/products/TableProduct';

export const DashboardProductsPage = () => {
	return (
		<div className='flex flex-col h-full gap-2'>
			<div className='flex justify-between'>
				<div className='flex gap-2'>
					<Link
						to='/dashboard/taxonomias'
						className='bg-stone-800 text-white flex items-center self-end py-[6px] px-2 rounded-md text-sm gap-1 font-semibold'
					>
						Categorías y Marcas
					</Link>
				</div>
				<Link
					to='/dashboard/productos/new'
					className='bg-black text-white flex items-center self-end py-[6px] px-2 rounded-md text-sm gap-1 font-semibold'
				>
					Agregar Producto
				</Link>
				
			</div>

			<TableProduct />
		</div>
	);
};
