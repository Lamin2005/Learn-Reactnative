import { createContext, useContext, useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

const UserContext = createContext(null);

const USER_STORAGE_KEY = "book_app_user";

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore user when app starts
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem(USER_STORAGE_KEY);

        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.log("Failed to load user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  // Login / Set user
  const login = async (userData) => {
    try {
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));

      setUser(userData);
    } catch (error) {
      console.log("Login error:", error);
      throw error;
    }
  };

  // Register / Set user
  const register = async (userData) => {
    await login(userData);
  };

  // Update user information
  const updateUser = async (updatedData) => {
    try {
      const newUser = {
        ...user,
        ...updatedData,
      };

      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));

      setUser(newUser);
    } catch (error) {
      console.log("Update user error:", error);
      throw error;
    }
  };

  // Logout
  const logout = async () => {
    try {
      await AsyncStorage.removeItem(USER_STORAGE_KEY);
      setUser(null);
    } catch (error) {
      console.log("Logout error:", error);
      throw error;
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Custom hook
export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used inside UserProvider");
  }

  return context;
};
