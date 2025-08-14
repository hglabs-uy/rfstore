import { Link } from 'react-router-dom';
import { TableProduct } from '../../components/dashboard/products/TableProduct';

export const DashboardProductsPage = () => {
	return (
		<div className='h-full flex flex-col gap-2'>
			<div className='flex justify-between'>
				<Link
					to='/dashboard/productos/new'
					className='bg-black text-white flex items-center self-end py-[6px] px-2 rounded-md text-sm gap-1 font-semibold'
				>
					Agregar Producto
				</Link>
				<div className='flex gap-2'>
					<Link
						to='/dashboard/taxonomias'
						className='bg-stone-800 text-white flex items-center self-end py-[6px] px-2 rounded-md text-sm gap-1 font-semibold'
					>
						Categorías y Marcas
					</Link>
				</div>
			</div>

			<TableProduct />
		</div>
	);
};
