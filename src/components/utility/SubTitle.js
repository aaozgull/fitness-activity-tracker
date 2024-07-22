import React from "react";
import { Text, StyleSheet } from "react-native";
import { colors } from "../../infrastructure/theme/colors";

const SubTitle = ({ text = "Title", style }) => {
  return <Text style={[styles.title, style]}>{text}</Text>;
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
