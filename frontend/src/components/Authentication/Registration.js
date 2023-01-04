import { EyeIcon } from '@heroicons/react/20/solid';
import { EyeSlashIcon } from '@heroicons/react/20/solid';

const Registration = (useState) => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [avatar, setAvatar] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const clickHandler = () => {
    setShowPassword(!showPassword);
  };

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
              <div>
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
              <div>
                <input
                  type='email'
                  name='email'
                  className='block w-full pt-1 pb-1 pl-2 mt-1 border border-transparent rounded shadow shadow-slate-400 text-slate-900 focus:bg-blue-200 focus:outline-none'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className='relative mt-4'>
              <label
                htmlFor='password'
                className='block text-lg text-white undefined'
              >
                Password
              </label>
              <div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  className='w-full pt-1 pb-1 pl-2 mt-1 border border-transparent rounded shadow shadow-slate-400 text-slate-900 focus:bg-blue-200 focus:outline-none'
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div class='absolute top-10 right-3 flex items-center pl-3'>
                {showPassword ? (
                  <EyeIcon
                    onClick={clickHandler}
                    class='w-5 h-5 text-blue-800 cursor-pointer'
                  ></EyeIcon>
                ) : (
                  <EyeSlashIcon
                    onClick={clickHandler}
                    class='w-5 h-5 text-blue-800 cursor-pointer'
                  ></EyeSlashIcon>
                )}
              </div>
            </div>
            <div className='relative mt-4'>
              <label
                htmlFor='password_confirmation'
                className='block text-lg text-white undefined'
              >
                Confirm Password
              </label>
              <div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='password_confirmation'
                  className='block w-full pt-1 pb-1 pl-2 mt-1 border border-transparent rounded shadow shadow-slate-400 text-slate-900 focus:bg-blue-200 focus:outline-none'
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div class='absolute top-10 right-3 flex items-center pl-3'>
                {showPassword ? (
                  <EyeIcon
                    onClick={clickHandler}
                    class='w-5 h-5 text-blue-800 cursor-pointer'
                  ></EyeIcon>
                ) : (
                  <EyeSlashIcon
                    onClick={clickHandler}
                    class='w-5 h-5 text-blue-800 cursor-pointer'
                  ></EyeSlashIcon>
                )}
              </div>
            </div>
            <div className='mt-4'>
              <label
                htmlFor='avatar_upload'
                className='block text-lg undefined'
              >
                Choose your avatar
              </label>
              <div>
                <input
                  type='file'
                  accept='image/*'
                  name='avatar_upload'
                  className='block w-full pt-1 pb-1 mt-1 text-white cursor-pointer bg-slate-900 focus:outline-none file:rounded file:bg-blue-900 file:text-white file:hover:bg-blue-700 file:font-Prompt file:p-2 file:mr-5'
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
