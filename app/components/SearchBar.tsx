import { TextInput, View, StyleSheet } from "react-native";

import { colors } from "../styles/colors";

import SearchIcon from "../assets/icons/search-icon.svg";

type SearchBarProps = {
  defaultValue?: string;
  onChange?: (text: string) => void;
  onPress?: () => void;
  autoFocus?: boolean;
};

export const SearchBar = ({defaultValue, onChange, onPress, autoFocus}: SearchBarProps) => {
  return (
    <View style={styles.container}>
      <SearchIcon
        color={colors.mainColor}
        style={styles.searchIcon}
        height={24}
        width={24}
      />
      <TextInput
        style={styles.input}
        placeholder="Search videos"
        placeholderTextColor={colors.foregroundColor}
        defaultValue={defaultValue}
        onChangeText={onChange}
        onPress={onPress}
        autoFocus={autoFocus}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 44,
    borderColor: colors.mainColor,
    borderWidth: 2,
    borderRadius: 16,
    justifyContent: "center",
    textAlignVertical: "center",
    marginVertical: 10,
    flex: 1
  },
  input: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    justifyContent: "center",
    marginTop: 2,
    color: colors.mainColor,
    marginLeft: 48,
  },
  searchIcon: {
    position: "absolute",
    margin: 10,
  },
});
