import React, { useEffect } from "react";

import {
  StatusBar,
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Pressable,
  ScrollView,
} from "react-native";
//import { HeaderButtons, Item } from "react-navigation-header-buttons";
import {
  HeaderButtons,
  Item,
} from "../../../../react-navigation-header-buttons";

//import styled from "styled-components/native";
import { FontAwesome5 } from "@expo/vector-icons";

import { theme } from "../../../infrastructure/theme/index";
import ToDoSummary from "../component/toDoList/dashBoard-toDo-summary";
import BodyWeight from "../component/linear-chart/bodyWeight";
import PhotoCard from "../../photoGallery/screen/photo-card";
import PageTitle from "../../../components/utility/PageTitle";
import PageContainer from "../../../components/utility/PageContainer";
import CustomHeaderButton from "../../../components/utility/CustomHeaderButton";
import HeaderLogo from "../../../components/utility/HeaderLogo";
import { colors } from "../../../infrastructure/theme/colors";

export const DashBoardScreen = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
              iconName="user-edit"
              iconType={FontAwesome5}
              color={colors.ui.tertiary}
              onPress={() => props.navigation.navigate("Settings")}
            />
          </HeaderButtons>
        );
      },
      headerTitle: () => <HeaderLogo />,
    });
  }, []);

  function showBodyWeightHandler() {
    navigation.navigate("bodyWeightDetail");
  }
  function showGalleryHandler() {
    navigation.navigate("GalleryScreen");
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageContainer style={styles.container}>
        <Text style={styles.userNameText}>Hi! Aaoz</Text>
        <View style={styles.summary}>
          <ToDoSummary />
        </View>

        <PageTitle
          title="My Progress"
          style={styles.pageTitle}
          textStyle={styles.pageTitleColor}
        />
        <View style={styles.divider}></View>
        <View style={styles.progressContainer}>
          <View style={styles.graph}>
            <Pressable
              android_ripple={{ color: "#210644" }}
              onPress={showBodyWeightHandler}
              style={({ pressed }) => pressed && styles.pressedItem}
            >
              <BodyWeight />
            </Pressable>
          </View>
          <View style={styles.photo}>
            <Pressable
              android_ripple={{ color: "#210644" }}
              onPress={showGalleryHandler}
              style={({ pressed }) => pressed && styles.pressedItem}
            >
              <PhotoCard />
            </Pressable>
          </View>
        </View>
      </PageContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    //marginTop: StatusBar.currentHeight,
    backgroundColor: theme.colors.bg.secondary, //"#2d0689",
  },
  pageTitle: {
    backgroundColor: theme.colors.ui.quaternary,
  },
  pageTitleColor: {
    color: theme.colors.text.fiftary,
    fontSize: 28,
  },
  userNameText: {
    padding: theme.spaceInNumber[3],
    fontSize: 28,
    fontFamily: "boldItalic",
    letterSpacing: 0.3,
    color: theme.colors.text.quaternary,
    // fontWeight: "bold",
    letterSpacing: 0.3,
  },
  divider: {
    backgroundColor: theme.colors.ui.accent2,
    padding: 8,
    //borderRadius: 6,
    borderBottomEndRadius: 8,
    borderBottomStartRadius: 8,
    elevation: 3,
    shadowColor: theme.colors.ui.quaternary, // "#39324a", // GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },

  progressContainer: {
    //padding: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: theme.colors.bg.secondary,
    //padding: theme.spaceInNumber[3],
  },
  summary: {
    flex: 1,
    // paddingTop: theme.spaceInNumber[4],
    paddingBottom: theme.spaceInNumber[4],
  },
  graph: {
    flex: 1,
    marginLeft: theme.spaceInNumber[2],
    //marginBottom: theme.spaceInNumber[4],
  },
  photo: {
    flex: 1,
    //marginTop: theme.spaceInNumber[3],
  },
  pressedItem: {
    opacity: 0.5,
  },
});
