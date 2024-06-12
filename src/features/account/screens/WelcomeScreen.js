import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import Animated from "react-native-reanimated";
import { FadeInDown } from "react-native-reanimated";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import WelcomeImageSlider from "../components/WelcomeImageSlider";

import { colors } from "../../../infrastructure/theme/colors";
import SubmitButton from "../../../components/utility/SubmitButton";
import { async } from "validate.js";

export default function WelcomeScreen({ navigation }) {
  WebBrowser.maybeCompleteAuthSession();
  const [accessToken, setAccessToken] = useState();
  const [userInfo, setUserInfo] = useState();
  /*  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "1077687897681-72s5vd9hmuagshjplbsi4t69fepnt63b.apps.googleusercontent.com",

    expoClientId:
      "1077687897681-hdc9sfan9mp8gf1aermk4383pkqkc5ta.apps.googleusercontent.com",
  });
  //console.log("WelcomeScreen");
  useEffect(() => {
    if (response?.type === "success") {
      // const { code } = response.params;
      setAccessToken(response.authentication.accessToken);
      getUserData();
    }
  }, [response]);
  const getUserData = async () => {
    try {
      const res = await fetch("https://www.googleapis.com/userInfo/v2/me", {
        Headers: {
          authorization: `Bearer ${response.authentication.accessToken}`,
        },
      }); 
      const user = await res.json();
      console.log(user);
      setUserInfo(user);
    } catch (error) {}
  };*/
  return (
    <SafeAreaView
      style={{
        width: "100%",
        height: "100%",
        justifyContent: "flex-start",
        paddingBottom: 20,
      }}
    >
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Auth", { isNewRegisteration: false })
        }
        style={styles.linkContainer}
      >
        <Text style={styles.link}>Log in</Text>
      </TouchableOpacity>
      <WelcomeImageSlider />
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <Animated.View entering={FadeInDown.delay(100).springify()}>
          <SubmitButton
            title="SIGN UP WITH GOOGLE"
            GoogleIcon={true}
            icon={true}
            onPress={() => null /* promptAsync() */}
            style={{ margin: 15 }}
            color={colors.ui.tertiary}
          />
        </Animated.View>
        <Animated.View
          entering={FadeInDown.delay(200).springify()}
          //  style={{ alignItems: "center" }}
        >
          <SubmitButton
            title="  SIGN UP WITH EMAIL  "
            EmailIcon={true}
            icon={true}
            onPress={() =>
              navigation.navigate("Auth", { isNewRegisteration: true })
            }
            style={{ marginHorizontal: 15 }}
            color={colors.ui.accent}
          />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(300).springify()}>
          <View style={{ marginTop: 12 }}>
            <Text style={styles.termText}>
              By Signing up you agree for ours{" "}
              <Text
                style={{ ...styles.termText, textDecorationLine: "underline" }}
              >
                Terms of Service
              </Text>{" "}
              and{" "}
              <Text
                style={{ ...styles.termText, textDecorationLine: "underline" }}
              >
                Privacy Policy
              </Text>
            </Text>
          </View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  ImageContainer: {
    flex: 1,
    // marginHorizontal: 20,

    backgroundColor: colors.ui.quaternary,
    //marginTop: 20,
    //backgroundColor: theme.colors.ui.accent2,
    //padding: 8,
    borderTopStartRadius: 200,

    borderBottomStartRadius: 200,
    elevation: 3,
    shadowColor: colors.ui.quaternary, // "#39324a", // GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  termText: {
    fontSize: 14,
    fontFamily: "regular",
    color: colors.ui.gray700,
    //fontWeight: "bold",
    letterSpacing: 1,
    paddingHorizontal: 20,
  },
  linkContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginVertical: 35,
    marginHorizontal: 35,
  },
  link: {
    color: colors.text.primary,
    fontFamily: "regular",
    fontSize: 20,
    letterSpacing: 0.3,
    marginTop: 15,
  },
});
