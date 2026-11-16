import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const DEMO_USERS = [
  {
    id: 'u1',
    name: 'Alex Rivera',
    email: 'alex.rivera@example.com',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    plan: 'Premium Individual',
    playlistsCount: 8,
    followingCount: 42
  },
  {
    id: 'u2',
    name: 'Emma Watson',
    email: 'emma.w@musiclover.org',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    plan: 'Premium Duo',
    playlistsCount: 15,
    followingCount: 128
  }
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('spotify_clone_user');
      return saved ? JSON.parse(saved) : DEMO_USERS[0]; // Logged in by default with demo user for instant smooth experience
    } catch {
      return DEMO_USERS[0];
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('spotify_clone_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('spotify_clone_user');
    }
  }, [user]);

  const login = (email, password, customData = null) => {
    const existing = DEMO_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    const newUser = existing || customData || {
      id: 'u_' + Date.now(),
      name: email.split('@')[0],
      email: email,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${email}`,
      plan: 'Premium Individual',
      playlistsCount: 3,
      followingCount: 12
    };
    setUser(newUser);
    setIsAuthModalOpen(false);
    return true;
  };

  const signup = (name, email, password) => {
    const newUser = {
      id: 'u_' + Date.now(),
      name: name || 'Music Fan',
      email: email,
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`,
      plan: 'Premium Individual',
      playlistsCount: 1,
      followingCount: 0
    };
    setUser(newUser);
    setIsAuthModalOpen(false);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
