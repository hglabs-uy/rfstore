import {
	FaBoxOpen,
	FaCartShopping,
	FaInstagram,
	FaLinkedin,
	FaTiktok,
	FaXTwitter,
} from 'react-icons/fa6';

export const navbarLinks = [
	{
		id: 1,
		title: 'Inicio',
		href: '/',
	},
	{
		id: 2,
		title: 'Tienda',
		href: '/celulares',
	},
	{
		id: 3,
		title: 'Contacto',
		href: '/nosotros',
	},
];

export const socialLinks = [
	{
		id: 1,
		title: 'Linkedin',
		href: 'https://www.linkedin.com/company/rfstore/',
		icon: <FaLinkedin />,
	},
	{
		id: 2,
		title: 'Twitter',
		href: 'https://www.twitter.com',
		icon: <FaXTwitter />,
	},
	{
		id: 3,
		title: 'Instagram',
		href: 'https://www.instagram.com/rfstore.uy/',
		icon: <FaInstagram />,
	},
	{
		id: 4,
		title: 'Tiktok',
		href: 'https://www.tiktok.com',
		icon: <FaTiktok />,
	},
];

export const dashboardLinks = [
	{
		id: 1,
		title: 'Productos',
		href: '/dashboard/productos',
		icon: <FaBoxOpen size={25} />,
	},
	{
		id: 2,
		title: 'Ordenes',
		href: '/dashboard/ordenes',
		icon: <FaCartShopping size={25} />,
	},
];
