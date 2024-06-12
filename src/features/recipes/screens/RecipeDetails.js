import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  StyleSheet,
} from "react-native";
import SubTitle from "../../../components/utility/SubTitle";
import { colors } from "../../../infrastructure/theme/colors";
import PageTitle from "../../../components/utility/PageTitle";

const RecipeDetails = ({ route }) => {
  const { item } = route?.params || {};
  console.log("item?.instructions :>> ", item?.instructions);
  const instructions = item?.instructions || [];
  const nutrition = item?.nutrition;
  delete nutrition?.updated_at;
  const nutritionKeys = Object.keys(nutrition || {});

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image style={styles.image} source={{ uri: item?.thumbnail_url }} />
        <PageTitle style={{ marginBottom: 32 }} title={item?.name} />

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
      </ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(RecipeDetails);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    backgroundColor: colors.bg.primary,
    flex: 1,
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 10,
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
    fontSize: 12,
    fontFamily: "regular",
    letterSpacing: 0.3,
    textTransform: "capitalize",
  },
  value: {
    fontSize: 12,
    color: colors.ui.gray500,
  },
  instructionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
  },
  index: {
    fontSize: 20,
    color: colors.ui.gray500,
    marginRight: 16,
  },
  instructionText: {
    fontFamily: "regular",
    letterSpacing: 0.3,
    fontSize: 16,
    color: colors.text.primary,
    flex: 1,
  },
});
