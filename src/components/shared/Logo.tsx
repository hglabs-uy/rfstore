import { Link } from 'react-router-dom';

interface Props {
	isDashboard?: boolean;
}

export const Logo = ({ isDashboard }: Props) => {
	return (
		<Link
			to='/'
			className={`text-2xl font-bold tracking-tighter transition-all ${
				isDashboard && 'hover:scale-105'
			}`}
		>
			<img src="/img/img-docs/logorfstore.jpeg" alt="" className="h-10 w-20 object-cover rounded-full" />

		</Link>
	);
};
