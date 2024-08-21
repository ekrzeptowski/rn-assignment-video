import { NavigationContainer } from "@react-navigation/native";

import * as SplashScreen from "expo-splash-screen";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { useEffect } from "react";
import { SessionProvider } from "./app/auth";
import { MainNavigator } from "./app/navigators/MainNavigator";
import { SWRConfig } from "swr";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <SWRConfig value={{
      provider: () => new Map(),
      revalidateOnFocus: false,
    }}>
      <SessionProvider>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </SessionProvider>
    </SWRConfig>
  );
}
