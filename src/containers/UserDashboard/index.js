import { Outlet } from 'react-router-dom';

import { UserHeader } from '../../components';

export default function UserDashboard() {
  return (
    <div className='py-10'>
      <header>
        <div className=' mx-auto px-4 sm:px-6 lg:px-8'>
          <UserHeader />
        </div>
      </header>
      <main>
        <div className=' mx-auto sm:px-6 lg:px-8'>
          {/* Replace with your content */}
          <Outlet />
        </div>
      </main>
    </div>
  );
}
