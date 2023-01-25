import { CloseIcon } from '@chakra-ui/icons';
import { Badge } from '@chakra-ui/react';

const UserBadgeItem = ({ user, handleFunction }) => {
  return (
    <Badge
      px={2}
      py={1}
      borderRadius='lg'
      m={1}
      mb={2}
      variant='solid'
      fontSize={12}
      backgroundColor='blue'
      color='white'
      cursor='pointer'
      onClick={handleFunction}
    >
      {user.username}

      <CloseIcon pl={1} />
    </Badge>
  );
};

export default UserBadgeItem;
