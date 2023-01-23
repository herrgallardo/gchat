import ChatBox from '../components/chats/ChatBox';
import TopBar from '../components/chats/TopBar';
import { useState } from 'react';
import UserChats from '../components/chats/UserChats';
import { ChatState } from '../context/ChatProvider';

const ChatPage = () => {
  const { user } = ChatState();

  return (
    <div className='w-full pt-4 font-Prompt'>
      <div className='text-white'>{user && <TopBar></TopBar>}</div>
      <div className='flex text-white justify-evenly'>
        {user && <UserChats></UserChats>}
        {user && <ChatBox></ChatBox>}
      </div>
    </div>
  );
};

export default ChatPage;
