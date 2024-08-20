import { NavigationContainer } from "@react-navigation/native";

import * as SplashScreen from "expo-splash-screen";
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { useEffect } from "react";
import { SessionProvider } from "./app/auth";
import { MainNavigator } from "./app/navigators/MainNavigator";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  useEffect(() => {
    if ((loaded || error)) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <SessionProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </SessionProvider>
  );
}
