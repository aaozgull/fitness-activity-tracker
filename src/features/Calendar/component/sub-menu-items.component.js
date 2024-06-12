import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
//import { FontAwesome5 } from "@expo/vector-icons"; // You can use a different icon library
import {
  FontAwesome5,
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons"; // Import the required icon components
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSwimmer, faBaseballBall } from "@fortawesome/free-solid-svg-icons"; // Corrected the icon import

import { theme } from "../../../infrastructure/theme";
import Modal from "react-native-modal";
import { colors } from "../../../infrastructure/theme/colors";
import { format } from "date-fns";
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

const IconButton = ({ icon: Icon, name }) => {
  return (
    <View style={styles.iconButtonContainer}>
      {name !== "person-swimming" && name !== "baseball-bat-ball" && (
        <Icon name={name} size={34} style={styles.menuItemIcon} />
      )}
      {(name === "person-swimming" || name === "baseball-bat-ball") && (
        <FontAwesomeIcon icon={Icon} size={34} style={styles.menuItemIcon} />
      )}
      <Text style={styles.menuItemIconText}>|</Text>
      <Ionicons
        name="ellipsis-vertical-sharp"
        size={34}
        style={styles.menuItemIcon}
      />
    </View>
  );
};

const SubMenuItems = ({
  isVisible,
  selectedDate,
  onClose,
  onSelectedMenuItem,
}) => {
  const subMenuItemsValue = [
    {
      name: "running",
      text: "Running",
      backgroundColor: colors.ui.accent2,
      icon: FontAwesome5,
      isChecked: false,
    },
    {
      name: "walk",
      text: "Walking",
      backgroundColor: colors.ui.accent2,
      icon: Ionicons,
      isChecked: false,
    },
    {
      name: "bicycle",
      text: "Cycing",
      backgroundColor: colors.ui.accent2,
      icon: Ionicons,
      isChecked: false,
    },
    {
      name: "rowing",
      text: "Rowing",
      backgroundColor: colors.ui.accent2,
      icon: MaterialIcons,
      isChecked: false,
    },
    {
      name: "camera",
      text: "Elliptical",
      backgroundColor: colors.ui.accent2,
      icon: Ionicons,
      isChecked: false,
    },
    {
      name: "stairs-up",
      text: "Stair climbing",
      backgroundColor: colors.ui.accent2,
      icon: MaterialCommunityIcons,
      isChecked: false,
    },
    {
      name: "american-football-outline",
      text: "American football",
      backgroundColor: colors.ui.accent2,
      icon: Ionicons,
      isChecked: false,
    },
    /* <MaterialCommunityIcons name="football-australian" size={24} color="black" /> */
    {
      name: "football",
      text: "Australian football",
      backgroundColor: colors.ui.accent2,
      icon: Ionicons,
      isChecked: false,
    },
    {
      name: "badminton",
      text: "Badminton",
      backgroundColor: colors.ui.accent2,
      icon: MaterialCommunityIcons,
      isChecked: false,
    },
    {
      name: "baseball-bat-ball",
      text: "Baseball",
      backgroundColor: colors.ui.accent2,
      icon: faBaseballBall,
      isChecked: false,
    },
    {
      name: "basketball-outline",
      text: "Basketball",
      backgroundColor: colors.ui.accent2,
      icon: Ionicons,
      isChecked: false,
    },
    {
      name: "sports-cricket",
      text: "Cricket",
      backgroundColor: colors.ui.accent2,
      icon: MaterialIcons,
      isChecked: false,
    },
    {
      name: "dance-pole",
      text: "CrossFit",
      backgroundColor: colors.ui.accent2,
      icon: MaterialCommunityIcons,
      isChecked: false,
    },
    {
      name: "dance-ballroom",
      text: "Dancing",
      backgroundColor: colors.ui.accent2,
      icon: MaterialCommunityIcons,
      isChecked: false,
    },
    {
      name: "group",
      text: "Fitness Class",
      backgroundColor: colors.ui.accent2,
      icon: FontAwesome,
      isChecked: false,
    },
    {
      name: "hiking",
      text: "Hiking",
      backgroundColor: colors.ui.accent2,
      icon: MaterialCommunityIcons,
      isChecked: false,
    },
    {
      name: "weight-lifter",
      text: "HIIT",
      backgroundColor: colors.ui.accent2,
      icon: MaterialCommunityIcons,
      isChecked: false,
    },
    {
      name: "sports-hockey",
      text: "Hockey",
      backgroundColor: colors.ui.accent2,
      icon: MaterialIcons,
      isChecked: false,
    },
    {
      name: "jump-rope",
      text: "Jump rope",
      backgroundColor: colors.ui.accent2,
      icon: MaterialCommunityIcons,
      isChecked: false,
    },
    {
      name: "rowing",
      text: "Paddling",
      backgroundColor: colors.ui.accent2,
      icon: MaterialIcons,
      isChecked: false,
    },
    {
      name: "barbell",
      text: "Pilates",
      backgroundColor: colors.ui.accent2,
      icon: Ionicons,
      isChecked: false,
    },
    {
      name: "rugby",
      text: "Rugby",
      backgroundColor: colors.ui.accent2,
      icon: MaterialCommunityIcons,
      isChecked: false,
    },
    {
      name: "skiing",
      text: "Skiing",
      backgroundColor: colors.ui.accent2,
      icon: FontAwesome5,
      isChecked: false,
    },
    {
      name: "skiing-nordic",
      text: "Snowboarding",
      backgroundColor: colors.ui.accent2,
      icon: FontAwesome5,
      isChecked: false,
    },

    /*<MaterialCommunityIcons name="ski-water" size={24} color="black" />
     <MaterialCommunityIcons name="handball" size={24} color="black" /> */
    {
      name: "sports-tennis",
      text: "Squash",
      backgroundColor: colors.ui.accent2,
      icon: MaterialIcons,
      isChecked: false,
    },
    {
      name: "baseball-outline",
      text: "Softball",
      backgroundColor: colors.ui.accent2,
      icon: Ionicons,
      isChecked: false,
    },
    {
      name: "soccer-ball-o",
      text: "Soccer",
      backgroundColor: colors.ui.accent2,
      icon: FontAwesome,
      isChecked: false,
    },
    {
      name: "person-swimming",
      text: "Swimming",
      backgroundColor: colors.ui.accent2,
      icon: faSwimmer,
      isChecked: false,
    },
    {
      name: "sports-tennis",
      text: "Tennis",
      backgroundColor: colors.ui.accent2,
      icon: MaterialIcons,
      isChecked: false,
    },
    {
      name: "table-tennis",
      text: "Table Tennis",
      backgroundColor: colors.ui.accent2,
      icon: FontAwesome5,
      isChecked: false,
    },
  ];
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
          <DateDisplay date={selectedDate.date} />
        </View>
      </View>
      <ScrollView>
        <View style={styles.modalContainer}>
          {subMenuItemsValue.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => onSelectedMenuItem(item)}
            >
              <IconButton icon={item.icon} name={item.name} />
              <Text style={styles.menuItemText}>{item.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    // borderRadius: 10,
    //backgroundColor: "red",
    //padding: theme.lineHeightsInNumber.copy,
    //alignItems: "flex-start",
    //justifyContent: "center",
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: theme.sizesInNumber[2], // 10,
    padding: 5,
  },
  menuItemIcon: {
    width: 35,
    height: 35,
    marginLeft: 12,
    color: theme.colors.ui.grey10,
    // backgroundColor: "red",
  },
  menuItemIconText: {
    fontFamily: "thin",
    marginLeft: 16,
    fontSize: 4,
    height: "100%",
    backgroundColor: theme.colors.ui.grey10,
    color: theme.colors.text.grey10,
  },
  menuItemText: {
    fontFamily: "light",
    letterSpacing: 0.5,
    fontSize: 22,
    color: colors.text.inverse, //"#555", // Adjust the color as needed
  },

  iconButtonContainer: {
    borderColor: colors.ui.accent2,
    borderWidth: 6,
    borderStyle: "solid",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 25,
    marginRight: 12,
    width: 130,
    height: 55,
    backgroundColor: colors.ui.accent2,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  backContainer: {
    paddingVertical: 20,
  },
  backIcon: {
    width: 32,
    height: 32,
  },
});

export default SubMenuItems;
