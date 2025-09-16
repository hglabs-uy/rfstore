import { useQueries, type UseQueryResult } from '@tanstack/react-query';
import { getRandomProducts, getRecentProducts } from '../../actions';
import type { Product } from '../../interfaces';

export const useHomeProducts = () => {
  const results = useQueries({
    queries: [
      { queryKey: ['recentProducts'],  queryFn: getRecentProducts },
      { queryKey: ['popularProducts'], queryFn: getRandomProducts },
    ] as const,
  }) as readonly [UseQueryResult<Product[]>, UseQueryResult<Product[]>];

  const [recentProductsResult, popularProductsResult] = results;

  const isLoading = recentProductsResult.isLoading || popularProductsResult.isLoading;
  const isError   = recentProductsResult.isError   || popularProductsResult.isError;

  return {
    recentProducts:  recentProductsResult.data ?? [],
    popularProducts: popularProductsResult.data ?? [],
    isLoading,
    isError,
  };
};
