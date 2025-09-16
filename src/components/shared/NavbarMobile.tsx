import { IoMdClose } from 'react-icons/io';
import { useGlobalStore } from '../../store/global.store';
import { Link, NavLink } from 'react-router-dom';
import { navbarLinks } from '../../constants/links';

export const NavbarMobile = () => {
  const setActiveNavMobile = useGlobalStore(s => s.setActiveNavMobile);

  return (
    <div className='fixed z-50 flex items-start justify-center w-full h-screen pt-12 text-black bg-white shadow-lg animate-slide-in-left'>
      <button
        className='absolute top-5 right-5'
        onClick={() => setActiveNavMobile(false)}
        aria-label='Cerrar menú'
      >
        <IoMdClose size={30} className='text-black' />
      </button>

      <div className='flex flex-col items-center gap-20'>
        <Link to='/' className='block' onClick={() => setActiveNavMobile(false)} aria-label='Ir al inicio'>
          <img
            src='/img/img-docs/logoblancorf.jpg'
            alt='Logo'
            className='object-contain w-24 h-24 mx-auto rounded-full md:w-28 md:h-28'
          />
        </Link>

        <nav className='flex flex-col items-center gap-5'>
          {navbarLinks.map(item => (
            <NavLink
              to={item.href}
              key={item.id}
              className={({ isActive }) =>
                `${isActive ? 'text-cyan-600 underline' : ''} transition-all duration-300 font-semibold text-xl hover:text-cyan-600 hover:underline`
              }
              onClick={() => setActiveNavMobile(false)}
            >
              {item.title}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

