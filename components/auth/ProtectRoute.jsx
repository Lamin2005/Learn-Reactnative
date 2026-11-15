import { useEffect } from "react";
import { router } from "expo-router";
import { useUser } from "../../hooks/useUser";
import Loading from "../../components/Loading";

const ProtectRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isLoading, isAuthenticated]);

  if (isLoading || !isAuthenticated) {
    return <Loading />;
  }

  return children;
};

export default ProtectRoute;
