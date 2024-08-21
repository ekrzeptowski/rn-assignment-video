import { View, Text, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";

import { useSession } from "../auth";

export function HomeScreen() {
    const { logout, session } = useSession();
    return (
      <View style={styles.container}>
        <Text
          onPress={() => {
            logout();
            console.log(session);
          }}
        >
          Log out
        </Text>
        <StatusBar style="auto" />
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
  });