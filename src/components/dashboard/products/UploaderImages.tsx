import { FieldErrors, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { ProductFormValues } from '../../../lib/validators';
import { IoIosCloseCircleOutline } from 'react-icons/io';

interface Props {
    setValue: UseFormSetValue<ProductFormValues>;
    watch: UseFormWatch<ProductFormValues>;
    errors: FieldErrors<ProductFormValues>;
}

export const UploaderImages = ({ setValue, errors, watch }: Props) => {
    const formImages = watch('images') || [];

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            const existingFiles = formImages.filter(img => img instanceof File || typeof img === 'string');
            setValue('images', [...existingFiles, ...newFiles], { shouldValidate: true });
        }
    };

    const handleRemoveImage = (indexToRemove: number) => {
        const updatedImages = formImages.filter((_, index) => index !== indexToRemove);
        setValue('images', updatedImages, { shouldValidate: true });
    };

    const getPreviewUrl = (image: File | string) => {
        if (typeof image === 'string') {
            return image;
        }
        return URL.createObjectURL(image);
    };

    return (
        <>
            <input
                type='file'
                accept='image/*'
                multiple
                onChange={handleImageChange}
                className='block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200'
            />

            <div className='grid grid-cols-4 lg:grid-cols-2 gap-4 mt-4'>
                {formImages.map((image, index) => (
                    <div key={index}>
                        <div className='border border-gray-200 w-full h-20 rounded-md p-1 relative lg:h-28'>
                            <img
                                src={getPreviewUrl(image)}
                                alt={`Preview ${index}`}
                                className='rounded-md w-full h-full object-contain'
                            />
                            <button
                                type='button'
                                onClick={() => handleRemoveImage(index)}
                                className='flex justify-end absolute -top-3 -right-4 hover:scale-110 transition-all z-10'
                            >
                                <IoIosCloseCircleOutline size={22} className='text-red-500 bg-white rounded-full' />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {errors.images && (
                <p className='text-red-500 text-xs mt-1'>
                    {errors.images.message as string}
                </p>
            )}
        </>
    );
};