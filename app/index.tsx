import { Redirect } from 'expo-router';

const StartPage = () => {
  return <Redirect href="/(auth)/login" />;
};

export default StartPage;
