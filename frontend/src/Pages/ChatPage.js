import { ChatState } from '../context/ChatProvider';
import { Box } from '@chakra-ui/layout';
import SideDrawer from '../components/chats/SideDrawer';
import UserChats from '../components/chats/UserChats';
import ChatBox from '../components/chats/ChatBox';

const ChatPage = () => {
  const { user } = ChatState();

  return (
    <div className='w-full font-Prompt'>
      {user && <SideDrawer></SideDrawer>}
      <Box className='flex justify-between w-full p-10 h-91.5v'>
        {user && <UserChats></UserChats>}
        {user && <ChatBox></ChatBox>}
      </Box>
    </div>
  );
};

export default ChatPage;
