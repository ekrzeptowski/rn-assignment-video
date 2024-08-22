import { View, Text, StyleSheet } from "react-native";
import { colors } from "../styles/colors";
import { convertEm } from "../utils/convertEm";

export function StatField({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <View style={styles.container}>
      {icon}
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.mainColor,
    borderRadius: 8,
    padding: 6,
    paddingLeft: 8,
    flexDirection: "row",
    width: 132,
    height: 32,
    alignItems: "center",
  },
  label: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 10,
    letterSpacing: convertEm(10, 0.01),
    color: "#fff",
    textAlign: "center",
    flex: 1,
  },
});
