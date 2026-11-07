import { StyleSheet, Text, View } from "react-native";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import Color from "../../constant/Color";

const RootLayout = () => {
  const colorScheme = useColorScheme();
  const theme = Color[colorScheme] || Color.light;

  return (
    <Stack
      screenOptions={{
        animation: "slide_from_right",
      }}
    >
      {" "}
      <Stack.Screen
        name="login"
        options={{
          animation: "fade",
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          animation: "slide_from_right",
        }}
      />
    </Stack>
  );
};

export default RootLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
