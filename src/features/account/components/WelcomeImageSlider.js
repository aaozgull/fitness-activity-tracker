import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import Carousel, {
  ParallaxImage,
  Pagination,
} from "react-native-snap-carousel";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { colors } from "../../../infrastructure/theme/colors";
import { welcomeSliderImages } from "../../../constants";
//import { sliderImages } from "../../../constants";

export default function WelcomeImageSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  const data = [
    {
      image: welcomeSliderImages[0],
      title: "Fitness For",
      subTitle: "Everyone",
      text: "Tailored fitness routines, designed to match your unique goals and lifestyle.",
    },
    {
      image: welcomeSliderImages[1],
      title: "Nutrious",
      subTitle: "Receipes",
      text: "Wholesome Recipes and Personalized Meal Plans to Fuel Your Journey Towards Your Health Goals",
    },
    {
      image: welcomeSliderImages[2],
      title: "Join a Vibrant",
      subTitle: "Community Discussion",
      text: "Connect with Supportive Community Members: Engage in Personal and Group Conversations",
    },
  ];

  const renderItem = ({ item, index }, parallaxProps) => {
    return <ItemCard key={index} item={item} parallaxProps={parallaxProps} />;
  };

  /*  const renderItem = ({ item, index }, parallaxProps) => {
    if (item.type === "image") {
      return (
        <ItemCard
          key={index}
          item={item.source}
          index={index}
          parallaxProps={parallaxProps}
        />
      );
    } else if (item.type === "text") {
      return <ItemTextCard key={index} item={item.view} />;
    }
    return null;
  }; */

  /*  useEffect(() => {
    // Check if all images are loaded
    const allImagesLoaded = imageLoaded.every((loaded) => loaded);
    if (allImagesLoaded) {
      // All images are loaded, update the pagination index
      const adjustedIndex = activeIndex % viewsAndTexts.length;
      setPaginationIndex(adjustedIndex);
    }
  }, [imageLoaded, activeIndex, viewsAndTexts]); */

  const handleSnapToItem = (index) => {
    setActiveIndex(index);
  };

  /*  const handleImageLoad = (index) => {
    // Update the loaded state for the corresponding image index
    const updatedLoaded = [...imageLoaded];
    updatedLoaded[index] = true;
    setImageLoaded(updatedLoaded);
  }; */
  return (
    <>
      <View style={{ width: wp(100), height: hp(60) }}>
        <Carousel
          data={data}
          loop={true}
          autoplay={true}
          renderItem={renderItem}
          hasParallaxImages={true}
          sliderWidth={wp(100)}
          itemWidth={wp(100)}
          autoplayInterval={4000}
          slideStyle={{
            display: "flex",
            alignItems: "center",
            marginBottom: 20,
          }}
          onSnapToItem={handleSnapToItem}
        />
      </View>

      {/*   {imageLoaded[activeIndex] && ( */}

      {/*  )} */}
      <Pagination
        dotsLength={data.length}
        activeDotIndex={activeIndex}
        containerStyle={{ paddingTop: 10 }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: colors.ui.quaternary,
        }}
        // autoplayInterval={4000}
        inactiveDotStyle={{
          backgroundColor: colors.ui.quaternary,
        }}
        inactiveDotOpacity={0.2}
        inactiveDotScale={0.6}
      />
    </>
  );
}

/* const ItemCard = ({ item, index /* , handleImageLoad */ //}) => {
// console.log("itemCard ", item);
/*return (
    <View style={{ width: wp(100), height: hp(25) }}>
      <ParallaxImage
        source={item}
        containerStyle={{
          //  marginLeft: 100,
          //borderTopStartRadius: 250,
          //borderBottomStartRadius: 250,
          flex: 1,
          backgroundColor: "red",
        }}
        style={{ resizeMode: "cover" }} // Changed to "cover"
        parallaxFactor={0.1}
        {...{
          parallaxFactor: 0.4,
          marginLeft: wp(10),
          marginRight: wp(10),
          overflow: "hidden",
        }}

        // onLoad={() => handleImageLoad(index)}
      />
    </View>
  );
}; */
const ItemCard = ({ item, parallaxProps }) => (
  <View
    style={{
      width: wp(100),
      height: hp(60),
      //  backgroundColor: "red",
    }}
  >
    {/* Image Container */}
    <View style={{ flex: 1 }}>
      <ParallaxImage
        source={item.image}
        containerStyle={{ /* borderRadius: 30, */ flex: 1 }}
        style={{ width: "100%", height: "100%", resizeMode: "cover" }}
        parallaxFactor={0.4}
        {...parallaxProps}
      />
    </View>
    {/* Text Container */}
    <View style={styles.textContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subTitle}>{item.subTitle}</Text>
      <Text style={styles.text}>{item.text}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  textContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    //height: hp(40), // Adjust this height as needed
    //borderBottomLeftRadius: 30,
    // borderBottomRightRadius: 30,
  },
  title: {
    textAlign: "center",
    fontFamily: "black",
    fontSize: 24,
    letterSpacing: 0.5,
    color: colors.text.grey10,
    textTransform: "uppercase",
  },
  subTitle: {
    textAlign: "center",
    fontFamily: "greatVibesRegular",
    fontSize: 35,
    lineHeight: 45,
    color: colors.ui.accent,
  },
  text: {
    fontFamily: "regular",
    fontSize: 16,
    letterSpacing: 0.5,
    color: colors.text.grey10,
    marginTop: 10,
    textAlign: "center",
  },
});
