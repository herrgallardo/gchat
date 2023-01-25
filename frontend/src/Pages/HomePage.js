import { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';

import Registration from '../components/authentication/Registration';
import Login from '../components/authentication/Login';
import Logo from '../components/layout/Logo';
import { useHistory } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

const HomePage = () => {
  const [selectedIndex, setSelectedIndex] = useState(1);

  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo'));

    if (user) {
      history.push('/chats');
    }
  }, [history]);

  return (
    <div>
      <div className='container pt-4 pl-3 pr-3 mx-auto'>
        <Box className='flex place-content-center w-full pb-1.5 pl-2.5 pr-2.5'>
          <div>
            <Logo></Logo>
          </div>
        </Box>
        <div className='container max-w-6xl pt-10 mx-auto font-Prompt'>
          <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
            <Tab.List className='flex flex-row'>
              <Tab className='inline-block w-2/4 px-4 py-4 mr-2 text-lg font-medium text-center text-white rounded-md cursor-pointer bg-slate-800 ui-selected:border ui-selected:border-white ui-selected:text-blue-500 ui-selected:shadow ui-selected:shadow-slate-400 focus:outline-none'>
                REGISTRATION
              </Tab>
              <Tab className='inline-block w-2/4 px-4 py-4 mr-2 text-lg font-medium text-center text-white rounded-md cursor-pointer bg-slate-800 ui-selected:border ui-selected:border-white ui-selected:text-blue-500 ui-selected:shadow ui-selected:shadow-slate-400 focus:outline-none'>
                LOGIN
              </Tab>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>{Registration(useState)}</Tab.Panel>
              <Tab.Panel>{Login(useState)}</Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
