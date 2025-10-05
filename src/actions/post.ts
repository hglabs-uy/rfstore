
import { supabase } from '../supabase/client';
export const getPublishedPosts = async (page: number = 1) => {
    const itemsPerPage = 10;
    const from = (page - 1) * itemsPerPage;
    const to = from + itemsPerPage - 1;

    const { data: postsData, error: postsError, count } = await supabase
        .from('posts')
        .select(`*, id,title,content,cover_image_url,created_at,author_id,slug, images:post_images(*)`, { count: 'exact' }) // Ya no intentamos traer el autor aquí
        .eq('status', 'published')
        .order('created_at', { ascending: false })
        .range(from, to);
 
    if (postsError) {
        console.error('Error al obtener los posts:', postsError.message);
        throw new Error('No se pudieron cargar los posts.');
    }

    if (!postsData || postsData.length === 0) {
        return { posts: [], count: 0 }; 
    }

    const authorIds = postsData.map(post => post.author_id);

    const { data: authorsData, error: authorsError } = await supabase
        .from('customers')
        .select('user_id, full_name')
        .in('user_id', authorIds);

    if (authorsError) {
        console.error('Error al obtener los autores:', authorsError.message);
        throw new Error('No se pudieron cargar los autores de los posts.');
    }

    const authorMap = new Map(authorsData.map(author => [author.user_id, author.full_name]));

    const postsWithAuthors = postsData.map(post => ({
        ...post,
        author: {
            full_name: authorMap.get(post.author_id) || 'Autor Desconocido'
        }
    }));

    return { posts: postsWithAuthors, count };
};

export const getPostBySlug = async (slug: string) => {
  const { data: post, error } = await supabase
    .from('posts')
    .select('id,title,content,cover_image_url,created_at,author_id,slug, images:post_images()')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error?.code === 'PGRST116') return null;
  if (error) throw new Error('No se pudo cargar el post.');

  const { data: author } = await supabase
    .from('customers')
    .select('full_name')
    .eq('user_id', post.author_id)
    .single();

  return { ...post, author: { full_name: author?.full_name ?? 'Autor Desconocido' } };
};

export const getPostById = async (postId: string) => {
    // 1. Obtener el post por su ID, solo si está publicado.
    const { data: post, error: postError } = await supabase
        .from('posts')
        .select(`*, images:post_images(*)`)
        .eq('id', postId)
        .eq('status', 'published')
        .single();

    if (postError) {
        // Si el error es porque no se encontró ninguna fila, es normal.
        // Devolvemos null para que la página pueda mostrar un mensaje de "No encontrado".
        if (postError.code === 'PGRST116') {
            return null;
        }
        console.error('Error al obtener el post:', postError.message);
        throw new Error('No se pudo cargar el post.');
    }

    if (!post) {
        return null;
    }

    // 2. Si encontramos el post, buscamos el nombre del autor.
    const { data: authorData, error: authorError } = await supabase
        .from('customers')
        .select('full_name')
        .eq('user_id', post.author_id)
        .single();

    if (authorError) {
        // No queremos que la página se rompa si no se encuentra el autor.
        // Simplemente registramos una advertencia y continuamos.
        console.warn(`Autor no encontrado para el post ID: ${post.id}`);
    }

    // 3. Unimos la información del post con la del autor y la devolvemos.
    const postWithAuthor = {
        ...post,
        author: {
            full_name: authorData?.full_name || 'Autor Desconocido'
        }
    };

    return postWithAuthor;
};

export interface PostInput {
    title: string;
    content: string;
    cover_image: File | null;
}

// ================================= //
//        FUNCIONES DE ADMIN         //
// ================================= //

/**
 * OBTIENE TODOS LOS POSTS (publicados y borradores) para el dashboard.
 */
export const getAllPostsForAdmin = async () => {
    const { data: posts, error } = await supabase
        .from('posts')
        .select('id, title, status, created_at') // Solo traemos lo necesario para la tabla
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error al obtener los posts para el admin:', error);
        throw new Error('No se pudieron cargar los posts.');
    }
    return posts;
};

/**
 * OBTIENE UN SOLO POST POR ID (sin importar su estado) para poder editarlo.
 */
