import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/auth';

const navigation = [
  { name: 'Solutions', href: '#' },
  { name: 'Pricing', href: '#' },
  { name: 'Docs', href: '#' },
  { name: 'Company', href: '#' },
];
export default function Nav() {
  const auth = useAuth();
  const navigate = useNavigate();
  return (
    <header className='bg-blue'>
      <nav
        className='max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8'
        aria-label='Top'
      >
        <div className='w-full py-6 flex items-center justify-between border-b border-blue lg:border-none'>
          <div className='flex items-center'>
            <Link to='/'>
              <span className='text-2xl font-bold text-white'>
                The Blueprint
              </span>
            </Link>
            {auth?.isAdmin ? (
              <div className='hidden ml-10 space-x-8 lg:block'>
                {navigation.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className='font-medium text-white hover:text-gray-400'
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className='ml-10 space-x-4'>
            {auth.user ? (
              <button
                onClick={() => auth.logout(auth.user, navigate('/'))}
                className='inline-block bg-blue py-2 px-4 border border-white rounded-md text-base font-medium text-white hover:bg-opacity-75'
              >
                Log Out
              </button>
            ) : (
              <>
                <Link
                  to={'/login'}
                  className='inline-block bg-blue py-2 px-4 border border-white rounded-md text-base font-medium text-white hover:bg-opacity-75'
                >
                  Sign in
                </Link>
                <Link
                  to='/'
                  className='inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-blue-600 hover:bg-blue-50'
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
        <div className='py-4 flex flex-wrap justify-center space-x-6 lg:hidden'>
          {navigation.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className='text-base text-white font-medium text-white hover:text-gray-300'
            >
              {link.name}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
