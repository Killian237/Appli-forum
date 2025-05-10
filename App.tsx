import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Accueil from './pages/Accueil';
import Forum from './pages/Forum';
import Register from './pages/Register';
import Login from './pages/Login';
import { Ionicons } from '@expo/vector-icons';
import { MessageProvider, useMessages } from './context/MessageContext';
import { UserProvider, useUser } from './context/UserContext'; 
import styles from './styles/AppStyles'; 

const API_URL = 'https://s4-8078.nuage-peda.fr/forum/api/messages?page=1';
const Tab = createBottomTabNavigator();

const App = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { setMessages } = useMessages();
  const { user, logout } = useUser();  // Utilisation du context pour accéder à l'utilisateur et à la fonction logout

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const result = await response.json();
        console.log('Réponse JSON:', result);

        if (result?.member) {
          setMessages(result.member);
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
              let iconName:
                | 'home-outline'
                | 'chatbox-ellipses-outline'
                | 'person-add-outline'
                | 'log-in-outline' =
                route.name === 'Accueil'
                  ? 'home-outline'
                  : route.name === 'Forum'
                  ? 'chatbox-ellipses-outline'
                  : route.name === 'Register'
                  ? 'person-add-outline'
                  : 'log-in-outline';

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#007bff',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          {/* Afficher Accueil et Forum seulement si l'utilisateur est connecté */}
          {user && <Tab.Screen name="Accueil" component={Accueil} />}
          {user && <Tab.Screen name="Forum" component={Forum} />}

          {/* Afficher Register et Login seulement si l'utilisateur n'est pas connecté */}
          {!user && <Tab.Screen name="Register" component={Register} />}
          {!user && <Tab.Screen name="Login" component={Login} />}
        </Tab.Navigator>
      </NavigationContainer>

      {/* Afficher le prénom de l'utilisateur connecté en haut à droite */}
      {user && (
        <View style={styles.userInfoContainer}>
          <Text style={styles.userName}>{user.prenom}</Text>
          <Button title="Logout" onPress={logout} /> 
        </View>
      )}
    </View>
  );
};

// Envelopper l'application avec le provider pour accéder au contexte
export default () => (
  <UserProvider>
    <MessageProvider>
      <App />
    </MessageProvider>
  </UserProvider>
);
