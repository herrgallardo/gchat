import { EyeIcon } from '@heroicons/react/20/solid';
import { EyeSlashIcon } from '@heroicons/react/20/solid';
import ImageModal from '../modals/ImageModal';
import EmptyFieldsModal from '../modals/EmptyFieldsModal';
import PasswordsNoMatchModal from '../modals/PasswordsNoMatchModal';
import RegistrationSuccessModal from '../modals/RegistrationSuccessModal';
import RegistrationErrorModal from '../modals/RegistrationErrorModal';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Registration = (useState) => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [avatar, setAvatar] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageModalIsOpen, setIMageModalIsOpen] = useState(false);
  const [emptyFieldsModalIsOpen, setEmptyFieldsModalIsOpen] = useState(false);
  const [passwordModalIsOpen, setPasswordModalIsOpen] = useState(false);
  const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);
  const [errorModalIsOpen, setErrorModalIsOpen] = useState(false);
  const history = useHistory();

  const clickHandler = () => {
    setShowPassword(!showPassword);
  };

  const submitHandler = async () => {
    setLoading(true);
    if (!username || !email || !password || !confirmPassword) {
      setEmptyFieldsModalIsOpen(true);
      setTimeout(() => {
        setEmptyFieldsModalIsOpen(false);
      }, 3000);
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setPasswordModalIsOpen(true);
      setTimeout(() => {
        setPasswordModalIsOpen(false);
      }, 3000);
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
        '/api/user',
        { username, email, password, avatar },
        config
      );

      setSuccessModalIsOpen(true);
      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoading(false);

      setTimeout(() => {
        setSuccessModalIsOpen(false);
        history.push('/chats');
      }, 1000);
    } catch (error) {
      setErrorModalIsOpen(true);
      setTimeout(() => {
        setErrorModalIsOpen(false);
      }, 1000);
      setLoading(false);
    }
  };

  const postDetails = (avatar) => {
    setLoading(true);
    if (avatar === undefined) {
      setIMageModalIsOpen(true);
      setTimeout(() => {
        setIMageModalIsOpen(false);
      }, 3000);
      return;
    }

    if (avatar.type === 'image/jpeg' || avatar.type === 'image/png') {
      const data = new FormData();
      data.append('file', avatar);
      data.append('upload_preset', 'g_chat');
      data.append('cloud_name', 'herrgallardo');
      fetch('https://api.cloudinary.com/v1_1/herrgallardo/image/upload', {
        method: 'post',
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setAvatar(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      setIMageModalIsOpen(true);
      setTimeout(() => {
        setIMageModalIsOpen(false);
      }, 3000);
      setLoading(false);
      return;
    }
  };

  return (
    <div className='container max-w-3xl p-8 mx-auto'>
      <div className='container text-white'>
        <div className='w-full'>
          <div>
            <div className='flex justify-center w-full pb-4 text-xs text-white'>
              <div>
                Required fields <span className='text-2xl text-red-500'>*</span>
              </div>
            </div>
            <div>
              <label htmlFor='username' className='block text-lg text-white'>
                Username <span className='text-2xl text-red-500'>*</span>
              </label>
              <div>
                <input
                  type='text'
                  name='username'
                  className='block w-full pt-1 pb-1 pl-2 mt-1 border border-transparent rounded shadow shadow-slate-400 text-slate-900 focus:bg-blue-200 focus:outline-none'
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div className='mt-4'>
              <label
                htmlFor='email'
                className='block text-lg text-white undefined'
              >
                Email <span className='text-2xl text-red-500'>*</span>
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
                Password <span className='text-2xl text-red-500'>*</span>
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
            <div className='relative mt-4'>
              <label
                htmlFor='password_confirmation'
                className='block text-lg text-white undefined'
              >
                Confirm password{' '}
                <span className='text-2xl text-red-500'>*</span>
              </label>
              <div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='password_confirmation'
                  className='block w-full pt-1 pb-1 pl-2 mt-1 border border-transparent rounded shadow shadow-slate-400 text-slate-900 focus:bg-blue-200 focus:outline-none'
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
            <div className='mt-4'>
              <div>
                {loading ? (
                  <div className='absolute transform translate-x-1/2 translate-y-1/2 right-1/2 bottom-1/2 '>
                    <div className='w-64 h-64 border-8 border-blue-400 border-solid rounded-full border-t-transparent animate-spin'></div>
                    <div className='absolute transform translate-x-1/2 translate-y-1/2 right-1/2 bottom-1/2 '>
                      <div className='p-4 text-2xl text-blue-400 animate-pulse'>
                        Loading...
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
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
                  className='block w-full pt-1 pb-1 mt-1 text-white cursor-pointer bg-slate-900 focus:outline-none file:rounded file:bg-blue-900 file:text-white file:hover:bg-blue-700 file:font-Prompt file:p-2 file:mr-5 file:shadow file:shadow-slate-400'
                  onChange={(e) => postDetails(e.target.files[0])}
                />
              </div>
              <div>
                {imageModalIsOpen ? ImageModal(setIMageModalIsOpen) : null}
              </div>
              <div>
                {emptyFieldsModalIsOpen
                  ? EmptyFieldsModal(setEmptyFieldsModalIsOpen)
                  : null}
              </div>
              <div>
                {passwordModalIsOpen
                  ? PasswordsNoMatchModal(setPasswordModalIsOpen)
                  : null}
              </div>
              <div>
                {successModalIsOpen ? (
                  <RegistrationSuccessModal></RegistrationSuccessModal>
                ) : null}
              </div>
              <div>
                {errorModalIsOpen ? (
                  <RegistrationErrorModal></RegistrationErrorModal>
                ) : null}
              </div>
            </div>
            <div className='flex items-center justify-end mt-6'>
              <button
                onClick={submitHandler}
                type='submit'
                className='inline-flex items-center px-4 py-2 ml-4 mr-1 text-lg font-medium tracking-widest text-white uppercase transition duration-150 ease-in-out bg-blue-900 border border-white rounded shadow shadow-slate-400 hover:bg-blue-700 active:bg-blue-500 false'
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
