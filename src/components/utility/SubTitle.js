import React from "react";
import { Text, StyleSheet } from "react-native";
import { colors } from "../../infrastructure/theme/colors";

const SubTitle = ({ text, style }) => {
  return <Text style={[styles.title, style]}>{text}</Text>;
};

SubTitle.defaultProps = {
  text: "Title",
};

export default React.memo(SubTitle);
const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    color: colors.text.primary,
    fontWeight: "bold",
    fontFamily: "regular",
    letterSpacing: 0.3,
  },
});
