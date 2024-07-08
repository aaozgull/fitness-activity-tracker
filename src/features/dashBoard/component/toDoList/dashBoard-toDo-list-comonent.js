import { StyleSheet, View, Text } from "react-native";

//import { GlobalStyles } from '../../constants/styles';
//import ExpensesList from "../toDoList/expenseList";
import ToDoList from "../toDoList/dashBoard-toDo-list";
import { theme } from "../../../../infrastructure/theme/index";

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
