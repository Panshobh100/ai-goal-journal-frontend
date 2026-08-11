```jsx
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('goal-journal-user');

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    setCheckingAuth(false);
  }, []);

  async function login(email, password) {
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (!email || !password) {
      throw new Error('Email and password are required.');
    }

    const mockUser = {
      uid: 'demo-user',
      email,
    };

    localStorage.setItem('goal-journal-user', JSON.stringify(mockUser));
    setUser(mockUser);

    return mockUser;
  }

  async function register(email, password) {
    await new Promise((resolve) => setTimeout(resolve, 700));

    if (!email || !password) {
      throw new Error('Email and password are required.');
    }

    const mockUser = {
      uid: 'demo-user',
      email,
    };

    localStorage.setItem('goal-journal-user', JSON.stringify(mockUser));
    setUser(mockUser);

    return mockUser;
  }

  async function logout() {
    localStorage.removeItem('goal-journal-user');
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        checkingAuth,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return ctx;
}
```
