
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getPostById } from '../../actions/post';

export const usePostById = () => {
    const { postId } = useParams<{ postId: string }>();

    const { data: post, isLoading, error } = useQuery({
        // La queryKey incluye el postId para que sea única por cada post
        queryKey: ['post', postId], 
        queryFn: () => {
            if (!postId) return null;
            return getPostById(postId);
        },
        enabled: !!postId, // La query solo se ejecutará si existe un postId
    });

    return { post, isLoading, error };
};