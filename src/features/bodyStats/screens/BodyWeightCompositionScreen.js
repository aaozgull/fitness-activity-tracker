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
import DataItem from "../../../components/utility/DataItem";

const BodyWeightCompositionScreen = (props) => {
  function continueHandler() {
    // dispatch(setIsNewRegistration());
  }

  const inputChangedHandler = () => {};
  return (
    <PageContainer style={styles.container}>
      <PageTitle title="Body Weight/Composition" />
      <DataItem
        key="1"
        title="Body Weight"
        subTitle="124Ibs"
        type="link"
        onPress={() => null}
        // image={chatData.chatImage}
      />
      <DataItem
        key="1"
        title="Body Fate %"
        subTitle="%"
        type="link"
        onPress={() => null}
        // image={chatData.chatImage}
      />
      <DataItem
        key="1"
        title="Caliper Body Fat %"
        subTitle="%"
        type="link"
        onPress={() => null}
        // image={chatData.chatImage}
      />
      <DataItem
        key="1"
        title="Fat Mass"
        subTitle="Ibs"
        type="link"
        onPress={() => null}
        // image={chatData.chatImage}
      />
      <DataItem
        key="1"
        title="Lean Body Mass"
        subTitle="Ibs"
        type="link"
        onPress={() => null}
        // image={chatData.chatImage}
      />
      <Divider />

      <PageTitle title="Body Measurement" />
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

export default BodyWeightCompositionScreen;
