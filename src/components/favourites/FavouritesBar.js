import React from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from "react-native";
//import { CompactWorkoutInfo } from "../restaurant/CompactWorkoutInfo";

export const FavouritesBar = ({ favourites, onNavigate }) => {
  if (!favourites.length) {
    return null;
  }
  return (
    <View style={{ padding: 10 }}>
      <View style={{ marginLeft: 16 }}>
        <Text style={styles.caption}>Favourites</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {favourites.map((workout) => {
          const key = workout.name;
          return (
            <View key={key} style={{ marginLeft: 8 }}>
              <TouchableOpacity
                onPress={() =>
                  onNavigate("WorkoutDetail", {
                    workout: workout,
                  })
                }
              >
                {/*  <CompactWorkoutInfo workout={workout} /> */}
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  caption: {
    fontFamily: "regular", // change its font as caption
  },
});
