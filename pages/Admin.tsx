import React from 'react';
import { View, Text, FlatList, Alert, TouchableOpacity } from 'react-native';
import { useMessages } from '../context/MessageContext';
import { useUser } from '../context/UserContext';
import styles from '../styles/AppStyles';

export default function Admin() {
  const { forums, setForums } = useMessages();
  const { user } = useUser();

  const isAdmin = user?.roles.includes("ROLE_ADMIN");

  if (!isAdmin) {
    return <Text style={{ padding: 20 }}>Accès refusé : vous n'êtes pas administrateur.</Text>;
  }

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
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Gestion des forums</Text>
      <FlatList
        data={forums}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{
            padding: 10,
            borderBottomWidth: 1,
            borderColor: '#ccc',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <Text>{item.nom}</Text>
            <TouchableOpacity
              onPress={() => handleDeleteForum(item.id)}
              style={{ backgroundColor: 'red', padding: 6, borderRadius: 5 }}
            >
              <Text style={{ color: 'white' }}>Supprimer</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
