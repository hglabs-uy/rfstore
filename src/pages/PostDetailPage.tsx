
import { Link } from 'react-router-dom';
import { usePostById } from '../hooks/post/usePostById';
import { Loader } from '../components/shared/Loader';

const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });

export const PostDetailPage = () => {
    const { post, isLoading, error } = usePostById();

    if (isLoading) return <Loader />;

    if (error || !post) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold mb-4">Post no encontrado</h2>
                <Link to="/blog" className="text-blue-600 hover:underline">&larr; Volver al Blog</Link>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4">
                <article className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* --- CONTENEDOR DE IMAGEN MEJORADO --- */}
                    {post.cover_image_url && (
                        <div className="w-full">
                             <img
                                src={post.cover_image_url}
                                alt={`Imagen de ${post.title}`}
                                className="w-full h-auto object-contain" // <-- Se ajusta al ancho y la altura es automática
                            />
                        </div>
                    )}

                    <div className="p-8 md:p-12">
                        <header className="mb-8">
                            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">{post.title}</h1>
                            <div className="text-gray-500 text-sm">
                                <span>Publicado por <strong>{post.author?.full_name || 'RF Store'}</strong></span>
                                <span className="mx-2">&middot;</span>
                                <span>{formatDate(post.created_at)}</span>
                            </div>
                        </header>

                        <hr className="mb-8" />

                        <div
                            className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
                            style={{ whiteSpace: 'pre-wrap' }}
                        >
                            {post.content}
                        </div>

                        <div className="mt-12 text-center">
                            <Link to="/blog" className="text-blue-600 hover:underline">&larr; Volver a todos los posts</Link>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
};

export default PostDetailPage;