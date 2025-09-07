import { usePosts } from '../hooks/post/usePost'; // Asegúrate que la ruta sea correcta
import PostCard from '../components/post/PostCard'; // Asegúrate que la ruta sea correcta
import { Loader } from '../components/shared/Loader';

const BlogPage = () => {
    const { posts, loading, error } = usePosts();

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <div className="container mx-auto text-center py-10 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 py-8">
                <header className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight lg:text-5xl">Desde Nuestro Blog</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
                        Las últimas noticias, artículos y recursos de nuestro equipo.
                    </p>
                </header>
                
                {/* --- CAMBIO PRINCIPAL AQUÍ --- */}
                {/* Quitamos el grid y usamos un div centrado con un ancho máximo */}
                <div className="max-w-3xl mx-auto">
                    {/* El 'space-y-8' añade un espacio vertical entre cada post */}
                    <div className="space-y-8">
                        {posts.map(post => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>
                </div>
                {/* ----------------------------- */}

                {/* Aquí irá la paginación en el futuro */}
            </div>
        </div>
    );
};

export default BlogPage;