import { ArrowBackIcon } from '@chakra-ui/icons';
import { Box, IconButton, Text } from '@chakra-ui/react';
import { getSender, getSenderFull } from '../../config/ChatLogics';
import { ChatState } from '../../context/ChatProvider';
import ProfileModal from '../modals/ProfileModal';
import UpdateGroupChatModal from '../modals/UpdateGroupChatModal';

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = ChatState();
  return (
    <>
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
                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                />
              </>
            )}
          </Text>
          <Box className='flex flex-col justify-end w-full h-full overflow-y-hidden rounded'></Box>
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
