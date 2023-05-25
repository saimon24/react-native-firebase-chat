import { Stack } from 'expo-router';

const StackLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: 'Chat Groups',
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          headerTitle: 'Chat',
        }}
      />
    </Stack>
  );
};

export default StackLayout;
