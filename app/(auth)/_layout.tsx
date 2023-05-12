import React from 'react';
import { Stack } from 'expo-router';

const authLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}></Stack.Screen>
      <Stack.Screen
        name="(auth)/login"
        options={{
          headerShown: false,
        }}></Stack.Screen>
      <Stack.Screen
        name="(auth)/register"
        options={{
          headerTitle: 'Create Account',
        }}></Stack.Screen>
    </Stack>
  );
};

export default authLayout;
