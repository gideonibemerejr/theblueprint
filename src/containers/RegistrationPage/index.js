import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';

import { Switch, Select } from '../../components';
import { getAgeGroups } from '../../services/users';
import { FORM_DEFAULTS } from '../../_constants';

export default function RegistrationPage() {
  const { data, error } = useSWR(`/age-groups`, getAgeGroups);

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      ...FORM_DEFAULTS.USER_REGISTRATION,
      age_group: data.ageGroups,
    },
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(FORM_DEFAULTS.CREATE_EVENT);
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div className='space-y-6'>
      <header className='py-10'>
        <div className=' mx-auto px-4 sm:px-6 lg:px-8'>
          <h1 className='text-3xl font-bold text-white'>
            Register for the Blueprint
          </h1>
        </div>
      </header>
      <main className='-mt-32'>
        <div className=' mx-auto pb-12 px-4 sm:px-6 lg:px-8'>
          {/* Replace with your content */}
          <div className='bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6'>
            <div className='md:grid md:grid-cols-3 md:gap-6'>
              <div className='md:col-span-1'>
                <h3 className='text-lg font-medium leading-6 text-gray-900'>
                  Information
                </h3>
                <p className='mt-1 text-sm text-gray-500'>
                  We know. ANOTHER form. But think of it like a SXSW pastime.
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
                      <Switch
                        control={control}
                        name='austinLocal'
                        label='Are you local to Austin?'
                        description='We mean Austin. Not surrounding cities.'
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
