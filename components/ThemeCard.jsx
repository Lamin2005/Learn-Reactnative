import { StyleSheet, View, useColorScheme } from "react-native";
import Color from "../constant/Color";

const ThemeCard = ({ style, ...prop }) => {
  const colorScheme = useColorScheme();
  const theme = Color[colorScheme] || Color.light;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.secondary,
          borderColor: theme.border,
        },
        style,
      ]}
      {...prop}
    />
  );
};

export default ThemeCard;

const styles = StyleSheet.create({
  card: {
    width: "100%",
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,

    elevation: 3,
  },
});
