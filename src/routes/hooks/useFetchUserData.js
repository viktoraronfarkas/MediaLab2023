import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  selectedUser,
  IpAddress,
} from '../../redux/features/mainSlice/mainSlice';

function useFetchUserData() {
  const [userId, setUserId] = useState({});
  const currentUser = useSelector(selectedUser);
  const clientIpAddress = useSelector(IpAddress);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://${clientIpAddress}:3001/user/${currentUser.user_id}`
        );

        setUserId(response.data);
      } catch (error) {
        console.error('Error retrieving user data:', error);
      }
    };

    fetchUserData();
  }, [clientIpAddress, currentUser.user_id]);

  return userId;
}

export default useFetchUserData;
