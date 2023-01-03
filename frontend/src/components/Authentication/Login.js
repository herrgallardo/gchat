const Login = (useState) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <div className='container max-w-3xl p-10 mx-auto'>
      <div className='container text-white'>
        <div className='w-full'>
          <form>
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

            <div className='flex items-center justify-end mt-6'>
              <button
                type='submit'
                className='inline-flex items-center px-4 py-2 ml-4 mr-1 text-lg font-medium tracking-widest text-white uppercase transition duration-150 ease-in-out bg-blue-900 border border-white rounded shadow shadow-slate-400 hover:bg-blue-700 active:bg-blue-500 false'
              >
                LOGIN
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
