import { useQuery } from '@tanstack/react-query';
import { getFilteredProducts } from '../../actions';

export const useFilteredProducts = ({
	page,
	brands,
	categories,
	priceMin,
	priceMax,
}: {
	page: number;
	brands: string[];
	categories?: string[];
	priceMin?: number;
	priceMax?: number;
}) => {
	const { data, isLoading } = useQuery({
		queryKey: ['filteredProducts', page, brands, categories, priceMin, priceMax],
		queryFn: () => getFilteredProducts({ page, brands, categories, priceMin, priceMax }),
		retry: false,
	});

	return {
		data: data?.data,
		isLoading,
		totalProducts: data?.count ?? 0,
	};
};
