import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../utils/auth';

export default function UserHeader({ children }) {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const tabs = [
    // {
    //   name: 'Profile',
    //   to: 'profile',
    //   current: pathname === '/profile',
    // },
    {
      name: 'The Bluprint',
      to: 'blueprint',
      current: pathname === '/profile/blueprint',
    },
  ];
  return (
    <div className='relative border-b border-gray-200 sm:pb-0'>
      <div className='md:flex md:items-center md:justify-between'>
        <h3 className='text-3xl leading-6 font-medium text-white mb-4'>
          Welcome back, {user?.firstName}!
        </h3>
        {children}
      </div>
      <div className='mt-4'>
        <div className='block'>
          <nav className='-mb-px flex space-x-8'>
            {tabs.map((tab) => (
              <Link
                key={tab.name}
                to={tab.to}
                className={`${
                  tab.current
                    ? 'border-white text-white'
                    : 'border-transparent text-gray-300 hover:text-gray-500 hover:border-white'
                }
                  'whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm'
                `}
                aria-current={tab.current ? 'page' : undefined}
              >
                {tab.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
