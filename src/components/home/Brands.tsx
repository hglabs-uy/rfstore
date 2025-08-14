const brands = [
	{ image: "/img/brands/logitech.png", alt: "Logitech", size: "w-20" },
	{ image: "/img/brands/samsung.png", alt: "Samsung", size: "w-20" },
  { image: "/img/brands/brother.png", alt: "Apple", size: "w-25" },
  { image: "/img/brands/intel.png", alt: "Xiaomi", size: "w-24" },
  { image: "/img/brands/mikrotik.png", alt: "Mikrotik", size: "w-24" },
  { image: "/img/brands/hp.png", alt: "Samsung", size: "w-20" },
];

export const Brands = () => {
  return (
    <div className="grid items-center grid-cols-3 gap-6 mt-8 md:grid-cols-6">
      {brands.map((brand, index) => (
        <div key={index} className="flex justify-center">
          <img
            src={brand.image}
            alt={brand.alt}
            className={`${brand.size} h-auto object-contain opacity-80 hover:opacity-100 transition duration-200`}
          />
        </div>
      ))}
    </div>
  );
};
