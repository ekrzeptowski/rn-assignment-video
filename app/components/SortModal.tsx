import { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { RadioGroup } from "react-native-radio-buttons-group";

import { colors } from "../styles/colors";
import { convertEm } from "../utils/convertEm";

type SortModalProps = {
  isOpen: boolean;
  onConfirm: (value: string) => void;
};

export const radioButtons = [
  {
    id: "1",
    label: "Upload date: latest",
    value: "date",
  },
  {
    id: "2",
    label: "Most relevant",
    value: "relevance",
  },
  {
    id: "3",
    label: "Most popular",
    value: "viewCount",
  },
];

export function SortModal({ isOpen, onConfirm }: SortModalProps) {
  const [selectedId, setSelectedId] = useState("2");
  const [value, setValue] = useState("relevance");
  return (
    <View
      style={[
        styles.container,
        isOpen
          ? {
              display: "flex",
            }
          : {
              display: "none",
            },
      ]}
    >
      <View style={styles.modal}>
        <Text style={styles.modalTitle}>Sort records by:</Text>
        <View style={{ flex: 1, alignItems: "flex-start" }}>
          <RadioGroup
            radioButtons={radioButtons.map((button) => ({
              ...button,
              borderColor: "#fff",
              color: colors.mainColor,
            }))}
            containerStyle={styles.radioContainer}
            selectedId={selectedId}
            onPress={(newId) => {
              setValue(
                radioButtons.find((button) => button.id === newId)?.value ||
                  "relevance"
              );
              setSelectedId(newId);
            }}
            labelStyle={styles.radioLabel}
          />
        </View>
        <TouchableOpacity
          style={styles.modalButton}
          onPress={() => onConfirm(value)}
        >
          <Text style={{ color: "#fff" }}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignContent: "center",
  },
  modal: {
    backgroundColor: colors.foregroundColor,
    borderRadius: 24,
    padding: 24,
    marginHorizontal: 36,
    minHeight: 400,
  },
  modalTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    color: "#fff",
    letterSpacing: convertEm(18, 0.01),
  },
  modalButton: {
    backgroundColor: colors.mainColor,
    height: 40,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  radioContainer: {
    alignItems: "flex-start",
    justifyContent: "center",
  },
  radioLabel: {
    color: "#fff",
    marginLeft: 24,
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    lineHeight: 36,
    letterSpacing: convertEm(14, 0.01),
  },
});
