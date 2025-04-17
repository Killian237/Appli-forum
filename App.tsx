import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Accueil from './pages/Accueil';
import Forum from './pages/Forum';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
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
  );
};

export default App;
