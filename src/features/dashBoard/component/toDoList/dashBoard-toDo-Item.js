import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Checkbox from "expo-checkbox";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import { theme } from "../../../../infrastructure/theme/index";
import IconWithText from "../../../../components/utility/IconWithText";
import { updateActivitiesData } from "../../../../utils/actions/calendarActions";
import { updateCalendarActivity } from "../../../../store/calendarActivitiesSlice";

function ToDoItem({
  activityId,
  calendarId,
  text,
  description,
  checked,
  color,
  icon,
  name,
  screen,
  style,
}) {
  const [isChecked, setChecked] = useState(checked);
  const [isEditable, setEditable] = useState(
    screen === "Recipes" && isChecked === true ? true : false
  );

  /*  console.log(
    `-----------ToDoItem isChecked= ${isChecked}  ${name} checked= ${checked} isEditable=  ${isEditable}`
  ); */
  const [currentDescription, setCurrentDescription] = useState(
    description || ""
  );
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const setCheckBox = async () => {
    const newCheckedState = !isChecked;
    setChecked(newCheckedState);
    if (screen === "Recipes") {
      setEditable(true);
      navigation.navigate("Recipes", {
        screen: "Recipe",
        params: {
          calendarId: calendarId,
          activityId: activityId,
        },
      });
    }
    {
      /*  console.log(
        `-----------ToDoItem ${isChecked}  ${name}  ${checked}  ${newCheckedState}`
      ); */

      let newDescription = currentDescription;
      if (currentDescription !== "") {
        if (currentDescription === "completed") {
          if (name === "weight") {
            newDescription = "complete your schedule workout";
          } else {
            newDescription = "complete your schedule activity";
          }
        } else {
          newDescription = "completed";
        }
      }
      setCurrentDescription(newDescription);

      try {
        await updateActivitiesData(
          calendarId,
          activityId,
          newCheckedState,
          newDescription
        );
        dispatch(
          updateCalendarActivity({
            calendarId,
            activityId,
            isChecked: newCheckedState,
            description: newDescription,
          })
        );

        //  console.log("isChecked", newCheckedState);
        if (newCheckedState) {
          if (screen) {
            navigation.navigate(screen);
          } else {
            console.error("Screen name is not provided or is invalid");
          }
        }
      } catch (error) {
        console.error("Error adding activity:", error);
      }
    }
  };
  return (
    <View style={style}>
      <IconWithText
        text={text}
        description={currentDescription}
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
          disabled={isEditable} // Disable the checkbox if not editable
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
    width: 34,
    height: 34,
    marginRight: 12,
  },
  menuItemText: {
    fontFamily: "regular",
    letterSpacing: 0.3,
    fontSize: 16,
    padding: 4,
    color: theme.colors.text.primary,
    //backgroundColor: "red",
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
