import React, { useState, useEffect } from 'react';
import { View, Text, Button, Modal, TextInput, FlatList, Alert, TouchableOpacity } from 'react-native';
import { useMessages } from '../context/MessageContext';
import { useUser } from '../context/UserContext';

export default function Accueil() {
  const { forums, setForums } = useMessages();
  const [modalVisible, setModalVisible] = useState(false);
  const [forumTitle, setForumTitle] = useState('');
  const { user } = useUser();

  // Filtrer les forums pour n'afficher que ceux créés par l'utilisateur connecté
  const userForums = forums.filter(
    (item) =>
      item.user &&
      user &&
      (
        (typeof item.user === 'object' && item.user.id === user.id) ||
        (typeof item.user === 'string' && item.user.endsWith(`/${user.id}`))
      )
  );

  const handleCreateForum = async () => {
    if (!forumTitle.trim()) return;

    if (!user) {
      Alert.alert("Erreur", "Vous devez être connecté pour créer un forum.");
      return;
    }

    try {
      const response = await fetch('https://s4-8078.nuage-peda.fr/forum/api/forums', {
        method: 'POST',
        headers: {
          Accept: 'application/ld+json',
          'Content-Type': 'application/ld+json',
        },
        body: JSON.stringify({
          nom: forumTitle.trim(),
          user: `/forum/api/users/${user.id}`,
          createdAt: new Date().toISOString()
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log("Erreur:", errorData);
        throw new Error("Erreur lors de la création du forum");
      }

      const newForum = await response.json();
      setForums(prev => [...prev, newForum]);
      setForumTitle('');
      setModalVisible(false);
      Alert.alert("Succès", "Forum créé avec succès !");
    } catch (error: any) {
      Alert.alert("Erreur", error.message || "Une erreur s'est produite.");
    }
  };

  const handleDeleteForum = async (forumId: number) => {
    try {
      const response = await fetch(`https://s4-8078.nuage-peda.fr/forum/api/forums/${forumId}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/ld+json',
          'Content-Type': 'application/ld+json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log("Erreur:", errorData);
        throw new Error("Erreur lors de la suppression du forum");
      }

      setForums(prev => prev.filter(f => f.id !== forumId));
      Alert.alert("Succès", "Forum supprimé avec succès !");
    } catch (error: any) {
      Alert.alert("Erreur", error.message || "Une erreur s'est produite.");
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
        data={userForums}
        keyExtractor={item => (item.id || item['@id'] || Math.random().toString())}
        renderItem={({ item }) => (
          <View style={{
            padding: 10, borderBottomWidth: 1, borderColor: '#eee', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
          }}>
            <Text>{item.nom || item.title}</Text>
            {/* Affiche le bouton supprimer seulement si c'est le créateur */}
            {item.user && user && (
              (typeof item.user === 'object' && item.user.id === user.id) ||
              (typeof item.user === 'string' && item.user.endsWith(`/${user.id}`))
            ) && (
              <TouchableOpacity
                onPress={() => handleDeleteForum(item.id)}
                style={{ backgroundColor: 'red', padding: 6, borderRadius: 5 }}
              >
                <Text style={{ color: 'white' }}>Supprimer</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </View>
  );
}