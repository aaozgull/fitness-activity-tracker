import { Feather, FontAwesome } from "@expo/vector-icons";
import React, { useCallback, useMemo, useReducer, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import DataItem from "../../../components/utility/DataItem";
import Input from "../../../components/utility/Input";
import PageContainer from "../../../components/utility/PageContainer";
import PageTitle from "../../../components/utility/PageTitle";
import ProfileImage from "../../../components/utility/ProfileImage";
import SubmitButton from "../../../components/utility/SubmitButton";
import { colors } from "../../../infrastructure/theme/colors";
import { updateLoggedInUserData } from "../../../store/authSlice"; //"../store/authSlice";
import {
  updateSignedInUserData,
  userLogout,
} from "../../../utils/actions/authActions";
import { validateInput } from "../../../utils/actions/formActions";
import { reducer } from "../../../utils/reducers/formReducer";
import { useNavigation } from "@react-navigation/native";

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const userData = useSelector((state) => state.auth.userData);
  const starredMessages = useSelector(
    (state) => state.messages.starredMessages ?? {}
  );

  const sortedStarredMessages = useMemo(() => {
    let result = [];

    const chats = Object.values(starredMessages);

    chats.forEach((chat) => {
      const chatMessages = Object.values(chat);
      result = result.concat(chatMessages);
    });

    return result;
  }, [starredMessages]);

  const firstName = userData.firstName || "";
  const lastName = userData.lastName || "";
  const email = userData.email || "";
  const about = userData.about || "";

  const initialState = {
    inputValues: {
      firstName,
      lastName,
      email,
      about,
    },
    inputValidities: {
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      about: undefined,
    },
    formIsValid: false,
  };

  const [formState, dispatchFormState] = useReducer(reducer, initialState);

  const inputChangedHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue);
      dispatchFormState({ inputId, validationResult: result, inputValue });
    },
    [dispatchFormState]
  );

  const saveHandler = useCallback(async () => {
    const updatedValues = formState.inputValues;

    try {
      setIsLoading(true);
      await updateSignedInUserData(userData.userId, updatedValues);
      dispatch(updateLoggedInUserData({ newData: updatedValues }));

      setShowSuccessMessage(true);

      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [formState, dispatch]);

  const hasChanges = () => {
    const currentValues = formState.inputValues;

    return (
      currentValues.firstName != firstName ||
      currentValues.lastName != lastName ||
      currentValues.email != email ||
      currentValues.about != about
    );
  };

  return (
    <PageContainer style={styles.container}>
      <PageTitle text="Settings" />

      <ScrollView contentContainerStyle={styles.formContainer}>
        <View style={styles.imageBorder}>
          <ProfileImage
            size={80}
            userId={userData.userId}
            uri={userData.profilePicture}
            showEditButton={true}
          />
        </View>
        <Input
          id="firstName"
          label="First name"
          icon="user-o"
          iconPack={FontAwesome}
          onInputChanged={inputChangedHandler}
          autoCapitalize="none"
          errorText={formState.inputValidities["firstName"]}
          initialValue={userData.firstName}
        />
        <Input
          id="lastName"
          label="Last name"
          icon="user-o"
          iconPack={FontAwesome}
          onInputChanged={inputChangedHandler}
          autoCapitalize="none"
          errorText={formState.inputValidities["lastName"]}
          initialValue={userData.lastName}
        />
        <Input
          id="email"
          label="Email"
          icon="mail"
          iconPack={Feather}
          onInputChanged={inputChangedHandler}
          keyboardType="email-address"
          autoCapitalize="none"
          errorText={formState.inputValidities["email"]}
          initialValue={userData.email}
        />
        <Input
          id="about"
          label="About"
          icon="user-o"
          iconPack={FontAwesome}
          onInputChanged={inputChangedHandler}
          autoCapitalize="none"
          errorText={formState.inputValidities["about"]}
          initialValue={userData.about}
        />
        <View style={{ marginTop: 20 }}>
          {showSuccessMessage && <Text>Saved!</Text>}

          {isLoading ? (
            <ActivityIndicator
              size={"small"}
              color={colors.ui.accent2}
              style={{ marginTop: 10 }}
            />
          ) : (
            hasChanges() && (
              <SubmitButton
                title="Save"
                onPress={saveHandler}
                style={{ marginTop: 20 }}
                disabled={!formState.formIsValid}
              />
            )
          )}
        </View>

        <DataItem
          type={"link"}
          title="Edit Profile Info"
          hideImage={true}
          onPress={() => navigation.navigate("ProfileInfo")}
        />
        <DataItem
          type={"link"}
          title="Starred messages"
          hideImage={true}
          onPress={() =>
            navigation.navigate("DataList", {
              title: "Starred messages",
              data: sortedStarredMessages,
              type: "messages",
            })
          }
        />
        <DataItem
          type={"link"}
          title="BMI Calculation"
          hideImage={true}
          onPress={() => navigation.navigate("BMICalculation")}
        />
        {/*    <DataItem
          type={"link"}
          title="Timer Screen"
          hideImage={true}
          onPress={() =>  navigation.navigate("TimerScreen")}
        /> */}

        <SubmitButton
          title="Logout"
          onPress={() => dispatch(userLogout())}
          style={{ marginTop: 20 }}
          color={colors.ui.accent}
        />
      </ScrollView>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 20,
  },
  formContainer: {
    alignItems: "center",
  },
  imageBorder: {
    padding: 10,
    borderRadius: 50,
    borderColor: colors.ui.accent2,
    borderWidth: 2,
    borderStyle: "dashed",
  },
});

export default SettingsScreen;
