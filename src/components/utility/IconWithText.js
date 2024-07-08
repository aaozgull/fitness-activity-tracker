import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { theme } from "../../infrastructure/theme";
import {
  FontAwesome5,
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons"; // Import the required icon components
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faSwimmer,
  faBaseballBall,
  faWeightScale,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons"; // Corrected the icon import

const IconWithText = (props) => {
  const IconButton = ({ icon, name, color }) => {
    let IconComponent;
    // console.log(`---- icon ${icon} name ${name} color ${color}`);
    switch (icon) {
      case "FontAwesome5":
        IconComponent = FontAwesome5;
        break;
      case "Ionicons":
        IconComponent = Ionicons;
        break;
      case "MaterialIcons":
        IconComponent = MaterialIcons;
        break;
      case "MaterialCommunityIcons":
        IconComponent = MaterialCommunityIcons;
        break;
      case "FontAwesome":
        IconComponent = FontAwesome;
        break;
      default:
        return (
          <FontAwesomeIcon
            icon={
              icon === "faSwimmer"
                ? faSwimmer
                : icon === "faBaseballBall"
                  ? faBaseballBall
                  : icon === "faWeightScale"
                    ? faWeightScale
                    : faUtensils
            }
            size={34}
            color={color}
            style={props.iconStyle}
          />
        );
    }

    return (
      <IconComponent
        name={name}
        size={24}
        color={color}
        style={props.iconStyle}
      />
    );
  };

  return (
    <View>
      <TouchableOpacity style={styles.menuItem} onPress={props.onPressed}>
        <IconButton icon={props.icon} name={props.name} color={props.color} />
        <Text style={props.textStyle}>{props.text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  menuContent: {
    marginBottom: theme.sizesInNumber[3], //20,
  },
  menuItem: {
    flexDirection: "row",
    alignContent: "space-between",
    marginVertical: theme.sizesInNumber[2], // 10,
    padding: 5,
  },
});

export default IconWithText;
