import { Pressable, StyleSheet, useColorScheme } from "react-native";

import Color from "../constant/Color";

const ThemeButton = ({
  style,

  ...prop
}) => {
  const colorScheme = useColorScheme();
  const theme = Color[colorScheme] || Color.light;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: theme.button },
        pressed && styles.buttonPressed,
      ]}
      {...prop}
    />
  );
};

export default ThemeButton;

const styles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#2563eb",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },

  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
});
