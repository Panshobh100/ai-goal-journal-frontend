import { createContext, useContext, useEffect, useState } from "react";
import { setAuthTokenProvider } from "../services/api";

const AuthContext = createContext(null);

// Firebase is only wired up when real config is present in the environment.
// Until then the app keeps using the existing local (mock) auth session and
// API requests are sent without an Authorization header, so the backend's
// documented local-development fallback UID applies. No fake tokens are used.
const FIREBASE_CONFIGURED = Boolean(
  import.meta.env.VITE_FIREBASE_API_KEY &&
  import.meta.env.VITE_FIREBASE_PROJECT_ID &&
  import.meta.env.VITE_FIREBASE_APP_ID
);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Register the API auth-token provider. When a genuine Firebase Auth user
  // exists, requests send: Authorization: Bearer <await user.getIdToken()>.
  useEffect(() => {
    if (!FIREBASE_CONFIGURED) {
      setAuthTokenProvider(null);
      return;
    }

    let cancelled = false;

    import("../firebase")
      .then(({ auth }) => {
        if (cancelled) return;
        setAuthTokenProvider(async () => {
          const firebaseUser = auth.currentUser;
          return firebaseUser ? firebaseUser.getIdToken() : null;
        });
      })
      .catch((error) => {
        console.error("Firebase auth unavailable:", error);
        setAuthTokenProvider(null);
      });

    return () => {
      cancelled = true;
      setAuthTokenProvider(null);
    };
  }, []);

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