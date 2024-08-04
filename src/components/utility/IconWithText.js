import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { theme } from "../../infrastructure/theme";
import {
  FontAwesome5,
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faSwimmer,
  faBaseballBall,
  faWeightScale,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";

const IconWithText = (props) => {
  const IconButton = ({ icon, name, color }) => {
    let IconComponent;
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
        size={34}
        color={color}
        style={props.iconStyle}
      />
    );
  };

  return (
    <TouchableOpacity onPress={props.onPressed}>
      <View style={styles.menuItem}>
        <IconButton icon={props.icon} name={props.name} color={props.color} />
        <View style={styles.textContainer}>
          <Text style={props.textStyle}>{props.text}</Text>
          {props.description && (
            <Text style={props.textStyle}>{props.description}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: theme.sizesInNumber[1], // 10,
    padding: 10, // Adjusted padding to accommodate larger icons
    minHeight: 50, // Ensure enough height to fit 34-size icons comfortably
    //backgroundColor: "red",
  },

  textContainer: {
    flexDirection: "column",
  },
});

export default IconWithText;
