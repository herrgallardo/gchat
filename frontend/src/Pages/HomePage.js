import React, { useState, useEffect } from 'react';

import Signup from '../components/Authentication/Signup';
import Login from '../components/Authentication/Login';

const HomePage = () => {
  const [render, setRender] = useState(Login);
  const selectedCSS =
    'inline-block w-2/4 px-4 py-4 mr-2 text-lg text-center text-blue-500 border border-white rounded-md cursor-pointer font-mdiium font-lg bg-slate-800';
  const nonSelectedCSS =
    'inline-block w-2/4 px-4 py-4 mr-2 text-lg text-center text-white rounded-md cursor-pointer bg-slate-800';

  const [regTab, setRegTab] = useState({
    name: 'registration',
    selected: false,
    css: nonSelectedCSS,
  });

  const [loginTab, setLoginTab] = useState({
    name: 'login',
    selected: true,
    css: selectedCSS,
  });

  const clickHandler = (event) => {
    const tabName = event.currentTarget.id;
    if (tabName === 'registration') {
      if (!regTab.selected) {
        setRegTab({
          name: 'registration',
          selected: true,
          css: selectedCSS,
        });
        setRender(Signup);
        setLoginTab({
          name: 'login',
          selected: false,
          css: nonSelectedCSS,
        });
      }
    } else if (tabName === 'login') {
      if (!loginTab.selected) {
        setLoginTab({
          name: 'login',
          selected: true,
          css: selectedCSS,
        });
        setRender(Login);
        setRegTab({
          name: 'registration',
          selected: false,
          css: nonSelectedCSS,
        });
      }
    }
  };

  return (
    <div>
      <div className='container pt-20 pl-3 pr-3 mx-auto'>
        <div className='container box-border max-w-xs mx-auto border-2 border-white rounded-md shadow-lg shadow-slate-400/75'>
          <div className='flex flex-row justify-center text-center text-white bg-blue-800 rounded-md font-Lucky'>
            <div className='my-6 text-5xl'>G</div>
            <div className='my-6 text-5xl animate-pulse'>_</div>
            <div className='my-6 text-5xl'>Chat</div>
          </div>
        </div>
        <div className='container max-w-6xl pt-10 mx-auto font-Prompt'>
          <ul className='flex flex-row'>
            <li id='registration' onClick={clickHandler} className={regTab.css}>
              REGISTRATION
            </li>
            <li id='login' onClick={clickHandler} className={loginTab.css}>
              LOGIN
            </li>
          </ul>
          <div>{render}</div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
