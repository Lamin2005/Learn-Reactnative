import { StyleSheet, TextInput, View, useColorScheme } from "react-native";

import Color from "../constant/Color";

export default function ThemeInput({ style, ...props }) {
  const colorScheme = useColorScheme();
  const theme = Color[colorScheme] || Color.light;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
        },
      ]}
    >
      <TextInput
        placeholderTextColor={theme.textMuted || "#94a3b8"}
        style={[
          styles.input,
          {
            color: theme.text,
          },
          style,
        ]}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 16,
  },

  input: {
    height: 52,
    fontSize: 15,
  },
});
