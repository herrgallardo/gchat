const RegistrationSuccessModal = () => {
  return (
    <div>
      <div className='flex items-center justify-center h-60'></div>
      <div className='fixed inset-0 z-10 overflow-y-auto'>
        <div className='flex items-center min-h-screen px-4 py-8'>
          <div className='relative w-full max-w-lg p-4 mx-auto border-4 border-green-500 rounded-lg shadow shadow-lg shadow-slate-400 bg-slate-800'>
            <div className='m-4 sm:flex'>
              <div className='flex items-center justify-center flex-none w-32 h-32 mx-auto'>
                <img src='images/success.png' alt='success icon'></img>
              </div>
              <div className='text-center sm:ml-4 sm:text-left'>
                <h4 className='pt-10 text-lg font-medium text-white'>
                  REGISTRATION SUCCESSFULL!
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationSuccessModal;
