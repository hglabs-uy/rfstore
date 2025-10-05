import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getPostBySlug } from '../../actions/post';

export const usePostBySlug = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ['post', slug],
    queryFn: () => (slug ? getPostBySlug(slug) : null),
    enabled: !!slug,
  });

  return { post, isLoading, error };
};