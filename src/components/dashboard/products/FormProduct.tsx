
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ProductFormValues, productSchema } from '../../../lib/validators';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';
import { SectionFormProduct } from './SectionFormProduct';
import { InputForm } from './InputForm';
import { FeaturesInput } from './FeaturesInput';
import { useEffect } from 'react';
import { generateSlug } from '../../../helpers';
import { VariantsInput } from './VariantsInput';
import { UploaderImages } from './UploaderImages';
import { Editor } from './Editor';
import { useCreateProduct, useProduct, useUpdateProduct, useTaxonomies } from '../../../hooks';
import { Loader } from '../../shared/Loader';
import { JSONContent } from '@tiptap/react';
import { create } from 'zustand';

// --- Definición del Store (se mantiene igual) ---

const initialState: ProductFormValues = {
    name: '',
    slug: '',
    brandId: '',
    categoryId: '',
    features: [{ value: '' }],
    description: {} as JSONContent,
    images: [],
    variants: [{ price: 0, stock: 0, storage: '', color: '#000000', colorName: 'Negro' }],
};

interface ProductFormState {
    formData: ProductFormValues;
    setFormData: (data: Partial<ProductFormValues>) => void;
    resetForm: () => void;
}

const useProductFormStore = create<ProductFormState>((set) => ({
    formData: initialState,
    setFormData: (data) => set((state) => ({
        formData: { ...state.formData, ...data },
    })),
    resetForm: () => set({ formData: initialState }),
}));


interface Props {
    titleForm: string;
}

