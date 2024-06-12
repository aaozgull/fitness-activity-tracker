import React from "react";
import { Ionicons, FontAwesome6, FontAwesome5 } from "@expo/vector-icons";

//import { HeaderButton } from "react-navigation-header-buttons";
//import colors from '../constants/colors';
import { theme } from "../../infrastructure/theme/index";

const CustomHeaderButton = (props) => {
  const { iconType } = props;

  // Determine the appropriate icon component based on the specified icon type
  /* let IconComponent = FontAwesome6;
  if (iconType) {
    if (iconType === FontAwesome5) {
      IconComponent = FontAwesome5;
    }
  } else {
    IconComponent = Ionicons;
  }

  //console.log(`CustomHeaderButton iconType  ${iconType} ${IconComponent}`);
  return (
    <HeaderButton
      {...props}
      IconComponent={IconComponent}
      iconSize={props.size ? props.size : 23}
      color={props.color ?? theme.colors.ui.accent}
    />
  ); */
};

export default CustomHeaderButton;
