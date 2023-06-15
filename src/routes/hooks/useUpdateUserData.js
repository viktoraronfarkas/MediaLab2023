import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectedUserId } from '../../redux/features/mainSlice/mainSlice';

function useUpdateUserData() {
  const [userId, setUserId] = useState({});
  const currentSelectedUserId = useSelector(selectedUserId);

  const updateUser = async (updatedData) => {
    try {
      const response = await axios.put(
        `https://medialab-server.vercel.app/user/${currentSelectedUserId}`,
        updatedData
      );

      setUserId(response.data);
    } catch (error) {
      console.error('Error retrieving user data:', error);
      throw error;
    }
  };

  return { userId, updateUser };
}

export default useUpdateUserData;
