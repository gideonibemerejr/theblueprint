import { useAuth } from '../../utils/auth';
import { Controller, useForm } from 'react-hook-form';
import { Switch } from '@headlessui/react';
export default function RegistrationPage() {
  const { user, isAdmin } = useAuth();
  const defaultValues = {
    austinLocal: false,
  };
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({ defaultValues });
  return (
    <div className='space-y-6'>
      <header className='py-10'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <h1 className='text-3xl font-bold text-white'>
            Register for the Blueprint
          </h1>
        </div>
      </header>
      <main className='-mt-32'>
        <div className='max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8'>
          {/* Replace with your content */}
          <div className='bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6'>
            <div className='md:grid md:grid-cols-3 md:gap-6'>
              <div className='md:col-span-1'>
                <h3 className='text-lg font-medium leading-6 text-gray-900'>
                  Information
                </h3>
                <p className='mt-1 text-sm text-gray-500'>
                  You know the drill...
                </p>
              </div>
              <div className='mt-5 md:mt-0 md:col-span-2'>
                <form action='#' method='POST'>
                  <div className='grid grid-cols-6 gap-6'>
                    <div className='col-span-6 sm:col-span-3'>
                      <label
                        htmlFor='firstName'
                        className='block text-sm font-medium text-gray-700'
                      >
                        First name
                      </label>
                      <input
                        type='text'
                        {...register('firstName', { required: true })}
                        autoComplete='given-name'
                        className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                      />
                    </div>

                    <div className='col-span-6 sm:col-span-3'>
                      <label
                        htmlFor='lastName'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Last name
                      </label>
                      <input
                        type='text'
                        {...register('lastName', { required: true })}
                        autoComplete='family-name'
                        className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                      />
                    </div>

                    <div className='col-span-6 sm:col-span-4'>
                      <label
                        htmlFor='email'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Email address
                      </label>
                      <input
                        type='email'
                        {...register('email', { required: true })}
                        autoComplete='email'
                        className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                      />
                    </div>

                    <div className='col-span-6 sm:col-span-3'>
                      <label
                        htmlFor='age_group'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Age group
                      </label>
                      <select
                        {...register('age_group', { required: true })}
                        autoComplete='country-name'
                        className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                      >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>Mexico</option>
                      </select>
                    </div>
                    <div className='col-span-6 sm:col-span-3'>
                      <label
                        htmlFor='gender'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Gender
                      </label>
                      <select
                        {...register('gender', { required: true })}
                        autoComplete='country-name'
                        className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                      >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>Mexico</option>
                      </select>
                    </div>

                    <div className='col-span-6 sm:col-span-6 lg:col-span-2'>
                      <Controller
                        name='austinLocal'
                        control={control}
                        render={({ field }) => (
                          <Switch.Group
                            as='div'
                            className='flex items-center justify-between'
                          >
                            <span className='flex-grow flex flex-col'>
                              <Switch.Label
                                as='span'
                                className='text-sm font-medium text-gray-900'
                                passive
                              >
                                From Austin?
                              </Switch.Label>
                              <Switch.Description
                                as='span'
                                className='text-sm text-gray-500'
                              >
                                Seriously, is your zip code Austin, TX?
                              </Switch.Description>
                            </span>
                            <Switch
                              checked={field.value}
                              onChange={(e) => field.onChange(e.target.checked)}
                              className={`${
                                field.value ? 'bg-indigo-600' : 'bg-gray-200'
                              } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                            >
                              <span
                                aria-hidden='true'
                                className={`
                              ${field.value ? 'translate-x-5' : 'translate-x-0'}
                              'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                            `}
                              />
                            </Switch>
                          </Switch.Group>
                        )}
                      />
                    </div>

                    <div className='col-span-6 sm:col-span-3 lg:col-span-2'>
                      <label
                        htmlFor='region'
                        className='block text-sm font-medium text-gray-700'
                      >
                        State / Province
                      </label>
                      <input
                        type='text'
                        name='region'
                        id='region'
                        autoComplete='address-level1'
                        className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                      />
                    </div>

                    <div className='col-span-6 sm:col-span-3 lg:col-span-2'>
                      <label
                        htmlFor='postal-code'
                        className='block text-sm font-medium text-gray-700'
                      >
                        ZIP / Postal code
                      </label>
                      <input
                        type='text'
                        name='postal-code'
                        id='postal-code'
                        autoComplete='postal-code'
                        className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className='mt-6 flex justify-end'>
            <button
              type='button'
              className='bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='ml-3 inline-flex justify-center py-2 px-4 border border-white shadow-sm text-sm font-medium rounded-md text-white hover:text-blue bg-blue hover:bg-white hover:border hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue'
            >
              Save
            </button>
          </div>
          {/* /End replace */}
        </div>
      </main>
    </div>
  );
}
