import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Interface utilisateur
interface User {
  id: number;
  nom: string;
  prenom: string;
  roles: string[];
}

interface UserContextType {
  user: User | null;  // Définir que user peut être un objet de type User ou null
  setUser: (user: User | null) => void;
  logout: () => void;  // Fonction de déconnexion
}

// Création du contexte utilisateur
const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// Ajouter le type pour les enfants du provider
interface UserProviderProps {
  children: ReactNode;
}

// Provider du contexte utilisateur
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Récupérer l'utilisateur depuis AsyncStorage au démarrage de l'application
  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await AsyncStorage.getItem('userInfo');
      if (userInfo) {
        setUser(JSON.parse(userInfo)); // Récupère les informations utilisateur stockées
      }
    };
    fetchUser();
  }, []);

  // Fonction pour se déconnecter
  const logout = async () => {
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('userInfo');  
    setUser(null); 
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
