import { useColorScheme, Text, StyleSheet } from "react-native";
import Color from "../constant/Color";

export default function ThemeText({ style, ...prop }) {
  const colorScheme = useColorScheme();
  const theme = Color[colorScheme] || Color.light;

  return (
    <Text
      style={[
        styles.text,
        {
          color: theme.text,
        },
        style,
      ]}
      {...prop}
    />
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
