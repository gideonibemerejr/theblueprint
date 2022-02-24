import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { AdminHeader, CreateModal } from '../../components';

export default function AdminDashboard() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [currentModal, setCurrentModal] = useState(null);

  return (
    <div className='py-10'>
      <header>
        <div className='max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8'>
          <AdminHeader>
            <div className='mt-3 flex md:mt-0 md:absolute md:top-3 md:right-0'>
              <button
                onClick={
                  pathname === '/admin/events'
                    ? () => {
                        setCurrentModal('CREATE_EVENT');
                        setOpen(true);
                      }
                    : () => {
                        setCurrentModal('CREATE_SHEET');
                        setOpen(true);
                      }
                }
                type='button'
                className='inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue'
              >
                Create {pathname === '/admin/events' ? 'Event' : 'Spreadsheet'}
              </button>
            </div>
          </AdminHeader>
        </div>
      </header>
      <main>
        <div className='max-w-screen-2xl mx-auto sm:px-6 lg:px-8'>
          {/* Replace with your content */}
          <Outlet
            context={{
              setCurrentModal,
              setOpen,
            }}
          />
          {/* /End replace */}
          <CreateModal open={open} setOpen={setOpen} formType={currentModal} />
        </div>
      </main>
    </div>
  );
}
