import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import styles from './styles/AppStyles'; // Importation du fichier de styles
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Accueil from './pages/Accueil';
import Forum from './pages/Forum';
import { Ionicons } from '@expo/vector-icons';

const API_URL = 'https://s4-8078.nuage-peda.fr/forum/api/messages?page=1';

const Tab = createBottomTabNavigator();

const App = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const result = await response.json();
        console.log('Réponse JSON:', result);

        if (result?.member) {
          setData(result);
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
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Erreur: {error}</Text>;

  return (
    <View style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <Text style={styles.navbarTitle}>Forum</Text>
      </View>

      {/* Body */}
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Messages:</Text>

        {data?.member ? (
          <FlatList
            data={data.member}  // Utilisez "member" pour accéder aux messages
            keyExtractor={(item) => item.id.toString()}  // Utilisez l'id comme clé unique
            renderItem={({ item }) => (
              <View style={styles.messageCard}>
                <Text style={styles.messageTitle}>{item.titre || 'Sans titre'}</Text>
                <Text>{item.contenu || 'Pas de contenu'}</Text>
              </View>
            )}
          />
        ) : (
          <Text>Aucun message trouvé.</Text>
        )}
      </View>
      {/* Nqvigqtion */}
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName: 'home-outline' | 'chatbox-ellipses-outline' = route.name === 'Accueil' ? 'home-outline' : 'chatbox-ellipses-outline';
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

export default App;
