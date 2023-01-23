import { useState } from 'react';
import { ChatState } from '../../context/ChatProvider';
import axios from 'axios';

const UserChats = () => {
  const [loggedUser, setLoggedUser] = useState();
  const { user, selectedChats, setSelectedChats, chats, setChats } =
    ChatState();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get('/api/chat', config);
    } catch (error) {}
  };

  return <div>UserChats</div>;
};

export default UserChats;
