import { useQuery } from '@tanstack/react-query';
import { getSession } from '../../actions';

export const useUser = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['user'],
		queryFn: getSession,
		retry: false,
		refetchOnWindowFocus: true,
	});

	// Debug: verificar los datos del usuario
	console.log('useUser hook - data:', data);
	console.log('useUser hook - session:', data?.session);
	console.log('useUser hook - user email:', data?.session?.user?.email);

	return {
		session: data?.session,
		isLoading,
	};
};
