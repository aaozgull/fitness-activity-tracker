import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "../../../infrastructure/theme/colors";

const Added = ({ isVisible, onClose, color }) => {
  //console.log("color in Added", color);
  useEffect(() => {
    setTimeout(() => {
      ///navigation.goBack();
      onClose();
    }, 15000);
  });
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      useNativeDriver={true}
      style={styles.modal}
    >
      <View
        style={{
          ...styles.container,
          backgroundColor: color /* || colors.ui.accent */,
        }}
      >
        <Ionicons
          name="checkmark-sharp"
          size={60}
          color={colors.text.grey10}
          style={styles.icon}
        />
        <Text style={styles.text}>ADDED</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
  },
  container: {
    width: 150,
    padding: 20,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    // marginBottom: 20,
  },
  text: {
    fontFamily: "light",
    letterSpacing: 0.5,
    color: colors.text.grey10,
    fontSize: 22,
    textAlign: "center",
  },
});

export default Added;
