import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("goal-journal-user");

      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error("Failed to load saved user:", error);
      localStorage.removeItem("goal-journal-user");
    } finally {
      setCheckingAuth(false);
    }
  }, []);

  async function login(email, password) {
    if (!email || !password) {
      throw new Error("Email and password are required.");
    }

    await new Promise((resolve) => setTimeout(resolve, 500));

    const mockUser = {
      uid: "demo-user",
      email: email.trim(),
    };

    localStorage.setItem(
      "goal-journal-user",
      JSON.stringify(mockUser)
    );

    setUser(mockUser);

    return mockUser;
  }

  async function register(email, password) {
    if (!email || !password) {
      throw new Error("Email and password are required.");
    }

    await new Promise((resolve) => setTimeout(resolve, 500));

    const mockUser = {
      uid: "demo-user",
      email: email.trim(),
    };

    localStorage.setItem(
      "goal-journal-user",
      JSON.stringify(mockUser)
    );

    setUser(mockUser);

    return mockUser;
  }

  async function logout() {
    localStorage.removeItem("goal-journal-user");
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
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error(
      "useAuth must be used inside an AuthProvider"
    );
  }

  return context;
}