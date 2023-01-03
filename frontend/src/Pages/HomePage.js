import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tab } from '@headlessui/react';

import Registration from '../components/authentication/Registration';
import Login from '../components/authentication/Login';

const HomePage = () => {
  const [selectedIndex, setSelectedIndex] = useState(1);

  return (
    <div>
      <div className='container pt-20 pl-3 pr-3 mx-auto'>
        <div className='container box-border max-w-xs mx-auto border-2 border-white rounded-md shadow-lg shadow-slate-400/75'>
          <Link
            to='/'
            className='flex flex-row justify-center text-center text-white bg-blue-800 rounded-md font-Lucky'
          >
            <div className='my-6 text-5xl'>G</div>
            <div className='my-6 text-5xl animate-pulse'>_</div>
            <div className='my-6 text-5xl'>Chat</div>
          </Link>
        </div>

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
