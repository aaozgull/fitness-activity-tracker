import React, { useEffect, useState } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { colors } from "../../../infrastructure/theme/colors";
import PageContainer from "../../../components/utility/PageContainer";
import PageTitle from "../../../components/utility/PageTitle";
//import { HeaderButtons } from "react-navigation-header-buttons";
//import CustomHeaderButton from "../../../components/utility/CustomHeaderButton";
import task from "../../../../assets/images/task.png";
import SubmitButton from "../../../components/utility/SubmitButton";
import Input from "../../../components/utility/Input";

const ExerciseCommentScreen = ({ navigation }) => {
  const [comment, setComment] = useState("");
  /* useEffect(() => {
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

  const inputChangedHandler = (inputValue) => {
    setComment(inputValue);
  };
  return (
    <PageContainer style={styles.container}>
      <PageTitle title="How difficult was this workout?" />

      <View style={styles.imageContainer}>
        <Image style={styles.image} source={task} resizeMode="contain" />
      </View>

      <Input
        id="1"
        label=""
        icon="comment"
        iconPack={FontAwesome5}
        onInputChanged={inputChangedHandler}
        autoCapitalize="none"
        placeholder="Tap to comment"
        // errorText={formState.inputValidities["firstName"]}
      />
      <Text style={styles.text}>{comment}</Text>
      <View style={styles.buttonContainer}>
        <SubmitButton
          title="Done"
          onPress={continueHandler}
          style={{ marginTop: 20 }}
          color={colors.ui.accent}
        />
      </View>
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
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    ///backgroundColor: "red",
  },
  image: {
    //width: "50%",
    height: "60%",
  },
});

export default ExerciseCommentScreen;
