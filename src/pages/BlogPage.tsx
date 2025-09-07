
import { usePosts } from '../hooks/post/usePost';
import PostCard from '../components/post/PostCard'; // Lo crearemos en el siguiente paso

const BlogPage = () => {
    // Usamos el hook que ya creamos para obtener los datos
    const { posts, loading, error } = usePosts();

    if (loading) {
        return <div className="container mx-auto text-center py-10">Cargando posts...</div>;
    }

    if (error) {
        return <div className="container mx-auto text-center py-10 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8 text-center">Nuestro Blog</h1>
            
            {/* Grid para mostrar los posts */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map(post => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>

            {/* Aquí irá la paginación en el futuro */}
        </div>
    );
};

export default BlogPage;