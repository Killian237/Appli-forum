import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import styles from "../styles/AppStyles";

const API_URL = "https://s4-8078.nuage-peda.fr/forum/api/messages?page=1";

interface Message {
  id: number;
  sender: string;
  content: string;
  image?: string;
}

export default function Forum() {
  const [users, setUsers] = useState<string[]>(["Admin"]);
  const [currentUser, setCurrentUser] = useState("Admin");
  const [newUser, setNewUser] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [imageUri, setImageUri] = useState<string | null>(null);

  const addUser = () => {
    if (newUser && !users.includes(newUser)) {
      setUsers([...users, newUser]);
      setNewUser("");
    }
  };

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
      const newMsg: Message = {
        id: Date.now(),
        sender: currentUser,
        content: message,
        image: imageUri || undefined,
      };
      setMessages((prev) => [...prev, newMsg]);
      setMessage("");
      setImageUri(null);
    }
  };

  return (
    <View style={styles.container_forum}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <Text style={styles.navbarTitle}>Forum</Text>
      </View>

      {/* Select User */}
      <ScrollView horizontal style={styles.userScroll}>
        {users
          .filter((user) => user !== "Admin")
          .map((user) => (
            <TouchableOpacity key={user}
              onPress={() => setCurrentUser(user)}
              style={[
                styles.userButton,
                currentUser === user && styles.userSelected,
              ]}
            >
              <Text style={styles.userButtonText}>{user}</Text>
            </TouchableOpacity>
          ))}
      </ScrollView>

      {/* Add User */}
      {/*}  <View style={styles.addUserRow}>
        <TextInput
          style={styles.input}
          placeholder="Ajouter un utilisateur"
          value={newUser}
          onChangeText={setNewUser}
        />
        <TouchableOpacity onPress={addUser} style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      {*/}
    

      {/* Messages */}
      <ScrollView style={styles.messagesContainer}>
        {messages.map((msg) => (
          <View key={msg.id} style={styles.messageBox}>
            <Text style={styles.messageSender}>{msg.sender} :</Text>
            <Text>{msg.content}</Text>
            {msg.image && (
              <Image
                source={{ uri: msg.image }}
                style={styles.messageImage}
                resizeMode="cover"
              />
            )}
          </View>
        ))}
      </ScrollView>

      {/* Message Input */}
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
    </View>
  );
}
