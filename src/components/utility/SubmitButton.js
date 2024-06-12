import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { colors } from "../../infrastructure/theme/colors";
import {
  Feather,
  MaterialCommunityIcons,
  Ionicons,
  Fontisto,
} from "@expo/vector-icons";

const SubmitButton = (props) => {
  const enabledBgColor = props.color || colors.ui.accent2;
  const disabledBgColor = colors.ui.grey300;
  const bgColor = props.disabled ? disabledBgColor : enabledBgColor;
  let textColor = props.disabled ? colors.ui.grey100 : "white";
  if (props.textColor) {
    textColor = props.textColor;
  }
  // console.log(`props.GoogleIcon ${props.GoogleIcon}`);
  return (
    <TouchableOpacity
      onPress={props.disabled ? () => {} : props.onPress}
      style={{
        ...styles.button,
        ...props.style,
        ...{ backgroundColor: bgColor },
      }}
    >
      <View style={props.icon && styles.IconContainer}>
        {props.dollarIcon && (
          <Feather name="dollar-sign" size={24} color={textColor} />
        )}
        {props.CartIcon && (
          <MaterialCommunityIcons name="cart-off" size={24} color={textColor} />
        )}
        {props.GoogleIcon && (
          <Ionicons name="logo-google" size={24} color={textColor} />
        )}
        {props.EmailIcon && (
          <Fontisto name="email" size={24} color={textColor} />
        )}
        <Text
          style={{
            ...styles.text,
            ...{ color: textColor },
            ...(props.icon && { marginLeft: 8 }),
          }}
        >
          {props.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  IconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    // color: "white",
    fontFamily: "medium",
    fontSize: 24,
    letterSpacing: 0.5,
  },
});

export default SubmitButton;
