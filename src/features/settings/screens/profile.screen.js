import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, ScrollView } from "react-native";
//import DateTimePickerModal from "react-native-modal-datetime-picker";
//import RNPickerSelect, { defaultStyles } from "react-native-picker-select";
import { Ionicons } from "@expo/vector-icons";

import { theme } from "../../../infrastructure/theme";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
//import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import MyPickerSelect from "../component/myPickerSelect-component";

const placeholder = {
  label: "Select an item...",
  value: null,
  //color: "red", //"#9EA0A4",
};

const sexOptions = [
  { label: "Female", value: "Female" },
  { label: "Male", value: "Male" },
  { label: "Non-binary", value: "Non-binary" },
  { label: "Not Specified", value: "Not Specified" },
];

const ProfileScreen = () => {
  const [profileData, setProfileData] = useState({
    email: "",
    phone: "",
    skype: "",
    birthday: "",
    height: "",
    sex: "",
    activityLevel: "",
    country: "",
    city: "",
    timeZone: "",
    weightUnit: "",
    distanceUnit: "",
    bodyStatsUnit: "",
  });
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    // Format the date as needed (e.g., 'yyyy-MM-dd')
    const formattedDate = date.toISOString().split("T")[0];

    setProfileData({
      ...profileData,
      birthday: formattedDate,
    });

    hideDatePicker();
  };

  const handleChange = (key, value) => {
    setProfileData({
      ...profileData,
      [key]: value,
    });
  };

  const handleSubmit = () => {
    // Handle the submission of profile data (e.g., send to server)
    console.log("Profile Data Submitted:", profileData);
  };

  const handleSexChange = (value) => {
    console.log("handle Sex Change " + value);
    setProfileData({
      ...profileData,
      sex: value,
    });
  };

  return (
    <SafeArea>
      <ScrollView style={styles.container}>
        <Text variant="label">Edit Profile</Text>

        {/* Email */}
        <View style={styles.field}>
          <Text variant="label">Email</Text>
          <TextInput
            style={styles.input}
            value={profileData.email}
            onChangeText={(text) => handleChange("email", text)}
          />
        </View>

        {/* Birthday */}
        <View style={styles.field}>
          <Text variant="label">Birthday</Text>
          <TextInput
            style={styles.input}
            value={profileData.birthday}
            onFocus={showDatePicker}
          />
          {/*  <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          /> */}
        </View>

        {/* Sex */}
        <View style={styles.field}>
          {/*  <Text variant="label">Sex</Text> */}

          <MyPickerSelect
            data={sexOptions}
            placeholder={placeholder}
            title="Sex"
            value={profileData.sex}
            setValue={handleSexChange.bind(this)}
            width="200"
          />

          {/*  <RNPickerSelect
            items={sexOptions}
            placeholder={placeholder}
            onValueChange={handleSexChange}
            value={profileData.sex}
            textInputProps={{ underlineColor: "yellow" }}
            Icon={() => {
              return <Ionicons name="md-arrow-down" size={24} color="gray" />;
            }}
            // style={pickerSelectStyles}
            useNativeAndroidPickerStyle={false}
          /> */}
        </View>

        {/* Other Fields... (Repeat similar structure for other fields) */}

        <Button title="Save" onPress={handleSubmit} />
      </ScrollView>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  field: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginTop: 4,
  },
});

/* const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
}); */

export default ProfileScreen;
