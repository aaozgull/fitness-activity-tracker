import React from "react";
import { Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import colors from "../constants/colors";

const Button = ({ onPress, children }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{children}</Text>
      <Image
        style={styles.icon}
        source={require("../../../../assets/recipe/arrowRight.png")}
      />
    </TouchableOpacity>
  );
};

export default React.memo(Button);
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.green,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    padding: 15,
  },
  text: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "500",
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 16,
  },
});
