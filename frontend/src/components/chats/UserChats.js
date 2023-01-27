import { useEffect, useState } from 'react';
import { ChatState } from '../../context/ChatProvider';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { Box, Button, Stack, Text } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import ChatLoading from '../functionality/ChatLoading';
import { getSender } from '../../config/ChatLogics';
import GroupChatModal from '../modals/GroupChatModal';

const UserChats = () => {
  const {
    user,
    selectedChat,
    setSelectedChat,
    chats,
    setChats,
    fetchAgain,
    loggedUser,
    setLoggedUser,
  } = ChatState();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get('/api/chat', config);
      setChats(data);
    } catch (error) {
      toast.error('Failed to load the chats!', {
        position: 'top-left',
      });
    }
  };

  useEffect(() => {
    fetchChats();
  }, [chats]);

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem('userInfo')));
    fetchChats();
  }, [fetchAgain]);

  return (
    <Box
      className={`flex flex-col items-center shadow-lg md:flex shadow-slate-400/75 ${
        selectedChat ? 'hidden' : 'flex'
      }`}
      p={3}
      bg='slategray-800'
      w={{ base: '100%', md: '31%' }}
      h='90%'
      borderRadius='lg'
      borderWidth='1px'
    >
      <Toaster></Toaster>

      <Box
        className='flex text-[28px] pb-3 px-3 md:text-[30px] flex-wrap justify-between w-full font-Prompt'
        alignItems='center'
        color='white'
      >
        <Text className=''>Your chats</Text>
        <GroupChatModal>
          <Button
            className='shadow-lg shadow-slate-400/75'
            background='#1E40AF'
            d='flex'
            fontSize={{ base: '17px', md: '10px', lg: '17px' }}
            fontWeight='normal'
            _hover={{
              bg: 'blue.900',
            }}
            rightIcon={<AddIcon />}
          >
            New chat room
          </Button>
        </GroupChatModal>
      </Box>

      <Box
        d='flex'
        flexDir='column'
        p={3}
        bg='#0F172A'
        w='100%'
        h='80%'
        borderRadius='lg'
        overflowY='hidden'
      >
        {chats ? (
          <Stack overflowY='scroll'>
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor='pointer'
                bg={selectedChat === chat ? '#1E40AF' : '#E8E8E8'}
                color={selectedChat === chat ? 'white' : 'black'}
                px={3}
                py={2}
                borderRadius='lg'
                key={chat._id}
              >
                <Text>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default UserChats;
