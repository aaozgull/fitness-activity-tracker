import { StyleSheet, View, Text } from "react-native";

//import { GlobalStyles } from '../../constants/styles';
//import ExpensesList from "../toDoList/expenseList";
import ToDoList from "../toDoList/dashBoard-toDo-list";
import { theme } from "../../../../infrastructure/theme/index";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "Eat two eggs",
    icon: "utensils",
    amount: 59.99,
    date: new Date("2021-12-19"),
  },
  {
    id: "e2",
    description: "30 mins running",
    icon: "running",
    amount: 89.29,
    date: new Date("2022-01-05"),
  },
  {
    id: "e3",
    description: "Eat some bananas",
    icon: "utensils",
    amount: 5.99,
    date: new Date("2021-12-01"),
  },
  {
    id: "e4",
    description: "read a book",
    icon: "user",
    amount: 14.99,
    date: new Date("2022-02-19"),
  },
  {
    id: "e5",
    description: "read another book",
    icon: "user",
    amount: 18.59,
    date: new Date("2022-02-18"),
  },
  {
    id: "e6",
    description: "jogging",
    icon: "dumbbell",
    amount: 89.29,
    date: new Date("2022-01-05"),
  },
  {
    id: "e7",
    description: "eat some apples",
    icon: "utensils",
    amount: 5.99,
    date: new Date("2021-12-01"),
  },
  {
    id: "e8",
    description: "Exercise",
    icon: "dumbbell",
    amount: 14.99,
    date: new Date("2022-02-19"),
  },
  {
    id: "e9",
    description: "gym",
    icon: "dumbbell",
    amount: 18.59,
    date: new Date("2022-02-18"),
  },
];

function ToDoOutput({ todo }) {
  // console.log(`ToDoOutput ${todo}`);
  return (
    <View style={styles.container}>
      <ToDoList todos={todo} />
    </View>
  );
}
export default ToDoOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: theme.spaceInNumber[3], //24,
    // paddingTop: theme.spaceInNumber[4], //24,
    // paddingBottom: 10,
    //  backgroundColor: theme.colors.ui.accent, //"#2d0689", // GlobalStyles.colors.primary700,
  },
});
