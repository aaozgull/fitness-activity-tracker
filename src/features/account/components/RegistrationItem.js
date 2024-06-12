import React from "react";
import { Text, Image, StyleSheet, View } from "react-native";
import { Button, RadioButton } from "react-native-paper";
import { colors } from "../../../infrastructure/theme/colors";

const RegistrationItem = ({
  text,
  icon,
  subText,
  onPress,
  isChecked,
  isLastItem,
}) => {
  //console.log(` ${icon} ${subText} `);
  return (
    <View style={isLastItem ? styles.lastItemContainer : styles.ItemContainer}>
      {icon && (
        <View style={styles.buttonContainer}>
          <Button icon={icon} labelStyle={styles.lable}>
            {text}
          </Button>
        </View>
      )}

      {subText && (
        <View style={styles.textContainer}>
          <Text style={styles.text}>{text}</Text>
          <Text style={styles.subText}>{subText}</Text>
        </View>
      )}
      <View style={styles.radioButtonContainer}>
        <RadioButton
          value={text}
          status={isChecked ? "checked" : "unchecked"}
          color={colors.ui.tertiary}
          onPress={() => onPress(text)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ItemContainer: {
    paddingVertical: 18,
    paddingHorizontal: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: colors.ui.grey300,
  },
  lastItemContainer: {
    paddingVertical: 28,
    paddingHorizontal: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "150",
    height: 100,
    // backgroundColor: "red",
  },
  buttonContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  textContainer: {
    marginLeft: 16,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  lable: {
    color: colors.text.primary,
    fontFamily: "bold",
    letterSpacing: 0.3,
    fontSize: 20,
  },
  text: {
    color: colors.text.primary,
    fontFamily: "bold",
    letterSpacing: 0.3,
    fontSize: 24,
  },
  subText: {
    marginTop: 10,
    color: colors.text.gray500,
    fontFamily: "medium",
    letterSpacing: 0.3,
    fontSize: 16,
  },
  radioButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    marginTop: 10,
    marginBottom: 10,
    width: "150",
    height: 100,
  },
});

export default RegistrationItem;
