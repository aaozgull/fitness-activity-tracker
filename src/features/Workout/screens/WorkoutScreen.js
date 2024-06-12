import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from "react-native";
///import { ActivityIndicator, Alert } from "react-native";

import { theme } from "../../../infrastructure/theme";
import PageTitle from "../../../components/utility/PageTitle";
import PageContainer from "../../../components/utility/PageContainer";
import HeaderLogo from "../../../components/utility/HeaderLogo";
//import ImageSlider from "../../../components/workout/ImageSlider";
import { bodyParts } from "../../../constants/index";
import DataItem from "../../../components/utility/DataItem";
import { colors } from "../../../infrastructure/theme/colors";
import { fetchExercises } from "../../../utils/api/exerciseDB";

//might be change this file name. as it is only for order workoutPlan

const WorkoutScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [exercises, setExercises] = useState(bodyParts);
  // console.log(bodyParts);

  //fetchExercises
  /*   const getExercises = async () => {
    const data = await fetchExercises();
    setExercises(data);
    console.log("getExercises got data: ", data);
  };

  useEffect(() => {
    setIsLoading(true);
    getExercises();
    setIsLoading(false);
  }, []); */

  const workoutPlanHandler = () => {
    try {
      setIsLoading(true);
      dispatch(
        addToCart(
          { item: "workout category", price: 1299 },
          { workout: "workout object" }
        )
      ); //  this need to work
      navigation.navigate("checkoutScreen");
    } catch (error) {
      //setError(error.message);
      setIsLoading(false);
    }
  };
  const handleItemPress = (item) => {
    /// setSelectedItem(item);
    //setMenuVisible(true);
    navigation.navigate("Exercises", { item: item });
  };

  const handleCloseMenu = () => {
    setMenuVisible(false);
  };

  /* useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <HeaderLogo
          style={
            {
              // marginLeft: 50,
              // marginTop: StatusBar.currentHeight,
            }
          }
        />
      ),
    });
  }, []); */

  return (
    <PageContainer style={styles.container}>
      <PageTitle
        title="Workouts"
        style={styles.pageTitle}
        textStyle={styles.pageTitleColor}
      />
      {/*  <View style={styles.ImageContainer}>
        <ImageSlider />
      </View> */}
      <View style={styles.bodyPartsContainer}>
        <PageTitle
          title="Body Parts"
          textStyle={{ color: theme.colors.ui.quaternary, fontSize: 28 }}
        />
        <FlatList
          data={exercises}
          renderItem={({ item }) => {
            // console.log(item.image);
            return (
              <DataItem
                type={"workout"}
                size={80}
                title={item.name}
                image={item.image}
                onPress={() => handleItemPress(item)}
              />
            );
          }}
          keyExtractor={(item, index) => item.name + index}
        />
      </View>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.ui.primary,
  },
  bodyPartsContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
  ImageContainer: {
    backgroundColor: colors.ui.quaternary,
  },
  pageTitle: {
    backgroundColor: theme.colors.ui.quaternary,
    paddingTop: 40,
    paddingLeft: 40,
  },
  pageTitleColor: {
    color: theme.colors.text.fiftary,
    fontSize: 28,
  },
});

export default WorkoutScreen;
