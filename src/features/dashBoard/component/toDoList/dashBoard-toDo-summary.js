import React, { useState, useEffect } from "react";
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

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "Eat two eggs",
    icon: "utensils",
    amount: 59.99,
    date: new Date("2024-2-9"),
  },
  {
    id: "e2",
    description: "30 mins running",
    icon: "running",
    amount: 89.29,
    date: new Date("2024-2-9"),
  },
  {
    id: "e3",
    description: "Eat some bananas",
    icon: "utensils",
    amount: 5.99,
    date: new Date("2024-2-9"),
  },
  {
    id: "e4",
    description: "read a book",
    icon: "book",
    amount: 14.99,
    date: new Date("2024-2-11"),
  },
  {
    id: "e5",
    description: "read another book",
    icon: "book",
    amount: 18.59,
    date: new Date("2024-2-11"),
  },
  {
    id: "e6",
    description: "jogging",
    icon: "running",
    amount: 89.29,
    date: new Date("2024-2-11"),
  },
  {
    id: "e7",
    description: "eat some apples",
    icon: "utensils",
    amount: 5.99,
    date: new Date("2024-2-11"),
  },
  {
    id: "e8",
    description: "Exercise",
    icon: "dumbbell",
    amount: 14.99,
    date: new Date("2024-2-13"),
  },
  {
    id: "e9",
    description: "gym",
    icon: "dumbbell",
    amount: 18.59,
    date: new Date("2024-2-13"),
  },
  {
    id: "e10",
    description: "jogging",
    icon: "running",
    amount: 89.29,
    date: new Date("2024-2-13"),
  },
  {
    id: "e11",
    description: "eat some apples",
    icon: "utensils",
    amount: 5.99,
    date: new Date("2024-2-12"),
  },
  {
    id: "e12",
    description: "Exercise",
    icon: "dumbbell",
    amount: 14.99,
    date: new Date("2024-2-12"),
  },
  {
    id: "e13",
    description: "gym",
    icon: "dumbbell",
    amount: 18.59,
    date: new Date("2024-2-12"),
  },
  {
    id: "e14",
    description: "read a book",
    icon: "book",
    amount: 14.99,
    date: new Date("2024-2-12"),
  },
  {
    id: "e15",
    description: "sleeping",
    icon: "bed",
    amount: 18.59,
    date: new Date("2024-2-10"),
  },
  {
    id: "e16",
    description: "jogging",
    icon: "running",
    amount: 89.29,
    date: new Date("2024-2-10"),
  },
  {
    id: "e17",
    description: "sleeping",
    icon: "bed",
    amount: 5.99,
    date: new Date("2024-2-11"),
  },
  {
    id: "e18",
    description: "Exercise",
    icon: "dumbbell",
    amount: 14.99,
    date: new Date("2024-2-10"),
  },
  {
    id: "e19",
    description: "gym",
    icon: "dumbbell",
    amount: 18.59,
    date: new Date("2024-2-7"),
  },
  {
    id: "e20",
    description: "jogging",
    icon: "running",
    amount: 89.29,
    date: new Date("2024-2-10"),
  },
  {
    id: "e21",
    description: "eat some apples",
    icon: "utensils",
    amount: 5.99,
    date: new Date("2024-2-10"),
  },
];

function ToDoSummary() {
  const todayDate = getFormattedDate(new Date());
  // console.log(`todateDate ${todayDate}`);

  const todoDateLength = function setDateIndex() {
    const todatArry = DUMMY_EXPENSES.filter((toDo) => {
      const date = getFormattedDate(toDo.date);
      return date == calculateDate;
    });
    //setPrevious(todatArry.length - 1);
    // setNext(todatArry.length + 1);
    return todatArry.length;
  };
  const [previous, setPrevious] = useState(previousIndex);
  const [next, setNext] = useState(nextIndex);
  const [previousIndex, setPreviousIndex] = useState(todoDateLength - 1);
  const [nextIndex, setNextIndex] = useState(todoDateLength + 1);
  const [calculateDate, setCalculateDate] = useState(todayDate);

  //let calculateDate = new Date();
  function previousDate() {
    // console.log("previousDate");
    if (previousIndex === 0) return;
    setPrevious(previous - 1);
    setCalculateDate(
      getFormattedDate(getDateMinusDays(new Date(calculateDate), 1))
    );
    console.log(`${previous} previous date ${calculateDate}`);
    setNext(previous);
  }
  function nextDate() {
    //  console.log("nextDate");
    // if (calculateDate == todayDate) return;
    setNext(next + 1);
    setCalculateDate(
      getFormattedDate(getDatePlusDays(new Date(calculateDate), 1))
    );
    console.log(`${next} next date ${calculateDate}`);
    setPrevious(next);
  }

  //useEffect(()=>{},[])

  const calculateDateToDos = DUMMY_EXPENSES.filter((toDo) => {
    const date = getFormattedDate(toDo.date);
    return date == calculateDate;
  });

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
        <ToDoOutput todo={calculateDateToDos} />
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
