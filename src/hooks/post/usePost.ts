import { useState, useEffect } from 'react';
import { getPublishedPosts } from '../../actions/post';

// Definimos el tipo de dato para un Post, para que TypeScript nos ayude
// Puedes mover esto a un archivo de interfaces si lo prefieres
type Post = {
    id: string;
    created_at: string;
    title: string;
    content: string;
    cover_image_url: string | null;
    author: {                 // <-- El objeto author que añadimos
        full_name: string;
    } | null;
    images: any[]; 
};

export const usePosts = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [totalPosts, setTotalPosts] = useState(0);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // Llamamos a la action que creamos en 'posts.ts'
                const response = await getPublishedPosts(page);
                
                if (response.posts) {
                    setPosts(response.posts as Post[]);
                }
                if (response.count !== null) {
                    setTotalPosts(response.count);
                }

            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Ocurrió un error inesperado.';
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [page]); // Este efecto se ejecuta de nuevo si 'page' cambia

    // El hook devuelve todo lo que el componente necesita
    return {
        posts,
        loading,
        error,
        page,
        setPage,
        totalPosts,
    };
};