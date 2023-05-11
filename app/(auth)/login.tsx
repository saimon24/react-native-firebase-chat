import { View, Text } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

const login = () => {
  return (
    <View>
      <Text>login</Text>
      <Link href={'/register'}>register</Link>
      <Link href={'/(tabs)/groups'}>Groups</Link>
    </View>
  );
};

export default login;
