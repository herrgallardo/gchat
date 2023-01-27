import { Box } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

import { ChatState } from '../../context/ChatProvider';
import SingleChat from './SingleChat';

const ChatBox = () => {
  const { selectedChat, setSelectedChat, chats } = ChatState();
  const [isGroupMember, setIsGroupMember] = useState(true);

  useEffect(() => {
    if (!isGroupMember) {
      setSelectedChat('');
    }
  }, [isGroupMember]);

  useEffect(() => {
    if (selectedChat) {
      setIsGroupMember(false);
      for (let chat of chats) {
        if (chat._id === selectedChat._id) {
          setIsGroupMember(true);
        }
      }
    }
  }, [chats]);

  return (
    <Box
      className={`text-white shadow-lg md:flex shadow-slate-400/75 ${
        selectedChat ? 'flex' : 'hidden'
      }`}
      alignItems='center'
      flexDir='column'
      p={3}
      background='#0F172A'
      w={{ base: '100%', md: '68%' }}
      h='90%'
      borderRadius='lg'
      borderWidth='1px'
    >
      <SingleChat />
    </Box>
  );
};

export default ChatBox;
