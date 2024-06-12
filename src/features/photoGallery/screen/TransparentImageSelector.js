import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { colors } from "../../../infrastructure/theme/colors";
import { FontAwesome5 } from "@expo/vector-icons"; // You can use a different icon library

import { theme } from "../../../infrastructure/theme";

const TransparentImageSelector = ({
  isVisible,
  onClose,
  selectedImageAngle,
  onTakePhoto,
  onPickImage,
}) => {
  let headerTitle = "Add Progress ";
  if (selectedImageAngle === "1") {
    headerTitle += "Front Image";
  } else if (selectedImageAngle === "2") {
    headerTitle += "Back Image";
  } else if (selectedImageAngle === "3") {
    headerTitle += "Side Image";
  }
  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={styles.modalContainer}>
        <PageTitle title={headerTitle} textStyle={styles.menuHeaderText} />
        <TouchableOpacity
          /*   key={props.key} */
          style={styles.menuItem}
          onPress={onTakePhoto}
        >
          <FontAwesome5
            name="camera"
            size={24}
            //color="black"
            style={styles.menuItemIcon}
          />
          <Text style={styles.menuItemText}>Take Image</Text>
        </TouchableOpacity>
        <TouchableOpacity
          /*   key={props.key} */
          style={styles.menuItem}
          onPress={onPickImage}
        >
          <FontAwesome5
            name="plus"
            size={24}
            //color="black"
            style={styles.menuItemIcon}
          />
          <Text style={styles.menuItemText}>Pick Image from Gallery</Text>
        </TouchableOpacity>
        {/* <MenuItems onSelectedMenuItem={onSelectedMenuItem} /> */}
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: "row",
    alignContent: "space-between",
    // alignItems: "center",
    marginVertical: 8, // 10,
    padding: 5,
  },
  menuItemIcon: {
    width: 24,
    height: 24,
    marginRight: theme.sizesInNumber[4], // 10,
    color: colors.ui.quaternary,
  },
  menuItemText: {
    fontFamily: "mediumItalic",
    letterSpacing: 0.3,
    fontSize: theme.fontSizesInNumber.title, //16,
    color: colors.text.primary, //"#555", // Adjust the color as needed
  },
  modalContainer: {
    backgroundColor: theme.colors.ui.accent2, //"rgba(255, 255, 255, 0.6)",
    borderRadius: 10,
    padding: theme.lineHeightsInNumber.copy, //20,
    alignItems: "flex-start",
    justifyContent: "center",
    // margin: theme.lineHeightsInNumber.copy, //20,
    // opacity: 0.5,
  },
  menuHeader: {
    marginBottom: theme.spaceInNumber[3],
    //
  },
  menuHeaderText: {
    fontFamily: "blackItalic",
    letterSpacing: 0.3,
    fontSize: 28,
    //fontSize: theme.fontSizesInNumber.title, //18,
    // fontWeight: `${theme.fontWeights.bold}`,
    // color: theme.colors.text.fiftary, //"#333", // Adjust the color as needed
  },

  closeButton: {
    position: "absolute",
    top: 5,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: theme.colors.ui.accent, // "#2196F3", // Adjust the color as needed
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonText: {
    color: theme.colors.ui.error50, //"#fff", // Adjust the color as needed
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default TransparentImageSelector;
