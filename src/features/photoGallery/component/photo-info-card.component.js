import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { Card } from "react-native-paper";
import { theme } from "../../../infrastructure/theme/index";

export const PhotoInfoCard = ({ photo = {} }) => {
  const {
    description = "Some photo",
    photos = [
      "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ym9keWJ1aWxkaW5nfGVufDB8fDB8fHww",
      "https://media.istockphoto.com/id/1129798528/photo/everything-you-ve-ever-wanted-is-on-the-other-side-of-fear-dark-skinned-sportsman-jumping.webp?b=1&s=170667a&w=0&k=20&c=CPj_nQCf9Q5B9MJEYkuLxr8ycejYbWr6JlTpgQdxBdo=",
      "https://media.istockphoto.com/id/1084251084/photo/personal-weight-training-in-the-gym.webp?b=1&s=170667a&w=0&k=20&c=MuGitA7NEZnauCllbGq9fBc-LymyWi3Ele3sgxReiSM=",
    ],
    date = "2022-02-18",
  } = photo;

  return (
    <Card elevation={5} style={styles.card}>
      <Text style={styles.title}>{date}</Text>
      <View style={styles.container}>
        <Card.Cover key="1" style={styles.cover} source={{ uri: photos[0] }} />

        <Card.Cover
          key="2" //{description}
          style={styles.cover}
          source={{ uri: photos[1] }}
        />
        <Card.Cover
          key="3" //{description}
          style={styles.cover}
          source={{ uri: photos[2] }}
        />
      </View>
      <Text style={styles.title}>{description}</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //backgroundColor: theme.colors.bg.primary, //"#2d0689",
    flexDirection: "row",
    alignContent: "space-between",
    // alignItems: "center",
  },

  card: {
    backgroundColor: theme.colors.ui.accent2, //"white",
    marginVertical: theme.spaceInNumber[3],
    marginHorizontal: theme.spaceInNumber[3],
  },
  cover: {
    flex: 1,
    margin: theme.spaceInNumber[3],
    backgroundColor: theme.colors.ui.tertiary,
  }, //"white" },
  title: {
    padding: theme.spaceInNumber[3],
    color: theme.colors.text.primary,
    fontFamily: "bold",
    letterSpacing: 0.3,
    fontSize: theme.fontSizesInNumber[2],
    fontWeight: `${theme.fontWeights.bold}`,
  },
});
