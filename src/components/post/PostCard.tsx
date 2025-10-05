
import { Link } from 'react-router-dom';

// (El tipo Post y la función formatDate se mantienen igual)
type Post = { id: string; title: string; content: string; cover_image_url: string | null; created_at: string; author: { full_name: string; } | null; slug: string; };
const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });

const PostCard = ({ post }: { post: Post }) => {
    const excerpt = post.content.split(' ').slice(0, 20).join(' ') + '...';

    return (
        <article className="bg-white border border-gray-200 rounded-xl shadow-sm transition-all duration-300 hover:shadow-lg">
            <Link to={`/blog/${post.slug}`} className="block">
                <div className="p-6">
                    <header className="flex items-center mb-4">
                        <div className="flex-shrink-0">
                            {/* --- CAMBIO 1: AVATAR FIJO --- */}
                            {/* Reemplazamos el SVG por una imagen real de tu logo */}
                            <img
                                className="h-10 w-10 rounded-full object-cover"
                                src="/img/img-docs/logoblancorf.jpg" // <-- La imagen debe estar en tu carpeta /public
                                alt="Avatar del autor"
                            />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-semibold text-gray-900">
                                {post.author?.full_name || 'RF Store'}
                            </p>
                            <p className="text-xs text-gray-500">
                                {formatDate(post.created_at)}
                            </p>
                        </div>
                    </header>

                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-gray-900">{post.title}</h2>
                        <p className="text-gray-600 text-base leading-relaxed">{excerpt}</p>
                    </div>
                </div>

                {/* --- CAMBIO 2: CONTENEDOR DE IMAGEN MEJORADO --- */}
                {post.cover_image_url && (
                    <div className="px-6 pb-6">
                        <div className="h-56 w-full overflow-hidden rounded-lg"> {/* <-- Contenedor con altura fija y bordes redondeados */}
                            <img 
                                src={post.cover_image_url} 
                                alt={`Imagen para ${post.title}`}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" // <-- La imagen cubre el contenedor
                            />
                        </div>
                    </div>
                )}
            </Link>
        </article>
    );
};

export default PostCard;