import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/auth';

export default function Nav() {
  const auth = useAuth();
  const navigate = useNavigate();
  return (
    <header className='bg-blue'>
      <nav className=' mx-auto px-4 sm:px-6 lg:px-8' aria-label='Top'>
        <div className='w-full py-6 flex items-center justify-between border-b border-blue lg:border-none'>
          <div className='flex items-center'>
            <Link to='/'>
              <span className='text-2xl font-bold text-white'>
                The Blueprint
              </span>
            </Link>
          </div>
          <div className='ml-10 space-x-4 md:w-1/2 md:flex md:justify-end'>
            {auth.user ? (
              <button
                onClick={() => auth.logout(auth.user, navigate('/'))}
                className='inline-block bg-blue py-2 px-4 border border-white rounded-md text-base font-medium text-white hover:bg-opacity-75'
              >
                Log Out
              </button>
            ) : (
              <div className='w-full md:flex md:justify-end'>
                <Link
                  to={'/login'}
                  className='inline-block bg-blue py-2 px-4 border border-white rounded-md text-base font-medium text-white hover:bg-opacity-75 md:mx-6'
                >
                  Log in
                </Link>
                <Link
                  to='/register'
                  className='hidden md:inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-blue-600 hover:bg-blue-50'
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
