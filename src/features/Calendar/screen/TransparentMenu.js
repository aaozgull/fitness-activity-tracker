import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import Modal from "react-native-modal";
import { format } from "date-fns";
import { Ionicons } from "@expo/vector-icons";
import MenuItems from "../component/menu-items.component";
import SubMenuItems from "../component/sub-menu-items.component"; // New sub-menu component

import { useNavigation } from "@react-navigation/native";
import { theme } from "../../../infrastructure/theme";
import { colors } from "../../../infrastructure/theme/colors";

const DateDisplay = ({ date }) => {
  return (
    <View style={styles.dateDisplayContainer}>
      <Ionicons
        name="calendar-outline"
        size={24}
        style={[styles.menuItemIcon, { marginTop: 6 }]}
      />
      <Text style={[styles.menuItemText, { marginRight: 6 }]}>
        {format(date, "MMM dd")}
      </Text>
    </View>
  );
};

const TransparentMenu = ({
  isVisible,
  onClose,
  selectedItem,
  onSelectedMenuItem,
}) => {
  // const formattedDate = selectedItem ? format(selectedItem, "MMM dd") : "";
  const [selectedItemText, setSelectedItemText] = useState(null); // State to track the selected item text
  //const navigation = useNavigation();

  const handleSelectMenuItem = (menuItem) => {
    setSelectedItemText(menuItem.text); // Set the selected item text
    console.log(`handleSelecMenu ${menuItem.text} ${selectedItemText}`);
    // if (selectedItemText !== "Activity") {
    onClose(); // Close the menu
    onSelectedMenuItem(menuItem); // Pass the selected menu item to the parent component
    // }
  };
  const handleBack = () => {
    onClose();
  };
  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={styles.headerContainer}>
        <Pressable
          style={styles.backContainer}
          hitSlop={8}
          onPress={handleBack}
        >
          <Ionicons name="chevron-back" size={34} style={styles.menuItemIcon} />
        </Pressable>
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <DateDisplay date={selectedItem} />
        </View>
      </View>
      <View style={styles.modalContainer}>
        {/* <PageTitle title={formattedDate} textStyle={styles.menuHeaderText} /> */}

        <MenuItems onSelectedMenuItem={handleSelectMenuItem} />

        {/* <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity> */}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    // backgroundColor: colors.ui.accent2, //"rgba(255, 255, 255, 0.6)",
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
    //fontSize: theme.fontSizesInNumber.title, //18,
    // fontWeight: `${theme.fontWeights.bold}`,
    // color: colors.text.fiftary, //"#333", // Adjust the color as needed
  },

  closeButton: {
    position: "absolute",
    top: 5,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.ui.accent, // "#2196F3", // Adjust the color as needed
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonText: {
    color: colors.ui.error50, //"#fff", // Adjust the color as needed
    fontWeight: "bold",
    fontSize: 18,
  },
  dateDisplayContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: colors.ui.grey10,
    borderWidth: 2,
    borderStyle: "solid",
    padding: 5,
    borderRadius: 25,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuItemText: {
    fontFamily: "light",
    letterSpacing: 0.5,
    fontSize: theme.fontSizesInNumber.title, //16,
    color: colors.text.grey10, //"#555", // Adjust the color as needed
  },
  menuItemIcon: {
    width: 35,
    height: 35,
    marginLeft: 12,
    color: colors.ui.grey10,
    // backgroundColor: "red",
  },
  backContainer: {
    paddingVertical: 20,
  },
  backIcon: {
    width: 32,
    height: 32,
  },
});

export default TransparentMenu;
