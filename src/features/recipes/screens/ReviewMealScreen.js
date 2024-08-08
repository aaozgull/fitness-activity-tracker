import React, { useEffect, useReducer, useState, useCallback } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Image,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Divider } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

import Categories from "../components/Categories";
import Input from "../../../components/utility/Input";
import PageTitle from "../../../components/utility/PageTitle";
import { colors } from "../../../infrastructure/theme/colors";
import { validateInput } from "../../../utils/actions/formActions";
import { reducer } from "../../../utils/reducers/formReducer";
import front from "../../../../assets/images/front.jpg";
import { logMeal } from "../../../utils/actions/mealActions";
import { addMealData } from "../../../store/mealsSlice";
import SubmitButton from "../../../components/utility/SubmitButton";
import { updateMealActivitiesData } from "../../../utils/actions/calendarActions";
import { updateCalendarMealActivity } from "../../../store/calendarActivitiesSlice";

const ReviewMealScreen = ({ route, navigation }) => {
  const { item, calendarId, activityId } = route?.params || {};
  //console.log("ReviewMealScreen calendarId:", calendarId);
  //console.log("ReviewMealScreens activityId:", activityId);
  const imageUrl = item ? { uri: item?.thumbnail_url } : front;
  const [note, setNote] = useState("");
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");
  const [tagErrorText, setTagErrorText] = useState("");

  const [todayDate, setTodayDate] = useState(
    new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  );
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  useEffect(() => {
    const tagsList = ["breakfast", "Lunch", "Dinner", "Snack"];
    setTags(tagsList);
  }, []);

  const initialState = {
    inputValues: {
      note,
    },
    inputValidities: {
      note: undefined,
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
  const hasChanges = () => {
    const currentValues = formState.inputValues;

    return currentValues.note != note;
  };

  const saveHandler = useCallback(async () => {
    // console.log("selectedTag", selectedTag);
    if (selectedTag === "") {
      setTagErrorText("Please select any tag");
      return;
    }
    const updatedValues = {
      ...formState.inputValues,
      mealId: item?.id,
      mealTime: selectedTag,
      isFavourite: false,
      todayDate: todayDate,
    };

    try {
      /*  console.log(
        " ----------------logProgress newProgressData",
        updatedValues
      ); */

      setIsLoading(true);
      const mealkey = await logMeal(userData.userId, updatedValues);
      dispatch(addMealData({ mealkey, mealData: updatedValues }));
      ///update meal activities
      await updateMealActivitiesData(
        calendarId,
        activityId,
        "1 Meal Added",
        true
      );
      dispatch(
        updateCalendarMealActivity({
          calendarId,
          activityId,
          isChecked: true,
          text: "1 Meal Added",
        })
      );
      setShowSuccessMessage(true);

      setTimeout(() => {
        setShowSuccessMessage(false);

        setNote("");
        navigation.goBack();
      }, 6000);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [formState, dispatch]);

  const setCategoryTag = (item) => {
    // console.log("setCategoryTag", item, " selectedTag", selectedTag);
    setSelectedTag(item);
    setTagErrorText("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{ paddingHorizontal: 24 }}>
          <Categories
            categories={tags}
            selectedCategory={selectedTag}
            onCategoryPress={setCategoryTag}
          />
          {tagErrorText !== "" && (
            <Text style={styles.tagErrorText}>{tagErrorText}</Text>
          )}
        </View>
        <Divider />

        <View style={{ marginTop: 20, paddingHorizontal: 24 }}>
          <Text>
            Photos can sometimes make it hard to distinguish certain foods.
            Adding a short note about your meal will help your trainer assess it
            more accurately.{" "}
          </Text>
          <Input
            id="note"
            label="Note"
            icon="pen"
            iconPack={FontAwesome5}
            onInputChanged={inputChangedHandler}
            autoCapitalize="none"
            errorText={formState.inputValidities["note"]}
            initialValue={note}
          />
          <PageTitle
            textStyle={styles.pageTitleStyle}
            title={item?.name}
            subTitle={todayDate}
          />
        </View>
        <Image source={imageUrl} style={{ height: 400, width: "100%" }} />
        <View style={{ marginVertical: 20, paddingHorizontal: 24 }}>
          {showSuccessMessage && <Text>Saved!</Text>}

          {isLoading ? (
            <ActivityIndicator
              size={"Large"}
              color={colors.ui.accent2}
              style={{ marginTop: 10 }}
            />
          ) : (
            hasChanges() && (
              <SubmitButton
                title="Log Meal"
                onPress={saveHandler}
                style={{ marginTop: 20 }}
                disabled={!formState.formIsValid}
              />
            )
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(ReviewMealScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 24,
    backgroundColor: colors.bg.primary,
  },
  list: {
    marginBottom: 24,
  },
  tagErrorText: {
    fontFamily: "medium",
    fontSize: 16,
    letterSpacing: 0.3,
    color: colors.ui.error500,
    marginBottom: 5,
  },
  pageTitleStyle: {
    fontFamily: "bold",
    letterSpacing: 0.5,
    fontSize: 20,
    marginTop: 10,
    color: colors.ui.fiftary,
    //marginBottom: 2,
  },
});
