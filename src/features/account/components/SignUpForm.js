import * as WebBrowser from "expo-web-browser";
import React, { useCallback, useEffect, useReducer, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Feather, FontAwesome } from "@expo/vector-icons";

import Input from "../../../components/utility/Input";
import SubmitButton from "../../../components/utility/SubmitButton";
import { validateInput } from "../../../utils/actions/formActions";
import { reducer } from "../../../utils/reducers/formReducer";
import { signUp } from "../../../utils/actions/authActions";
import { colors } from "../../../infrastructure/theme/colors";
import { async } from "validate.js";
//import { useWarmUpBrowser } from "../../../components/hooks/useWarmUpBrowser";
import {
  PRIVACY_POLICY_LINK,
  TERMS_CONDITIONS_LINK,
} from "../../../constants/links";
import Checkbox from "../../../components/utility/Checkbox";

const initialState = {
  inputValues: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  },
  inputValidities: {
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  },
  formIsValid: false,
};
//WebBrowser.maybeCompleteAuthSession();
const SignUpForm = (props) => {
  const dispatch = useDispatch();
  // useWarmUpBrowser();
  const [error, setError] = useState();
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formState, dispatchFormState] = useReducer(reducer, initialState);

  const onCheckboxPress = () => {
    setAgreed((value) => !value);
  };

  const onLinkPress = (url) => {
    Linking.openURL(url);
  };

  const inputChangedHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue);
      dispatchFormState({ inputId, validationResult: result, inputValue });
    },
    [dispatchFormState]
  );

  useEffect(() => {
    if (error) {
      Alert.alert("An error occured", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const googleSignupHandler = async () => {
    try {
      setIsLoading(true);
      //  googleSignup();
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  const authHandler = useCallback(async () => {
    try {
      setIsLoading(true);

      const action = signUp(
        formState.inputValues.firstName,
        formState.inputValues.lastName,
        formState.inputValues.email,
        formState.inputValues.password,
        "email"
      );
      setError(null);
      await dispatch(action);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  }, [dispatch, formState]);

  return (
    <>
      <Input
        id="firstName"
        label="First name"
        icon="user-o"
        iconPack={FontAwesome}
        onInputChanged={inputChangedHandler}
        autoCapitalize="none"
        errorText={formState.inputValidities["firstName"]}
      />

      <Input
        id="lastName"
        label="Last name"
        icon="user-o"
        iconPack={FontAwesome}
        onInputChanged={inputChangedHandler}
        autoCapitalize="none"
        errorText={formState.inputValidities["lastName"]}
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
      />

      <Input
        id="password"
        label="Password"
        icon="lock"
        autoCapitalize="none"
        secureTextEntry
        iconPack={Feather}
        onInputChanged={inputChangedHandler}
        errorText={formState.inputValidities["password"]}
      />
      <View style={styles.row}>
        <Checkbox checked={agreed} onPress={onCheckboxPress} />

        <Text style={styles.agreeText}>
          I agree to
          <Text
            style={styles.link}
            onPress={() => onLinkPress(TERMS_CONDITIONS_LINK)}
          >
            {" "}
            Terms and Conditions
          </Text>{" "}
          and
          <Text
            style={styles.link}
            onPress={() => onLinkPress(PRIVACY_POLICY_LINK)}
          >
            {" "}
            Privacy Policy
          </Text>
        </Text>
      </View>

      {/* <View
        style={{
          borderBottomColor: colors.ui.gray500,
          borderWidth: 1,
          marginVertical: 20,
        }}
      ></View>
      <Text style={styles.terms}>
        By countinuing, I acknowledge that I have read and understood
        <Text style={{ ...styles.terms, fontWeight: "bold" }}>
          The App User Agreement{" "}
        </Text>{" "}
        and the{" "}
        <Text style={{ ...styles.terms, fontWeight: "bold" }}>
          Privacy Policy
        </Text>
      </Text> */}

      {isLoading ? (
        <ActivityIndicator
          size={"small"}
          color={colors.ui.accent2}
          style={{ marginTop: 10 }}
        />
      ) : (
        <>
          <SubmitButton
            title="Sign up"
            onPress={authHandler}
            style={{ marginTop: 20 }}
            disabled={!formState.formIsValid}
          />
          <SubmitButton
            title="SIGN UP WITH GOOGLE"
            GoogleIcon={true}
            icon={true}
            onPress={googleSignupHandler}
            style={{ marginTop: 20 }}
            color={colors.ui.tertiary}
          />
        </>
      )}
    </>
  );
};

export default SignUpForm;
const styles = StyleSheet.create({
  terms: { fontFamily: "regular", color: colors.text.primary },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  agreeText: {
    fontFamily: "regular",
    color: colors.text.primary,
    fontSize: 12,
    marginLeft: 8,
  },
  link: {
    textDecorationLine: "underline",
  },
});
