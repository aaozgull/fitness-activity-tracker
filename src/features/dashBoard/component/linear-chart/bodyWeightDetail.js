import React, { useEffect } from "react";
import {
  FlatList,
  Text,
  Dimensions,
  View,
  StyleSheet,
  Modal,
} from "react-native";
import { LineChart } from "react-native-chart-kit";

//import ExpenseItem from './ExpenseItem';
import { getFormattedDate } from "../../../../utils/date";
import { theme } from "../../../../infrastructure/theme/index";
import Heading from "../../../../components/utility/Heading";
import HeaderLogo from "../../../../components/utility/HeaderLogo";

function BodyWeightDetail(props) {
  //const navigation = useNavigation();
  useEffect(() => {
    props.navigation.setOptions({
      headerTitle: () => <HeaderLogo style={{ marginRight: 150 }} />,
    });
  }, []);
  return (
    /*  <Modal visible={props.visible} animationType="slide" style={{ flex: 1 }}> */
    <View style={styles.container}>
      <Heading title="Body Weight" style={styles.headingContainer} />
      <View style={styles.chartContainer}>
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
          width={Dimensions.get("window").width} // from react-native
          height={500}
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
              r: "6",
              strokeWidth: "2",
              stroke: theme.colors.ui.quaternary, //"#2d0689", // "#ffa726",
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
