import { Image, StyleSheet, Pressable } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BodyStatsStartScreen from "../../features/bodyStats/screens/BodyStatsStartScreen";
import BodyStatsScreen from "../../features/bodyStats/screens/BodyStatsScreen";
import BodyWeightCompositionScreen from "../../features/bodyStats/screens/BodyWeightCompositionScreen";

const Stack = createNativeStackNavigator();

const BackButton = (props) => {
  return (
    <Pressable onPress={props.onPress}>
      <Image
        style={styles.back}
        source={require("../../../assets/recipe/back.png")}
      />
    </Pressable>
  );
};
const BodyStatsNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerTitleAlign: "center", headerShadowVisible: false }}
    >
      <Stack.Screen
        name="BodyStatsScreen"
        component={BodyStatsScreen}
        options={{ headerLeft: null, gestureEnabled: false }}
      />
      <Stack.Screen
        name="BodyStatsStartScreen"
        component={BodyStatsStartScreen}
        options={{ headerLeft: (props) => <BackButton {...props} /> }}
      />
      <Stack.Screen
        name="BodyWeightCompositionScreen"
        component={BodyWeightCompositionScreen}
        options={{
          headerLeft: (props) => <BackButton {...props} />,
          title: "",
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  back: {
    width: 24,
    height: 24,
    margin: 16,
  },
});

export default BodyStatsNavigator;
