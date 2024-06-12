import { Text, Dimensions, View } from "react-native";
import { LineChart } from "react-native-chart-kit";

import Heading from "../../../../components/utility/Heading";
import { theme } from "../../../../infrastructure/theme";

//import ExpenseItem from './ExpenseItem';

function BodyWeight() {
  return (
    <View>
      <Heading title="Body Weight" />
      <LineChart
        data={{
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "June"],
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
              ],
            },
          ],
        }}
        width={Dimensions.get("window").width / 2} // from react-native
        height={170}
        yAxisLabel="$"
        yAxisSuffix="k"
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
