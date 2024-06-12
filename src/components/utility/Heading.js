import { StyleSheet, Text, View } from "react-native";
import { theme } from "../../infrastructure/theme/index";
import { getFormattedDate } from "../../utils/date";

export default Heading = (props) => {
  console.log(props.dateShow);
  return (
    <View style={{ ...styles.container, ...props.style }}>
      <Text style={{ ...styles.text, ...props.textStyle }}>{props.title}</Text>
      {props.dateShow === undefined && (
        <Text style={styles.date}>{getFormattedDate(new Date())}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    padding: 10,
    // backgroundColor: theme.colors.ui.primary,
  },
  text: {
    fontSize: theme.fontSizesInNumber.body, //16,
    fontFamily: "bold",
    letterSpacing: 0.3,
    color: theme.colors.text.primary,
  },
  date: {
    color: theme.colors.text.secondary,
    fontFamily: "regular",
    letterSpacing: 0.3,
    fontSize: theme.fontSizesInNumber.body, //16,
  },
});
