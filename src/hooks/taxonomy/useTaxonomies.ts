import { useQueries } from '@tanstack/react-query';
import { getBrands, getCategories } from '../../actions';

export const useTaxonomies = () => {
	const results = useQueries({
		queries: [
			{ queryKey: ['brands'], queryFn: getBrands },
			{ queryKey: ['categories'], queryFn: getCategories },
		],
	});

	const [brandsResult, categoriesResult] = results;

	return {
		brands: brandsResult.data || [],
		categories: categoriesResult.data || [],
		isLoading: brandsResult.isLoading || categoriesResult.isLoading,
		isError: brandsResult.isError || categoriesResult.isError,
	};
}