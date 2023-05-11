import React from 'react';
import { Tabs } from 'expo-router';
import { Button } from 'react-native';
import { signOut } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../config/FirebaseConfig';

const TabsPage = () => {
  const doLogout = () => {
    console.log('logout');
    signOut(FIREBASE_AUTH);
  };
  return (
    <Tabs>
      <Tabs.Screen
        name="groups"
        options={{
          headerTitle: 'Chat Groups',
          headerRight: () => <Button onPress={doLogout} title="Logout"></Button>,
        }}
      />
    </Tabs>
  );
};

export default TabsPage;
