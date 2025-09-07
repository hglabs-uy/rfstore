import { Link } from 'react-router-dom';

// Asumimos que tienes una definición del tipo 'Post' en algún lugar,
// si no, podemos usar la que está en el hook usePosts por ahora.
type Post = {
    id: string;
    title: string;
    cover_image_url: string | null;
    author: { full_name: string; } | null;
};

interface PostCardProps {
    post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
    // Un placeholder por si un post no tiene imagen de portada
    const placeholderImage = 'https://via.placeholder.com/400x250.png?text=Blog+Post';

    return (
        <Link to={`/blog/${post.id}`} className="block group border rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="overflow-hidden">
                <img 
                    src={post.cover_image_url || placeholderImage} 
                    alt={`Imagen de portada para ${post.title}`}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>
            <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors duration-300">{post.title}</h2>
                <p className="text-gray-600 text-sm">
                    Por {post.author?.full_name || 'Autor Desconocido'}
                </p>
            </div>
        </Link>
    );
};

export default PostCard;