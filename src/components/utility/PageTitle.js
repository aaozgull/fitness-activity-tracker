import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../infrastructure/theme/colors";

export default PageTitle = (props) => {
  return (
    <View style={{ ...styles.container, ...props.style }}>
      <Text style={{ ...styles.text, ...props.textStyle }}>{props.title}</Text>
      {props.subTitle && <Text style={styles.subText}>{props.subTitle}</Text>}
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
    //fontSize: 20,
    fontFamily: "bold", //theme.fonts.heading,
    // fontWeight: "bold",
    letterSpacing: 0.3,
  },
  subText: {
    fontFamily: "medium",
    fontSize: 22,
    letterSpacing: 0.5,
    color: colors.text.gray500,
  },
});
