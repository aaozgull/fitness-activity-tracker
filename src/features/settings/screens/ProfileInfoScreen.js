import React, { useCallback, useMemo, useReducer, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import { Picker } from "@react-native-picker/picker";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import PageContainer from "../../../components/utility/PageContainer";
import PageTitle from "../../../components/utility/PageTitle";
import SubmitButton from "../../../components/utility/SubmitButton";
import { colors } from "../../../infrastructure/theme/colors";
import { updateLoggedInUserInfoData } from "../../../store/userInfoSlice"; //"../store/authSlice";
import { updateSignedInUserInfoData } from "../../../utils/actions/userInfoActions";
import { validateInput } from "../../../utils/actions/formActions";
import { reducer } from "../../../utils/reducers/formReducer";
import { updateLoggedInUserData } from "../../../store/authSlice";

import DateTimePicker from "@react-native-community/datetimepicker";
import { getFormattedDate } from "../../../utils/date";
const ProfileInfoScreen = (props) => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [weight, setWeight] = useState(userInfoData.weight);
  const [height, setHeight] = useState(userInfoData.height);
  const [birthdayErrorText, setBirthdayErrorText] = useState("");
  const [weightErrorText, setWeightErrorText] = useState("");
  const [heighterrorText, setHeightErrorText] = useState("");
  const [gender, setGender] = useState(userInfoData.gender);

  const userInfoData = useSelector((state) => state.userInfo.userInfoData);
  const [date, setDate] = useState(userInfoData.age);
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowPicker(false);
    setDate(currentDate);
    const todayDate = new Date();
    if (todayDate.getFullYear() - currentDate.getFullYear() < 16) {
      setBirthdayErrorText("^You need to be at least 16 years old");
    } else {
      setBirthdayErrorText("");
    }
  };

  const showDatePicker = () => {
    setShowPicker(true);
  };

  const saveHandler = async () => {
    const userInfoValues = {
      gender: gender,
      age: date,
      weight: weight,
      height: height,
    };

    try {
      setIsLoading(true);
      await updateSignedInUserInfoData(userInfoData.userId, userInfoValues);
      dispatch(updateLoggedInUserInfoData({ newInfoData: userInfoValues }));

      setShowSuccessMessage(true);

      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer style={styles.container}>
      <PageTitle title="User Info Settings" />
      <View style={styles.formContainer}>
        <Text style={styles.text}>Birthday</Text>
        <View
          style={{
            backgroundColor: colors.ui.grey10,
            justifyContent: "flex-start",
            alignItems: "flex-start",
            width: "70%",
          }}
        >
          <Button
            icon="calendar"
            onPress={showDatePicker}
            labelStyle={styles.text}
            textColor={colors.text.primary}
            style={{ color: colors.text.primary, fontSize: 20 }}
          >
            {getFormattedDate(date)}
          </Button>
          {showPicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              is24Hour={true}
              // display="default"
              onChange={onChange}
            />
          )}
        </View>
        {birthdayErrorText !== "" && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{birthdayErrorText}</Text>
          </View>
        )}
        <View>
          <Text style={styles.text}>Weight</Text>
          <TextInput
            placeholder={`Enter your weight in Kg`}
            keyboardType="numeric"
            onChangeText={(text) => {
              if (parseInt(text) <= 0 || parseInt(text) >= 1000) {
                setWeightErrorText("Please enter a valid weight");
              } else {
                setWeightErrorText("");
              }
              setWeight(text);
            }}
            value={weight}
            style={styles.textInput}
          />
          {weightErrorText !== "" && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{weightErrorText}</Text>
            </View>
          )}
          <Text style={styles.text}>height</Text>
          <TextInput
            placeholder={`Enter your height in Inches`}
            keyboardType="numeric"
            onChangeText={(text) => {
              if (parseInt(text) <= 0 || parseInt(text) >= 300) {
                setHeightErrorText("Please enter a valid height");
              } else {
                setHeightErrorText("");
              }
              setHeight(text);
            }}
            value={height}
            style={styles.textInput}
          />
          {heighterrorText !== "" && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{heighterrorText}</Text>
            </View>
          )}
          <View>
            <Text style={styles.text}>Gender</Text>
            <Picker
              style={{ ...styles.picker, width: "70%" }}
              selectedValue={gender}
              onValueChange={(value) => {
                setGender(value);
              }}
            >
              <Picker.Item label="Male" value="Male" style={styles.text} />
              <Picker.Item label="Female" value="Female" style={styles.text} />
            </Picker>
          </View>
        </View>

        <View style={{ marginTop: 120 }}>
          {showSuccessMessage && <Text>Saved!</Text>}

          {isLoading ? (
            <ActivityIndicator
              size={"small"}
              color={colors.ui.accent2}
              style={{ marginTop: 10 }}
            />
          ) : (
            <SubmitButton
              title="Save"
              onPress={saveHandler}
              style={{ marginTop: 20 }}
              disabled={
                birthdayErrorText !== "" &&
                weightErrorText !== "" &&
                heighterrorText !== ""
              }
            />
          )}
        </View>
      </View>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginTop: 50,
    padding: 20,
  },
  formContainer: {
    //alignItems: "center",
    marginTop: 50,
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    color: "red",
    fontSize: 13,
    fontFamily: "regular",
    letterSpacing: 0.3,
  },
  unitsText: {
    flex: 1,
    fontSize: 21,
    fontFamily: "bold",
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 0.3,
    color: colors.text.primary,
  },
  unitsContainer: { flexDirection: "row", marginTop: 30 },
  picker: {
    flex: 1,
    height: 50,
    backgroundColor: colors.ui.secondary,
    color: colors.text.primary,
  },
  pickerContainer: { flexDirection: "row", marginBottom: 10, marginTop: 10 },
  textInput: {
    width: "70%",
    padding: 10,
    fontSize: 16,
    fontFamily: "medium",
    letterSpacing: 0.3,
    backgroundColor: colors.ui.secondary,
    marginBottom: 10,
    color: colors.text.primary,
  },
  text: {
    fontSize: 16,
    fontFamily: "medium",
    paddingVertical: 5,
    letterSpacing: 0.3,
    color: colors.text.primary,
  },
});

export default ProfileInfoScreen;
