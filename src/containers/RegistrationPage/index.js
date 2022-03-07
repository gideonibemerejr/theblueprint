import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import countries from 'i18n-iso-countries';

import enLocale from 'i18n-iso-countries/langs/en.json';

import { Switch, Select } from '../../components';
import { notification } from '../../services';
import { getAgeGroups } from '../../services/users';
import { FORM_DEFAULTS, GENDERS } from '../../_constants';
import { useAuth } from '../../utils/auth';
import userRegistrationSanitizer from '../../utils/userRegistrationSanitizer';

export default function RegistrationPage() {
  countries.registerLocale(enLocale);
  const countryObj = countries.getNames('en', { select: 'official' });
  const countryArr = Object.entries(countryObj).map(([key, value]) => {
    return {
      label: value,
      value: key,
    };
  });

  const { data, error } = useSWR(`/age-groups`, getAgeGroups);
  const [submissionError, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  let auth = useAuth();
  let navigate = useNavigate();

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
      email: location?.state?.email || FORM_DEFAULTS.USER_REGISTRATION.email,
      password:
        location?.state?.password || FORM_DEFAULTS.USER_REGISTRATION.password,
    },
  });

  const watchIsLocal = watch('austinLocal', false);

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    let sanitizedData = userRegistrationSanitizer(data);

    try {
      auth.register(sanitizedData, () => {
        navigate('/', { replace: true });
      });
    } catch (error) {
      setError(
        'Something went wrong. Check the information you entered and please try again'
      );
    } finally {
      setLoading(false);

      if (auth?.error?.message) {
        setError(
          'Something went wrong. Check the information you entered and please try again'
        );
      }
    }
  };

  useEffect(() => {
    if (error) notification.error(error.message);

    if (isSubmitSuccessful) {
      reset(FORM_DEFAULTS.USER_REGISTRATION);
    }
  }, [isSubmitSuccessful, reset, error]);

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
          {(auth.error?.message || submissionError) && (
            <h2 className='text-center mt-6 text-red-500'>
              {submissionError?.length > 0
                ? submissionError
                : 'Invalid email and/or password, please try again'}
            </h2>
          )}
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
                <form onSubmit={handleSubmit(onSubmit)}>
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
                      {errors.firstName && (
                        <span className='inline-block mt-2 text-red-500'>
                          First name is required
                        </span>
                      )}
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
                      {errors.lastName && (
                        <span className='inline-block mt-2 text-red-500'>
                          Last name is required
                        </span>
                      )}
                    </div>

                    <div className='col-span-6 sm:col-span-3'>
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
                      {errors.email && (
                        <span className='inline-block mt-2 text-red-500'>
                          Email is required
                        </span>
                      )}
                    </div>
                    <div className='col-span-6 sm:col-span-3'>
                      <label
                        htmlFor='password'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Password
                      </label>
                      <input
                        type='password'
                        {...register('password', { required: true })}
                        autoComplete='password'
                        className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                      />
                      {errors.password && (
                        <span className='inline-block mt-2 text-red-500'>
                          Password is required
                        </span>
                      )}
                    </div>

                    <div className='col-span-6 sm:col-span-3'>
                      <label
                        htmlFor='age_group'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Age group
                      </label>
                      {data && (
                        <Select
                          control={control}
                          name='age_group'
                          options={data?.ageGroups}
                        />
                      )}
                    </div>
                    <div className='col-span-6 sm:col-span-3'>
                      <label
                        htmlFor='gender'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Gender
                      </label>
                      <Select
                        control={control}
                        name='gender'
                        options={GENDERS}
                      />
                    </div>

                    <div className='col-span-6 sm:col-span-6 lg:col-span-4'>
                      <Switch
                        control={control}
                        name='austinLocal'
                        label='Are you local to Austin?'
                        description='We mean Austin. Not surrounding cities.'
                      />
                    </div>
                    <div />
                    {!watchIsLocal && (
                      <div className='col-span-6 sm:col-span-3 lg:col-span-2'>
                        <label
                          htmlFor='region'
                          className='block text-sm font-medium text-gray-700'
                        >
                          Country
                        </label>
                        <Select
                          control={control}
                          name='country'
                          options={countryArr}
                        />
                      </div>
                    )}
                    {!watchIsLocal && (
                      <div className='col-span-6 sm:col-span-3 lg:col-span-2'>
                        <label
                          htmlFor='city'
                          className='block text-sm font-medium text-gray-700'
                        >
                          City
                        </label>
                        <input
                          {...register('city')}
                          type='text'
                          className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                        />
                      </div>
                    )}

                    <div className='col-span-6 sm:col-span-3 lg:col-span-2'>
                      <label
                        htmlFor='zipCode'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Zip / Post code
                      </label>
                      <input
                        type='text'
                        {...register('zipCode')}
                        className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
                      />
                    </div>
                  </div>
                  <div className='mt-6 flex justify-end'>
                    <Link
                      to='/'
                      className='bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    >
                      Cancel
                    </Link>
                    <button
                      type='submit'
                      className='ml-3 inline-flex justify-center py-2 px-4 border border-white shadow-sm text-sm font-medium rounded-md text-white hover:text-blue bg-blue hover:bg-white hover:border hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue'
                    >
                      {loading ? 'Signing you up...' : 'Sign Up'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* /End replace */}
        </div>
      </main>
    </div>
  );
}
