import { FlatList, StyleSheet } from "react-native";

import ToDoItem from "../toDoList/dashBoard-toDo-Item";
import { theme } from "../../../../infrastructure/theme";

function renderExpenseItem(itemData) {
  // console.log("itemData.item", itemData.item);
  return (
    <ToDoItem
      key={itemData.item.key} // Use the key property as the unique identifier
      activityId={itemData.item.key} // Use the key as the activityId
      calendarId={itemData.item.calendarId}
      description={itemData.item.text}
      checked={itemData.item.isChecked}
      color={itemData.item.backgroundColor}
      icon={itemData.item.icon}
      name={itemData.item.name}
      style={styles.toDoItem}
    />
  );
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
    //marginLeft: theme.spaceInNumber[3], //8,
    backgroundColor: theme.colors.ui.secondary,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
