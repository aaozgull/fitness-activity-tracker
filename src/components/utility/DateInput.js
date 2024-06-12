import moment from "moment";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import DatePicker from "react-native-date-picker";
import { StyleSheet } from "react-native";
import colors from "../../features/recipes/constants/colors";

const DateInput = ({ value, onChange, ...props }) => {
  const [open, setOpen] = useState(false);

  const onDateOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <TouchableOpacity onPress={onDateOpen} style={styles.outlined}>
        <Image
          resizeMode="contain"
          style={styles.icon}
          source={require("../../../assets/calendar.png")}
        />
        <Text style={styles.text}>
          {moment(value).format("L") || "Select Date..."}
        </Text>
      </TouchableOpacity>
      <DatePicker
        modal
        mode="date"
        open={open}
        date={value}
        onConfirm={(date) => {
          setOpen(false);
          onChange(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

export default React.memo(DateInput);
const styles = StyleSheet.create({
  outlined: {
    marginVertical: 12,
    paddingHorizontal: 24,
    paddingVertical: 13,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.grey,
    marginHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: colors.grey,
    fontSize: 15,
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
});
