import { ProductGrid } from '../components/home/ProductGrid';
import { prepareProducts } from '../helpers';
import { useHomeProducts } from '../hooks';

export const HomePage = () => {
	const { recentProducts, popularProducts, isLoading, isError } =
		useHomeProducts();

	const preparedRecentProducts = prepareProducts(recentProducts);
	const preparedPopularProducts = prepareProducts(popularProducts);

	return (
		<div className='space-y-10'>
			{!isLoading && !isError && (
				<ProductGrid
					title='Nuevos Productos'
					products={preparedRecentProducts}
				/>
			)}

			{!isLoading && !isError && (
				<ProductGrid
					title='Productos Destacados'
					products={preparedPopularProducts}
				/>
			)}
		</div>
	);
};
