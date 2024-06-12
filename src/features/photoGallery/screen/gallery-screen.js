import React, { useEffect } from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
//import { HeaderButtons, Item } from "react-navigation-header-buttons";
//import { ActivityIndicator, Colors } from "react-native-paper";

import { PhotoInfoCard } from "../component/photo-info-card.component";
import { theme } from "../../../infrastructure/theme/index";
import Heading from "../../../components/utility/Heading";
import HeaderLogo from "../../../components/utility/HeaderLogo";
import CustomHeaderButton from "../../../components/utility/CustomHeaderButton";

const photosData = [
  {
    id: "e1",
    description: "Some photo",
    photos: [
      "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ym9keWJ1aWxkaW5nfGVufDB8fDB8fHww",
      "https://media.istockphoto.com/id/1129798528/photo/everything-you-ve-ever-wanted-is-on-the-other-side-of-fear-dark-skinned-sportsman-jumping.webp?b=1&s=170667a&w=0&k=20&c=CPj_nQCf9Q5B9MJEYkuLxr8ycejYbWr6JlTpgQdxBdo=",
      "https://media.istockphoto.com/id/1084251084/photo/personal-weight-training-in-the-gym.webp?b=1&s=170667a&w=0&k=20&c=MuGitA7NEZnauCllbGq9fBc-LymyWi3Ele3sgxReiSM=",
    ],
    date: "2022-02-18",
  },
  {
    id: "e2",
    description: "Some photo",
    photos: [
      "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ym9keWJ1aWxkaW5nfGVufDB8fDB8fHww",
      "https://media.istockphoto.com/id/1129798528/photo/everything-you-ve-ever-wanted-is-on-the-other-side-of-fear-dark-skinned-sportsman-jumping.webp?b=1&s=170667a&w=0&k=20&c=CPj_nQCf9Q5B9MJEYkuLxr8ycejYbWr6JlTpgQdxBdo=",
      "https://media.istockphoto.com/id/1084251084/photo/personal-weight-training-in-the-gym.webp?b=1&s=170667a&w=0&k=20&c=MuGitA7NEZnauCllbGq9fBc-LymyWi3Ele3sgxReiSM=",
    ],
    date: "2022-02-18",
  },
  {
    id: "e3",
    description: "Some photo",
    photos: [
      "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ym9keWJ1aWxkaW5nfGVufDB8fDB8fHww",
      "https://media.istockphoto.com/id/1129798528/photo/everything-you-ve-ever-wanted-is-on-the-other-side-of-fear-dark-skinned-sportsman-jumping.webp?b=1&s=170667a&w=0&k=20&c=CPj_nQCf9Q5B9MJEYkuLxr8ycejYbWr6JlTpgQdxBdo=",
      "https://media.istockphoto.com/id/1084251084/photo/personal-weight-training-in-the-gym.webp?b=1&s=170667a&w=0&k=20&c=MuGitA7NEZnauCllbGq9fBc-LymyWi3Ele3sgxReiSM=",
    ],
    date: "2022-02-18",
  },
  {
    id: "e4",
    description: "Some photo",
    photos: [
      "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ym9keWJ1aWxkaW5nfGVufDB8fDB8fHww",
      "https://media.istockphoto.com/id/1129798528/photo/everything-you-ve-ever-wanted-is-on-the-other-side-of-fear-dark-skinned-sportsman-jumping.webp?b=1&s=170667a&w=0&k=20&c=CPj_nQCf9Q5B9MJEYkuLxr8ycejYbWr6JlTpgQdxBdo=",
      "https://media.istockphoto.com/id/1084251084/photo/personal-weight-training-in-the-gym.webp?b=1&s=170667a&w=0&k=20&c=MuGitA7NEZnauCllbGq9fBc-LymyWi3Ele3sgxReiSM=",
    ],
    date: "2022-02-18",
  },
  {
    id: "e5",
    description: "Some photo",
    photos: [
      "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ym9keWJ1aWxkaW5nfGVufDB8fDB8fHww",
      "https://media.istockphoto.com/id/1129798528/photo/everything-you-ve-ever-wanted-is-on-the-other-side-of-fear-dark-skinned-sportsman-jumping.webp?b=1&s=170667a&w=0&k=20&c=CPj_nQCf9Q5B9MJEYkuLxr8ycejYbWr6JlTpgQdxBdo=",
      "https://media.istockphoto.com/id/1084251084/photo/personal-weight-training-in-the-gym.webp?b=1&s=170667a&w=0&k=20&c=MuGitA7NEZnauCllbGq9fBc-LymyWi3Ele3sgxReiSM=",
    ],
    date: "2022-02-18",
  },
  {
    id: "e6",
    description: "Some photo",
    photos: [
      "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ym9keWJ1aWxkaW5nfGVufDB8fDB8fHww",
      "https://media.istockphoto.com/id/1129798528/photo/everything-you-ve-ever-wanted-is-on-the-other-side-of-fear-dark-skinned-sportsman-jumping.webp?b=1&s=170667a&w=0&k=20&c=CPj_nQCf9Q5B9MJEYkuLxr8ycejYbWr6JlTpgQdxBdo=",
      "https://media.istockphoto.com/id/1084251084/photo/personal-weight-training-in-the-gym.webp?b=1&s=170667a&w=0&k=20&c=MuGitA7NEZnauCllbGq9fBc-LymyWi3Ele3sgxReiSM=",
    ],
    date: "2022-02-18",
  },
  {
    id: "e7",
    description: "Some photo",
    photos: [
      "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ym9keWJ1aWxkaW5nfGVufDB8fDB8fHww",
      "https://media.istockphoto.com/id/1129798528/photo/everything-you-ve-ever-wanted-is-on-the-other-side-of-fear-dark-skinned-sportsman-jumping.webp?b=1&s=170667a&w=0&k=20&c=CPj_nQCf9Q5B9MJEYkuLxr8ycejYbWr6JlTpgQdxBdo=",
      "https://media.istockphoto.com/id/1084251084/photo/personal-weight-training-in-the-gym.webp?b=1&s=170667a&w=0&k=20&c=MuGitA7NEZnauCllbGq9fBc-LymyWi3Ele3sgxReiSM=",
    ],
    date: "2022-02-18",
  },
  {
    id: "e8",
    description: "Some photo",
    photos: [
      "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ym9keWJ1aWxkaW5nfGVufDB8fDB8fHww",
      "https://media.istockphoto.com/id/1129798528/photo/everything-you-ve-ever-wanted-is-on-the-other-side-of-fear-dark-skinned-sportsman-jumping.webp?b=1&s=170667a&w=0&k=20&c=CPj_nQCf9Q5B9MJEYkuLxr8ycejYbWr6JlTpgQdxBdo=",
      "https://media.istockphoto.com/id/1084251084/photo/personal-weight-training-in-the-gym.webp?b=1&s=170667a&w=0&k=20&c=MuGitA7NEZnauCllbGq9fBc-LymyWi3Ele3sgxReiSM=",
    ],
    date: "2022-02-18",
  },
  {
    id: "e9",
    description: "Some photo",
    photos: [
      "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ym9keWJ1aWxkaW5nfGVufDB8fDB8fHww",
      "https://media.istockphoto.com/id/1129798528/photo/everything-you-ve-ever-wanted-is-on-the-other-side-of-fear-dark-skinned-sportsman-jumping.webp?b=1&s=170667a&w=0&k=20&c=CPj_nQCf9Q5B9MJEYkuLxr8ycejYbWr6JlTpgQdxBdo=",
      "https://media.istockphoto.com/id/1084251084/photo/personal-weight-training-in-the-gym.webp?b=1&s=170667a&w=0&k=20&c=MuGitA7NEZnauCllbGq9fBc-LymyWi3Ele3sgxReiSM=",
    ],
    date: "2022-02-18",
  },
];

