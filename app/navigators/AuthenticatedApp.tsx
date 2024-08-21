import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { HomeScreen } from "../screens/Home";

import { colors } from "../styles/colors";
import HomeIcon from "../assets/icons/home-icon.svg";
import SearchIcon from "../assets/icons/search-icon.svg";

const Tab = createBottomTabNavigator();

export function AuthenticatedApp() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 72,
          backgroundColor: colors.foregroundColor,
        },
        tabBarLabelStyle: {
          fontFamily: "Poppins_400Regular",
          fontSize: 16,
          lineHeight: 24,
        },
        tabBarActiveTintColor: colors.mainColor,
        tabBarInactiveTintColor: "#fff",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
        }}
      />
      <Tab.Screen
        name="Search"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => <SearchIcon color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
