import { View, Text, StyleSheet, Pressable, ScrollView, Touchable, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { DocumentData, addDoc, collection, onSnapshot } from 'firebase/firestore';
import { FIRESTORE_DB } from '../../../config/FirebaseConfig';
import { useAuth } from '../../../context/AuthContext';
import { set } from 'react-native-reanimated';
import { Link } from 'expo-router';

const GroupsPage = () => {
  const [groupsCollectionRef, setGroupsCollectionRef] = useState(null);
  const [groups, setGroups] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const ref = collection(FIRESTORE_DB, 'groups');
    setGroupsCollectionRef(ref);

    const unsubscribe = onSnapshot(ref, (groups: DocumentData) => {
      console.log('Current groups in database: ', groups);
      const groupsData = groups.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      console.log('Current groups in database: ', groupsData);

      setGroups(groupsData);
    });

    return unsubscribe;
  }, []);

  const startGroup = async () => {
    try {
      await addDoc(groupsCollectionRef, {
        name: `Group #${Math.floor(Math.random() * 1000)}`,
        description: 'This is a chat group',
        creator: user.uid,
      });
    } catch (error) {
      console.log('error creating group', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {groups.map((group) => (
          <Link key={group.id} href={`/groups/${group.id}`} asChild>
            <TouchableOpacity style={styles.groupCard}>
              <Text>{group.name}</Text>
              <Text>{group.description}</Text>
            </TouchableOpacity>
          </Link>
        ))}
      </ScrollView>

      <Pressable style={styles.fab} onPress={startGroup}>
        <Ionicons name="add" size={24} color="white" />
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#03A9F4',
    borderRadius: 30,
    elevation: 8,
  },
  groupCard: {
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    elevation: 4,
  },
});

export default GroupsPage;