export const getPostByIdForAdmin = async (postId: string) => {
    const { data: post, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', postId)
        .single();

    if (error) {
        console.error('Error al obtener el post para editar:', error);
        throw new Error('No se pudo encontrar el post.');
    }
    return post;
};

/**
 * CREA UN NUEVO POST.
 */
export const createPost = async (postInput: PostInput) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Acción no autorizada. Debes iniciar sesión.');

    const { data: newPost, error: postError } = await supabase
        .from('posts')
        .insert({
            title: postInput.title,
            content: postInput.content,
            author_id: user.id,
            status: 'published',
        })
        .select().single();

    if (postError) {
        console.error('Error creando el post:', postError);
        throw new Error(postError.message);
    }
    
    if (!postInput.cover_image) return newPost;

    const imageFile = postInput.cover_image;

    // --- LÍNEA AÑADIDA ---
    // Reemplazamos todos los espacios en el nombre del archivo por guiones.
    const sanitizedFileName = imageFile.name.replace(/\s/g, '-');
    // ----------------------

    const filePath = `${newPost.id}/${Date.now()}-${sanitizedFileName}`; // <-- Usamos el nombre limpio
    
    const { error: uploadError } = await supabase.storage.from('blog').upload(filePath, imageFile);

    if (uploadError) {
        await supabase.from('posts').delete().eq('id', newPost.id);
        throw new Error('Error al subir la imagen. Se canceló la creación del post.');
    }

    const { data: { publicUrl } } = supabase.storage.from('blog').getPublicUrl(filePath);
    const { data: updatedPost, error: updateError } = await supabase
        .from('posts')
        .update({ cover_image_url: publicUrl })
        .eq('id', newPost.id)
        .select().single();
    
    if (updateError) throw new Error('Error al actualizar la URL de la imagen.');
    
    return updatedPost;
};


/**
 * ACTUALIZA UN POST EXISTENTE.
 */


export const updatePost = async (postId: string, postInput: PostInput) => {
    // Primero, actualiza el título y el contenido
    const { data: updatedPost, error: updateError } = await supabase
        .from('posts')
        .update({
            title: postInput.title,
            content: postInput.content,
        })
        .eq('id', postId)
        .select()
        .single();

    if (updateError) {
        console.error('Error al actualizar el post:', updateError);
        throw new Error(updateError.message);
    }
    
    // Si se subió una nueva imagen de portada, la procesamos
    if (postInput.cover_image) {
        const imageFile = postInput.cover_image;

        // --- LÍNEA AÑADIDA ---
        // Limpiamos el nombre del archivo reemplazando espacios por guiones
        const sanitizedFileName = imageFile.name.replace(/\s/g, '-');
        // ----------------------

        const filePath = `${postId}/${Date.now()}-${sanitizedFileName}`; // <-- Usamos el nombre limpio

        const { error: uploadError } = await supabase.storage
            .from('blog')
            .upload(filePath, imageFile);

        if (uploadError) throw new Error('Error al subir la nueva imagen.');

        // Obtenemos la URL pública y actualizamos el post con ella
        const { data: { publicUrl } } = supabase.storage.from('blog').getPublicUrl(filePath);
        
        const { data: finalPost, error: finalUpdateError } = await supabase
            .from('posts')
            .update({ cover_image_url: publicUrl })
            .eq('id', postId)
            .select().single();
        
        if (finalUpdateError) throw new Error('Error al actualizar la URL de la imagen.');
        
        return finalPost;
    }

    // Si no se subió una nueva imagen, devolvemos el post con el texto ya actualizado
    return updatedPost;
};

/**
 * ELIMINA UN POST.
 */
export const deletePost = async (postId: string) => {
    const { data: post, error: getPostError } = await supabase
        .from('posts')
        .select('cover_image_url')
        .eq('id', postId)
        .single();
    
    if (getPostError) throw new Error('No se pudo encontrar el post para eliminar.');

    const { error: deleteError } = await supabase.from('posts').delete().eq('id', postId);
    if (deleteError) throw new Error(deleteError.message);

    if (post && post.cover_image_url) {
        const url = new URL(post.cover_image_url);
        const filePath = decodeURIComponent(url.pathname.split('/blog/')[1]);
        const { error: storageError } = await supabase.storage.from('blog').remove([filePath]);
        if (storageError) throw new Error('El post fue borrado, pero hubo un error al eliminar la imagen.');
    }
    return true;
};