export const FormProduct = ({ titleForm }: Props) => {
    const { formData, setFormData, resetForm } = useProductFormStore();
    const { slug } = useParams<{ slug: string }>();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        control,
        reset, // <-- Importante: Obtenemos la función 'reset' de useForm
    } = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: formData,
    });
    
    // ================== INICIO DE LA CORRECCIÓN ==================
    // Este useEffect ahora usa el método de suscripción de watch.
    // Solo se ejecuta UNA VEZ para crear la suscripción, rompiendo el bucle infinito.
    useEffect(() => {
        const subscription = watch((value) => {
            setFormData(value as ProductFormValues);
        });
        return () => subscription.unsubscribe();
    }, [watch, setFormData]);
    // =================== FIN DE LA CORRECCIÓN ====================

    // Limpia el formulario solo si estamos en modo "creación" al desmontar
    useEffect(() => {
        return () => {
            if (!slug) {
                resetForm();
            }
        };
    }, [resetForm, slug]);

    const { product, isLoading } = useProduct(slug || '');
    const { mutate: createProduct, isPending } = useCreateProduct();
    const { mutate: updateProduct, isPending: isUpdatePending } = useUpdateProduct(product?.id || '');
    const { brands, categories } = useTaxonomies();
    const navigate = useNavigate();

    // Carga los datos del producto cuando se está en modo "edición"
    useEffect(() => {
        if (product && !isLoading) {
            const formDataFromProduct = {
                name: product.name,
                slug: product.slug,
                brandId: product.brand_id,
                categoryId: product.category_id,
                features: product.features.map((f: string) => ({ value: f })),
                description: product.description as JSONContent,
                images: product.images,
                variants: product.variants.map(v => ({
                    id: v.id,
                    stock: v.stock,
                    price: v.price,
                    storage: v.storage,
                    color: v.color,
                    colorName: v.color_name,
                })),
            };
            // Usamos reset() para actualizar todo el formulario de una vez
            reset(formDataFromProduct); 
            // También actualizamos el store para que todo esté sincronizado
            setFormData(formDataFromProduct);
        }
    }, [product, isLoading, reset, setFormData]);


    const onSubmit = handleSubmit(data => {
        const features = data.features.map(feature => feature.value);
        const submissionData = {
            name: data.name,
            slug: data.slug,
            variants: data.variants,
            images: data.images,
            description: data.description,
            features,
            brandId: data.brandId,
            categoryId: data.categoryId,
        };

        if (slug) {
            updateProduct(submissionData);
        } else {
            createProduct(submissionData, {
                onSuccess: () => {
                    resetForm();
                    navigate('/dashboard/products');
                }
            });
        }
    });

    const watchName = watch('name');

    useEffect(() => {
        if (!watchName || slug) return;
        const generatedSlug = generateSlug(watchName);
        setValue('slug', generatedSlug, { shouldValidate: true });
    }, [watchName, setValue, slug]);

    if (slug && isLoading) return <Loader />; // Mostramos Loader solo al editar

    // El JSX se mantiene exactamente igual que en la versión anterior
    return (
        <div className='flex flex-col gap-6 relative'>
            {/* ... Tu JSX completo aquí ... */}
            <div className='flex justify-between items-center'>
                <div className='flex items-center gap-3'>
                    <button
                        className='bg-white p-1.5 rounded-md shadow-sm border border-slate-200 transition-all group hover:scale-105'
                        onClick={() => navigate(-1)}
                    >
                        <IoIosArrowBack size={18} className='transition-all group-hover:scale-125' />
                    </button>
                    <h2 className='font-bold tracking-tight text-2xl capitalize'>
                        {titleForm}
                    </h2>
                </div>
            </div>

            <form
                className='grid grid-cols-1 lg:grid-cols-3 gap-8 auto-rows-max flex-1'
                onSubmit={onSubmit}
            >
                <SectionFormProduct titleSection='Detalles del Producto' className='lg:col-span-2 lg:row-span-2'>
                    <InputForm
                        type='text'
                        placeholder='Ejemplo: iPhone 13 Pro Max'
                        label='nombre'
                        name='name'
                        register={register}
                        errors={errors}
                        required
                    />
                    <FeaturesInput control={control} errors={errors} />
                </SectionFormProduct>

                <SectionFormProduct>
                    <InputForm
                        type='text'
                        label='Slug'
                        name='slug'
                        placeholder='iphone-13-pro-max'
                        register={register}
                        errors={errors}
                    />
                    <div className='flex flex-col gap-2'>
                        <label className='font-medium text-sm'>Marca</label>
                        <select className='border border-gray-300 rounded-md p-2' {...register('brandId')}>
                            <option value=''>Seleccionar marca</option>
                            {brands.map(brand => (
                                <option key={brand.id} value={brand.id}>{brand.name}</option>
                            ))}
                        </select>
                        {errors.brandId && <p className='text-red-500 text-xs'>{errors.brandId.message as string}</p>}
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='font-medium text-sm'>Categoría</label>
                        <select className='border border-gray-300 rounded-md p-2' {...register('categoryId')}>
                            <option value=''>Seleccionar categoría</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                        {errors.categoryId && <p className='text-red-500 text-xs'>{errors.categoryId.message as string}</p>}
                    </div>
                </SectionFormProduct>

                <SectionFormProduct titleSection='Variantes del Producto' className='lg:col-span-2 h-fit'>
                    <VariantsInput control={control} errors={errors} register={register} />
                </SectionFormProduct>

                <SectionFormProduct titleSection='Imágenes del producto'>
                    <UploaderImages errors={errors} setValue={setValue} watch={watch} />
                </SectionFormProduct>

                <SectionFormProduct titleSection='Descripción del producto' className='col-span-full'>
                    <Editor
                        setValue={setValue}
                        errors={errors}
                        initialContent={watch('description') || {} as JSONContent}
                    />
                </SectionFormProduct>

                <div className='flex gap-3 absolute top-0 right-0'>
                    <button className='btn-secondary-outline' type='button' onClick={() => navigate(-1)}>
                        Cancelar
                    </button>
                    <button className='btn-primary' type='submit' disabled={isPending || isUpdatePending}>
                        {isPending || isUpdatePending ? 'Guardando...' : 'Guardar Producto'}
                    </button>
                </div>
            </form>
        </div>
    );
};