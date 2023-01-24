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
} from '@chakra-ui/react';

import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { ChatState } from '../../context/ChatProvider';
import ProfileModal from '../modals/ProfileModal';
import { useHistory } from 'react-router-dom';

const SideDrawer = () => {
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const { user } = ChatState();
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    history.push('/');
  };

  return (
    <div className='font-Prompt'>
      <Box className='flex place-content-center w-full pt-2.5  pb-1.5 pl-2.5 pr-2.5'>
        <div>
          <Logo></Logo>
        </div>
      </Box>
      <Box className='flex items-center justify-between w-full pt-2.5  pb-1.5 pl-2.5 pr-2.5 text-slate-800'>
        <Tooltip
          bg='white'
          fontFamily='Prompt'
          color='slate.800'
          label='Search users to chat'
          hasArrow
          placement='bottom-end'
        >
          <Button
            className='bg-white shadow-lg shadow-slate-400/75'
            variant='ghost'
            onClick={onOpen}
          >
            <img
              className='max-h-8'
              src='images/search.png'
              alt='search icon'
            ></img>
            <Text className='invisible px-4 pt-4 pb-4 md:visible'>
              Search User
            </Text>
          </Button>
        </Tooltip>
        <div>
          <Menu>
            <MenuButton className='p-1'>
              <BellIcon color='white' className='text-2xl'></BellIcon>
            </MenuButton>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size='sm'
                cursor='pointer'
                name={user.username}
                src={user.avatar}
              ></Avatar>
            </MenuButton>
            <MenuList>
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
          <div className='border-b-2'>
            <DrawerHeader>Search users</DrawerHeader>
          </div>
        </DrawerContent>
        <DrawerBody>
          <Input></Input>
        </DrawerBody>
      </Drawer>
    </div>
  );
};

export default SideDrawer;
