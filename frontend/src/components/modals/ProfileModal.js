const ProfileModal = (setProfileModalIsOpen, user) => {
  return (
    <div>
      <div className='flex items-center justify-center h-60'></div>

      <div className='fixed inset-0 z-10 overflow-y-auto'>
        <div className='flex items-center min-h-screen px-4 py-8'>
          <div className='relative w-full max-w-lg p-4 mx-auto border-4 border-blue-700 rounded-lg shadow shadow-lg shadow-slate-400 bg-slate-800'>
            <div className='m-4 sm:flex'>
              <div className='flex items-center justify-center flex-none w-32 h-32 mx-auto'>
                <img
                  className='rounded-full w-50 h-50'
                  src={user.avatar}
                  alt='user_avatar'
                ></img>
              </div>
              <div className='text-center sm:ml-4 sm:text-left'>
                <h4 className='text-lg font-medium text-white'>
                  {user.username}
                </h4>
                <p className='mt-2 text-[15px] leading-relaxed text-white'>
                  {user.email}
                </p>
                <div className='items-center gap-2 mt-3 sm:flex'>
                  <button
                    onClick={() => setProfileModalIsOpen(false)}
                    className='w-full mt-2 p-2.5 flex-1 text-white rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2'
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

export default ProfileModal;
