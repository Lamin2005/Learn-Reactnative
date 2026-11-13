
import { createContext, useState } from "react";
import { account } from "../lib/appwrite";
import { ID } from "react-native-appwrite";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Login
  const login = async (userData) => {
    try {
      setIsLoading(true);

      await account.createEmailPasswordSession({
        email: userData.email,
        password: userData.password,
      });

      const userDetails = await account.get();

      setUser(userDetails);

      return userDetails;
    } catch (error) {
      console.log("Login Error:", error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Register
  const register = async (userData) => {
    try {
      setIsLoading(true);

      await account.create({
        userId: ID.unique(),
        email: userData.email,
        password: userData.password,
        name: userData.name,
      });

      // Automatically login after registration
      await account.createEmailPasswordSession({
        email: userData.email,
        password: userData.password,
      });

      const userDetails = await account.get();

      setUser(userDetails);

      return userDetails;
    } catch (error) {
      console.log("Registration Error:", error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Update user
  const updateUser = async (updatedData) => {
    setUser((prev) => ({
      ...prev,
      ...updatedData,
    }));
  };

  // Logout
  const logout = async () => {
    try {
      setIsLoading(true);

      await account.deleteSession({
        sessionId: "current",
      });

      setUser(null);
    } catch (error) {
      console.log("Logout Error:", error.message);
      throw error;
    } finally {
      setIsLoading(false);
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

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
