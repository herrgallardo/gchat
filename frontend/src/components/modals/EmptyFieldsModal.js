const EmptyFieldsModal = (setEmptyFieldsModalIsOpen) => {
  return (
    <div>
      <div className='flex items-center justify-center h-60'></div>

      <div className='fixed inset-0 z-10 overflow-y-auto'>
        <div className='flex items-center min-h-screen px-4 py-8'>
          <div className='relative w-full max-w-lg p-4 mx-auto border-4 rounded-lg shadow shadow-lg border-rose-700 shadow-slate-400 bg-slate-800'>
            <div className='m-4 sm:flex'>
              <div className='flex items-center justify-center flex-none w-32 h-32 mx-auto'>
                <img src='images/warning.png' alt='warning'></img>
              </div>
              <div className='text-center sm:ml-4 sm:text-left'>
                <h4 className='text-lg font-medium text-white'>
                  Missing fields
                </h4>
                <p className='mt-2 text-[15px] leading-relaxed text-white'>
                  Please fill in all the required fields!
                </p>
                <div className='items-center gap-2 mt-3 sm:flex'>
                  <button
                    className='w-full mt-2 p-2.5 flex-1 text-white rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2'
                    onClick={() => setEmptyFieldsModalIsOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyFieldsModal;
