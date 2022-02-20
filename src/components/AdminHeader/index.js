import { useAuth } from '../../utils/auth';

export default function AdminHeader() {
  const { user } = useAuth();
  return (
    <div className='pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between'>
      <h3 className='text-3xl leading-6 font-medium text-white'>
        Welcome back, {user?.firstName}!
      </h3>
      <div className='mt-3 flex sm:mt-0 sm:ml-4'>
        {/* <button
          type='button'
          className='inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue'
        >
          Share
        </button> */}
        <button
          type='button'
          className='ml-3 inline-flex items-center px-4 py-2 border border-white rounded-md shadow-sm text-sm font-medium text-white hover:text-blue bg-blue hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue'
        >
          Add a new event
        </button>
      </div>
    </div>
  );
}
