import React, { useEffect } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  StyleSheet,
} from "react-native";
import {
  HeaderButtons,
  Item,
} from "../../../../react-navigation-header-buttons";

import SubTitle from "../../../components/utility/SubTitle";
import { colors } from "../../../infrastructure/theme/colors";
import PageTitle from "../../../components/utility/PageTitle";
import CustomHeaderButton from "../../../components/utility/CustomHeaderButton";

const RecipeDetails = ({ route, navigation }) => {
  const { item, calendarId, activityId } = route?.params || {};
  // console.log("item?.instructions :>> ", item?.instructions);
  //console.log("RecipeDetails calendarId:", calendarId);
  //console.log("RecipeDetails activityId:", activityId);

  const instructions = item?.instructions || [];
  const nutrition = item?.nutrition;
  delete nutrition?.updated_at;
  const nutritionKeys = Object.keys(nutrition || {});

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
              title="Log"
              color={colors.ui.grey10} // Custom text color
              size={24}
              fontFamily="bold"
              onPress={() =>
                navigation.navigate("ReviewMealScreen", {
                  item,
                  calendarId,
                  activityId,
                })
              }
            />
          </HeaderButtons>
        );
      },
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image style={styles.image} source={{ uri: item?.thumbnail_url }} />

        <PageTitle style={{ marginBottom: 32 }} title={item?.name} />
        <View style={{ marginHorizontal: 24 }}>
          {nutritionKeys?.map((key) => (
            <View key={key} style={styles.row}>
              <Text style={styles.key}>{key}</Text>
              <Text style={styles.value}>{nutrition[key]}</Text>
            </View>
          ))}

          <SubTitle
            style={{ marginTop: 32, marginBottom: 16 }}
            text="Instructions"
          />

          {instructions?.map((instruction, index) => (
            <View key={instruction?.id} style={styles.instructionRow}>
              <Text style={styles.index}>{index + 1}</Text>
              <Text style={styles.instructionText}>
                {instruction?.display_text}
              </Text>
            </View>
          ))}

          {!instructions?.length ? (
            <Text style={styles.value}>No instructions found.</Text>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(RecipeDetails);

const styles = StyleSheet.create({
  container: {
    // marginHorizontal: 24,
    backgroundColor: colors.bg.primary,
    flex: 1,
  },
  image: {
    width: "100%",
    height: 180,
    //borderRadius: 10,
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(217,217,217,0.5)",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginVertical: 4,
  },
  key: {
    fontSize: 16,
    fontFamily: "regular",
    letterSpacing: 0.5,
    textTransform: "capitalize",
    color: colors.text.primary,
  },
  value: {
    fontFamily: "regular",
    letterSpacing: 0.3,
    fontSize: 16,
    color: colors.ui.gray500,
  },
  instructionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
  },
  index: {
    fontFamily: "bold",
    fontSize: 20,
    color: colors.ui.gray500,
    marginRight: 16,
  },
  instructionText: {
    fontFamily: "regular",
    letterSpacing: 0.5,
    fontSize: 16,
    color: colors.text.primary,
    flex: 1,
  },
});
