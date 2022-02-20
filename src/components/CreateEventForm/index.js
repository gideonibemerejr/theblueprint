import { useForm } from 'react-hook-form';
import { Dialog } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { LinkIcon, QuestionMarkCircleIcon } from '@heroicons/react/solid';

const CreateEventForm = ({ setOpen }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  return (
    <form className='h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl'>
      <div className='flex-1 h-0 overflow-y-auto'>
        <div className='py-6 px-4 bg-indigo-700 sm:px-6 bg-gray-200'>
          <div className='flex items-center justify-between'>
            <Dialog.Title className='text-lg font-medium text-blue'>
              New Event
            </Dialog.Title>
            <div className='ml-3 h-7 flex items-center'>
              <button
                type='button'
                className='bg-indigo-700 rounded-md text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white'
                onClick={() => setOpen(false)}
              >
                <span className='sr-only'>Close panel</span>
                <XIcon className='h-6 w-6' aria-hidden='true' />
              </button>
            </div>
          </div>
          <div className='mt-1'>
            <p className='text-sm text-indigo-300'>
              Get started by filling in the information below to create a new
              event.
            </p>
          </div>
        </div>
        <div className='flex-1 flex flex-col justify-between'>
          <div className='px-4 divide-y divide-gray-200 sm:px-6'>
            <div className='space-y-6 pt-6 pb-5'>
              <div>
                <label
                  htmlFor='name'
                  className='block text-sm font-medium text-gray-900'
                >
                  Event name
                </label>
                <div className='mt-1'>
                  <input
                    type='text'
                    {...register('name', { required: true })}
                    required
                    className='block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md'
                  />
                </div>
              </div>
              <div className='space-y-6 pt-6 pb-5'>
                <div>
                  <label
                    htmlFor=''
                    className='block text-sm font-medium text-gray-900'
                  >
                    Venue
                  </label>
                  <div className='mt-1'>
                    <input
                      type='text'
                      {...register('venue', { required: true })}
                      required
                      className='block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md'
                    />
                  </div>
                </div>
              </div>
              <div className='space-y-6 pt-6 pb-5'>
                <div>
                  <label
                    htmlFor=''
                    className='block text-sm font-medium text-gray-900'
                  ></label>
                  <div className='mt-1'>
                    <input
                      type='text'
                      required
                      className='block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md'
                    />
                  </div>
                </div>
              </div>
                {/* 
                    freeDrinks
                    freeFood
                    staffPick
                    isAllWeek


                    startDate
                    endDate
                    startTime
                    endTime

                    notes
                    link

                    rsvpStatus

                
                    
                
                */}
              <div>
                <label
                  htmlFor='notes'
                  className='block text-sm font-medium text-gray-900'
                >
                  Notes
                </label>
                <div className='mt-1'>
                  <textarea
                    id='notes'
                    name='notes'
                    rows={4}
                    className='block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md'
                    defaultValue={''}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex-shrink-0 px-4 py-4 flex justify-end'>
        <button
          type='button'
          className='bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          onClick={() => setOpen(false)}
        >
          Cancel
        </button>
        <button
          type='submit'
          className='ml-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue hover:bg-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue'
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default CreateEventForm;
