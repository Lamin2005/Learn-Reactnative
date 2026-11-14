import { useEffect } from "react";
import { router } from "expo-router";
import { useUser } from "../hooks/useUser";

const ProtectRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isLoading, isAuthenticated]);

  if (isLoading || !isAuthenticated) {
    return null;
  }

  return children;
};

export default ProtectRoute;
