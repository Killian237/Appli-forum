import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from "react-native";
import { useMessages } from "../context/MessageContext";
import * as ImagePicker from "expo-image-picker";
import styles from "../styles/AppStyles";
import { useUser } from "../context/UserContext";

export default function Forum() {
  const { messages, setMessages, forums } = useMessages();
  const [currentUser, setCurrentUser] = useState("Admin");
  const [message, setMessage] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [selectedForum, setSelectedForum] = useState<any>(null);
  const [nom, setNom] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailToAdd, setEmailToAdd] = useState("");
  const { user } = useUser();

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
        user: user ? { nom: user.nom, prenom: user.prenom } : {},
        contenu: message,
      };
      setMessages((prev) => [...prev, newMsg]);
      setMessage("");
      setImageUri(null);
    }
  };

  const handleCreateForum = async () => {
    if (!nom) {
      Alert.alert("Erreur", "Veuillez entrer un nom de forum.");
      return;
    }
    setLoading(true);
    if (!user) {
      Alert.alert("Erreur", "Utilisateur non connecté.");
      setLoading(false);
      return;
    }
    try {
      const response = await fetch(
        "https://s4-8078.nuage-peda.fr/forum/api/forums",
        {
          method: "POST",
          headers: {
            Accept: "application/ld+json",
            "Content-Type": "application/ld+json",
          },
          body: JSON.stringify({
            nom,
            user: `/forum/api/users/${user.id}`,
            created_at: new Date().toISOString(),
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.log("Erreur:", errorData);
        throw new Error("Erreur lors de la création du forum");
      }

      Alert.alert("Succès", "Forum créé avec succès !");
      setNom("");
    } catch (error: any) {
      Alert.alert("Erreur", error.message || "Une erreur s'est produite.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddUserByEmail = async () => {
    if (!emailToAdd || !selectedForum) {
      Alert.alert("Erreur", "Veuillez entrer un email valide.");
      return;
    }

    try {
      const res = await fetch(
        `https://s4-8078.nuage-peda.fr/forum/api/users?email=${emailToAdd}`
      );
      const data = await res.json();

      if (!data || !data["hydra:member"] || data["hydra:member"].length === 0) {
        Alert.alert("Erreur", "Utilisateur non trouvé.");
        return;
      }

      const userToAdd = data["hydra:member"][0];
      const forumId = selectedForum.id;

      const response = await fetch(
        `https://s4-8078.nuage-peda.fr/forum/api/forums/${forumId}`,
        {
          method: "PATCH",
          headers: {
            Accept: "application/ld+json",
            "Content-Type": "application/merge-patch+json",
          },
          body: JSON.stringify({
            users: [...(selectedForum.users || []), `/forum/api/users/${userToAdd.id}`],
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout de l'utilisateur.");
      }

      Alert.alert("Succès", "Utilisateur ajouté au forum !");
      setEmailToAdd("");
    } catch (err: any) {
      Alert.alert("Erreur", err.message || "Une erreur est survenue.");
    }
  };

  return (
    <View style={styles.container_forum}>
      {selectedForum ? (
        <>
          {/* Top bar : Retour + Ajout utilisateur */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 8,
              flexWrap: "wrap",
              gap: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => setSelectedForum(null)}
              style={[styles.backButton, { flexShrink: 0 }]}
            >
              <Text style={styles.backButtonText}>Retour</Text>
            </TouchableOpacity>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                flexShrink: 1,
                flexGrow: 1,
              }}
            >
              <TextInput
                style={{
                  flex: 1,
                  padding: 8,
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 8,
                  marginRight: 6,
                }}
                placeholder="Email à ajouter"
                value={emailToAdd}
                onChangeText={setEmailToAdd}
              />
              <TouchableOpacity
                onPress={handleAddUserByEmail}
                style={{
                  backgroundColor: "#4CAF50",
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  borderRadius: 8,
                }}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>Ajouter</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Messages */}
          <ScrollView style={styles.messagesContainer}>
            {messages && messages.length > 0 ? (
              messages.map((msg: any) => (
                <View key={msg.id} style={styles.messageBox}>
                  <Text style={styles.messageSender}>
                    Utilisateur : {msg.user?.nom} {msg.user?.prenom}
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

          {/* Envoi message */}
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
        <FlatList
          data={forums}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setSelectedForum(item)}>
              <View style={{ padding: 12, borderBottomWidth: 1, borderColor: "#eee" }}>
                <Text>{item.nom}</Text>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={<Text>Aucun forum pour l’instant.</Text>}
        />
      )}
    </View>
  );
}
