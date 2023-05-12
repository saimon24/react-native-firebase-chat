import React from 'react';
import { Tabs } from 'expo-router';
import { Button } from 'react-native';
import { signOut } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../config/FirebaseConfig';
import { useAuth } from '../../context/AuthContext';

const TabsPage = () => {
  const { user, initialized } = useAuth();

  const doLogout = () => {
    signOut(FIREBASE_AUTH);
  };

  return (
    <Tabs>
      <Tabs.Screen
        redirect={!user}
        name="groups"
        options={{
          headerTitle: 'Chat Groups',
          headerRight: () => <Button onPress={doLogout} title="Logout"></Button>,
        }}
      />
      <Tabs.Screen
        redirect={!user}
        name="profile"
        options={{
          headerTitle: 'My Profile',
          headerRight: () => <Button onPress={doLogout} title="Logout"></Button>,
        }}
      />
    </Tabs>
  );
};

export default TabsPage;
