import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import PageContainer from "../../../components/utility/PageContainer";
import MultiStepHeader from "../components/MultiStepHeader";
import { colors } from "../../../infrastructure/theme/colors";
import RegistrationItem from "../components/RegistrationItem";
import SubmitButton from "../../../components/utility/SubmitButton";

const EquipmentScreen = ({ navigation, route }) => {
  const { Goal, FitnessLevel } = route.params;
  const [selectedEquipment, setSelectedEquipment] = useState(null);

  const handlePress = (equipment) => {
    console.log("handleEquipmentPress " + equipment);
    setSelectedEquipment(equipment);
  };
  //<MaterialCommunityIcons name="dumbbell" size={24} color="black" />
  //<MaterialCommunityIcons name="set-none" size={24} color="black" />
  const equipments = [
    {
      icon: "dumbbell",
      text: "Gym weight and Equipment",
    },
    {
      icon: "set-none",
      text: "None or Just a few weight",
    },
  ];

  function continueHandler() {
    /*  console.log(
      "continueHandler" + Goal + " " + FitnessLevel + " " + selectedEquipment
    ); */
    navigation.navigate("AddUserInfo", {
      Goal,
      FitnessLevel,
      Equipment: selectedEquipment,
    });
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MultiStepHeader title="Equipment" iconName="dumbbell" progress={1} />
      <PageContainer style={styles.pageContainer}>
        {equipments.map((item, index) => (
          <RegistrationItem
            key={index}
            text={item.text}
            icon={item.icon}
            onPress={handlePress}
            isChecked={selectedEquipment === item.text}
            isLastItem={index === equipments.length - 1}
          />
        ))}
        <View style={styles.buttonContainer}>
          <SubmitButton
            title="CONTINUE"
            onPress={continueHandler}
            style={{ marginHorizontal: 15 }}
            color={colors.ui.accent}
            disabled={selectedEquipment === null}
          />
        </View>
      </PageContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    //  paddingHorizontal: 20,
    backgroundColor: colors.ui.secondary,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "baseline",
    marginTop: 250,
    marginVertical: 15,
  },
});

export default EquipmentScreen;
