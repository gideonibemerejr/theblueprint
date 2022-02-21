import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CreateEventForm } from '..';

export default function CreateModal({ open, setOpen, formType }) {
  const renderForm = () => {
    switch (formType) {
      case 'CREATE_EVENT':
        return <CreateEventForm setOpen={setOpen} />;

        break;

      default:
        break;
    }
  };
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as='div'
        className='fixed inset-0 overflow-hidden'
        onClose={setOpen}
      >
        <div className='absolute inset-0 overflow-hidden'>
          <Dialog.Overlay className='absolute inset-0' />

          <div className='fixed inset-y-0 pl-16 max-w-full right-0 flex'>
            <Transition.Child
              as={Fragment}
              enter='transform transition ease-in-out duration-500 sm:duration-700'
              enterFrom='translate-x-full'
              enterTo='translate-x-0'
              leave='transform transition ease-in-out duration-500 sm:duration-700'
              leaveFrom='translate-x-0'
              leaveTo='translate-x-full'
            >
              <div className='w-screen max-w-lg'>{renderForm(formType)}</div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
