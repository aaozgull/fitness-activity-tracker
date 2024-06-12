import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import PageContainer from "../../../components/utility/PageContainer";
import MultiStepHeader from "../components/MultiStepHeader";
import { colors } from "../../../infrastructure/theme/colors";
import RegistrationItem from "../components/RegistrationItem";
import SubmitButton from "../../../components/utility/SubmitButton";

const GoalScreen = ({ navigation }) => {
  const goalItems = [
    { icon: "dumbbell", text: "Get Stronger" },
    { icon: "run-fast", text: "Lose Weight" },
    { icon: "yoga", text: "Discover Yoga" },
    { icon: "heart", text: "Get Fit" },
    { icon: "human-pregnant", text: "Pregnancy Program" },
  ];
  const [selectedGoal, setSelectedGoal] = useState(null);

  const handlePress = (goal) => {
    //console.log("handleGoalPress " + goal);
    setSelectedGoal(goal);
  };

  function continueHandler() {
    // console.log(`continueHandler ${selectedGoal}`);
    navigation.navigate("FitnessLevel", {
      Goal: selectedGoal,
    });
  }
  //<MaterialCommunityIcons name="bullseye-arrow" size={24} color="black" />
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MultiStepHeader title="Goal" iconName="bullseye-arrow" progress={0.33} />
      <PageContainer style={styles.pageContainer}>
        {goalItems.map((item, index) => (
          <RegistrationItem
            key={index}
            text={item.text}
            icon={item.icon}
            onPress={handlePress}
            isChecked={selectedGoal === item.text}
            isLastItem={index === goalItems.length - 1}
          />
        ))}

        <SubmitButton
          title="CONTINUE"
          onPress={continueHandler}
          style={{ marginHorizontal: 15 }}
          color={colors.ui.accent}
          disabled={selectedGoal === null}
        />
      </PageContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    // paddingHorizontal: 20,
    backgroundColor: colors.ui.secondary,
  },
});

export default GoalScreen;
