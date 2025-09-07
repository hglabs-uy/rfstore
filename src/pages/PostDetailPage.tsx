
import { Link } from 'react-router-dom';
import { usePostById } from '../hooks/post/usePostById';
import { Loader } from '../components/shared/Loader';

// Pequeña función para formatear la fecha
const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

export const PostDetailPage = () => {
    const { post, isLoading, error } = usePostById();

    if (isLoading) {
        return <Loader />;
    }

    if (error || !post) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold mb-4">Post no encontrado</h2>
                <p className="text-gray-600 mb-6">El post que buscas no existe o ha sido eliminado.</p>
                <Link to="/blog" className="text-blue-600 hover:underline">
                    &larr; Volver al Blog
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4">
                <article className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* Imagen de Portada */}
                    {post.cover_image_url && (
                        <img
                            src={post.cover_image_url}
                            alt={`Imagen de ${post.title}`}
                            className="w-full h-96 object-cover"
                        />
                    )}

                    <div className="p-8 md:p-12">
                        {/* Título y Metadatos */}
                        <header className="mb-8">
                            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">{post.title}</h1>
                            <div className="text-gray-500 text-sm">
                                <span>Publicado por <strong>{post.author?.full_name || 'RF Store'}</strong></span>
                                <span className="mx-2">&middot;</span>
                                <span>{formatDate(post.created_at)}</span>
                            </div>
                        </header>

                        {/* Separador */}
                        <hr className="mb-8" />

                        {/* Contenido del Post */}
                        <div
                            className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
                            style={{ whiteSpace: 'pre-wrap' }} // Mantiene los saltos de línea del textarea
                        >
                            {post.content}
                        </div>

                         {/* Botón para volver */}
                        <div className="mt-12 text-center">
                            <Link to="/blog" className="text-blue-600 hover:underline">
                                &larr; Volver a todos los posts
                            </Link>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
};

export default PostDetailPage;