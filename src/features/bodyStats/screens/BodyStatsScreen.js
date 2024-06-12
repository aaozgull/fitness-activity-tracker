import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";
import PageContainer from "../../../components/utility/PageContainer";
import PageTitle from "../../../components/utility/PageTitle";
import SubmitButton from "../../../components/utility/SubmitButton";
import { colors } from "../../../infrastructure/theme/colors";
import { Divider } from "react-native-paper";
import Input from "../../../components/utility/Input";

const BodyStatsScreen = (props) => {
  function continueHandler() {
    // dispatch(setIsNewRegistration());
  }

  const inputChangedHandler = () => {};
  return (
    <PageContainer style={styles.container}>
      <Input
        id="weight"
        label="Body Weight"
        icon="weight"
        iconPack={FontAwesome5}
        onInputChanged={inputChangedHandler}
        placeholder={`Enter your weight in Ibs`}
        keyboardType="numeric" /* 
        errorText={weightErrorText}
        initialValue={weight} */
      />
      <Text>Ibs</Text>

      <Input
        id="Fate"
        label="Fate %"
        icon="pen"
        iconPack={FontAwesome5}
        onInputChanged={inputChangedHandler}
        autoCapitalize="none" /* 
        errorText={formState.inputValidities["note"]}
        initialValue="" */
      />
      <Text>%</Text>
      <Text>Caliper Body Fat %</Text>
      <Divider />
      <Input
        id="Neck"
        label="Neck"
        icon="pen"
        iconPack={FontAwesome5}
        onInputChanged={inputChangedHandler}
        autoCapitalize="none" /* 
        errorText={formState.inputValidities["note"]}
        initialValue="" */
      />
      <Text>cm</Text>
      <Input
        id="Shoulders"
        label="Shoulders"
        icon="pen"
        iconPack={FontAwesome5}
        onInputChanged={inputChangedHandler}
        autoCapitalize="none" /* 
        errorText={formState.inputValidities["note"]}
        initialValue="" */
      />
      <Text>cm</Text>
      <Input
        id="Chest"
        label="Chest"
        icon="pen"
        iconPack={FontAwesome5}
        onInputChanged={inputChangedHandler}
        autoCapitalize="none" /* 
        errorText={formState.inputValidities["note"]}
        initialValue="" */
      />
      <Text>cm</Text>
      <Input
        id="L Bicep"
        label="L Bicep"
        icon="pen"
        iconPack={FontAwesome5}
        onInputChanged={inputChangedHandler}
        autoCapitalize="none" /* 
        errorText={formState.inputValidities["note"]}
        initialValue="" */
      />
      <Text>cm</Text>
      <Input
        id="L Forearm"
        label="L Forearm"
        icon="pen"
        iconPack={FontAwesome5}
        onInputChanged={inputChangedHandler}
        autoCapitalize="none" /* 
        errorText={formState.inputValidities["note"]}
        initialValue="" */
      />
      <Text>cm</Text>
      <Input
        id="Waist"
        label="Waist"
        icon="pen"
        iconPack={FontAwesome5}
        onInputChanged={inputChangedHandler}
        autoCapitalize="none" /* 
        errorText={formState.inputValidities["note"]}
        initialValue="" */
      />
      <Text>cm</Text>
      <Input
        id="Hips"
        label="Hips"
        icon="pen"
        iconPack={FontAwesome5}
        onInputChanged={inputChangedHandler}
        autoCapitalize="none" /* 
        errorText={formState.inputValidities["note"]}
        initialValue="" */
      />
      <Text>cm</Text>
      <Input
        id="L Thigh"
        label="L Thigh"
        icon="pen"
        iconPack={FontAwesome5}
        onInputChanged={inputChangedHandler}
        autoCapitalize="none" /* 
        errorText={formState.inputValidities["note"]}
        initialValue="" */
      />
      <Text>cm</Text>
      <Input
        id="L Calf"
        label="L Calf"
        icon="pen"
        iconPack={FontAwesome5}
        onInputChanged={inputChangedHandler}
        autoCapitalize="none" /* 
        errorText={formState.inputValidities["note"]}
        initialValue="" */
      />
      <Text>cm</Text>
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
    borderRadius: 50,
    borderColor: colors.ui.accent,
    borderWidth: 15,
    //backgroundColor: colors.ui.accent2,

    padding: 10,
    borderWidth: 2,
    borderStyle: "solid",
  },
  text: {
    fontFamily: "bold",
    fontSize: 22,
    letterSpacing: 0.5,
    color: colors.text.primary,
  },
  buttonContainer: {
    marginBottom: 20,
    flex: 1,
    width: "90%",
    justifyContent: "flex-end",
  },
});

export default BodyStatsScreen;
