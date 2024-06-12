import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
/* import Carousel, {
  // ParallaxImage,
  Pagination,
} from "react-native-snap-carousel"; */

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { colors } from "../../../infrastructure/theme/colors";
import { welcomeSliderImages } from "../../../constants";

export default function WelcomeImageSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paginationIndex, setPaginationIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(
    Array(welcomeSliderImages.length).fill(false)
  );

  let viewsAndTexts = [];
  const setTextMessages = () => {
    viewsAndTexts.push(
      <View key="view1">
        <Text key="text1" style={styles.title}>
          Fitness For
        </Text>
        <Text key="text2" style={styles.subTitle}>
          Everyone
        </Text>
        <Text key="text3" style={styles.text}>
          Tailored fitness routines, designed to match your unique goals and
          lifestyle.
        </Text>
      </View>
    );
    viewsAndTexts.push(
      <View key="view2">
        <Text key="text4" style={styles.title}>
          Nutrious
        </Text>
        <Text key="text5" style={styles.subTitle}>
          Receipes
        </Text>
        <Text key="text6" style={styles.text}>
          Wholesome Recipes and Personalized Meal Plans to Fuel Your Journey
          Towards Your Health Goals
        </Text>
      </View>
    );
    viewsAndTexts.push(
      <View key="view3">
        <Text key="text8" style={styles.title}>
          Join a Vibrant
        </Text>
        <Text key="text9" style={styles.subTitle}>
          Community Discussion
        </Text>
        <Text key="text10" style={styles.text}>
          Connect with Supportive Community Members: Engage in Personal and
          Group Conversations
        </Text>
      </View>
    );
  };

  useEffect(() => {
    setTextMessages();
  }, []);

  useEffect(() => {
    // Check if all images are loaded
    const allImagesLoaded = imageLoaded.every((loaded) => loaded);
    if (allImagesLoaded) {
      // All images are loaded, update the pagination index
      const adjustedIndex = activeIndex % viewsAndTexts.length;
      setPaginationIndex(adjustedIndex);
    }
  }, [imageLoaded, activeIndex, viewsAndTexts]);

  const handleSnapToItem = (index) => {
    setActiveIndex(index);
  };

  const handleImageLoad = (index) => {
    // Update the loaded state for the corresponding image index
    const updatedLoaded = [...imageLoaded];
    updatedLoaded[index] = true;
    setImageLoaded(updatedLoaded);
  };
  return (
    <>
      <View style={{ marginTop: 50, width: wp(100), height: hp(25) }}>
        {/* <Carousel
          data={welcomeSliderImages}
          loop={true}
          autoplay={true}
          renderItem={({ item, index }) => (
            <ItemCard
              item={item}
              index={index}
              //  handleImageLoad={handleImageLoad}
            />
          )}
          hasParallaxImages={true}
          sliderWidth={wp(100)}
          firstItem={1}
          autoplayInterval={4000}
          itemWidth={wp(100)}
          slideStyle={{ alignItems: "flex-start" }}
          sliderHeight={hp(10)}
          //onSnapToItem={(index) => handleSnapToItem(index)}
        /> */}
      </View>
      {/*   {imageLoaded[activeIndex] && ( */}
      <View style={{ width: wp(100), height: hp(35) }}>
        {/*  <Carousel
          data={viewsAndTexts}
          loop={true}
          autoplay={true}
          renderItem={ItemTextCard}
          //hasParallaxImages={true}
          sliderWidth={wp(100)}
          firstItem={1}
          autoplayInterval={4000}
          itemWidth={wp(100)}
          slideStyle={{ alignItems: "flex-start" }}
          sliderHeight={hp(10)}
          //  onSnapToItem={(index) => handleSnapToItem(index)}
        /> */}
      </View>
      {/*  )} */}
      {/*   <Pagination
        dotsLength={welcomeSliderImages.length}
        activeDotIndex={paginationIndex}
        containerStyle={{ paddingTop: 10 }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: colors.ui.quaternary,
        }}
        autoplayInterval={4000}
        inactiveDotStyle={{
          backgroundColor: colors.ui.quaternary,
        }}
        inactiveDotOpacity={0.2}
        inactiveDotScale={0.6}
      /> */}
    </>
  );
}

const ItemTextCard = ({ item, index }) => {
  return <View style={styles.container}>{item}</View>;
};

const ItemCard = ({ item, index /* , handleImageLoad */ }) => {
  return (
    <View style={{ width: wp(100), height: hp(25) }}>
      {/*  <ParallaxImage
        source={item}
        containerStyle={{
          marginLeft: 100,
          borderTopStartRadius: 250,
          borderBottomStartRadius: 250,
          flex: 1,
        }}
        style={{ resizeMode: "contain" }}
        parallaxFactor={0.1}
        // onLoad={() => handleImageLoad(index)}
      /> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    // backgroundColor: "red",
    marginTop: 50,
    marginBottom: 100,
  },
  title: {
    justifyContent: "center",
    textAlign: "center",
    fontFamily: "medium",
    fontSize: 36,
    letterSpacing: 0.5,
    color: colors.text.primary,
    zIndex: 0,
    textTransform: "uppercase",
  },
  subTitle: {
    justifyContent: "center",
    textAlign: "center",
    fontFamily: "greatVibesRegular",
    fontSize: 45,
    lineHeight: 55,
    zIndex: 1,
    //letterSpacing: 0.2,
    color: colors.ui.accent,
  },
  text: {
    fontFamily: "regular",
    fontSize: 18,
    letterSpacing: 0.5,
    color: colors.text.primary,
    marginTop: 50,
    paddingHorizontal: 15,
  },
});
