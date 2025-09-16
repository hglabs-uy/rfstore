import { useState, useEffect } from 'react';
import { CardProduct } from '../components/products/CardProduct';
import { ContainerFilter } from '../components/products/ContainerFilter';
import { prepareProducts } from '../helpers';
import { useFilteredProducts } from '../hooks';
import { Pagination } from '../components/shared/Pagination';
import WhatsAppButton from '../components/shared/WhatsAppButton';


export const CellPhonesPage = () => {
    const [page, setPage] = useState(1);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [priceMin, setPriceMin] = useState<number | undefined>(undefined);
    const [priceMax, setPriceMax] = useState<number | undefined>(undefined);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc'); 

    useEffect(() => {
        setPage(1);
    }, [selectedBrands, selectedCategories, priceMin, priceMax, searchTerm, sortOrder]);

    const {
        data: products = [],
        isLoading,
        totalProducts,
    } = useFilteredProducts({
        page,
        brands: selectedBrands,
        categories: selectedCategories,
        priceMin,
        priceMax,
        searchTerm,
        sortOrder,
    });

    const preparedProducts = prepareProducts(products);


    return (
        <>
            <h1 className='mb-12 text-5xl font-semibold text-center'>
                Tienda
            </h1>

            <div className='flex justify-center mb-8'>
                <div className='relative w-full max-w-2xl'>
                    <input
                        type='text'
                        placeholder='Buscar productos por nombre, marca o categoría...'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className='w-full px-6 py-4 pl-12 text-lg border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent'
                    />
                    <div className='absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none'>
                        <svg className='w-6 h-6 text-gray-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
                        </svg>
                    </div>
                </div>
            </div>

            <div className='flex flex-col items-center gap-4 mb-6 sm:flex-row'>
                <div className='flex-1 text-center sm:text-left'>
                    {searchTerm ? (
                        <p className='text-lg text-gray-600'>
                            {totalProducts} producto{totalProducts !== 1 ? 's' : ''} encontrado{totalProducts !== 1 ? 's' : ''} para "{searchTerm}"
                        </p>
                    ) : (
                        <p className='text-lg text-gray-600'>
                            {totalProducts} producto{totalProducts !== 1 ? 's' : ''} disponible{totalProducts !== 1 ? 's' : ''}
                        </p>
                    )}
                </div>
                
                <div className='flex items-center gap-2'>
                    <button
                        onClick={() => setSortOrder('desc')}
                        className={`p-2 rounded-md transition-all duration-200 ${
                            sortOrder === 'desc' 
                                ? 'bg-black text-white shadow-md' 
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                        title='Precio mayor a menor'
                    >
                        <svg className='w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 14l-7 7m0 0l-7-7m7 7V3' />
                        </svg>
                    </button>
                    <button
                        onClick={() => setSortOrder('asc')}
                        className={`p-2 rounded-md transition-all duration-200 ${
                            sortOrder === 'asc' 
                                ? 'bg-black text-white shadow-md' 
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                        title='Precio menor a mayor'
                    >
                        <svg className='w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 10l7-7m0 0l7 7m-7-7v18' />
                        </svg>
                    </button>
                </div>
            </div>

            <div className='grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'>
                <ContainerFilter
                    setSelectedBrands={setSelectedBrands}
                    selectedBrands={selectedBrands}
                    selectedCategories={selectedCategories}
                    setSelectedCategories={setSelectedCategories}
                    priceMin={priceMin}
                    priceMax={priceMax}
                    setPriceMin={setPriceMin}
                    setPriceMax={setPriceMax}
                />

                {isLoading ? (
                    <div className='col-span-2 flex items-center justify-center h-[500px]'>
                        <p className='text-2xl'>Cargando...</p>
                    </div>
                ) : (
                    <div className='flex flex-col col-span-2 gap-12 lg:col-span-2 xl:col-span-4'>
                        <div className='grid grid-cols-2 gap-3 gap-y-10 xl:grid-cols-4'>
                            {preparedProducts.map(product => (
                                <CardProduct
                                    key={product.id}
                                    name={product.name}
                                    price={product.price}
                                    colors={product.colors}
                                    img={product.images[0]}
                                    slug={product.slug}
                                    variants={product.variants}
                                />
                            ))}
                        </div>

                        <Pagination
                            totalItems={totalProducts}
                            page={page}
                            setPage={setPage}
                        />
                    </div>
                )}
            </div>

            <WhatsAppButton />
        </>
    );
};