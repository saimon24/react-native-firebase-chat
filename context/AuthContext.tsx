import { User, onAuthStateChanged } from 'firebase/auth';
import React, { useState, useEffect, createContext, PropsWithChildren } from 'react';
import { FIREBASE_AUTH } from '../config/FirebaseConfig';
import { useRouter, useSegments } from 'expo-router';

interface AuthProps {
  user?: any;
  initialized?: boolean;
}

export const AuthContext = createContext<AuthProps>({});

// This hook can be used to access the user info.
export function useAuth() {
  return React.useContext(AuthContext);
}

// This hook will protect the route access based on user authentication.
// function useProtectedRoute(user) {
//   const segments = useSegments();
//   const router = useRouter();

//   React.useEffect(() => {
//     console.log('UISE EFFECT CHANGE: ', segments);
//     console.log('user here: ', user);

//     const inTabsGroup = segments[0] === '(tabs)';
//     console.log('inTabsGroup:', inTabsGroup);

//     if (!user && inTabsGroup) {
//       console.log('redirect to sign in');

//       // Redirect to the sign-in page.
//       router.replace('/login');
//     } else if (user && !inTabsGroup) {
//       console.log('redirect to inside');

//       // Redirect away from the sign-in page.
//       router.replace('/groups');
//     }
//   }, [user, segments]);
// }

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User>();
  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    console.log('AuthProvider');

    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('AUTHENTICATED: ', user && user.email);
      setUser(user);
      setInitialized(true);
    });
  }, []);

  const value = {
    user,
    initialized,
  };

  // useProtectedRoute(user);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
