const Loading = () => {
  return (
    <div className='absolute transform translate-x-1/2 translate-y-1/2 right-1/2 bottom-1/2 '>
      <div className='w-64 h-64 border-8 border-blue-400 border-solid rounded-full border-t-transparent animate-spin'></div>
      <div className='absolute transform translate-x-1/2 translate-y-1/2 right-1/2 bottom-1/2 '>
        <div className='p-4 text-2xl text-blue-400 animate-pulse'>
          Loading...
        </div>
      </div>
    </div>
  );
};

export default Loading;
