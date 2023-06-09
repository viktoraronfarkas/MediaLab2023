import React, { useEffect, useState } from 'react';
import firebase from '../../../config';
import ScreenNavigation from './ScreenNavigation';

// TODO DELETE
export default function UserAuthentication() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    // Handle user state changes
    function onAuthStateChanged() {
      if (user && user.emailVerified) {
        setUser(user);
      } else {
        setUser(null);
      }
      if (initializing) setInitializing(false);
    }
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [initializing, user]);

  if (initializing) return null;

  if (!user) {
    return <ScreenNavigation />;
  }
}
