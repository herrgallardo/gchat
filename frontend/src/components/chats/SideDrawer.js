import { useState } from 'react';
import Logo from '../layout/Logo';

import {
  Avatar,
  Box,
  Tooltip,
  Button,
  Text,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Drawer,
  useDisclosure,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Input,
  Spinner,
} from '@chakra-ui/react';

import toast, { Toaster } from 'react-hot-toast';
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { ChatState } from '../../context/ChatProvider';
import ProfileModal from '../modals/ProfileModal';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import ChatLoading from '../functionality/ChatLoading';
import UserListItem from './UserListItem';
import { getSender } from '../../config/ChatLogics';
import NotificationBadge from 'react-notification-badge';
import { Effect } from 'react-notification-badge';

const SideDrawer = () => {
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const {
    user,
    setSelectedChat,
    chats,
    setChats,
    notification,
    setNotification,
  } = ChatState();
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    history.push('/');
  };

  const handleSearch = async () => {
    if (!search) {
      toast.error('Write something to search!', {
        position: 'top-left',
      });
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
      toast.error('Failed to load the search results!');
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post('/api/chat', { userId }, config);

      if (!chats.find((c) => c._id === data._id)) {
        setChats([data, ...chats]);
      }
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast.error('Failed to fetch the chat!');
    }
  };

  return (
    <div className='font-Prompt'>
      <Toaster></Toaster>
      <Box className='flex place-content-center w-full pt-2.5  pb-1.5 pl-2.5 pr-2.5'>
        <div>
          <Logo></Logo>
        </div>
      </Box>
      <Box className='flex items-center justify-between w-full pt-2.5  pb-1.5 pl-2.5 pr-2.5'>
        <Tooltip
          bg='white'
          fontFamily='Prompt'
          color='slategray.800'
          label='Search users to chat'
          hasArrow
          placement='bottom-end'
        >
          <Button
            size='lg'
            _hover={{
              bg: 'slategray.900',
              border: '1px',
              borderColor: 'white',
            }}
            variant='ghost'
            onClick={onOpen}
          >
            <img
              className='max-h-8'
              src='images/search.png'
              alt='search icon'
            ></img>
            <Text className='invisible px-4 pt-6 pb-6 mt-2 mb-2 font-normal text-white md:visible'>
              Search User
            </Text>
          </Button>
        </Tooltip>
        <div>
          <Menu>
            <MenuButton className='p-1'>
              <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              />
              <BellIcon color='white' className='text-2xl'></BellIcon>
            </MenuButton>
            <MenuList>
              {!notification.length && 'No new messages'}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              bg='slategray.800'
              as={Button}
              rightIcon={<ChevronDownIcon color='white' />}
            >
              <Avatar
                size='sm'
                cursor='pointer'
                name={user.username}
                src={user.avatar}
              ></Avatar>
            </MenuButton>
            <MenuList color='gray.800'>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>
                Logout{' '}
                <div>
                  <img
                    className='ml-4 max-h-6'
                    src='images/logout.png'
                    alt='logout icon'
                  ></img>
                </div>
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
      <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader
            fontWeight='normal'
            className='text-white border border-white font-Prompt bg-slate-900'
            borderBottomWidth='2px'
          >
            <div className='flex justify-center'>
              <div>Search users</div>
            </div>
          </DrawerHeader>
          <DrawerBody className='bg-slate-900'>
            <Box className='flex pt-4 pb-4'>
              <Input
                bg='white'
                mr={2}
                placeholder='Search user'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Search</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml='auto' d='flex' />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default SideDrawer;
