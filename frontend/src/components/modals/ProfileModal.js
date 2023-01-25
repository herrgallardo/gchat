import { ViewIcon } from '@chakra-ui/icons';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  IconButton,
  Text,
  Image,
} from '@chakra-ui/react';

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton d={{ base: 'flex' }} icon={<ViewIcon />} onClick={onOpen} />
      )}
      <Modal size='lg' onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent className='h-96'>
          <ModalHeader
            className='text-white bg-blue-800 rounded-t'
            fontSize='40px'
            fontFamily='Prompt'
            d='flex'
            justifyContent='center'
          >
            {user.username}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            d='flex'
            flexDir='column'
            alignItems='center'
            justifyContent='space-between'
          >
            <Image
              borderRadius='full'
              boxSize='150px'
              src={user.avatar}
              alt={user.username}
            />
            <Text fontSize={{ base: '28px', md: '30px' }} fontFamily='Prompt'>
              {user.email}
            </Text>
          </ModalBody>
          <ModalFooter className='shadow-lg shadow-slate-400/75'>
            <Button
              bg='blue.700'
              _hover={{ bg: 'blue.800', color: ' white' }}
              color='white'
              fontFamily='Prompt'
              onClick={onClose}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
