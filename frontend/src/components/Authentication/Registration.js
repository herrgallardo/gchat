import React from 'react';
import { EyeIcon } from '@heroicons/react/20/solid';
import { EyeSlashIcon } from '@heroicons/react/20/solid';

const Registration = () => {
  return (
    <div className='container max-w-3xl p-10 mx-auto'>
      <div className='flex flex-col text-white'>
        <div className='w-full'>
          <form>
            <div>
              <label htmlFor='name' className='block text-lg text-white'>
                Name
              </label>
              <div className='flex flex-col items-start'>
                <input
                  type='text'
                  name='name'
                  className='block w-full pt-1 pb-1 pl-2 mt-1 border border-transparent rounded text-slate-900 focus:bg-blue-200 focus:outline-none'
                />
              </div>
            </div>
            <div className='mt-4'>
              <label
                htmlFor='email'
                className='block text-lg text-white undefined'
              >
                Email
              </label>
              <div className='flex flex-col items-start'>
                <input
                  type='email'
                  name='email'
                  className='block w-full pt-1 pb-1 pl-2 mt-1 border border-transparent rounded shadow shadow-slate-400 text-slate-900 focus:bg-blue-200 focus:outline-none'
                />
              </div>
            </div>
            <div className='mt-4'>
              <label
                htmlFor='password'
                className='block text-lg text-white undefined'
              >
                Password
              </label>
              <div className='flex flex-col items-start'>
                <input
                  type='password'
                  name='password'
                  className='block w-full pt-1 pb-1 pl-2 mt-1 border border-transparent rounded shadow shadow-slate-400 text-slate-900 focus:bg-blue-200 focus:outline-none'
                />
              </div>
            </div>
            <div className='mt-4'>
              <label
                htmlFor='password_confirmation'
                className='block text-lg text-white undefined'
              >
                Confirm Password
              </label>
              <div className='flex flex-col items-start'>
                <input
                  type='password'
                  name='password_confirmation'
                  className='block w-full pt-1 pb-1 pl-2 mt-1 border border-transparent rounded shadow shadow-slate-400 text-slate-900 focus:bg-blue-200 focus:outline-none'
                />
              </div>
            </div>
            <div className='flex items-center justify-end mt-6'>
              <button
                type='submit'
                className='inline-flex items-center px-4 py-2 ml-4 mr-1 text-lg font-medium tracking-widest text-white uppercase transition duration-150 ease-in-out bg-blue-900 border border-white rounded shadow shadow-slate-400 hover:bg-blue-700 active:bg-blue-500 false'
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
