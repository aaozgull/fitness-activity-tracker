import { Text, Dimensions, View } from "react-native";
import { LineChart } from "react-native-chart-kit";

import Heading from "../../../../components/utility/Heading";
import { theme } from "../../../../infrastructure/theme";
import { useSelector } from "react-redux";

//import ExpenseItem from './ExpenseItem';

function BodyWeight() {
  const progressData =
    useSelector((state) => state.progress.progressData) || [];

  const weightList = [];
  const dateList = [];
  let counter = 0;
  for (const key in progressData) {
    if (counter <= 3) {
      // return;

      const progress = progressData[key];
      const date = new Date(progress.createdAt);
      const month = date.getMonth() + 1; // getMonth() is zero-based, so we add 1
      const day = date.getDate();

      const formattedDate = `${month}/${day}`;
      dateList.push(formattedDate);
      const weight = parseFloat(progress.weight); // Use parseFloat to handle numeric strings
      if (weight != null && !isNaN(weight)) {
        // Check if the parsed value is a valid number
        weightList.push(weight);
        // console.log(" weight value:", weightList);
      } else {
        weightList.push(0);
        console.log(`Invalid weight value: ${progress.weight} at key: ${key}`);
      }
    }
    counter++;
  }
  //console.log("weightList  weight value:", weightList);

  return (
    <View>
      <Heading title="Body Weight" />
      <LineChart
        data={{
          labels: dateList,
          datasets: [
            {
              data: weightList,
            },
          ],
        }}
        width={Dimensions.get("window").width / 2} // from react-native
        height={170}
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
            r: "2",
            strokeWidth: "1",
            stroke: theme.colors.ui.quaternary, //"#2d0689", // "#ffa726",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          marginRight: 8,

          borderRadius: 16,
        }}
      />
    </View>
  );
}

export default BodyWeight;
