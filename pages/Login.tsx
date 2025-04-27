import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/AppStyles';
import { useUser } from '../context/UserContext';  // Importer useUser

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Utilisation de useUser pour mettre à jour l'utilisateur dans le contexte
  const { setUser } = useUser();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://s4-8078.nuage-peda.fr/forum/api/authentication_token', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log('Erreur de connexion :', errorData);
        throw new Error('Email ou mot de passe incorrect');
      }

      const data = await response.json();
      const token = data.token;
      const user = {
        id: data.data.id,
        nom: data.data.nom,
        prenom: data.data.prenom,
      };

      // Stockage du token et de l'utilisateur dans AsyncStorage
      await AsyncStorage.setItem('authToken', token);
      await AsyncStorage.setItem('userInfo', JSON.stringify(user));

      // Mise à jour de l'utilisateur dans le contexte
      setUser(user);

      Alert.alert('Succès', 'Connecté avec succès !');
      setEmail('');
      setPassword('');
    } catch (error: any) {
      Alert.alert('Erreur', error.message || "Une erreur s'est produite.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.registerContainer}>
      <Text style={styles.registerTitle}>Se connecter</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.registerInput}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.registerInput}
      />
      <Button title={loading ? 'Connexion...' : 'Se connecter'} onPress={handleLogin} disabled={loading} />
    </ScrollView>
  );
}
