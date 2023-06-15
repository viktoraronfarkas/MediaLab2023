import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { selectedSubGroup } from '../../redux/features/mainSlice/mainSlice';

// Custom hook for fetching user data
export default function useFetchPosts() {
  const selectedSubGroupValue = useSelector(selectedSubGroup);
  const [posts, setPosts] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          `https://medialab-server.vercel.app/subgroup/${selectedSubGroupValue.subgroupId}/posts`
        );
        setPosts(res.data);
      } catch (error) {
        console.error('Error retrieving user data:', error);
      }
    };

    fetchPosts();
  }, [selectedSubGroupValue]);

  return posts;
}
