// App.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Accueil from './pages/Accueil';
import Forum from './pages/Forum';
import { Ionicons } from '@expo/vector-icons';
import { MessageProvider, useMessages } from './context/MessageContext';

const API_URL = 'https://s4-8078.nuage-peda.fr/forum/api/messages?page=1';

const Tab = createBottomTabNavigator();

const App = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { messages, setMessages } = useMessages(); // Utilisation du contexte pour les messages

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const result = await response.json();
        console.log('Réponse JSON:', result);

        if (result?.member) {
          setMessages(result.member); // Mise à jour des messages via le contexte
        } else {
          throw new Error('Données inattendues');
        }
      } catch (err: any) {
        setError(`Erreur: ${err.message}`);
        console.error('Erreur complète:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setMessages]);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Erreur: {error}</Text>;

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName: 'home-outline' | 'chatbox-ellipses-outline' =
                route.name === 'Accueil' ? 'home-outline' : 'chatbox-ellipses-outline';
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#007bff',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Accueil" component={Accueil} />
          <Tab.Screen name="Forum" component={Forum} />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
};

// Envelopper l'application avec le provider pour accéder au contexte
export default () => (
  <MessageProvider>
    <App />
  </MessageProvider>
);
