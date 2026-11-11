import { View } from "react-native";
import { useColorScheme } from "react-native";
import Color from "../constant/Color";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ThemeView = ({ style, safe = false, ...prop }) => {
  const colorScheme = useColorScheme();
  const theme = Color[colorScheme] || Color.light;

  if (!safe) {
    return (
      <View style={[style, { backgroundColor: theme.background }]} {...prop} />
    );
  }

  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        {
          backgroundColor: theme.background,
          paddingTop: insets.top,
        },
        style,
      ]}
      {...prop}
    />
  );
};

export default ThemeView;
