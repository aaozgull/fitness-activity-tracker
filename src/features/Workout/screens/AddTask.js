import moment from "moment";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  View,
  TextInput,
} from "react-native";
//import firestore from "@react-native-firebase/firestore";

import SubmitButton from "../../../components/utility/SubmitButton";
import Categories from "../../../components/utility/Categories";
import DateInput from "../../../components/utility/DateInput";
import Input from "../../../components/utility/Input";
import PageTitle from "../../../components/utility/PageTitle";
import { categories } from "../../../constants/categories";
import colors from "../../recipes/constants/colors";
import { useDispatch, useSelector } from "react-redux";
import { setToUpdate } from "../../../store/tasksSlice";
//import { TextInput } from "react-native-paper";

const AddTask = ({ navigation, exerciseName }) => {
  const user = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState();
  const [deadline, setDeadline] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const [roundDuration, setRoundDuration] = useState(3);
  const [restDuration, setRestDuration] = useState(1);
  const [numberOfRounds, setNumberOfRounds] = useState(2);

  const handleBack = () => {
    navigation.goBack();
  };

  const onSubmit = () => {
    const today = moment(new Date()).format("YYYY-MM-DD");
    const deadlineFormatted = moment(deadline).format("YYYY-MM-DD");
    /*  if (!title) {
      Alert.alert("Please enter the task title");
      return;
    } */
    if (moment(deadlineFormatted).isBefore(today)) {
      Alert.alert("Please enter future date");
      return;
    }

    setLoading(true);
    /* firestore()
      .collection("Tasks")
      .add({
        title,
        deadline,
        category,
        checked: false,
        userId: user?.uid,
      })
      .then(() => {
        setLoading(false);
        dispatch(setToUpdate());
        navigation.navigate("Tasks");
        setTitle("");
        setDeadline(new Date());
        setCategory(null);
      })
      .catch((e) => {
        console.log("error when adding task :>> ", e);
        setLoading(false);
        Alert.alert(e.message);
      }); */
  };
  const titleText = `Add ${exerciseName} in Your Calendar`;

  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.backContainer} hitSlop={8} onPress={handleBack}>
        <Image
          style={styles.backIcon}
          source={require("../../../../assets/back.png")}
        />
      </Pressable>

      <ScrollView>
        <PageTitle title={titleText} textStyle={styles.pageTitleColor} />
        {/*   <Text style={styles.label}>Describe the task</Text>
        <Input
          value={title}
          onChangeText={setTitle}
          // outlined
          placeholder="Type here..."
        /> */}

        <View /* style={styles.inputContainer} */>
          <Text style={styles.label}>Round Duration (seconds)</Text>
          <TextInput
            style={styles.input}
            value={roundDuration.toString()}
            onChangeText={(text) => setRoundDuration(parseInt(text) || 0)}
            keyboardType="numeric"
            editable={!loading}
          />
          <Text style={styles.label}>Rest Duration (seconds)</Text>
          <TextInput
            style={styles.input}
            value={restDuration.toString()}
            onChangeText={(text) => setRestDuration(parseInt(text) || 0)}
            keyboardType="numeric"
            editable={!loading}
          />
          <Text style={styles.label}>Number of Rounds</Text>
          <TextInput
            style={styles.input}
            value={numberOfRounds.toString()}
            onChangeText={(text) => setNumberOfRounds(parseInt(text) || 0)}
            keyboardType="numeric"
            editable={!loading}
          />
        </View>

        {/*   <Text style={styles.label}>Type</Text>
        <Categories
          categories={categories}
          selectedCategory={category}
          onCategoryPress={setCategory}
        />

        <Text style={styles.label}>Deadline</Text>
        <DateInput value={deadline} onChange={setDeadline} /> */}

        {loading ? (
          <ActivityIndicator />
        ) : (
          <SubmitButton
            title=" Add The Workout"
            onPress={onSubmit}
            style={styles.button}
            color={colors.blue}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(AddTask);

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    fontSize: 24,
    borderWidth: 2,
    fontFamily: "bold",
    letterSpacing: 0.3,
    borderColor: colors.grey2, //colors.text.tertiary,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    width: 250,
    color: colors.blue, // colors.text.secondary,
  },
  inputContainer: {
    marginTop: 32,
  },
  backContainer: {
    paddingVertical: 20,
    // backgroundColor: colors.green,
  },
  backIcon: {
    width: 32,
    height: 32,
  },
  label: {
    //fontSize: 12,
    // color: colors.black,
    // marginHorizontal: 24,
    //fontWeight: "500",
    // marginTop: 12,
    fontSize: 16,
    fontFamily: "light",
    color: colors.purple, //text.tertiary,
    marginBottom: 4,
  },
  button: {
    margin: 24,
  },
  pageTitleColor: {
    color: colors.blue, //colors.text.fiftary,
    fontSize: 20,
  },
});
