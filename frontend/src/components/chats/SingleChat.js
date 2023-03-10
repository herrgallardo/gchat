import { ArrowBackIcon } from '@chakra-ui/icons';
import {
  Box,
  FormControl,
  IconButton,
  Input,
  Spinner,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { getSender, getSenderFull } from '../../config/ChatLogics';
import { ChatState } from '../../context/ChatProvider';
import ProfileModal from '../modals/ProfileModal';
import UpdateGroupChatModal from '../modals/UpdateGroupChatModal';
import ScrollChat from './ScrollChat';
import Lottie from 'lottie-react';
import typingAnimation from '../functionality/animations/typingAnimation.json';

import io from 'socket.io-client';
const ENDPOINT = 'http://localhost:5000';
let socket, selectedChatCompare;

const SingleChat = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState();
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const {
    user,
    selectedChat,
    setSelectedChat,
    notification,
    setNotification,
    fetchAgain,
    setFetchAgain,
  } = ChatState();

  const fetchMessages = async () => {
    if (!selectedChat) {
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );

      setMessages(data);
      setLoading(false);
      socket.emit('join chat', selectedChat._id);
    } catch (error) {
      toast.error('Failed to load the messages');
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit('setup', user);
    socket.on('connected', () => setSocketConnected(true));
    socket.on('typing', () => setIsTyping(true));
    socket.on('no typing', () => setIsTyping());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat]);

  useEffect(() => {
    socket.on('message received', (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        if (!notification.includes(newMessageReceived)) {
          setNotification([newMessageReceived, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
  });

  const sendMessage = async (event) => {
    if (event.key === 'Enter' && newMessage) {
      socket.emit('no typing', selectedChat._id);
      try {
        const config = {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        };

        setNewMessage('');
        const { data } = await axios.post(
          '/api/message',
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );

        socket.emit('new message', data);
        setMessages([...messages, data]);
      } catch (error) {
        toast.error('Failed to send the message');
      }
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) {
      return;
    }

    if (socketConnected) {
      if (!typing) {
        setTyping(true);
        socket.emit('typing', selectedChat._id);
      }
    }

    let latestKeyboardStroke = new Date().getTime();
    let timer = 3000;

    setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeOffset = timeNow - latestKeyboardStroke;

      if (timeOffset >= timer && typing) {
        socket.emit('no typing', selectedChat._id);
        setTyping(false);
      }
    }, timer);
  };

  return (
    <>
      <Toaster></Toaster>
      {selectedChat ? (
        <>
          <Text className='flex text-[20px] md:text-[30px] pb-3 px-2 w-full font-Prompt items-center justify-between'>
            <IconButton
              bg='blue.600'
              _hover={{ bg: 'blue.800' }}
              d={{ base: 'flex', md: 'none' }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat('')}
            />
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <ProfileModal user={getSenderFull(user, selectedChat.users)} />
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModal fetchMessages={fetchMessages} />
              </>
            )}
          </Text>
          <Box className='flex flex-col justify-end w-full h-full overflow-y-hidden rounded'>
            {loading ? (
              <Spinner
                size='xl'
                w={20}
                h={20}
                alignSelf='center'
                margin='auto'
              />
            ) : (
              <div className='flex flex-col overflow-y-scroll'>
                <ScrollChat messages={messages} />
              </div>
            )}
            <FormControl onKeyDown={sendMessage} isRequired mt={3}>
              {isTyping ? (
                <div className='w-20'>
                  <Lottie animationData={typingAnimation} />
                </div>
              ) : null}
              <Input
                variant='filled'
                bg='#E0E0E0'
                placeholder='Enter a message...'
                value={newMessage}
                onChange={typingHandler}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box className='flex items-center justify-center h-full pb-3 font-Prompt'>
          <Text fontSize='3xl' pb={3}>
            Choose a user or chat room to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
