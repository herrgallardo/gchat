import { CloseIcon } from '@chakra-ui/icons';
import { Box } from '@chakra-ui/react';

const UserBadgeItem = ({ user, handleFunction }) => {
  return (
    <Box
      px={2}
      py={1}
      borderRadius='lg'
      m={1}
      mb={2}
      variant='solid'
      backgroundColor='blue'
      color='white'
      fontSize={12}
      cursor='pointer'
      onClick={handleFunction}
    >
      {user.username}

      <CloseIcon pl={1} />
    </Box>
  );
};

export default UserBadgeItem;
