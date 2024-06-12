import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import PageContainer from "../../../components/utility/PageContainer";
import SignInForm from "../components/SignInForm";
import SignUpForm from "../components/SignUpForm";
//import colors from "../../../constants/colors";
import { colors } from "../../../infrastructure/theme/colors";

import logo from "../../../../assets/images/logo.png";

const AuthScreen = ({ navigation, route }) => {
  const { isNewRegisteration } = route.params;
  //console.log(`isNewRegisteration ${isNewRegisteration}`);
  const [isSignUp, setIsSignUp] = useState(isNewRegisteration);
  function backButtonHandler() {
    navigation.goBack();
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageContainer style={styles.pageContainer}>
        <View style={styles.backButtonContainer}>
          <TouchableOpacity onPress={backButtonHandler}>
            <Ionicons
              name="arrow-back-circle-sharp"
              size={40}
              color={colors.ui.tertiary}
            />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <KeyboardAvoidingView
            style={styles.keyboardAvoidingView}
            behavior={Platform.OS === "ios" ? "height" : undefined}
            keyboardVerticalOffset={100}
          >
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={logo} resizeMode="contain" />
            </View>

            {isSignUp ? <SignUpForm /> : <SignInForm />}

            <TouchableOpacity
              onPress={() => setIsSignUp((prevState) => !prevState)}
              style={styles.linkContainer}
            >
              <Text
                style={styles.link}
              >{`Switch to ${isSignUp ? "sign in" : "sign up"}`}</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
      </PageContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    paddingHorizontal: 20,
    backgroundColor: colors.ui.secondary,
  },
  linkContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
  },
  link: {
    color: colors.ui.tertiary,
    fontFamily: "medium",
    letterSpacing: 0.3,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    //backgroundColor: "red",
  },
  image: {
    //width: "50%",
    height: "100%",
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: "center",
  },
  backButtonContainer: {
    // backgroundColor: "red",
    marginRight: 15,
    marginTop: 30,
  },
});

export default AuthScreen;
