import { FieldErrors, FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface Props<T extends FieldValues> {
	label: string;
	name: Path<T>;
	type?: 'text' | 'number';
	placeholder?: string;
	register: UseFormRegister<T>;
	errors: FieldErrors<T>;
	required?: boolean;
}

export const InputForm = <T extends FieldValues,>({
	label,
	name,
	type = 'text',
	placeholder,
	register,
	errors,
	required = false,
}: Props<T>) => {
	return (
		<div className='flex flex-col gap-2'>
			<label className='font-medium text-sm capitalize'>{label}</label>
			<input
				type={type}
				className='border border-gray-300 rounded-md p-2'
				placeholder={placeholder}
				{...register(name, { required })}
			/>
			{errors[name] && (
				<p className='text-red-500 text-xs'>
					{String(errors[name]?.message || 'Campo requerido')}
				</p>
			)}
		</div>
	);
};
