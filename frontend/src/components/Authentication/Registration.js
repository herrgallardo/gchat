import { EyeIcon } from '@heroicons/react/20/solid';
import { EyeSlashIcon } from '@heroicons/react/20/solid';

const Registration = (useState) => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [avatar, setAvatar] = useState();

  const postDetails = (avatar) => {};

  console.log('name', username);

  return (
    <div className='container max-w-3xl p-10 mx-auto'>
      <div className='container text-white'>
        <div className='w-full'>
          <form>
            <div>
              <label htmlFor='name' className='block text-lg text-white'>
                Name
              </label>
              <div className='container'>
                <input
                  type='text'
                  name='name'
                  className='block w-full pt-1 pb-1 pl-2 mt-1 border border-transparent rounded text-slate-900 focus:bg-blue-200 focus:outline-none'
                  onChange={(e) => setUsername(e.target.value)}
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
              <div className='container'>
                <input
                  type='email'
                  name='email'
                  className='block w-full pt-1 pb-1 pl-2 mt-1 border border-transparent rounded shadow shadow-slate-400 text-slate-900 focus:bg-blue-200 focus:outline-none'
                  onChange={(e) => setEmail(e.target.value)}
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
              <div className='container'>
                <input
                  type='password'
                  name='password'
                  className='w-full pt-1 pb-1 pl-2 mt-1 border border-transparent rounded shadow shadow-slate-400 text-slate-900 focus:bg-blue-200 focus:outline-none'
                  onChange={(e) => setPassword(e.target.value)}
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
              <div className='container'>
                <input
                  type='password'
                  name='password_confirmation'
                  className='block w-full pt-1 pb-1 pl-2 mt-1 border border-transparent rounded shadow shadow-slate-400 text-slate-900 focus:bg-blue-200 focus:outline-none'
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
            <div className='mt-4'>
              <label
                htmlFor='avatar_upload'
                className='block text-lg undefined'
              >
                Choose your avatar
              </label>
              <div className='container'>
                <input
                  type='file'
                  accept='image/*'
                  name='avatar_upload'
                  className='block w-full pt-1 pb-1 pl-2 mt-1 bg-white rounded shadow cursor-pointer text-slate-900 focus:outline-none shadow-slate-400 file:rounded file:bg-blue-900 file:text-white file:hover:bg-blue-700 file:font-Prompt'
                  onChange={(e) => postDetails(e.target.files[0])}
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
