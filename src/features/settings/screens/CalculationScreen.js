import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { colors } from "../../../infrastructure/theme/colors";
import PageContainer from "../../../components/utility/PageContainer";
import PageTitle from "../../../components/utility/PageTitle";
import SubmitButton from "../../../components/utility/SubmitButton";
import { SafeAreaView } from "react-native-safe-area-context";

const CalculationScreen = () => {
  const [weight, setWeight] = useState(null);
  const [height, setHeight] = useState(null);
  const [bmi, setBmi] = useState(null);
  const [weightUnit, setWeightUnit] = useState("kg");
  const [heightUnit, setHeightUnit] = useState("cm");

  const calculateBmi = () => {
    if (weight && height) {
      // Convert weight to kilograms if it's in pounds
      const weightKg =
        weightUnit === "kg" ? parseFloat(weight) : parseFloat(weight) / 2.20462;
      // console.log(`weightKg ${weightKg} ${weightUnit}`);
      // Convert height to meters if it's in inches
      const heightM =
        heightUnit === "cm"
          ? parseFloat(height) / 100
          : parseFloat(height) / 39.37;

      //console.log(`heightM ${heightM} ${heightUnit}`);
      // Calculate BMI using the formula: weight (kg) / (height (m) * height (m))
      const bmiValue = weightKg / (heightM * heightM);
      // console.log(`bmiValue ${bmiValue}`);
      // Set the calculated BMI value in state, rounded to 2 decimal places
      setBmi(bmiValue.toFixed(2));
    } else {
      // If weight or height is not provided, set BMI to null
      setBmi(null);
    }
  };

  const getBmiMeaning = () => {
    // console.log(`getBMI ${bmi}`);
    if (bmi !== null) {
      if (bmi < 18.5) {
        return {
          message:
            " You are underweight. Consider consulting a doctor or a nutritionist",
          color: `${colors.ui.error500}`,
        };
      } else if (bmi < 24.9) {
        return {
          message: "Congratulation ! You are in a healthy weight range",
          color: `${colors.ui.tertiary}`,
        };
      } else if (bmi < 29.9) {
        return {
          message: "You are overweight ! Consider adopting a healthy diet",
          color: `${colors.ui.accent}`,
        };
      } else {
        return {
          message:
            "You are obese. Please consider consulting a healthcare professional",
          color: `${colors.ui.error500}`,
        };
      }
    }
  };

  const bmiMessage = getBmiMeaning();

  return (
    <>
      <PageTitle
        title="BMI Calculator"
        style={{ backgroundColor: colors.ui.quaternary }}
        textStyle={{ color: colors.text.tertiary, fontSize: 28 }}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: colors.ui.accent2,
          paddingHorizontal: 20,
        }}
      >
        <View style={styles.unitsContainer}>
          <Text style={styles.unitsText}>Weight Unit</Text>
          <Text style={styles.unitsText}>Height Unit</Text>
        </View>
        <View style={styles.pickerContainer}>
          <Picker
            style={styles.picker}
            selectedValue={weightUnit}
            onValueChange={(value) => {
              setWeightUnit(value);
              setBmi(null);
            }}
          >
            <Picker.Item label="Kg" value="kg" style={styles.text} />
            <Picker.Item label="Pounds" value="lbs" style={styles.text} />
          </Picker>
          <Picker
            style={styles.picker}
            selectedValue={heightUnit}
            onValueChange={(value) => {
              setHeightUnit(value);
              setBmi(null);
            }}
          >
            <Picker.Item label="Cm" value="cm" style={styles.text} />
            <Picker.Item label="Inches" value="in" style={styles.text} />
          </Picker>
        </View>
        <Text style={styles.text}>Weight</Text>
        <TextInput
          placeholder={`Enter your weight in ${weightUnit}`}
          keyboardType="numeric"
          onChangeText={(text) => {
            setWeight(text);
            setBmi(null);
          }}
          value={weight}
          style={styles.textInput}
        />
        <Text style={styles.text}>height</Text>
        <TextInput
          placeholder={`Enter your height in ${heightUnit}`}
          keyboardType="numeric"
          onChangeText={(text) => {
            setHeight(text);
            setBmi(null);
          }}
          value={height}
          style={styles.textInput}
        />
        <SubmitButton
          title="Calculate BMI"
          color={colors.ui.accent}
          style={{ marginTop: 30 }}
          onPress={calculateBmi}
        />

        {bmi !== null ? (
          <View style={styles.result}>
            <Text style={styles.unitsText}>
              Your BMI is : <Text style={{ fontSize: 24 }}>{bmi}</Text>
            </Text>

            <Text
              style={{
                ...styles.text,
                fontSize: 20,
                marginTop: 10,
                textAlign: "center",
                color: bmiMessage.color,
              }}
            >
              {bmiMessage.message}
            </Text>
          </View>
        ) : null}
      </View>
    </>
  );
};

export default CalculationScreen;
const styles = StyleSheet.create({
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
  result: {
    marginTop: 50,
    backgroundColor: colors.ui.primary,
    padding: 20,
    borderRadius: 20,
  },
});
