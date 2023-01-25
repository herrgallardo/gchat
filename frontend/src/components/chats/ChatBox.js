import { Box } from '@chakra-ui/react';
import { ChatState } from '../../context/ChatProvider';
import SingleChat from './SingleChat';

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

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
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default ChatBox;
