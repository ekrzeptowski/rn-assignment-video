import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { StatusBar } from "expo-status-bar";

import { colors } from "../styles/colors";

import Logo from "../assets/logo.svg";
import AppIcon from "../assets/app-icon.svg";

import { convertEm } from "../utils/convertEm";
import { Button } from "../components/Button";
import { useSession } from "../auth";

export function LoginScreen() {
  const { login, session } = useSession();
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Logo width={292} height={116} />
      <View style={styles.appIconContainer}>
        <AppIcon
          width={128}
          height={128}
          style={{
            flex: 1,
            margin: 132,
          }}
        />
      </View>

      <Text style={styles.welcomeText}>
        Welcome to the best YouTube-based learning application.
      </Text>
      <Button
        style={{
          borderRadius: 12,
        }}
        textStyle={{
          fontSize: 16,
          lineHeight: 24,
        }}
        onPress={() => {
          login();
        }}
      >
        Log in as guest
      </Button>
      <View
        style={{
          justifyContent: "center",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        <Text style={styles.bottomText}>By continuing you agree with</Text>
        <TouchableOpacity
          onPress={() => WebBrowser.openBrowserAsync("https://google.com")}
        >
          <Text
            style={[
              styles.bottomText,
              {
                textDecorationStyle: "solid",
                textDecorationLine: "underline",
                color: colors.mainColor,
              },
            ]}
          >
            Terms and Conditions
          </Text>
        </TouchableOpacity>
        <Text style={styles.bottomText}> and </Text>
        <TouchableOpacity
          onPress={() => WebBrowser.openBrowserAsync("https://google.com")}
        >
          <Text
            style={[
              styles.bottomText,
              {
                textDecorationStyle: "solid",
                textDecorationLine: "underline",
                color: colors.mainColor,
              },
            ]}
          >
            Privacy Policy
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.foregroundColor,
    alignItems: "center",
    padding: 50,
  },
  appIconContainer: {
    flex: 1,
    justifyContent: "center",
  },
  welcomeText: {
    color: "#fff",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 22,
    lineHeight: 24,
    letterSpacing: convertEm(22, 0.01),
    width: "100%",
    maxWidth: 400,
  },
  bottomText: {
    color: "#fff",
    textAlign: "center",
    lineHeight: 16,
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
  },
});
