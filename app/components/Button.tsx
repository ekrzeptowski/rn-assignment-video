import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
} from "react-native";

import { convertEm } from "../utils/convertEm";
import { colors } from "../styles/colors";

export function Button(props: ButtonProps) {
  return (
    <TouchableOpacity
      {...props}
      style={[styles.button, props.style]}
      activeOpacity={0.6}
    >
      <Text style={[styles.text, props.textStyle]}>{props.children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.mainColor,
    padding: 12,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    margin: 20,
  },
  text: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
    lineHeight: 12,
    letterSpacing: convertEm(14, 0.01),
  },
});

type ButtonProps = TouchableOpacity["props"] & {
  textStyle?: TextStyle;
};
