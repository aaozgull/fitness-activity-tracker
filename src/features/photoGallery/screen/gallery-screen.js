import React, { useEffect } from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
//import { HeaderButtons, Item } from "react-navigation-header-buttons";
//import { ActivityIndicator, Colors } from "react-native-paper";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { PhotoInfoCard } from "../component/photo-info-card.component";
import { theme } from "../../../infrastructure/theme/index";
import Heading from "../../../components/utility/Heading";
import HeaderLogo from "../../../components/utility/HeaderLogo";
import CustomHeaderButton from "../../../components/utility/CustomHeaderButton";
import { useSelector } from "react-redux";

export const GalleryScreen = ({ navigation }) => {
  const progressData =
    useSelector((state) => state.progress.progressData) || [];

  // console.log("------------progressData", progressData);

  const progressDataList = [];
  for (const key in progressData) {
    const progress = progressData[key];
    progressDataList.push({
      key,
      ...progress,
    });
  }
  progressDataList.reverse();
  //console.log("----------progressDataList", progressDataList);
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
      <View style={styles.row}>
        <PageTitle
          title="Add Progress Photos"
          textStyle={styles.pageTitleStyle}
        />

        <TouchableOpacity
          style={{ flex: 1, marginBottom: 40 }}
          onPress={() => navigation.navigate("LogProgressScreen")}
        >
          <FontAwesome5
            name="plus"
            size={24}
            color={theme.colors.ui.accent}
            style={styles.plusIcon}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>
        Track your progress here, take regular snaps and mark each photo with
        your current weight.
      </Text>

      <Heading title="My Photos" style={styles.headingContainer} />
      {progressDataList.length === 0 && (
        <Text style={styles.title}>No progress photos have been uploaded</Text>
      )}
      {progressDataList.length > 0 && (
        <FlatList
          data={progressDataList}
          renderItem={({ item }) => {
            return <PhotoInfoCard progressPhoto={item} />;
          }}
          keyExtractor={(item) => item.key}
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
  row: { flexDirection: "row", alignContent: "space-between" },
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
    marginVertical: 20,
    marginHorizontal: 10,
    fontFamily: "medium",
    fontSize: 16,
    letterSpacing: 0.3,
  },
  pageTitleStyle: {
    fontFamily: "black",
    letterSpacing: 0.5,
    fontSize: 26,
  },
  plusIcon: {
    position: "absolute",
    top: 20,
    right: 10,
  },
});
