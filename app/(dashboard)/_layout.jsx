import { Stack } from "expo-router";
import ProtectRoute from "../../components/auth/ProtectRoute";

const DashboardLayout = () => {
  return (
    <ProtectRoute>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="books/[id]" />
        <Stack.Screen name="editBook/[id]" />
      </Stack>
    </ProtectRoute>
  );
};

export default DashboardLayout;
