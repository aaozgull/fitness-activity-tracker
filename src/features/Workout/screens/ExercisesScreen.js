import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ActivityIndicator, MD2Colors } from "react-native-paper";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import PageTitle from "../../../components/utility/PageTitle";
//import { ExerciseInfoCard } from "../components/ExerciseInfoCard";

//import { Search } from "../components/search.component";
//import { RestaurantsContext } from "../../../services/restaurants/restaurants.context";
//import { FavouritesContext } from "../../../services/favourites/favourites.context";
import { FavouritesBar } from "../../../components/favourites/FavouritesBar";
import { FadeInView } from "../../../components/animations/fade.animation";
//import exerises from "../../../../assets/data/exercises.json";
import { demoExercises } from "../../../constants/index";
import { colors } from "../../../infrastructure/theme/colors";
import { fetchExercisesByBodypart } from "../../../utils/api/exerciseDB";

const ExercisesScreen = ({ navigation, route }) => {
  const { item } = route?.params;
  ///console.log(route?.params);
  const [exercises, setExercises] = useState(demoExercises);
  const [isLoading, setIsLoading] = useState(false);
  //console.log(exercises);
  // const { isLoading, error, workouts } = useContext(RestaurantsContext);
  // const { favourites } = useContext(FavouritesContext);
  // const [isToggled, setIsToggled] = useState(false);
  //console.log(error);

  const getExercisesByBodyparts = async (bodypart) => {
    const data = await fetchExercisesByBodypart(bodypart);
    setExercises(data);
    //console.log(bodypart + " got data: ", data);
  };

  useEffect(() => {
    setIsLoading(true);
    if (item) getExercisesByBodyparts(item.name);
    setIsLoading(false);
  }, [item]);

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            style={{ marginLeft: -25 }}
            size={50}
            animating={true}
            color={MD2Colors.blue300}
          />
        </View>
      )}

      {/*   <Search
        isFavouritesToggled={isToggled}
        onFavouritesToggle={() => setIsToggled(!isToggled)}
      />
      {isToggled && (
        <FavouritesBar
          favourites={favourites}
          onNavigate={navigation.navigate}
        />
      )} */}
      <View>
        <Image source={item.image} style={{ width: wp(100), height: hp(45) }} />
        <Pressable
          style={styles.backContainer}
          hitSlop={8}
          onPress={handleBack}
        >
          <Image
            style={styles.backIcon}
            source={require("../../../../assets/back.png")}
          />
        </Pressable>

        <PageTitle
          title={`${item.name} Exercises`}
          style={styles.pageTitle}
          textStyle={styles.pageTitleColor}
        />

        <FlatList
          style={{ padding: 16 }}
          data={exercises}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 60, paddingTop: 5 }}
          columnWrapperStyle={{
            justifyContent: "space-between",
          }}
          keyExtractor={(exercise, index) => exercise.id + index}
          renderItem={({ item: exercise, index }) => {
            // console.log("Exercise " + Object.values(exercise));
            // console.log(" Exercise " + exercise.name);
            // console.log("Exercise " + exercise.gifUrl);
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ExerciseDetail", {
                    exercise: exercise,
                  })
                }
              >
                {/*  <Spacer position="bottom" size="large"> */}
                <View style={styles.spaceBottom}>
                  {/* <FadeInView> */}
                  {/* <Text>{exercise.name}</Text> */}
                  <ExerciseInfoCard exercise={exercise} />
                  {/* </FadeInView> */}
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};
export default ExercisesScreen;

const ExerciseInfoCard = ({ exercise }) => {
  //console.log("infoCard " + exercise.name);
  //console.log("InfoCard " + exercise.gifUrl);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: exercise.gifUrl }}
          resizeMode="cover"
          style={styles.image}
        />
      </View>
      <Text style={styles.text}>
        {exercise?.name?.length > 20
          ? exercise.name.slice(0, 20) + "..."
          : exercise.name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bg.primary,
    shadowColor: colors.ui.gray700,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderRadius: 25,
    elevation: 5,
  },
  imageContainer: {
    borderRadius: 25,
    overflow: "hidden",
  },
  image: {
    width: wp(44),
    height: wp(52),
    borderRadius: 25,
  },
  text: {
    fontSize: hp(2),
    color: colors.text.primary, // Set your desired text color
    // fontWeight: "600",
    fontFamily: "medium",
    // marginLeft: 5,
    // marginVertical: 5,
    margin: 10,
    letterSpacing: 0.5,
  },

  loadingContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
  },
  safeArea: {
    flex: 1,
    //marginTop: StatusBar.currentHeight,
    backgroundColor: colors.ui.secondary,
  },

  gif: {
    height: 200, // Adjust the height as needed
  },
  spaceBottom: {
    marginBottom: 16,
  },
  info: {
    padding: 16,
  },
  label: {
    fontFamily: "regular",
  },
  subValue: {
    fontFamily: "bold",
    textTransform: "capitalize",
  },
  infoCardContainer: {
    flex: 1,
    paddingVertical: 7,
    borderBottomColor: colors.ui.grey300,
    borderBottomWidth: 1,
    alignItems: "center",
    backgroundColor: "red",
    //minHeight: 50,
  },
  leftButton: {
    position: "absolute",
    borderRadius: hp(2),
    top: hp(4),
    left: wp(4),
    backgroundColor: colors.ui.accent,
  },
  pageTitle: {
    backgroundColor: colors.ui.quaternary,
    // marginTop: 10,
    paddingTop: 20,
    paddingLeft: 20,
  },
  pageTitleColor: {
    color: colors.text.fiftary,
    fontSize: 28,
    textTransform: "capitalize",
  },
  backContainer: {
    paddingVertical: 20,
    // backgroundColor: colors.green,
  },
  backIcon: {
    width: 32,
    height: 32,
  },
});
