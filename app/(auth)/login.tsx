import { Link } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth/react-native';
import React, { useState } from 'react';
import { View, StyleSheet, Image, TextInput, Button, Pressable, Text } from 'react-native';
import { FIREBASE_AUTH } from '../../config/FirebaseConfig';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('simon@galaxies.dev');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const user = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
      console.log('signed in');
    } catch (error) {
      console.error('There was an error logging in:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={{ uri: 'https://galaxies.dev/img/lockup.webp' }} // replace with your own image URL
      />
      <TextInput placeholder="simon@galaxies.dev" value={email} onChangeText={setEmail} style={styles.inputField} />
      <TextInput placeholder="password" value={password} onChangeText={setPassword} secureTextEntry style={styles.inputField} />
      <Button onPress={handleLogin} title="Login"></Button>

      <Link href="/register" asChild>
        <Pressable style={styles.button}>
          <Text>Don't have an account? Register</Text>
        </Pressable>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff',
  },
  button: {
    margin: 10,
    alignItems: 'center',
  },
});

export default Login;
