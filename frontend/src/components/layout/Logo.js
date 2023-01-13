import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <div className='container box-border max-w-xs mx-auto duration-500 border-2 border-white rounded-md shadow-lg hover:scale-110 shadow-slate-400/75'>
      <Link
        to='/'
        className='flex flex-row justify-center text-center text-white bg-blue-800 rounded-md font-Lucky'
      >
        <div className='my-6 text-5xl'>G</div>
        <div className='my-6 text-5xl animate-pulse'>_</div>
        <div className='my-6 text-5xl'>Chat</div>
      </Link>
    </div>
  );
};

export default Logo;
