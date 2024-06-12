import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faWeightScale, faUtensils } from "@fortawesome/free-solid-svg-icons"; // Corrected the icon import

import { theme } from "../../../infrastructure/theme";
import { colors } from "../../../infrastructure/theme/colors";

const IconButton = ({ icon: Icon, name, backgroundColor }) => {
  return (
    <View style={[styles.iconButtonContainer, { backgroundColor }]}>
      {name !== "weight-scale" && name !== "utensils" && (
        <Icon name={name} size={34} style={styles.menuItemIcon} />
      )}
      {(name === "weight-scale" || name === "utensils") && (
        <FontAwesomeIcon icon={Icon} size={34} style={styles.menuItemIcon} />
      )}
    </View>
  );
};

const MenuItems = ({ onSelectedMenuItem }) => {
  const menuItems = [
    {
      name: "weight",
      text: "Workout",
      backgroundColor: colors.ui.tertiary,
      icon: FontAwesome5,
      isChecked: false,
    },
    {
      name: "shoe-sneaker",
      text: "Activity",
      backgroundColor: colors.ui.accent2,
      icon: MaterialCommunityIcons,
      isChecked: false,
    },
    {
      name: "utensils",
      text: "Meal",
      backgroundColor: colors.ui.accent,
      icon: faUtensils,
      isChecked: false,
    },
    {
      name: "camera",
      text: "Photos",
      backgroundColor: colors.ui.yellow,
      icon: Ionicons,
      isChecked: false,
    },
    {
      name: "weight-scale",
      text: "Body Stats",
      backgroundColor: colors.ui.fiftary,
      icon: faWeightScale,
      isChecked: false,
    },
    {
      name: "book",
      text: "read before sleep",
      backgroundColor: colors.ui.error500,
      icon: Ionicons,
      isChecked: false,
    },
    {
      name: "sleep",
      text: "sleep",
      backgroundColor: colors.ui.green,
      icon: MaterialCommunityIcons,
      isChecked: false,
    },
  ];

  /* { name: "bed", text: "Sleep", isChecked: false }, */
  /* <FontAwesome6 name="glass-water" size={24} color="black" />
    <Fontisto name="photograph" size={24} color="black" />
    <MaterialCommunityIcons name="shoe-sneaker" size={24} color="black" />
     <FontAwesome6 name="weight-scale" size={24} color="black" /> 
     <MaterialCommunityIcons name="power-sleep" size={24} color="black" />
     <MaterialCommunityIcons name="sleep" size={24} color="black" />*/

  return (
    <View style={styles.menuContent}>
      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.menuItem}
          onPress={() => onSelectedMenuItem(item)}
        >
          <View
            style={{
              flex: 1,
              alignItems: "flex-end",
              marginRight: 22,
              marginTop: 12,
            }}
          >
            <Text style={styles.menuItemText}>{item.text}</Text>
          </View>
          <IconButton
            icon={item.icon}
            name={item.name}
            backgroundColor={item.backgroundColor}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  menuContent: {
    marginBottom: 20,
    alignItems: "flex-end",
    alignContent: "flex-end",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Add this to space out the text and icon
    marginVertical: theme.sizesInNumber[2], // 10,
    // padding: 5,
    width: "100%", // Ensure it takes full width
  },
  menuItemText: {
    fontFamily: "light",
    letterSpacing: 0.5,
    fontSize: 22, // theme.fontSizesInNumber.title, //16,
    color: colors.text.inverse, // Adjust the color as needed
    flex: 1, // Take up remaining space
  },
  iconButtonContainer: {
    alignItems: "center",
    justifyContent: "center", // Center the icon
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  menuItemIcon: {
    width: 35,
    height: 35,
    color: colors.ui.grey10,
  },
  menuItemIconText: {
    fontFamily: "thin",
    marginLeft: 16,
    fontSize: 4,
    height: "100%",
    backgroundColor: colors.ui.grey10,
    color: colors.text.grey10,
  },
});

export default MenuItems;
