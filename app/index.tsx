import { Redirect, useRouter } from 'expo-router';
import { AuthContext, AuthProvider } from '../context/AuthContext';
import { useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const InitialLayout = () => {
  const { user, initialized } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    console.log('StartPage');
    if (!initialized) return;

    console.log('FORWARD TO PAGE');

    if (user) {
      console.log('user exists, forward to inside');
      router.push('/(tabs)/groups');
    } else {
      console.log('user does not exist, forward to login');
      router.push('/(auth)/login');
    }
  }, [user, initialized]);

  return <View style={styles.container}>{initialized ? <></> : <Text>Loading...</Text>}</View>;
};

const StartPage = () => {
  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StartPage;
