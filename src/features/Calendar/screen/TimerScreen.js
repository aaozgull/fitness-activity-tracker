import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { colors } from "../../../infrastructure/theme/colors";
import { useNavigation } from "@react-navigation/native"; // Import navigation hook

const TimerScreen = ({ navigation }) => {
  // const navigation = useNavigation(); // Initialize navigation
  const [roundDuration, setRoundDuration] = useState(3);
  const [restDuration, setRestDuration] = useState(1);
  const [numberOfRounds, setNumberOfRounds] = useState(2);
  const [currentRound, setCurrentRound] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(roundDuration);
  const [isResting, setIsResting] = useState(false);

  const countDown = useRef(null);

  useEffect(() => {
    setTime(isResting ? restDuration : roundDuration);
  }, []);

  const startCountDown = () => {
    if (currentRound <= numberOfRounds) {
      setIsRunning(true);
      console.log(`currentRound <= numberOfRounds)`);
      countDown.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 0) {
            console.log(`prevTime === 0`);
            clearInterval(countDown.current);
            if (currentRound < numberOfRounds) {
              console.log(`currentRound < numberOfRounds`);
              if (isResting) {
                console.log(
                  `1 navigation.navigate("Rest", { time: restDuration });`
                );
                setCurrentRound(currentRound + 1);
                setIsResting(false);
                return roundDuration;
              } else {
                console.log(
                  `navigation.navigate("Rest", { time: restDuration });`
                );
                navigation.navigate("Rest", { time: restDuration });
                setIsResting(true);
                return restDuration;
              }
            } else {
              setIsRunning(false);
              setIsResting(false);
              return 0;
            }
          }
          return prevTime - 1;
        });
      }, 1000);
    }
  };

  const pauseCountDown = () => {
    if (isRunning) {
      setIsRunning(false);
      clearInterval(countDown.current);
    }
  };

  const resetCountDown = () => {
    console.log(`resetCountDown`);
    setCurrentRound(1);
    setIsResting(false);
    setIsRunning(false);
    clearInterval(countDown.current);
    setTime(roundDuration);
  };

  useEffect(() => {
    if (currentRound === numberOfRounds && time === 0) {
      console.log(` currentRound === numberOfRounds && time === 0`);
      setCurrentRound(1);
      clearInterval(countDown.current);
      setIsResting(false);
      setIsRunning(false);
      setTime(0);
      return;
    }

    if (isRunning && time === 0) {
      if (currentRound < numberOfRounds) {
        if (isResting) {
          console.log(
            `${currentRound} Running && time === 0 isResting ${roundDuration}`
          );
          setCurrentRound(currentRound + 1);
          setIsResting(false);
          setTime(roundDuration);
        } else {
          console.log(
            `${currentRound}  Running && time === 0 else isResting f ${restDuration} `
          );
          setIsResting(true);
          setTime(restDuration);
        }
      } else {
        console.log(` else isRunning && time === 0`);
        setIsRunning(false);
        setIsResting(false);
        setTime(0);
      }
    }
  }, [isRunning, time]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isRunning
          ? isResting
            ? "Resting"
            : `Round ${currentRound}`
          : currentRound === 1 && time === roundDuration
            ? "Start"
            : currentRound === numberOfRounds && time === 0
              ? "Finished"
              : "Paused"}
      </Text>

      <Text
        style={styles.timer}
      >{`${Math.floor(time / 60)}:${time % 60 < 10 ? "0" : ""}${time % 60}`}</Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={startCountDown}
          style={[styles.button, { backgroundColor: "green" }]}
          disabled={isRunning || currentRound > numberOfRounds}
        >
          <Text style={styles.buttonText}>START</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={pauseCountDown}
          style={[styles.button, { backgroundColor: "red" }]}
          disabled={!isRunning}
        >
          <Text style={styles.buttonText}>PAUSE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={resetCountDown}
          style={[styles.button, { backgroundColor: "blue" }]}
        >
          <Text style={styles.buttonText}>RESET</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Round Duration (seconds)</Text>
        <TextInput
          style={styles.input}
          value={roundDuration.toString()}
          onChangeText={(text) => setRoundDuration(parseInt(text) || 0)}
          keyboardType="numeric"
          editable={!isRunning}
        />
        <Text style={styles.inputLabel}>Rest Duration (seconds)</Text>
        <TextInput
          style={styles.input}
          value={restDuration.toString()}
          onChangeText={(text) => setRestDuration(parseInt(text) || 0)}
          keyboardType="numeric"
          editable={!isRunning}
        />
        <Text style={styles.inputLabel}>Number of Rounds</Text>
        <TextInput
          style={styles.input}
          value={numberOfRounds.toString()}
          onChangeText={(text) => setNumberOfRounds(parseInt(text) || 0)}
          keyboardType="numeric"
          editable={!isRunning}
        />
      </View>
    </View>
  );
};
export default TimerScreen;
const styles = StyleSheet.create({
  container: {
    paddingTop: "30%",
    alignItems: "center",
    minHeight: "100%",
    backgroundColor: colors.ui.quaternary,
  },
  title: {
    fontSize: 34,
    fontFamily: "bold",
    letterSpacing: 0.3,
    marginBottom: 12,
    color: colors.text.tertiary,
  },
  timer: {
    fontSize: 24,
    fontFamily: "bold",
    letterSpacing: 0.3,
    color: colors.text.tertiary,
  },
  buttonsContainer: {
    flexDirection: "row",
    marginTop: 16,
  },
  button: {
    marginLeft: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 20,
    color: colors.text.fiftary,
  },
  inputContainer: {
    marginTop: 32,
  },
  inputLabel: {
    fontSize: 18,
    fontFamily: "light",
    color: colors.text.tertiary,
    marginBottom: 4,
  },
  input: {
    fontSize: 24,
    borderWidth: 2,
    fontFamily: "bold",
    letterSpacing: 0.3,
    borderColor: colors.text.tertiary,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    width: 250,
    color: colors.text.secondary,
  },
});
