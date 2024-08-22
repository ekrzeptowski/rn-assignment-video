import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useSession } from "../auth";
import { AuthenticatedApp } from "./AuthenticatedApp";
import { LoginScreen } from "../screens/Login";
import { VideoDetails } from "../screens/VideoDetails";

export type StackParamList = {
  AuthenticatedApp: undefined;
  LoginScreen: undefined;
  VideoDetails: { videoId: string };
};

const Stack = createNativeStackNavigator<StackParamList>();

export function MainNavigator() {
  const { session } = useSession();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {session ? (
        <>
          <Stack.Screen name="AuthenticatedApp" component={AuthenticatedApp} />
          <Stack.Screen
            name="VideoDetails"
            component={VideoDetails}
            getId={({ params }) => params.videoId}
          />
        </>
      ) : (
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
}
