import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  StatusBar,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import PageContainer from "../../../components/utility/PageContainer";
import PageTitle from "../../../components/utility/PageTitle";
import SubmitButton from "../../../components/utility/SubmitButton";
import { colors } from "../../../infrastructure/theme/colors";
import { Divider } from "react-native-paper";
///import { HeaderButtons } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../../components/utility/CustomHeaderButton";
import SubTitle from "../../../components/utility/SubTitle";
import DataItem from "../../../components/utility/DataItem";
import { bodyParts } from "../../../constants/index";

const TodayWorkoutScreen = (props) => {
  const [isStart, setIsStart] = useState(false);
  /* useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => {
        return (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item iconName="ellipsis-vertical" onPress={() => null} />
          </HeaderButtons>
        );
      },
      headerLeft: () => {
        return (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item iconName="arrow-back" onPress={() => null} />
          </HeaderButtons>
        );
      },
    });
  }, []); */
  function continueHandler() {
    setIsStart(true);
    // dispatch(setIsNewRegistration());
  }
  const handleItemPress = (item) => {
    props.navigation.navigate("ExerciseDetailScreen", { item: item });
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      {!isStart && (
        <View>
          <Text>Today</Text>
          <PageTitle
            title="Bodyweight Pure Strength Workout"
            subTitle="Schedualed"
            textStyle={{ color: colors.text.primary, fontSize: 20 }}
          />
        </View>
      )}
      {isStart && (
        <View>
          <PageTitle
            title="Follow each exercise and rest period from top to bottom."
            textStyle={{
              color: colors.text.primary,
              fontSize: 20,
              //alignItems: "center",
              textAlign: "center",
            }}
          />
        </View>
      )}
      <Divider />
      <View style={{ marginTop: 10 }}>
        <SubTitle text="Instruction" />
        <Text style={styles.instructionText}>
          No equipement! No problem! Help clients build Strength with his
          bodyweight-only workout.
        </Text>
      </View>
      <FlatList
        data={bodyParts}
        renderItem={({ item }) => {
          console.log(item.image);
          return (
            <DataItem
              type={"workout"}
              size={80}
              title={item.name}
              subTitle="3 sets x As many as possible"
              image={item.image}
              onPress={() => handleItemPress(item)}
            />
          );
        }}
        keyExtractor={(item, index) => item.name + index}
      />
      {!isStart && (
        <View style={styles.buttonContainer}>
          <SubmitButton
            title="START NOW"
            onPress={continueHandler}
            style={{ marginTop: 20 }}
            color={colors.ui.tertiary}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: 30,
    marginTop: StatusBar.currentHeight,
    backgroundColor: colors.bg.primary,
  },
  container: {
    padding: 20,
    alignItems: "center",
    marginTop: 50,
  },

  icon: {
    marginTop: 100,
    borderRadius: 50,
    //borderColor: colors.ui.accent,
    // borderWidth: 15,
    //backgroundColor: colors.ui.accent2,

    padding: 10,
    //borderWidth: 2,
    //borderStyle: "solid",
  },

  instructionText: {
    fontFamily: "regular",
    // fontSize: 16,
    letterSpacing: 0.3,
    color: colors.text.primary,
    marginTop: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    marginBottom: 20,
    flex: 1,
    width: "90%",
    justifyContent: "flex-end",
  },
});

export default TodayWorkoutScreen;
