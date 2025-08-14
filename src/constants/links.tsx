import {
	FaBoxOpen,
	FaCartShopping,
	FaInstagram,
	FaLinkedin,
	FaFacebookF,
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
		href: '/tienda',
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
		title: 'Facebook',
		href: 'https://www.twitter.com',
		icon: <FaFacebookF />,
	},
	{
		id: 3,
		title: 'Instagram',
		href: 'https://www.instagram.com/rfstore.uy/',
		icon: <FaInstagram />,
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
	{
		id: 3,
		title: 'Taxonomías',
		href: '/dashboard/taxonomias',
		icon: <FaBoxOpen size={25} />,
	},
];
