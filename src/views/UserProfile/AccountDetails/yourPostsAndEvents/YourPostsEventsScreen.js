import React, { useEffect, useState } from 'react';
import YourPostsEventsView from './YourPostsEventsView';

/**
 * This is the main Your Posts Events Screen.
 * The joined events and the users posts are fetched here.
 */
export default function YourPostsEventsScreen() {
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [yourPosts, setYourPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Perform API request to fetch joinedEvents
        const joinedEventsResponse = await fetch(
          'JOINEDEVENTS_API_ENDPOINT_URL'
        );
        const joinedEventsData = await joinedEventsResponse.json();

        // Perform API request to fetch yourPosts
        const yourPostsResponse = await fetch('YOURPOSTS_API_ENDPOINT_URL');
        const yourPostsData = await yourPostsResponse.json();

        // Update the state variable with the fetched yourPosts
        setJoinedEvents(joinedEventsData);
        setYourPosts(yourPostsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <YourPostsEventsView
      // Joined Events
      joinedEvents={joinedEvents}
      joinedEventKey
      joinedTotal
      eventTitle
      eventSubTitle
      cardImage
      // Users Posts
      yourPosts={yourPosts}
      yourPostKey
      postTitle
      postSubTitle
      buttonText
      content
    />
  );
}
