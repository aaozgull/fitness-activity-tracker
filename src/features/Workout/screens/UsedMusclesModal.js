import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Modal from "react-native-modal";

import { theme } from "../../../infrastructure/theme";
import { colors } from "../../../infrastructure/theme/colors";

import SubmitButton from "../../../components/utility/SubmitButton";
const MuscleName = ({ name }) => {
  //console.log("infoCard " + exercise.name);
  //console.log("InfoCard " + exercise.gifUrl);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{name}</Text>
    </View>
  );
};

const UsedMusclesModal = ({ isVisible, onClose, muscles }) => {
  const musclesList = muscles || [];
  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={styles.modalContainer}>
        <PageTitle
          title="Secondary Muscles Used"
          textStyle={styles.menuHeaderText}
        />
        <ScrollView contentContainerStyle={styles.musclesGrid}>
          {musclesList.map((muscle, index) => (
            <MuscleName key={index} name={muscle} />
          ))}
        </ScrollView>
        <SubmitButton
          title="BACK"
          onPress={onClose}
          color={colors.ui.tertiary}
          style={{ marginTop: 120 }}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: colors.bg.primary, //"rgba(255, 255, 255, 0.6)",
    borderRadius: 10,
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  menuHeaderText: {
    fontFamily: "bold",
    letterSpacing: 0.5,
    fontSize: 24,
  },

  container: {
    backgroundColor: colors.bg.primary,
    borderRadius: 25,
    borderColor: colors.ui.tertiary,
    borderWidth: 2,
    borderStyle: "solid",
    margin: 8,
  },
  musclesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  muscleContainer: {
    backgroundColor: colors.bg.primary,
    borderRadius: 25,
    borderColor: colors.ui.tertiary,
    borderWidth: 2,
    borderStyle: "solid",
    margin: 5,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  menuHeader: {
    marginBottom: theme.spaceInNumber[3],
    //
  },
  text: {
    fontFamily: "medium",
    letterSpacing: 1,
    fontSize: 16,
    color: theme.colors.text.primary,
    textTransform: "uppercase",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },

  closeButton: {
    position: "absolute",
    top: 5,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: theme.colors.ui.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonText: {
    color: theme.colors.ui.error50,
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default UsedMusclesModal;
