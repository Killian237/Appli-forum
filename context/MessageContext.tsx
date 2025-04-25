import React, { createContext, useState, useContext, ReactNode } from 'react';

interface MessageContextType {
  messages: any[];
  setMessages: React.Dispatch<React.SetStateAction<any[]>>;
}

// Création du contexte pour les messages
const MessageContext = createContext<MessageContextType | undefined>(undefined);

// Le Provider qui rendra le contexte accessible à l'ensemble de l'application
export const MessageProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<any[]>([]);

  return (
    <MessageContext.Provider value={{ messages, setMessages }}>
      {children}
    </MessageContext.Provider>
  );
};

// Hook pour accéder facilement au contexte dans les composants
export const useMessages = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessages must be used within a MessageProvider');
  }
  return context;
};
