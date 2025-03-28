import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

const API_URL = 'https://s4-8078.nuage-peda.fr/forum/api/messages?page=1'; // Remplace avec ton API

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const text = await response.text(); 
        console.log('Réponse brute:', text);
  
        // Vérifier si c'est bien du JSON
        const result = JSON.parse(text);
        setData(result);
      } catch (err: any) {
        setError(`Erreur: ${err.message}` as any);
        console.error('Erreur complète:', err);
      } finally {
        setLoading(false);
      }
    };
  

    fetchData();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Erreur: {error}</Text>;

  return (
    <View>
      <Text>Data: {JSON.stringify(data)}</Text>
    </View>
  );
};

export default App;
