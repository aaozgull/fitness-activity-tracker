import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Button, ProgressBar, MD3Colors } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "../../../infrastructure/theme/colors";

const MultiStepHeader = ({ title, iconName, progress }) => {
  const navigation = useNavigation();
  const titles = [
    { title: "Goal", text: "Now the Fun Part!, What is your goal?" },
    {
      title: "Fitness Level",
      text: "Great! How do you feel about your fitness?",
    },
    { title: "Equipment", text: "Lastly, What equipment will you be using?" },
  ];
  function backButtonHandler() {
    navigation.goBack();
    // console.log(`backButtonHandler`);
  }
  return (
    <View style={styles.screenContainer}>
      <View style={styles.container}>
        <View style={styles.backButtonContainer}>
          <TouchableOpacity onPress={backButtonHandler}>
            <Ionicons
              name="arrow-back-circle-sharp"
              size={40}
              color={colors.ui.tertiary}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.progressContainer}>
          <ProgressBar
            progress={progress}
            color={colors.ui.tertiary}
            visible={true}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          icon={iconName}
          uppercase={true}
          mode="contained"
          labelStyle={styles.buttonText}
          buttonColor={colors.ui.tertiary}
        >
          {title}
        </Button>
      </View>
      <View style={styles.textContainer}>
        {titles.map(
          (item, index) =>
            item.title === title && (
              <Text key={index} style={styles.text}>
                {item.text}
              </Text>
            )
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    //flex: 1,
    backgroundColor: colors.ui.primary,
  },
  container: {
    marginVertical: 35,
    marginHorizontal: 15,
    backgroundColor: colors.ui.primary,
    flexDirection: "row",
    alignContent: "space-between",
  },
  backButtonContainer: {
    marginRight: 15,
  },
  progressContainer: {
    marginVertical: 20,
    width: 320,
    minWidth: 280,
  },
  textContainer: {
    margin: 20,
  },
  text: {
    color: colors.text.primary,
    fontFamily: "bold",
    fontSize: 30,
    letterSpacing: 0.3,
  },
  buttonContainer: {
    marginLeft: 15,
    height: 50,
    width: 200,
    alignItems: "flex-start",
  },
  buttonText: {
    fontFamily: "medium",
    letterSpacing: 0.5,
    color: colors.ui.grey10,
  },
});

export default MultiStepHeader;
