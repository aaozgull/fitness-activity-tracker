import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import PageContainer from "../../../components/utility/PageContainer";
import MultiStepHeader from "../components/MultiStepHeader";
import { colors } from "../../../infrastructure/theme/colors";
import RegistrationItem from "../components/RegistrationItem";
import SubmitButton from "../../../components/utility/SubmitButton";

const FitnessLevelScreen = ({ navigation, route }) => {
  const { Goal } = route.params;
  const fitnessLevels = [
    { text: "Beginner", subText: "Just Started my Journey" },
    { text: "Intermediate", subText: "Comfortable with most Equipment" },
    { text: "Advance", subText: "I'm Super Active" },
    { text: "Expert", subText: "Looking For Challenge" },
  ];
  const [selectedFitnessLevel, setSelectedFitnessLevel] = useState(null);

  const handlePress = (level) => {
    // console.log("handleitnessLevelPress " + level);
    setSelectedFitnessLevel(level);
  };

  function continueHandler() {
    // console.log(` Goal ${Goal} continueHandler ${selectedFitnessLevel}`);
    navigation.navigate("Equipment", {
      Goal,
      FitnessLevel: selectedFitnessLevel,
    });
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MultiStepHeader
        title="Fitness Level"
        iconName="run-fast"
        progress={0.66}
      />
      <PageContainer style={styles.pageContainer}>
        {fitnessLevels.map((item, index) => (
          <RegistrationItem
            key={index}
            text={item.text}
            subText={item.subText}
            onPress={handlePress}
            isChecked={selectedFitnessLevel === item.text}
            isLastItem={index === fitnessLevels.length - 1}
          />
        ))}
        <View style={{ flex: 1 }}>
          <SubmitButton
            title="CONTINUE"
            onPress={continueHandler}
            style={{ marginHorizontal: 15 }}
            color={colors.ui.accent}
            disabled={selectedFitnessLevel === null}
          />
        </View>
      </PageContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    // paddingHorizontal: 20,
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
});

export default FitnessLevelScreen;
