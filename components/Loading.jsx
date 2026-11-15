import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useColorScheme } from "react-native";
import Color from "../constant/Color";

const Loading = ({ message = "Loading..." }) => {
  const colorScheme = useColorScheme();
  const theme = Color[colorScheme] || Color.light;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ActivityIndicator size="large" color={theme.primary} />

      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    gap: 14,
  },
  text: {
    fontSize: 14,
    color: "#64748b",
    fontWeight: "500",
  },
});
