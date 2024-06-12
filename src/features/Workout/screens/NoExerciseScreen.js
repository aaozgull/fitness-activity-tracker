import React, { useEffect, useState } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5 } from "@expo/vector-icons";
import restImage from "../../../../assets/images/rest.jpg";
import { colors } from "../../../infrastructure/theme/colors";
import PageContainer from "../../../components/utility/PageContainer";
import { Divider } from "react-native-paper";
import PageTitle from "../../../components/utility/PageTitle";
//import { HeaderButtons } from "react-navigation-header-buttons";
//import CustomHeaderButton from "../../../components/utility/CustomHeaderButton";
import SubmitButton from "../../../components/utility/SubmitButton";
const NoExerciseScreen = ({ navigation }) => {
  /*  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item iconName="ellipsis-vertical" onPress={() => null} />
          </HeaderButtons>
        );
      },
      headerLeft: () => {
        return (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item iconName="arrow-back" onPress={() => null} />
          </HeaderButtons>
        );
      },
    });
  }, []); */
  function continueHandler() {
    // dispatch(setIsNewRegistration());
  }
  return (
    <PageContainer style={styles.container}>
      <View style={styles.icon}>
        {/* <FontAwesome6 name="weight-scale" size={54} color="white" /> */}
        <FontAwesome5 name="weight" size={80} color={colors.ui.accent2} />
      </View>
      <PageTitle title="No workouts setup yet" />

      <Text style={styles.text}>
        Once your trainer setup workouts you will be able to see them here.
      </Text>
      <Text style={styles.text}>There is no active training content.</Text>
      {/* <View style={styles.buttonContainer}>
        <SubmitButton
          title="COMPLETE"
          onPress={continueHandler}
          style={{ marginTop: 20 }}
          color={colors.ui.accent}
        />
      </View> */}
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    marginTop: 150,
  },

  icon: {
    marginTop: 100,
    /* borderRadius: 50,
    borderColor: colors.ui.accent,
    borderWidth: 15,
    //backgroundColor: colors.ui.accent2,

    padding: 10,
    borderWidth: 2,
    borderStyle: "solid", */
    marginBottom: 20,
  },
  text: {
    fontFamily: "regular",
    fontSize: 20,
    letterSpacing: 0.5,
    color: colors.text.primary,
    marginTop: 20,
  },
  buttonContainer: {
    marginBottom: 20,
    flex: 1,
    width: "90%",
    justifyContent: "flex-end",
  },
});

export default NoExerciseScreen;
