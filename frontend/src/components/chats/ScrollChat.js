import { Avatar, Badge, Box } from '@chakra-ui/react';
import ScrollableFeed from 'react-scrollable-feed';
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from '../../config/ChatLogics';
import { ChatState } from '../../context/ChatProvider';

const ScrollChat = ({ messages }) => {
  const { user } = ChatState();

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: 'flex' }} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Box>
                <Avatar
                  mt='11px'
                  mr={1}
                  size='sm'
                  name={m.sender.username}
                  src={m.sender.avatar}
                />
                <Badge mt={4} ml={1.5} mr={5} fontSize='0.8rem'>
                  {m.sender.username}
                </Badge>
              </Box>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? '#2596be' : '#25be32'
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 10 : 30,
                borderRadius: '13px',
                padding: '5px 15px',
                maxWidth: '75%',
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollChat;