export const GalleryScreen = ({ navigation }) => {
  /*   useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <HeaderLogo style={{ marginRight: 150 }} />,
      headerRight: () => {
        return (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
              title="Close"
              iconName="camera-sharp"
              size={34}
              onPress={() => navigation.navigate("LogProgressScreen")}
            />
          </HeaderButtons>
        );
      },
    });
  }, []); */
  return (
    <View style={styles.container}>
      <Heading title="My Photos" style={styles.headingContainer} />
      <Text style={styles.title}>
        Track your progress here, take regular snaps ans mark each photo with
        your current weight.
      </Text>

      <Heading
        title="Progress Photos"
        style={{ marginBottom: 20 }}
        dateShow={false}
      />
      {photosData.length === 0 && (
        <Text style={styles.title}>No progress photos have been uploaded</Text>
      )}
      {photosData.length > 0 && (
        <FlatList
          data={photosData}
          renderItem={({ item }) => {
            return <PhotoInfoCard photo={item} />;
          }}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg.secondary, //"#2d0689",
  },
  headingContainer: {
    // flex: 1,
    backgroundColor: theme.colors.ui.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    // padding: 16,
    borderBottomWidth: 2,
    borderBottomColor: "#cccccc",
  },
  title: {
    margin: 10,
    fontFamily: "medium",
    fontSize: 16,
    letterSpacing: 0.3,
  },
});
