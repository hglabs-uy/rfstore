import { ProductGrid } from '../components/home/ProductGrid';
import { prepareProducts } from '../helpers';
import { useHomeProducts } from '../hooks';
import { Brands } from '../components/home/Brands';
import WhatsAppButton from '../components/shared/WhatsAppButton'

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

			<WhatsAppButton />

			<Brands />
		</div>
	);
};
