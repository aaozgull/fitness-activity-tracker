import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, Text, View, StyleSheet } from "react-native";
//import firestore from "@react-native-firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import Checkbox from "../../../components/utility/Checkbox";
//import Header from "../../../components/utility/Header";
import PlusIcon from "../../../components/utility/PlusIcon";
import PageTitle from "../../../components/utility/PageTitle";
import colors from "../../../features/recipes/constants/colors";
import { setToUpdate } from "../../../store/tasks";
import Categories from "../../../components/utility/Categories";
import { categories } from "../../../constants/categories";

const Tasks = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.data);
  const [category, setCategory] = useState("all");
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    if (category && category !== "all") {
      const filtered = tasks?.filter((task) => task?.category === category);
      setFilteredTasks(filtered);
    } else {
      setFilteredTasks(tasks);
    }
  }, [category, tasks]);

  const onTaskUpdate = (item) => {
    /* firestore()
      .collection("Tasks")
      .doc(item?.uid)
      .update({
        checked: !item.checked,
      })
      .then(() => {
        dispatch(setToUpdate());
      }); */
  };

  const renderTask = ({ item }) => {
    return (
      <View style={styles.row}>
        <Checkbox checked={item.checked} onPress={() => onTaskUpdate(item)} />
        <Text style={[styles.taskText, item?.checked ? styles.checked : {}]}>
          {item.title}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/*  <Header title="Tasks" /> */}

      <FlatList
        ListHeaderComponent={
          <View style={{ marginBottom: 24 }}>
            <PageTitle title="To Do Tasks" />
            <Categories
              categories={[{ label: "All", value: "all" }, ...categories]}
              selectedCategory={category}
              onCategoryPress={setCategory}
            />
          </View>
        }
        data={filteredTasks}
        renderItem={renderTask}
        keyExtractor={(item) => String(item?.uid)}
      />

      <PlusIcon />
    </SafeAreaView>
  );
};

export default React.memo(Tasks);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 24,
    marginVertical: 8,
  },
  taskText: {
    color: colors.black,
    marginLeft: 8,
  },
  checked: {
    textDecorationLine: "line-through",
  },
});
