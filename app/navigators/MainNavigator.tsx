import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useSession } from "../auth";
import { AuthenticatedApp } from "./AuthenticatedApp";
import { LoginScreen } from "../screens/Login";

const Stack = createNativeStackNavigator();

export function MainNavigator() {
  const { session } = useSession();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {session ? (
        <Stack.Screen name="AuthenticatedApp" component={AuthenticatedApp} />
      ) : (
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
}
