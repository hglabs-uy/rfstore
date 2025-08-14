import { supabase } from '../supabase/client';

export interface Brand {
	id: string;
	name: string;
}

export interface Category {
	id: string;
	name: string;
}

export const getBrands = async (): Promise<Brand[]> => {
	const { data, error } = await supabase.from('brands').select('*').order('name');
	if (error) throw new Error(error.message);
	return data as Brand[];
};

export const getCategories = async (): Promise<Category[]> => {
	const { data, error } = await supabase.from('categories').select('*').order('name');
	if (error) throw new Error(error.message);
	return data as Category[];
};

export const createBrand = async (name: string): Promise<Brand> => {
	const { data, error } = await supabase
		.from('brands')
		.insert({ name })
		.select()
		.single();
	if (error) throw new Error(error.message);
	return data as Brand;
};

export const createCategory = async (name: string): Promise<Category> => {
	const { data, error } = await supabase
		.from('categories')
		.insert({ name })
		.select()
		.single();
	if (error) throw new Error(error.message);
	return data as Category;
};