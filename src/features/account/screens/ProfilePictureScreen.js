import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import PageContainer from "../../../components/utility/PageContainer";
import PageTitle from "../../../components/utility/PageTitle";
import ProfileImage from "../../../components/utility/ProfileImage";
import SubmitButton from "../../../components/utility/SubmitButton";
import { colors } from "../../../infrastructure/theme/colors";
import ProfilePic from "../../../../assets/images/ProfilePic.jpg";

const ProfilePictureScreen = ({ navigation }) => {
  const userData = useSelector((state) => state.auth.userData);

  return (
    <PageContainer style={styles.container}>
      <View style={styles.imageBorder}>
        <ProfileImage
          size={280}
          userId={userData.userId}
          uri={ProfilePic}
          showEditButton={true}
          editIconContainerStyle={styles.editIconContainer}
          editSize={30}
        />
      </View>
      <View style={styles.icon}>
        <Ionicons name="camera" size={54} color="white" />
      </View>
      <PageTitle title="Let's take a profile picture" />
      <Text style={styles.text}>
        Let's personalize your account with your with your own profile picture
        so your trainer can see you.
      </Text>
      <View style={styles.buttonContainer}>
        <SubmitButton
          title="CONTINUE"
          onPress={() => navigation.navigate("SetupCalendar")}
          style={{ marginTop: 20 }}
          color={colors.ui.accent}
        />
        <SubmitButton
          title="Skip This For Now"
          onPress={() => navigation.navigate("SetupCalendar")}
          style={{ marginTop: 20 }}
          color={colors.bg.primary}
          textColor={colors.ui.accent}
        />
      </View>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    // marginTop: 100,
  },
  editIconContainer: {
    backgroundColor: colors.ui.primary,
    right: 50,
  },
  icon: {
    marginTop: 60,
    borderRadius: 50,
    borderColor: colors.ui.accent2,
    borderWidth: 15,
    backgroundColor: colors.ui.accent2,
  },
  text: {
    fontFamily: "medium",
    fontSize: 16,
    letterSpacing: 0.3,
    color: colors.text.primary,
    paddingHorizontal: 20,
  },
  imageBorder: {
    marginTop: 100,
    padding: 10,
    borderRadius: 150,
    borderColor: colors.ui.accent2,
    borderWidth: 2,
    borderStyle: "dashed",
  },
  buttonContainer: {
    marginBottom: 20,
    flex: 1,
    width: "90%",
    justifyContent: "flex-end",
  },
});

export default ProfilePictureScreen;
