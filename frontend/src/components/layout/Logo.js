import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <div className='container box-border mx-1 duration-500 border-2 border-white rounded-md shadow-lg max-w-min hover:scale-110 shadow-slate-400/75'>
      <Link to='/'>
        <div className='flex px-6 py-4 text-center text-white bg-blue-800 rounded-md place-content-center font-Lucky'>
          <div className='text-xl md:text-5xl'>G</div>
          <div className='text-xl md:text-5xl animate-pulse'>_</div>
          <div className='text-xl md:text-5xl '>Chat</div>
        </div>
      </Link>
    </div>
  );
};

export default Logo;
