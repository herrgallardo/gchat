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
        <IconButton
          bg='blue.600'
          _hover={{ bg: 'blue.800' }}
          d={{ base: 'flex' }}
          icon={<ViewIcon />}
          onClick={onOpen}
        />
      )}
      <Modal size='lg' onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent className='h-96'>
          <ModalHeader
            className='flex justify-center text-white bg-blue-800 rounded-t'
            fontSize='40px'
            fontFamily='Prompt'
          >
            {user.username}
          </ModalHeader>
          <ModalCloseButton className='text-white' />
          <ModalBody className='flex flex-col items-center justify-between text-white bg-slate-900'>
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
          <ModalFooter className='rounded-b bg-slate-900'>
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
