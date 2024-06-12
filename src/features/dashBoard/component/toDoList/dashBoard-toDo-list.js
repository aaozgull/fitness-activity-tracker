import { FlatList, StyleSheet } from "react-native";

import ToDoItem from "../toDoList/dashBoard-toDo-Item";
import { theme } from "../../../../infrastructure/theme";

function renderExpenseItem(itemData) {
  /// console.log(`itemData.item ${itemData.item}`);
  return <ToDoItem {...itemData.item} style={styles.toDoItem} />;
  //return <Text>renderExpenseItem</Text>;
}

function ToDoList({ todos }) {
  return (
    <FlatList
      data={todos}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
}

export default ToDoList;
const styles = StyleSheet.create({
  toDoItem: {
    padding: theme.spaceInNumber[2], // 12,
    marginVertical: theme.spaceInNumber[1], //8,
    backgroundColor: theme.colors.brand.primary,
    //backgroundColor: "white", //theme.colors.ui.primary500, //"#3e04c3", //GlobalStyles.colors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3,
    shadowColor: theme.colors.ui.gray700, // "#39324a", // GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
});
