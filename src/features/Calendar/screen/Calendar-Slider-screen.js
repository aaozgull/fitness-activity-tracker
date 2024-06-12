import React from "react";
import { View, Text, StyleSheet } from "react-native";
//import Carousel, { Pagination } from "react-native-snap-carousel";
import { addMonths, format } from "date-fns";

const CalendarSliderScreen = () => {
  const currentDate = new Date();
  const dates = [];

  // Generate dates for one year before and after the current date
  for (let i = -12; i <= 12; i++) {
    const date = addMonths(currentDate, i);
    dates.push(date);
  }

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Text style={styles.dateText}>{format(item, "MMM dd")}</Text>
      <Text style={styles.dayText}>{format(item, "EEEE")}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/*  <Carousel
        data={dates}
        renderItem={renderItem}
        sliderWidth={300}
        itemWidth={200}
        loop
        enableSnap
        inactiveSlideOpacity={0.4}
        inactiveSlideScale={0.8}
      />
      <Pagination
        dotsLength={dates.length}
        activeDotIndex={12}
        containerStyle={{ paddingTop: 10 }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: "rgba(255, 255, 255, 0.92)",
        }}
        inactiveDotStyle={{
          backgroundColor: "rgba(0, 0, 0, 0.2)",
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#61dafb",
    borderRadius: 8,
  },
  dateText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  dayText: {
    fontSize: 16,
    color: "#fff",
  },
});

export default CalendarSliderScreen;
