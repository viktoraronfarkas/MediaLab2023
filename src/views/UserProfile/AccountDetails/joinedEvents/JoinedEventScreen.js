import React, { useEffect, useState } from 'react';

import JoinedEventsView from './JoinedEventsView';

/**
 * This is the main Joined Groups Screen.
 * The joined events of the user is fetched here.
 *
 */
export default function JoinedEventsScreen() {
  const [joinedEvents, setJoinedEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Perform API request to fetch maingroups
        const joinedEventsResponse = await fetch(
          'JOINEDEVENTS_API_ENDPOINT_URL'
        );
        const joinedEventsData = await joinedEventsResponse.json();

        // Update the state variable with the fetched subgroups
        setJoinedEvents(joinedEventsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <JoinedEventsView
      joinedEvents={joinedEvents}
      joinedEventKey
      joinedTotal
      title
      subTitle
      cardImage
    />
  );
}
