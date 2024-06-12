import React from "react";
import { View, StyleSheet, Text } from "react-native";

import { Favourite } from "../../../components/favourites/favourite.component";

const ExerciseInfoCard = ({ exercise = {} }) => {
  /*  const {
    name = "Incline Hammer Curls",
    gifUrl = "https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg",
  } = exercise; */

  console.log(exercise);

  return (
    <Card elevation={5}>
      <View>
        {/* <Favourite exerise={exercise} /> */}
        <Card.Cover key={name} source={{ uri: exercise.gifUrl }} />
      </View>

      <View style={styles.info}>
        <Text style={styles.label}>
          {exercise?.name?.length > 20
            ? exercise.name.slice(0, 20) + "..."
            : exercise.name}
        </Text>
      </View>
    </Card>
  );
};
export default ExerciseInfoCard;

///need t know property name gap:5
const styles = StyleSheet.create({
  info: {
    padding: 16,
  },
  label: {
    fontFamily: "regular",
  },
  subValue: {
    fontFamily: "bold",
    textTransform: "capitalize",
  },
});
