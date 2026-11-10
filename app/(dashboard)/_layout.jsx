import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";
import Color from "../../constant/Color";
import { Ionicons } from "@expo/vector-icons";

const TabLayout = () => {
  const colorScheme = useColorScheme();
  const theme = Color[colorScheme] || Color.light;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "#8E8E93",

        tabBarStyle: {
          height: 100,
          paddingTop: 20,
          paddingBottom: 30,

          backgroundColor: theme.tabBar,

          borderTopWidth: 0,

          elevation: 0,
        },

        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "500",
        },

        tabBarIconStyle: {
          marginBottom: 2,
        },
      }}
    >
      <Tabs.Screen
        name="bookLists"
        options={{
          title: "Books",
          tabBarLabel: "Book Lists",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "book" : "book-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="createBook"
        options={{
          title: "Create",
          tabBarLabel: "Create Book",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "add-circle" : "add-circle-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
