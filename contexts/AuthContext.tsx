
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Типы-заглушки
type User = {
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
}

interface AuthContextType {
  currentUser: User | null;
  isAdmin: boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Локальное состояние без Firebase
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);

  const loginWithGoogle = async () => {
     console.log("Авторизация отключена в этой версии");
     // Можно раскомментировать для теста админки локально:
     // setCurrentUser({ displayName: "Admin", email: "admin@galagon.com", photoURL: "" });
     // setIsAdmin(true);
  };

  const logout = async () => {
     setCurrentUser(null);
     setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ currentUser, isAdmin, loginWithGoogle, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
