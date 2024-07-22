import React, { useEffect, useReducer, useState, useCallback } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  Image,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Divider } from "react-native-paper";

import Card from "../components/Card";
import Categories from "../components/Categories";
import Input from "../../../components/utility/Input";
import RecipeCard from "../components/RecipeCard";
import PageTitle from "../../../components/utility/PageTitle";
import { colors } from "../../../infrastructure/theme/colors";
import { validateInput } from "../../../utils/actions/formActions";
import { reducer } from "../../../utils/reducers/formReducer";
import front from "../../../../assets/images/front.jpg";

const ReviewMealScreen = ({ navigation }) => {
  const [note, setNote] = useState("");
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState();

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

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingHorizontal: 24 }}>
        <Categories
          categories={tags}
          selectedCategory={selectedTag}
          onCategoryPress={setSelectedTag}
        />
      </View>
      <Divider />
      <View style={{ marginTop: 20, paddingHorizontal: 24 }}>
        <Text>
          Photos can sometimes make it hard to distinguish certain foods. Adding
          a short note about your meal will help your trainer assess it more
          accurately.{" "}
        </Text>
        <Input
          id="note"
          label="note"
          icon="pen"
          iconPack={FontAwesome5}
          onInputChanged={inputChangedHandler}
          autoCapitalize="none"
          errorText={formState.inputValidities["note"]}
          initialValue={note}
        />
      </View>
      <Image source={front} style={{ height: 400, width: "100%" }} />
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
});
