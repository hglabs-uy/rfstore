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


			<p className='flex text-4xl lg:hidden'>
				<span className='-skew-x-6'>R</span>
				<span className='text-cyan-600 skew-x-6'>F</span>
			</p>
		</Link>
	);
};
