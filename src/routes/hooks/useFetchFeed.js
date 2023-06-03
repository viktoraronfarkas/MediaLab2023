import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {
  selectedUserId,
  IpAddress,
} from '../../redux/features/mainSlice/mainSlice';

// Custom hook for fetching user data
export default function useFetchUserData() {
  const clientIpAddress = useSelector(IpAddress);
  const userId = useSelector(selectedUserId);
  const [feed, setFeed] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          `http://${clientIpAddress}:3001/user/${userId}/feed`
        );
        setFeed(res.data);
      } catch (error) {
        console.error('Error retrieving feed:', error);
      }
    };

    fetchPosts();
  }, [clientIpAddress, userId]);

  return feed;
}
