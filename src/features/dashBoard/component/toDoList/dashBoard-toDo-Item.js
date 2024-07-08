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
  name,
  style,
}) {
  const [isChecked, setChecked] = useState(checked);
  // console.log(`ToDoItem ${description} ${name} ${activityId} ${calendarId}`);
  const dispatch = useDispatch();
  const setCheckBox = async () => {
    setChecked(!isChecked);
    try {
      console.log(
        `ToDoItem ${description} ${name} ${activityId} ${calendarId}`
      );

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
        name={name}
        color={color}
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
  textBase: {
    color: theme.colors.text.primary, // "#e4d9fd", //GlobalStyles.colors.primary50,
  },
  menuItemIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  menuItemText: {
    fontFamily: "regular",
    letterSpacing: 0.3,
    fontSize: 16,
    padding: 4,
    color: theme.colors.text.primary,
  },
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
