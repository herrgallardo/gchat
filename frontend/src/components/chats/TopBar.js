import { useHistory } from 'react-router-dom';
import { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import ProfileModal from '../modals/ProfileModal';
import { ChatState } from '../../context/ChatProvider';
import Logo from '../layout/Logo';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import toast, { Toaster } from 'react-hot-toast';

const TopBar = () => {
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [profileModalIsOpen, setProfileModalIsOpen] = useState(false);
  const { user, setSelectedChat, chats, setChats } = ChatState();

  const history = useHistory();

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    history.push('/');
  };

  useEffect(() => {
    handleSearch();
  }, [search]);

  const handleSearch = async () => {
    if (!search) {
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast.error('Search error!');
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoading(true);
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post('/api/chat', { userId }, config);

      setSelectedChat(data);
      console.log('selected chat', data);
      setLoading(false);
    } catch (error) {
      toast.error('Chat start failed!');
    }
  };

  return (
    <div>
      <Toaster position='bottom-center'></Toaster>
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
      <div className='flex place-content-center'>
        <div className='scale-75 w-96'>
          <Logo></Logo>
        </div>
      </div>
      <div className='grid grid-cols-2 gap-4 pt-5 pb-5 pl-4 pr-4 mx-auto ml-4 mr-4 place-content-evenly shadow-slate-400'>
        <div>
          <Combobox value={search} onChange={setSearch}>
            <div className='relative mt-1'>
              <div className='flex justify-center pb-2 text-center'>
                <Combobox.Label>SEARCH USERS TO CHAT</Combobox.Label>
              </div>
              <div className='relative w-full overflow-hidden text-left rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm'>
                <Combobox.Input
                  className='w-full py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 border-none focus:ring-0'
                  displayValue={(user) => user.username}
                  onChange={(event) => setSearch(event.target.value)}
                />
                <Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
                  <ChevronUpDownIcon
                    className='w-5 h-5 text-gray-400'
                    aria-hidden='true'
                  />
                </Combobox.Button>
              </div>
              <Transition
                as={Fragment}
                leave='transition ease-in duration-100'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
                afterLeave={() => setSearch('')}
              >
                <Combobox.Options className='absolute w-full py-1 mt-1 overflow-auto text-base rounded-md shadow-lg bg-slate-700 min-w-max max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                  {searchResult.length === 0 && search !== '' ? (
                    <div className='relative px-4 py-2 text-white cursor-default select-none'>
                      No user found!
                    </div>
                  ) : (
                    searchResult.map((user) => (
                      <Combobox.Option
                        key={user._id}
                        user={user}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? 'bg-blue-600 text-white' : 'text-gray-900'
                          }`
                        }
                        value={user.username}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              <div className='flex items-center mb-2'>
                                <div>
                                  <img
                                    className='w-10 h-10 mr-2 rounded-full'
                                    src={user.avatar}
                                    alt='user_avatar'
                                  ></img>
                                </div>
                                <div className='text-white'>
                                  {user.username}
                                </div>
                              </div>

                              <div className='mb-4 text-white'>
                                {user.email}
                              </div>
                              <div className='mb-4'>
                                <button
                                  className='p-2 text-white bg-blue-700 border-2 border-white rounded-md shadow-lg shadow-slate-400/75'
                                  onClick={() => accessChat(user._id)}
                                >
                                  Start chat with {user.username}
                                </button>
                              </div>
                            </span>
                            {selected ? (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                  active ? 'text-white' : 'text-teal-600'
                                }`}
                              >
                                <CheckIcon
                                  className='w-5 h-5'
                                  aria-hidden='true'
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              </Transition>
            </div>
          </Combobox>
        </div>
        <div className='flex flex-wrap-reverse justify-end place-items-center'>
          <div>
            <button onClick={() => setProfileModalIsOpen(true)}>
              <img
                className='w-10 h-10 mr-2 rounded-full shrink'
                src={user.avatar}
                alt='Rounded avatar'
              ></img>
            </button>
          </div>
          <div className='m-2'>{user.username}</div>
          <div className='ml-6'>
            <button onClick={() => logoutHandler()}>
              <img
                className='w-8 h-8'
                src='images/logout.png'
                alt='logout_button'
              ></img>
            </button>
          </div>
        </div>
      </div>
      <div>
        <div>
          {profileModalIsOpen
            ? ProfileModal(setProfileModalIsOpen, user)
            : null}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
