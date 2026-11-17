import { StyleSheet, Text, View } from "react-native";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import Color from "../constant/Color";
import "react-native-url-polyfill/auto";
import { UserProvider } from "../context/UserContext";
import { BookProvider } from "../context/BookContext";


const RootLayout = () => {
  const colorScheme = useColorScheme();
  const theme = Color[colorScheme] || Color.light;

  return (
    <UserProvider>
      <BookProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.primary,
          },
          headerTintColor: theme.text,
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="(auth)"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="(dashboard)"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="about"
          options={{
            title: "About",
          }}
        />
      </Stack>
      </BookProvider>
    </UserProvider>
  );
};

export default RootLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
