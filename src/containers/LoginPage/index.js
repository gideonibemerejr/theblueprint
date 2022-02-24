import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../../utils/auth';

const Login = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();

  let from = location.state?.from?.pathname || '/';

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    auth
      .login(data, () => {
        navigate(from, { replace: true });
      })
      .catch((error) =>
        setError('Invalid email and/or password, please try again')
      );
    try {
    } catch (error) {
      setError('Invalid email and/or password, please try again');
    } finally {
      setLoading(false);
      if (auth.error?.message) {
        setError('Invalid email and/or password, please try again');
      }
    }
  };

  if (auth?.user) {
    return <Navigate to='/' />;
  }

  return (
    <>
      <div className='min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-blue'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-white'>
            Sign in to your account
          </h2>
          {(auth.error?.message || error) && (
            <h2 className='text-center mt-6 text-red-500'>
              {error?.length > 0
                ? error
                : 'Invalid email and/or password, please try again'}
            </h2>
          )}
        </div>

        <div className='mt-6 sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='bg-blue py-8 px-4 border border-white sm:rounded-lg sm:px-10'>
            <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-white'
                >
                  Email address
                </label>
                <div className='mt-1'>
                  <input
                    {...register('identifier', { required: true })}
                    type='email'
                    // required
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm'
                  />
                  {errors.exampleRequired && (
                    <span>This field is required</span>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium text-white'
                >
                  Password
                </label>
                <div className='mt-1'>
                  <input
                    {...register('password', { required: true })}
                    type='password'
                    autoComplete='current-password'
                    // required
                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm'
                  />
                  {errors.exampleRequired && (
                    <span>This field is required</span>
                  )}
                </div>
              </div>

              <div className='flex items-center justify-between'>
                <div />
                <div className='text-sm'>
                  <a
                    href='#'
                    className='font-medium text-white hover:text-gray-500'
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type='submit'
                  className='w-full flex justify-center py-2 px-4 border border-white rounded-md shadow-sm text-sm font-medium text-white bg-blue hover:bg-white hover:text-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
