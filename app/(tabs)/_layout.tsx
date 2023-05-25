import React from 'react';
import { Tabs } from 'expo-router';
import { Button } from 'react-native';
import { signOut } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../config/FirebaseConfig';
import { useAuth } from '../../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

const TabsPage = () => {
  const { user, initialized } = useAuth();

  const doLogout = () => {
    signOut(FIREBASE_AUTH);
  };

  return (
    <Tabs>
      <Tabs.Screen
        name="groups"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Ionicons name="chatbubbles" size={size} color={color} />,
          tabBarLabel: 'Chat Groups',
        }}
        redirect={!user}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />,
          tabBarLabel: 'My Profile',
          headerTitle: 'My Profile',
          headerRight: () => <Button onPress={doLogout} title="Logout"></Button>,
        }}
        redirect={!user}
      />
    </Tabs>
  );
};

export default TabsPage;
