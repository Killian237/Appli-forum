import React, { createContext, useState, useContext, ReactNode } from 'react';

interface MessageContextType {
  messages: any[];
  setMessages: React.Dispatch<React.SetStateAction<any[]>>;
  forums: any[]; // Nouvelle propriété
  setForums: React.Dispatch<React.SetStateAction<any[]>>; // Nouvelle propriété
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const MessageProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [forums, setForums] = useState<any[]>([]); // Nouveau state

  return (
    <MessageContext.Provider value={{ 
      messages, 
      setMessages,
      forums,
      setForums 
    }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessages = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessages must be used within a MessageProvider');
  }
  return context;
};