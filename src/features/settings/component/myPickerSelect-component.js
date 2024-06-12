import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import RNPickerSelect, { defaultStyles } from "react-native-picker-select";
import { Ionicons } from "@expo/vector-icons";

import { Text } from "../../../components/typography/text.component";

const pickerSelectStyles = {
  ...defaultStyles, // Use defaultStyles as a starting point
  inputIOS: {
    ...defaultStyles.inputIOS,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    ...defaultStyles.inputAndroid,
    fontSize: 16,
    paddingHorizontal: 10,
    backgroundColor: "lightblue",
    paddingVertical: 8,
    borderWidth: 1.5,
    borderColor: "black",
    borderRadius: 8,
    color: "blue",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  iconContainer: {
    top: 10,
    right: 12,
    // backgroundColor: "grey",
  },
  placeholder: {
    color: "black", // Set the placeholder color
    backgroundColor: "lightblue",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 2,
  },
  itemContainer: {
    // Style for each item container
    backgroundColor: "green",
    padding: 10,
    color: "blue",
  },
  items: { backgroundColor: "green", padding: 10, color: "blue" },
  icon: {
    backgroundColor: "transparent",
    borderTopColor: "gray",
    borderTopWidth: 2,
    borderRightColor: "transparent",
    borderRightWidth: 2,
    borderLeftColor: "transparent",
    borderLeftWidth: 2,
    width: 0,
    height: 0,
  },
};

const MyPickerSelect = ({ data, placeholder1, title, value, setValue }) => {
  return (
    <View style={{ marginBottom: 16 }}>
      {title ? <Text variant="label">{title}</Text> : null}
      <View style={{ marginBottom: 16 }}>
        <RNPickerSelect
          items={data}
          placeholder={placeholder1}
          onValueChange={setValue}
          value={value}
          // textInputProps={{ underlineColor: "yellow" }}
          Icon={() => {
            return <Ionicons name="md-arrow-down" size={24} color="gray" />;
          }}
          style={pickerSelectStyles}
          //  useNativeAndroidPickerStyle={false}
        />
      </View>
    </View>
  );
};

export default MyPickerSelect;

const styles = StyleSheet.create({
  label: {
    marginLeft: 10,
    marginRight: 15,
    fontSize: 18,
    width: 130,
  },
  lineContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 6,
  },
});
