import React, { useState } from 'react';
import { View, Text, Button, Modal, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { useMessages } from '../context/MessageContext';

export default function Accueil() {
  const { forums, setForums } = useMessages();
  const [modalVisible, setModalVisible] = useState(false);
  const [forumTitle, setForumTitle] = useState('');

  const handleCreateForum = () => {
    if (forumTitle.trim()) {
      setForums(prev => [
        ...prev,
        { id: Date.now(), title: forumTitle.trim() }
      ]);
      setForumTitle('');
      setModalVisible(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button title="Créer un forum" onPress={() => setModalVisible(true)} />

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={{
          flex: 1, justifyContent: 'center', alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.3)'
        }}>
          <View style={{
            backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%'
          }}> 
            <Text style={{ fontSize: 18, marginBottom: 10 }}>Titre du forum</Text>
            <TextInput
              placeholder="Titre"
              value={forumTitle}
              onChangeText={setForumTitle}
              style={{
                borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 20, borderRadius: 5
              }}
            />
            <Button title="Créer" onPress={handleCreateForum} />
            <Button title="Annuler" onPress={() => setModalVisible(false)} color="grey" />
          </View>
        </View>
      </Modal>

      <Text style={{ marginTop: 30, fontWeight: 'bold' }}>Forums créés :</Text>
      <FlatList
        data={forums}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{
            padding: 10, borderBottomWidth: 1, borderColor: '#eee'
          }}>
            <Text>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
}