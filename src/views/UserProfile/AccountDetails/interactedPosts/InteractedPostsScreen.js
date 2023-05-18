import React, { useEffect, useState } from 'react';

import InteractedPostsView from './InteractedPostsView';

/**
 * This is the main Interacted Posts Screen
 * the interacted posts of the user is fetched here.
 */
export default function InteractedPostsScreen() {
  const [interactedPosts, setInteractedPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Perform API request to fetch maingroups
        const interactedPostsResponse = await fetch(
          'INTERACTEDPOSTS_API_ENDPOINT_URL'
        );
        const interactedPostsData = await interactedPostsResponse.json();

        // Update the state variable with the fetched subgroups
        setInteractedPosts(interactedPostsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <InteractedPostsView
      interactedPosts={interactedPosts}
      interactedPostKey
      title
      subTitle
      buttonText
      content
    />
  );
}
