import { Slot, useRouter, useSegments } from 'expo-router';
import { AuthContext, AuthProvider } from '../context/AuthContext';
import { useContext, useEffect } from 'react';
import { Text } from 'react-native';

const InitialLayout = () => {
  const { user, initialized } = useContext(AuthContext);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (!initialized) return;

    const inTabsGroup = segments[0] === '(tabs)';

    if (user && !inTabsGroup) {
      router.replace('/groups');
    } else if (!user) {
      router.replace('/login');
    }
  }, [user, initialized]);

  return <>{initialized ? <Slot /> : <Text>Loading...</Text>}</>;
};

const RootLayout = () => {
  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
};

export default RootLayout;
