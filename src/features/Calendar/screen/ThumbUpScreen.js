import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
//import { useSelector, useDispatch } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import PageContainer from "../../../components/utility/PageContainer";
import PageTitle from "../../../components/utility/PageTitle";
//import SubmitButton from "../../../components/utility/SubmitButton";
import { colors } from "../../../infrastructure/theme/colors";
//import { Divider } from "react-native-paper";
import LottieView from "lottie-react-native";
//import { HeaderButtons } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../../components/utility/CustomHeaderButton";

const ThumbUpScreen = (props) => {
  /* useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => {
        return (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item iconName="share-outline" onPress={() => null} />
          </HeaderButtons>
        );
      },
      headerLeft: () => {
        return (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item iconName="close-sharp" onPress={() => null} />
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
      <View style={styles.animated}>
        <LottieView
          key="animation"
          autoPlay
          loop
          resizeMode="cover"
          source={require("../../../../assets/thumbUp.json")}
        />
      </View>
      {/* <View>
        <FontAwesome name="book" size={54} color={colors.ui.accent2} />
      </View> */}
      <PageTitle text="You've kicked off a new streak!" />

      <Text style={styles.text}>
        "Your longest streak lasted for 2 days. Aim to set a new record by
        completing your habit before noon tomorrow."
      </Text>
      {/*  <View style={styles.buttonContainer}>
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
    marginTop: 100,
  },

  icon: {
    marginTop: 100,
    borderRadius: 50,
    borderColor: colors.ui.accent,
    borderWidth: 15,
    //backgroundColor: colors.ui.accent2,
    padding: 10,
    borderWidth: 2,
    borderStyle: "solid",
  },
  text: {
    fontFamily: "regular",
    fontSize: 20,
    letterSpacing: 0.5,
    color: colors.text.primary,
  },
  buttonContainer: {
    marginBottom: 20,
    flex: 1,
    width: "90%",
    justifyContent: "flex-end",
  },
  animated: {
    width: "100%",
    height: "40%",
    //position: "absolute",
    //top: 30,
    padding: 8,
    marginBottom: 30,
  },
});

export default ThumbUpScreen;
