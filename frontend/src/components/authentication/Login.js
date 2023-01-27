import { EyeIcon } from '@heroicons/react/20/solid';
import { EyeSlashIcon } from '@heroicons/react/20/solid';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useHistory } from 'react-router-dom';
import Loading from '../functionality/Loading';

const Login = (useState) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);

  const clickHandler = () => {
    setShowPassword(!showPassword);
  };

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast.error('Please fill in the required fields!');
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      const { data } = await axios.post(
        '/api/user/login',
        { email, password },
        config
      );

      toast.success('Login successfull', {
        position: 'bottom-center',
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoading(false);

      setTimeout(() => {
        history.push('/chats');
      }, 500);
    } catch (error) {
      toast.error('Login error. Please verify your name and password!');
      setLoading(false);
    }
  };

  return (
    <div>
      <Toaster></Toaster>
      <div>{loading ? Loading(loading) : null}</div>
      <div className='container max-w-3xl p-8 mx-auto'>
        <div className='container text-white'>
          <div className='w-full'>
            <div>
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
                <div className='absolute flex items-center pl-3 top-10 right-3'>
                  {showPassword ? (
                    <EyeIcon
                      onClick={clickHandler}
                      className='w-5 h-5 text-blue-800 cursor-pointer'
                    ></EyeIcon>
                  ) : (
                    <EyeSlashIcon
                      onClick={clickHandler}
                      className='w-5 h-5 text-blue-800 cursor-pointer'
                    ></EyeSlashIcon>
                  )}
                </div>
              </div>
              <div className='flex items-center justify-end mt-6'>
                <button
                  onClick={submitHandler}
                  type='submit'
                  className='inline-flex items-center px-4 py-2 ml-4 mr-1 text-lg font-medium tracking-widest text-white uppercase transition duration-150 ease-in-out bg-blue-900 border border-white rounded shadow shadow-slate-400 hover:bg-blue-700 active:bg-blue-500 false'
                >
                  LOGIN
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
