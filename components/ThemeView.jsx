import { StyleSheet, Text, View } from "react-native";
import { useColorScheme } from "react-native";
import Color from "../constant/Color";

const ThemeView = ({ style, ...prop }) => {
  const colorScheme = useColorScheme();
  const theme = Color[colorScheme] || Color.light;

  return (
    <View style={[style, { backgroundColor: theme.background }]} {...prop} />
  );
};

export default ThemeView;


