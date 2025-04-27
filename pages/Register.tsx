import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView } from 'react-native';
import styles from '../styles/AppStyles'; // 👈 Import des styles globaux

export default function Register() {
  const [email, setEmail] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !nom || !prenom || !password) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://s4-8078.nuage-peda.fr/forum/api/users', {
        method: 'POST',
        headers: {
          Accept: 'application/ld+json',
          'Content-Type': 'application/ld+json',
        },
        body: JSON.stringify({
          email,
          password,
          nom,
          prenom,
          dateInscription: new Date().toISOString(),
          roles: ['ROLE_USER'],
          messages: [],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log("Erreur:", errorData);
        throw new Error("Erreur lors de l'inscription");
      }

      Alert.alert("Succès", "Compte créé avec succès !");
      setEmail('');
      setNom('');
      setPrenom('');
      setPassword('');
    } catch (error: any) {
      Alert.alert("Erreur", error.message || "Une erreur s'est produite.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.registerContainer}>
      <Text style={styles.registerTitle}>Créer un compte</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.registerInput} />
      <TextInput placeholder="Nom" value={nom} onChangeText={setNom} style={styles.registerInput} />
      <TextInput placeholder="Prénom" value={prenom} onChangeText={setPrenom} style={styles.registerInput} />
      <TextInput
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.registerInput}
      />
      <Button title={loading ? "Chargement..." : "S'inscrire"} onPress={handleRegister} disabled={loading} />
    </ScrollView>
  );
}
