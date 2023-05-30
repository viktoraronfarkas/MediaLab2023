import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {
  selectedUser,
  IpAddress,
} from '../../redux/features/mainSlice/mainSlice';

// Custom hook for fetching user data
export default function useFetchUserData() {
  const currentUser = useSelector(selectedUser);
  const clientIpAddress = useSelector(IpAddress);
  const [userData, setUserData] = useState({});
  const [imageUpload, setImage] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://${clientIpAddress}:3001/user/${currentUser.user_id}`
        );

        // Convert Blob to Base64 string
        const blobProfileImage = `data:image/png;base64,${response.data.profile_image}`;
        setImage(blobProfileImage);
        setUserData(response.data);
      } catch (error) {
        console.error('Error retrieving user data:', error);
      }
    };

    fetchUserData();
  }, [clientIpAddress, currentUser]);

  return { userData, imageUpload };
}