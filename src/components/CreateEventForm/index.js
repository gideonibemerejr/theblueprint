import { useSWRConfig } from 'swr';
import { useForm } from 'react-hook-form';

import { Dialog } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { FORM_DEFAULTS, RSVP_STATUSES } from '../../_constants';
import { DatePicker, Select, Switch, TimePicker } from '..';
import eventSanitizer from '../../utils/eventSanitizer';
import { useEffect } from 'react';
import { createEvent } from '../../services/events';
import { notification } from '../../services';

const CreateEventForm = ({ setOpen }) => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    setError,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm({
    defaultValues: FORM_DEFAULTS.CREATE_EVENT,
  });
  const { mutate } = useSWRConfig();

  const showPrice = watch('rsvpStatus');

  const onSubmit = async (data, event) => {
    event.preventDefault();
    let sanitizedData = eventSanitizer(data);

    try {
      await mutate('/blue-sheet-events', createEvent(sanitizedData));
    } catch (error) {
      setError('name', {
        type: 'server',
        shouldFocus: true,
        message: 'Something went wrong...try again',
      });
      notification.error(error.message);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(FORM_DEFAULTS.CREATE_EVENT);
      setOpen(false);
    }
  }, [isSubmitSuccessful, reset, setOpen]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl'
    >
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
            <div className='pt-4 pb-2 flex justify-center items-center'>
              <div className='mt-1 w-full'>
                <Switch
                  control={control}
                  name='staffPick'
                  label='Staff Pick'
                  description='The Dirty Team™ stamp of approval'
                />
              </div>
            </div>
            <div className='space-y-6 pt-4 pb-2'>
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
              <div className='space-y-6 pt-4 pb-2'>
                <div>
                  <label
                    htmlFor='link'
                    className='block text-sm font-medium text-gray-900'
                  >
                    Link
                  </label>
                  <div className='mt-1'>
                    <input
                      {...register('link', { required: true })}
                      type='text'
                      required
                      className='block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md'
                    />
                  </div>
                </div>
              </div>
              <div className='space-y-6 pt-2 pb-2'>
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
              <div className='space-y-6 pt-4 pb-2'>
                <div>
                  <label
                    htmlFor='rsvpStatus'
                    className='block text-sm font-medium text-gray-900'
                  >
                    RSVP status
                  </label>
                  <div className='mt-1'>
                    <Select
                      options={RSVP_STATUSES}
                      control={control}
                      isClearable
                      name='rsvpStatus'
                    />
                  </div>
                </div>
              </div>
              {showPrice === 'open_with_price' && (
                <div>
                  <label
                    htmlFor='price'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Price
                  </label>
                  <div className='mt-1 relative rounded-md shadow-sm'>
                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                      <span className='text-gray-500 sm:text-sm'>$</span>
                    </div>
                    <input
                      type='text'
                      {...register('price')}
                      className='focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md'
                      placeholder='0.00'
                      aria-describedby='price-currency'
                    />
                    <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
                      <span
                        className='text-gray-500 sm:text-sm'
                        id='price-currency'
                      >
                        USD
                      </span>
                    </div>
                  </div>
                </div>
              )}
              <div className='pt-4 pb-2 flex justify-center items-center'>
                <div className='mt-1 w-full'>
                  <Switch
                    control={control}
                    name='isAllWeek'
                    label='All week?'
                    description='The WHOLE DAMN FESTIVAL'
                  />
                </div>
              </div>
              <div className='pt-4 pb-2 flex justify-center items-center'>
                <div className='md:w-1/2'>
                  <label
                    htmlFor='startDate'
                    className='block text-sm font-medium text-gray-900'
                  >
                    Start date
                  </label>
                  <div className='mt-1'>
                    <DatePicker control={control} name='startDate' />
                  </div>
                </div>
                <div className='md:w-1/2'>
                  <label
                    htmlFor='endDate'
                    className='block text-sm font-medium text-gray-900'
                  >
                    End date
                  </label>
                  <div className='mt-1'>
                    <DatePicker control={control} name='endDate' />
                  </div>
                </div>
              </div>
              <div className='pt-4 pb-2 flex justify-center items-center'>
                <div className='md:w-1/2'>
                  <label
                    htmlFor='startDate'
                    className='block text-sm font-medium text-gray-900'
                  >
                    Start time
                  </label>
                  <div id='start-picker' className='mt-1'>
                    <TimePicker
                      control={control}
                      name='startTime'
                      containerId='start-picker'
                    />
                  </div>
                </div>
                <div className='md:w-1/2'>
                  <label
                    htmlFor='endTime'
                    className='block text-sm font-medium text-gray-900'
                  >
                    End Time
                  </label>
                  <div id='end-picker' className='mt-1'>
                    <TimePicker
                      control={control}
                      name='endTime'
                      containerId='end-picker'
                    />
                  </div>
                </div>
              </div>
              <div className='pt-4 pb-2 flex justify-center items-center'>
                <div className='mt-1 w-full'>
                  <Switch
                    control={control}
                    name='freeDrinks'
                    label='Free drinks?'
                    description='Booze, rain water, liquid deaths? The whole lot.'
                  />
                </div>
              </div>
              <div className='pt-4 pb-2 flex justify-center items-center'>
                <div className='mt-1 w-full'>
                  <Switch
                    control={control}
                    name='freeFood'
                    label='Free food?'
                    description="Burgers, dumplings, tacos? Anything but Torchy's."
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor='notes'
                  className='block text-sm font-medium text-gray-900'
                >
                  Notes
                </label>
                <div className='mt-1'>
                  <textarea
                    {...register('notes')}
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
          disabled={isSubmitting}
          type='submit'
          className='ml-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue hover:bg-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue'
        >
          Create event
        </button>
      </div>
    </form>
  );
};

export default CreateEventForm;
