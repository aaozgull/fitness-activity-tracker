import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Card } from "react-native-paper";
import { theme } from "../../../infrastructure/theme/index";

import front from "../../../../assets/images/front.jpg";
import back from "../../../../assets/images/back.jpg";
import side from "../../../../assets/images/side.jpg";

export const PhotoInfoCard = ({ progressPhoto }) => {
  return (
    <Card elevation={5} style={styles.card}>
      <Text style={styles.title}>{progressPhoto.todayDate}</Text>
      <View style={styles.container}>
        <View style={styles.coverContainer}>
          <Card.Cover
            key="1"
            style={styles.cover}
            source={
              progressPhoto.frontImage === 24 ? front : progressPhoto.backImage
            }
          />
        </View>
        <View style={styles.coverContainer}>
          <Card.Cover
            key="2"
            style={styles.cover}
            source={
              progressPhoto.backImage === 25 ? back : progressPhoto.backImage
            }
          />
        </View>
        <View style={styles.coverContainer}>
          <Card.Cover
            key="3"
            style={styles.cover}
            source={
              progressPhoto.sideImage === 26 ? side : progressPhoto.sideImage
            }
          />
        </View>
      </View>
      <Text style={styles.note}>{progressPhoto.note}</Text>
      <Text style={styles.weight}>{progressPhoto.weight}KG</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignContent: "space-between",
  },
  card: {
    flex: 1,
    backgroundColor: theme.colors.ui.accent2,
    marginTop: 40,
    marginHorizontal: 20,
    minHeight: 400,
  },
  coverContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cover: {
    width: "95%",
    height: 350,
    backgroundColor: theme.colors.ui.tertiary,
  },
  title: {
    padding: theme.spaceInNumber[3],
    color: theme.colors.text.primary,
    fontFamily: "regular",
    letterSpacing: 0.3,
    fontSize: 18,
    // fontWeight: `${theme.fontWeights.bold}`,
  },
  note: {
    padding: theme.spaceInNumber[3],
    color: theme.colors.text.primary,
    fontFamily: "regular",
    letterSpacing: 0.3,
    fontSize: 18,
    // fontWeight: `${theme.fontWeights.bold}`,
  },
  weight: {
    position: "absolute",
    bottom: 1,
    right: 10,
    padding: theme.spaceInNumber[3],
    color: theme.colors.text.primary,
    fontFamily: "regular",
    letterSpacing: 0.3,
    fontSize: 18,
  },
});
