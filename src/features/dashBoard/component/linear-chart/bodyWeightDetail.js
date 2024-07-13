import React, { useEffect } from "react";
import { FlatList, Text, Dimensions, View, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";

import { theme } from "../../../../infrastructure/theme/index";
import Heading from "../../../../components/utility/Heading";
import HeaderLogo from "../../../../components/utility/HeaderLogo";
import { useSelector } from "react-redux";

function BodyWeightDetail(props) {
  const progressData =
    useSelector((state) => state.progress.progressData) || [];

  const weightList = [];
  const dateList = [];
  for (const key in progressData) {
    const progress = progressData[key];
    const date = new Date(progress.createdAt);
    const month = date.getMonth() + 1; // getMonth() is zero-based, so we add 1
    const day = date.getDate();

    const formattedDate = `${month}/${day}`;
    dateList.push(formattedDate);
    const weight = parseFloat(progress.weight); // Use parseFloat to handle numeric strings
    if (!isNaN(weight)) {
      // Check if the parsed value is a valid number
      weightList.push(weight);
    } else {
      weightList.push(0);
      console.log(`Invalid weight value: ${progress.weight} at key: ${key}`);
    }
  }
  //console.log("dateList", dateList); // Log the weightList to check the data
  // console.log("weightList", weightList); // Log the weightList to check the data
  useEffect(() => {
    props.navigation.setOptions({
      headerTitle: () => <HeaderLogo style={{ marginRight: 150 }} />,
    });
  }, []);
  return (
    <View style={styles.container}>
      <Heading title="Body Weight" style={styles.headingContainer} />
      <View style={styles.chartContainer}>
        <LineChart
          data={{
            labels: dateList,
            datasets: [
              {
                data: weightList,
              },
            ],
          }}
          width={Dimensions.get("window").width} // from react-native
          height={500}
          yAxisLabel="" // Remove $ if it's not relevant to weight
          yAxisSuffix="kg" // Change to kg or any other unit relevant to weight
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: theme.colors.ui.primary, //"#2d0689", //"#e26a00",
            backgroundGradientFrom: theme.colors.ui.accent, //"#fb8c00",
            backgroundGradientTo: theme.colors.ui.accent2, //"#a281f0", // "#ffa726",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(228, 217, 253, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 32, 53, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: theme.colors.ui.quaternary,
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            // marginRight: 8,

            borderRadius: 16,
          }}
        />
      </View>
    </View>
  );
}

export default BodyWeightDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 8,
    backgroundColor: theme.colors.ui.secondary, // "#2d0689",
  },
  headingContainer: {
    // flex: 1,
    backgroundColor: theme.colors.ui.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    padding: 16,
    borderBottomWidth: 2,
    borderBottomColor: "#cccccc",
  },
  chartContainer: {
    //flex: 1,
    marginTop: 32,
    //marginHorizontal: 8,
  },
});
