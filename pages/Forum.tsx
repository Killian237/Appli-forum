import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, FlatList } from "react-native";
import { useMessages } from '../context/MessageContext'; // Import du hook useMessages pour accéder au contexte
import * as ImagePicker from "expo-image-picker";
import styles from "../styles/AppStyles";

export default function Forum() {
  const { messages, setMessages, forums } = useMessages(); // Accès au contexte
  const [currentUser, setCurrentUser] = useState("Admin");
  const [message, setMessage] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [selectedForum, setSelectedForum] = useState(null); // Forum sélectionné

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      base64: true,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const sendMessage = () => {
    if (message.trim() || imageUri) {
      const newMsg = {
        id: Date.now(),
        sender: currentUser,
        content: message,
        image: imageUri || undefined,
      };
      setMessages((prev) => [...prev, newMsg]); // Ajout du message au tableau via le contexte
      setMessage("");
      setImageUri(null);
    }
  };

  return (
    <View style={styles.container_forum}>
      {/* Affichage conditionnel */}
      {selectedForum ? (
        // Affichage des messages de l'API et du système de conversation
        <>
          {/* Bouton Retour */}
          <TouchableOpacity
            onPress={() => setSelectedForum(null)} // Réinitialise le forum sélectionné
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>Retour</Text>
          </TouchableOpacity>

          <ScrollView style={styles.messagesContainer}>
            {messages && messages.length > 0 ? (
              messages.map((msg: any) => (
                <View key={msg.id} style={styles.messageBox}>
                  <Text style={styles.messageSender}>
                    Utilisateur : {msg.user.nom} {msg.user.prenom}
                  </Text>
                  <Text>{msg.contenu}</Text>
                  {msg.image && (
                    <Image
                      source={{ uri: msg.image }}
                      style={styles.messageImage}
                      resizeMode="cover"
                    />
                  )}
                </View>
              ))
            ) : (
              <Text>Aucun message à afficher.</Text>
            )}
          </ScrollView>

          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Écrivez un message..."
              value={message}
              onChangeText={setMessage}
            />
            <TouchableOpacity onPress={pickImage} style={styles.iconButton}>
              <Text>📷</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
              <Text style={styles.sendButtonText}>Envoyer</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        // Affichage de la liste des forums
        <View style={{ flex: 1, padding: 20 }}>
          <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 20 }}>Forums</Text>
          <FlatList
            data={forums}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => setSelectedForum(item)}>
                <View style={{ padding: 12, borderBottomWidth: 1, borderColor: '#eee' }}>
                  <Text style={{ fontSize: 16 }}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            )}
            ListEmptyComponent={<Text>Aucun forum pour l’instant.</Text>}
          />
        </View>
      )}
    </View>
  );
}
