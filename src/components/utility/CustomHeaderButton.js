import React from "react";
import { Text, StyleSheet } from "react-native";
import { Ionicons, FontAwesome6, FontAwesome5 } from "@expo/vector-icons";

//import { HeaderButton } from "react-navigation-header-buttons";
import { HeaderButton } from "../../../react-navigation-header-buttons";
//import colors from '../constants/colors';
import { theme } from "../../infrastructure/theme/index";

const CustomHeaderButton = (props) => {
  const { iconType, title } = props;

  // Determine the appropriate icon component based on the specified icon type
  let IconComponent = FontAwesome6;
  if (iconType) {
    if (iconType === FontAwesome5) {
      IconComponent = FontAwesome5;
    }
  } else {
    IconComponent = Ionicons;
  }

  if (title) {
    return (
      <HeaderButton
        {...props}
        IconComponent={({ color, size }) => (
          <Text style={{ color, fontSize: size }}>{title}</Text>
        )}
      />
    );
  }

  // console.log(`CustomHeaderButton iconType  ${iconType} ${IconComponent}`);
  return (
    <HeaderButton
      {...props}
      IconComponent={IconComponent}
      iconSize={props.size ? props.size : 23}
      color={props.color ?? theme.colors.ui.accent}
    />
  );
};

export default CustomHeaderButton;

const styles = StyleSheet.create({
  buttonText: {
    fontFamily: "bold",
    // color: theme.colors.ui.grey10,
    // fontSize: 16,
    //backgroundColor: "green",
  },
});
