// Logos más grandes (alturas ampliadas)
const brands = [
  { image: "/img/brands/logitech.png", alt: "Logitech", size: "h-24 md:h-28" },
  { image: "/img/brands/samsung.png", alt: "Samsung", size: "h-24 md:h-28" },
  { image: "/img/brands/brother.png", alt: "Brother", size: "h-28 md:h-32" }, // wordmark fino => más alto
  { image: "/img/brands/intel.png", alt: "Intel", size: "h-28 md:h-32" }, // wordmark fino => más alto
  { image: "/img/brands/mikrotik.png", alt: "MikroTik", size: "h-24 md:h-28" },
  { image: "/img/brands/hp.png", alt: "HP", size: "h-24 md:h-28" },
  { image: "/img/brands/asus.svg", alt: "ASUS", size: "h-24 md:h-28" },
  { image: "/img/brands/dell.svg", alt: "Dell", size: "h-24 md:h-28" },
  { image: "/img/brands/hikvision.svg", alt: "Hikvision", size: "h-24 md:h-28",},
  { image: "/img/brands/microsoft.svg", alt: "Microsoft", size: "h-24 md:h-28",},
  { image: "/img/brands/lenovo.svg", alt: "Lenovo", size: "h-24 md:h-28" },
  { image: "/img/brands/tp-link.svg", alt: "TP-Link", size: "h-24 md:h-28" },
  { image: "/img/brands/ubiquiti-seeklogo.png", alt: "Ubiquiti", size: "h-24 md:h-28" },
];

export const Brands = () => {
  return (
    <section className="w-full bg-white">
      <div className="container px-4 mx-auto">
        <div className="mx-auto max-w-7xl">
          <ul className="flex flex-wrap justify-center gap-x-12 gap-y-12 mt-14 mb-52">
            {brands.map((b) => (
              <li
                key={b.alt}
                className="flex items-center justify-center basis-1/3 md:basis-1/6"
              >
                <img
                  src={b.image}
                  alt={b.alt}
                  loading="lazy"
                  className={`${b.size} w-auto object-contain opacity-90 transition duration-200 hover:opacity-100`}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
