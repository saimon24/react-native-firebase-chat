import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth/react-native';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Initialize Firebase with your config
const firebaseConfig = {
  apiKey: 'AIzaSyB5ZbtG-qFm5un5FvjZY8A5U02jenvLSUE',
  authDomain: 'rn-chat-14276.firebaseapp.com',
  projectId: 'rn-chat-14276',
  storageBucket: 'rn-chat-14276.appspot.com',
  messagingSenderId: '330355090684',
  appId: '1:330355090684:web:6e4160a6e76fd0342b2379',
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage),
});
