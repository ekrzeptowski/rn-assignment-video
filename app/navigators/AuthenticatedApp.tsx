import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { HomeScreen } from "../screens/Home";

const Tab = createBottomTabNavigator();

export function AuthenticatedApp() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
    </Tab.Navigator>
  );
}
