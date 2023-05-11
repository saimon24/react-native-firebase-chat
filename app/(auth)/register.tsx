import { UserCredential, createUserWithEmailAndPassword } from 'firebase/auth/react-native';
import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, ActivityIndicator } from 'react-native';
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../config/FirebaseConfig';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';

const Register = () => {
  const [username, setUsername] = useState('GalacticHero');
  const [email, setEmail] = useState('simon@galaxies.dev');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);

  const handleRegistration = async () => {
    try {
      setLoading(true);
      const user = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
      createUserInformation(user);
    } catch (error) {
      console.error('There was an error logging in:', error);
    } finally {
      setLoading(false);
    }
  };

  const createUserInformation = async (user: UserCredential) => {
    try {
      const docRef = await setDoc(doc(FIRESTORE_DB, `users/${user.user.uid}`), {
        username,
        email: user.user.email,
      });
    } catch (error) {
      console.error('There was an error creating user information:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="GalacticHero42" value={username} onChangeText={setUsername} style={styles.inputField} />

      <TextInput placeholder="simon@galaxies.dev" value={email} onChangeText={setEmail} style={styles.inputField} />
      <TextInput placeholder="password" value={password} onChangeText={setPassword} secureTextEntry style={styles.inputField} />

      {loading ? <ActivityIndicator /> : <Button onPress={handleRegistration} title="Create free account"></Button>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
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
});

export default Register;
