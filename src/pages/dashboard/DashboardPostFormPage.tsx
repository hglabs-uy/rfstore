import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost, getPostByIdForAdmin, updatePost, PostInput } from '../../actions/post';
import { Toaster, toast } from 'react-hot-toast';
import { Loader } from '../../components/shared/Loader';

export const DashboardPostFormPage = () => {
    const { postId } = useParams<{ postId: string }>();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const isEditMode = Boolean(postId);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [coverImage, setCoverImage] = useState<File | null>(null);

    // Si estamos en modo edición, usamos useQuery para traer los datos del post
    const { data: postToEdit, isLoading: isLoadingPost } = useQuery({
        queryKey: ['adminPost', postId],
        queryFn: () => getPostByIdForAdmin(postId!),
        enabled: isEditMode, // Solo ejecuta esta query si hay un postId
    });

    // Rellenamos el formulario cuando los datos del post a editar se cargan
    useEffect(() => {
        if (postToEdit) {
            setTitle(postToEdit.title);
            setContent(postToEdit.content);
        }
    }, [postToEdit]);

    // Mutación para crear o actualizar un post
    const postMutation = useMutation({
        mutationFn: (newPost: PostInput) => {
            return isEditMode ? updatePost(postId!, newPost) : createPost(newPost);
        },
        onSuccess: () => {
            toast.success(`Post ${isEditMode ? 'actualizado' : 'creado'} con éxito`);
            queryClient.invalidateQueries({ queryKey: ['adminPosts'] }); // Actualiza la lista
            navigate('/dashboard/blog'); // Redirige a la lista
        },
        onError: (err) => {
            const errorMessage = err instanceof Error ? err.message : 'Ocurrió un error';
            toast.error(`Error: ${errorMessage}`);
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const postInput: PostInput = { title, content, cover_image: coverImage };
        postMutation.mutate(postInput);
    };

    if (isLoadingPost) return <Loader />;

    return (
        <div>
            <Toaster position="top-right" />
            <h1 className="text-2xl font-bold mb-6">{isEditMode ? 'Editar Post' : 'Crear Nuevo Post'}</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título</label>
                    <input
                        type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">Contenido</label>
                    <textarea
                        id="content" value={content} onChange={(e) => setContent(e.target.value)}
                        rows={10}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700">Imagen de Portada</label>
                    <input
                        type="file" id="coverImage" onChange={(e) => setCoverImage(e.target.files ? e.target.files[0] : null)}
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
                    />
                </div>
                <div className="flex justify-end pt-4">
                    <button type="button" onClick={() => navigate('/dashboard/blog')}
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md mr-2 hover:bg-gray-300">
                        Cancelar
                    </button>
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        disabled={postMutation.isPending}>
                        {postMutation.isPending ? 'Guardando...' : 'Guardar Post'}
                    </button>
                </div>
            </form>
        </div>
    );
};