import { View, FlatList, StyleSheet, Button, TextInput, Text, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { useSearchParams } from 'expo-router';
import { DocumentData, addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../../config/FirebaseConfig';
import { useAuth } from '../../../context/AuthContext';

const ChatPage = () => {
  const { id } = useSearchParams<{ id: string }>();
  const { user } = useAuth();
  const [messages, setMessages] = useState<DocumentData[]>([]);
  const [message, setMessage] = useState<string>('');

  useLayoutEffect(() => {
    const msgCollectionRef = collection(FIRESTORE_DB, `groups/${id}/messages`);
    const q = query(msgCollectionRef, orderBy('createdAt', 'asc'));

    const unsubscribe = onSnapshot(q, (groups: DocumentData) => {
      const messages = groups.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setMessages(messages);
    });

    return unsubscribe;
  }, []);

  const sendMessage = async () => {
    const msg = message.trim();
    if (msg.length === 0) return;

    const msgCollectionRef = collection(FIRESTORE_DB, `groups/${id}/messages`);

    await addDoc(msgCollectionRef, {
      message: msg,
      sender: user.uid,
      createdAt: serverTimestamp(),
    });

    setMessage('');
  };

  const renderMessage = ({ item }: { item: DocumentData }) => {
    const myMessage = item.sender === user.uid;

    return (
      <View style={[styles.messageContainer, myMessage ? styles.userMessageContainer : styles.otherMessageContainer]}>
        <Text style={styles.messageText}>{item.message}</Text>
        <Text style={styles.time}>{item.createdAt?.toDate().toLocaleDateString()}</Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={100}>
      <FlatList data={messages} keyExtractor={(item) => item.id} renderItem={renderMessage} />
      <View style={styles.inputContainer}>
        <TextInput multiline value={message} onChangeText={(text) => setMessage(text)} placeholder="Type a message" asd style={styles.messageInput} />
        <Button disabled={message === ''} title="Send" onPress={sendMessage} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    gap: 10,
    backgroundColor: '#fff',
  },
  messageInput: {
    flex: 1,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  messageContainer: {
    padding: 10,
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    maxWidth: '80%',
  },
  userMessageContainer: {
    backgroundColor: '#dcf8c6',
    alignSelf: 'flex-end',
  },
  otherMessageContainer: {
    backgroundColor: '#fff',
  },
  messageText: {
    fontSize: 16,
  },
  time: {
    fontSize: 12,
    color: '#777',
    alignSelf: 'flex-end',
  },
});

export default ChatPage;
