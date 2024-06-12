import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Checkbox from "expo-checkbox";

import { theme } from "../../../../infrastructure/theme/index";
import IconWithText from "../../../../components/utility/IconWithText";
import { updateActivitiesData } from "../../../../utils/actions/calendarActions";
import { updateCalendarActivity } from "../../../../store/calendarActivitiesSlice";
import { useDispatch } from "react-redux";

function ToDoItem({
  activityId,
  calendarId,
  description,
  checked,
  color,
  icon,
  style,
}) {
  const [isChecked, setChecked] = useState(checked);
  const dispatch = useDispatch();
  const setCheckBox = async () => {
    setChecked(!isChecked);
    try {
      await updateActivitiesData(calendarId, activityId, isChecked);
      dispatch(
        updateCalendarActivity({
          calendarId,
          activityId,
          isChecked,
        })
      );
    } catch (error) {
      console.error("Error adding activity:", error);
    }
  };
  return (
    <View style={style}>
      <IconWithText
        text={description}
        icon={icon}
        iconStyle={styles.menuItemIcon}
        textStyle={styles.menuItemText}
      />
      <View style={styles.amountContainer}>
        <Checkbox
          style={styles.checkbox}
          value={isChecked}
          color={color}
          onValueChange={setCheckBox}
        />
      </View>
    </View>
  );
}

export default ToDoItem;

const styles = StyleSheet.create({
  /* toDoItem: {
    padding: theme.spaceInNumber[2], // 12,
    marginVertical: theme.spaceInNumber[1], //8,
    //backgroundColor: "white", //theme.colors.ui.primary500, //"#3e04c3", //GlobalStyles.colors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3,
    shadowColor: theme.colors.ui.gray700, // "#39324a", // GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  }, */
  textBase: {
    color: theme.colors.text.primary, // "#e4d9fd", //GlobalStyles.colors.primary50,
  },
  menuItemIcon: {
    width: 24,
    height: 24,
    marginRight: theme.sizesInNumber[2], // 10,
    color: theme.colors.ui.tertiary,
  },
  menuItemText: {
    fontFamily: "regular",
    letterSpacing: 0.3,
    fontSize: theme.fontSizesInNumber.body, //16,
    padding: 4,
    color: theme.colors.text.primary, //"#555", // Adjust the color as needed
  },
  /* description: {
    fontFamily: "regular",
    letterSpacing: 0.3,
    fontSize: theme.fontSizesInNumber.body, //16,
    padding: 4,
    // fontWeight: "bold",
  }, */
  amountContainer: {
    paddingHorizontal: theme.spaceInNumber[2], // 12,
    paddingVertical: theme.spaceInNumber[1], //4,
    // backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    minWidth: theme.sizesInNumber[6], //80,
  },
  checkbox: {
    margin: theme.spaceInNumber[2], // 8,
  },
});
