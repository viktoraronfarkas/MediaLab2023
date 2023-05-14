import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCsEhWW1v_pNSwqFpI3qe4YPyFfi01N-90',
  authDomain: 'uasync-8e7a4.firebaseapp.com',
  projectId: 'uasync-8e7a4',
  storageBucket: 'uasync-8e7a4.appspot.com',
  messagingSenderId: '977580330322',
  appId: '1:977580330322:web:73029818630a6167a93e8b',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
