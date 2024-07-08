import React, { useState, useEffect, useMemo } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

//import { GlobalStyles } from "../../constants/styles";
import {
  getFormattedDate,
  getDateMinusDays,
  getDatePlusDays,
} from "../../../../utils/date";
import { Ionicons } from "@expo/vector-icons";
import ToDoOutput from "../toDoList/dashBoard-toDo-list-comonent";
import { theme } from "../../../../infrastructure/theme/index";
import { useSelector } from "react-redux";

function ToDoSummary() {
  const calendarData = useSelector((state) => state.calendar.calendarData);
  const calendarActivitiesData = useSelector(
    (state) => state.activities.calendarActivitiesData
  );
  const todayDate = getFormattedDate(new Date());
  const [calculateDate, setCalculateDate] = useState(todayDate);
  const [minDate, setMinDate] = useState(null);
  const [maxDate, setMaxDate] = useState(null);
  useEffect(() => {
    const calendarKeys = Object.keys(calendarData);
    // console.log("calendarData in useEffect", calendarKeys.length);
    if (calendarKeys.length > 0) {
      const firstDateKey = calendarKeys[0];
      const lastDateKey = calendarKeys[calendarKeys.length - 1];
      setMinDate(new Date(calendarData[firstDateKey].date));
      setMaxDate(new Date(calendarData[lastDateKey].date));
    }
  }, [calendarData]);

  const getToDosForDate = (date) => {
    return Object.values(calendarData).filter((activity) => {
      return getFormattedDate(new Date(activity.date)) === date;
    });
  };

  const [previousIndex, setPreviousIndex] = useState(
    getToDosForDate(todayDate).length - 1
  );
  const [nextIndex, setNextIndex] = useState(
    getToDosForDate(todayDate).length + 1
  );

  useEffect(() => {
    setPreviousIndex(getToDosForDate(calculateDate).length - 1);
    setNextIndex(getToDosForDate(calculateDate).length + 1);
  }, [calculateDate, calendarData]);

  const previousDate = () => {
    const newDate = getDateMinusDays(new Date(calculateDate), 1);
    // console.log("previousDate newDate", newDate);
    //  console.log("previousDate minDate", minDate);
    if (newDate >= minDate) {
      //  console.log("newDate >= minDate", getFormattedDate(newDate));
      setCalculateDate(getFormattedDate(newDate));
    }
  };

  const nextDate = () => {
    const newDate = getDatePlusDays(new Date(calculateDate), 1);
    //console.log("nextDate newDate", newDate);
    //console.log("nextDate maxDate", maxDate);
    if (newDate <= maxDate) {
      // console.log("newDate <= maxDate", getFormattedDate(newDate));
      setCalculateDate(getFormattedDate(newDate));
    }
  };

  const calculateDateToDos = useMemo(
    () => getToDosForDate(calculateDate),
    [calculateDate, calendarData]
  );

  const calendarActivities =
    calendarActivitiesData[calculateDateToDos[0]?.key] || [];
  const calendarActivityList = useMemo(() => {
    const activityList = [];
    if (calculateDateToDos.length > 0) {
      for (const key in calendarActivities) {
        const activity = calendarActivities[key];
        activityList.push({
          key,
          calendarId: calculateDateToDos[0].key,
          ...activity,
        });
      }
    }
    return activityList;
  }, [calculateDateToDos, calendarActivities]);

  /*   console.log("calculateDateToDos:", calculateDateToDos);*/
  // console.log("calendarActivityList", calendarActivityList);
  return (
    <View style={styles.ListContainer}>
      <View style={styles.container}>
        <Text style={styles.date}>{calculateDate}</Text>
        <View style={styles.buttonsContainer}>
          <Pressable onPress={previousDate}>
            <Ionicons
              name="caret-back-outline"
              size={24}
              color={theme.colors.ui.tertiary}
            ></Ionicons>
          </Pressable>
          <Pressable onPress={nextDate}>
            <Ionicons
              name="caret-forward-outline"
              size={24}
              color={theme.colors.ui.tertiary}
            ></Ionicons>
          </Pressable>
        </View>
      </View>
      <View style={styles.toDolist}>
        <ToDoOutput todo={calendarActivityList} />
      </View>
    </View>
  );
}

export default ToDoSummary;

const styles = StyleSheet.create({
  container: {
    padding: theme.spaceInNumber[2],
    backgroundColor: theme.colors.ui.primary,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: theme.spaceInNumber[3],
  },
  ListContainer: {
    flex: 1,
  },
  date: {
    fontFamily: "bold",
    letterSpacing: 0.3,
    fontSize: theme.fontSizesInNumber.title,
    color: theme.colors.text.primary,
    // fontWeight: "bold",
  },
  buttonsContainer: {
    flexDirection: "row",
    paddingBottom: theme.spaceInNumber[2],
    paddingTop: theme.spaceInNumber[2],
  },
  toDolist: {
    flex: 1,
    //backgroundColor: theme.colors.ui.fiftary,
  },
});
