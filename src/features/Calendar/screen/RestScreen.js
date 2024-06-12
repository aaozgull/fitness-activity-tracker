import { useEffect, useState } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import restImage from "../../../../assets/images/rest.jpg";
import { colors } from "../../../infrastructure/theme/colors";

const RestScreen = ({ navigation, time }) => {
  let timer = 0;
  const [timeLeft, setTimeLeft] = useState(time);
  const startTime = () => {
    setTimeout(() => {
      if (timeLeft <= 0) {
        navigation.goBack();
        clearTimeout(timer);
      }
      setTimeLeft(timeLeft - 1);
    }, 5000);
  };

  useEffect(() => {
    startTime();

    //Cleanup Function
    return () => clearTimeout(timer);
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.ui.quaternary }}>
      <Image resizeMode="contain" source={restImage} style={styles.image} />
      <Text style={{ ...styles.text, marginTop: 20 }}>TAKE A BREAK!</Text>
      <View style={styles.iconContainer}>
        <MaterialIcons name="timer" size={44} color={colors.text.tertiary} />
        <Text style={styles.text}> {timeLeft}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    color: colors.text.tertiary,
    fontFamily: "black",
    fontSize: 35,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  image: {
    width: "100%",
    height: 420,
    marginTop: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  iconContainer: {
    marginTop: 50,
    flexDirection: "row",
    alignItems: "center", // Align items vertically
    justifyContent: "center",
    // paddingHorizontal: 8,
  },
});

export default RestScreen;
