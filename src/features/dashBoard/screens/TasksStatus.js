import React, { useEffect, useState } from "react";
//import firestore from "@react-native-firebase/firestore";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
//import Header from "../../../components//utility/Header";
import PlusIcon from "../../../components/utility/PlusIcon";
import PageTitle from "../../../components/utility/PageTitle";
import { StyleSheet } from "react-native";
import colors from "../../../features/recipes/constants/colors";
import { setTasks } from "../../../store/tasksSlice";
import StatusCard from "../../../components/utility/StatusCard";
import moment from "moment";

const TasksStatus = ({ navigation }) => {
  const tasks = useSelector((state) => state.tasks.data);
  const user = useSelector((state) => state.user.data);
  const toUpdate = useSelector((state) => state.tasks.toUpdate);
  const [counts, setCounts] = useState({});
  const dispatch = useDispatch();

  /* useEffect(() => {
    firestore()
      .collection("Tasks")
      .where("userId", "==", user?.uid)
      .get()
      .then((querySnapshot) => {
        const tasksList = [];

        querySnapshot.forEach((documentSnapshot) => {
          tasksList.push({
            uid: documentSnapshot.id,
            ...(documentSnapshot.data() || {}),
          });
        });

        dispatch(setTasks(tasksList));
      });
  }, [user, toUpdate, dispatch]); */

  useEffect(() => {
    if (tasks?.length) {
      const highPriority = tasks?.filter(
        (task) => task?.category === "urgent" || task?.category === "important"
      );
      const today = moment(new Date()).format("YYYY-MM-DD");
      const dueDeadline = tasks?.filter((task) => {
        const deadline = task?.deadline?.seconds * 1000;
        const deadlineFormatted = moment(deadline).format("YYYY-MM-DD");
        return moment(deadlineFormatted).isBefore(today);
      });
      const quickWin = tasks?.filter((task) => task?.category === "quick_task");

      setCounts({
        highPriority: highPriority?.length,
        dueDeadline: dueDeadline?.length,
        quickWin: quickWin?.length,
      });
    }
  }, [tasks]);

  return (
    <SafeAreaView style={styles.container}>
      {/* <Header title="Home" /> */}

      <ScrollView>
        <PageTitle title="Daily Tasks:" />

        <View style={styles.row}>
          <StatusCard label="High Priority" count={counts?.highPriority} />
          <StatusCard
            label="Due Deadline"
            count={counts?.dueDeadline}
            type="error"
          />
          <StatusCard label="Quick Win" count={counts?.quickWin} />
        </View>

        <TouchableOpacity
          style={styles.box}
          onPress={() => navigation.navigate("Tasks")}
        >
          <Text style={styles.title}>Check all my tasks</Text>
          <Text style={styles.subtitle}>
            See all tasks and filter them by categories you have selected when
            creating them
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <PlusIcon />
    </SafeAreaView>
  );
};

export default React.memo(TasksStatus);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 24,
  },
  box: {
    backgroundColor: colors.lightGrey,
    borderRadius: 15,
    padding: 22,
    marginHorizontal: 24,
    marginVertical: 72,
  },
  title: {
    color: colors.purple,
    fontSize: 16,
  },
  subtitle: {
    color: "rgba(64,53,114,0.5)",
    fontSize: 12,
    marginTop: 8,
  },
});
