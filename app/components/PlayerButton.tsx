import { StyleSheet, TouchableOpacity, View } from "react-native";

export function PlayerButton({
  icon,
  onPress,
  size,
}: {
  icon: React.ReactNode;
  onPress: () => void;
  size?: number;
}) {
  return (
    <TouchableOpacity
      style={[
        styles.playerButton,
        size
          ? {
              width: size,
              height: size,
              borderRadius: size / 2,
            }
          : {},
      ]}
      onPress={onPress}
    >
      <View
        style={[
          styles.playerButtonBackground,
          size
            ? {
                borderRadius: size / 2,
              }
            : {},
        ]}
      />
      {icon}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  playerButton: {
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    margin: 4,
  },
  playerButtonBackground: {
    opacity: 0.25,
    backgroundColor: "#000",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 16,
  },
});
