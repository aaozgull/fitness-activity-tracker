import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import { Card } from "react-native-paper";
import { useSelector } from "react-redux";
import { theme } from "../../../infrastructure/theme/index";
import Heading from "../../../components/utility/Heading";
import front from "../../../../assets/images/front.jpg";
import back from "../../../../assets/images/back.jpg";
import side from "../../../../assets/images/side.jpg";

function PhotoCard() {
  const progressData =
    useSelector((state) => state.progress.progressData) || [];
  const firstProgressKey = Object.keys(progressData)[0];
  const progressPhoto = progressData[firstProgressKey];
  //console.log("firstProgress", progressData[firstProgressKey]);
  const todayDate =
    progressPhoto.todayDate.split(",")[1] +
    "," +
    progressPhoto.todayDate.split(",")[2];

  return (
    <>
      <Heading title="Body Photos" />
      <Card elevation={5} style={styles.card}>
        <Text style={styles.date}>{todayDate}</Text>
        <View style={styles.container}>
          <Card.Cover
            key="1"
            style={styles.cover}
            source={
              progressPhoto.frontImage === 24 ? front : progressPhoto.backImage
            }
          />

          <Card.Cover
            key="2" //{description}
            style={styles.cover}
            source={
              progressPhoto.backImage === 25 ? back : progressPhoto.backImage
            }
          />
          <Card.Cover
            key="3" //{description}
            style={styles.cover}
            source={
              progressPhoto.sideImage === 26 ? side : progressPhoto.sideImage
            }
          />
        </View>
        <Text style={styles.text}>{progressPhoto.note}</Text>
      </Card>
    </>
  );
}

export default PhotoCard;

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //backgroundColor: theme.colors.bg.primary, //"#2d0689",
    flexDirection: "row",
    alignContent: "space-between",
    // alignItems: "center",
  },

  card: {
    backgroundColor: theme.colors.ui.accent2, //theme.colors.ui.primary, //"white",
    marginVertical: theme.spaceInNumber[2],
    marginHorizontal: theme.spaceInNumber[2],
  },
  cover: {
    flex: 1,
    margin: theme.spaceInNumber[1],
    backgroundColor: theme.colors.ui.tertiary,
    height: 65,
  }, //"white" },
  date: {
    margin: theme.spaceInNumber[2],
    color: theme.colors.text.primary,
    fontFamily: "regular",
    letterSpacing: 0.3,
    fontSize: theme.fontSizesInNumber[1],
    fontWeight: `${theme.fontWeights.bold}`,
  },
  text: {
    margin: theme.spaceInNumber[3],
    color: theme.colors.text.primary,
    fontFamily: "bold",
    letterSpacing: 0.3,
    fontSize: theme.fontSizesInNumber[1],
    fontWeight: `${theme.fontWeights.bold}`,
  },
});
