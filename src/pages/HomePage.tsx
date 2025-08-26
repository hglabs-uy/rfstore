import { ProductGrid } from '../components/home/ProductGrid';
import { prepareProducts } from '../helpers';
import { useHomeProducts } from '../hooks';
import { Brands } from '../components/home/Brands';
import WhatsAppButton from '../components/shared/WhatsAppButton'
import { TestComponent } from '../components/shared/TestComponent';

export const HomePage = () => {
	const { popularProducts, isLoading, isError } =
		useHomeProducts();

	const preparedPopularProducts = prepareProducts(popularProducts);

	return (
		<div className='space-y-10'>

			{/* Componente de prueba temporal */}
			<TestComponent />

			{!isLoading && !isError && (
				<ProductGrid
					title='Productos Destacados' 
					products={preparedPopularProducts}
				/>
			)}

			<Brands />
			<WhatsAppButton />

		
		</div>
	);
};
