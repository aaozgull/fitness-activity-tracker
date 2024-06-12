import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { colors } from "../../../infrastructure/theme/colors";
import { FontAwesome5 } from "@expo/vector-icons";
//import Carousel, { Pagination } from "react-native-snap-carousel";
//import { theme } from "../../../infrastructure/theme";
import userImage from "../../../../assets/images/userImage.jpeg";

const TransparentImageSlider = ({ isVisible, onClose, images }) => {
  // const images = [userImage, userImage, userImage];
  const [activeIndex, setActiveIndex] = useState(0);
  console.log(`TransparentImageSlider ${images[0]} ${images[1]} ${images[2]}`);
  const renderItem = ({ item, index }) => (
    <View style={styles.slide}>
      <Image source={item} style={styles.image} />
    </View>
  );

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={styles.modalContainer}>
        <Text style={styles.menuHeaderText}>Progress Images</Text>
        {/*  <Carousel
          data={images}
          renderItem={renderItem}
          sliderWidth={400}
          itemWidth={300}
          loop
          enableSnap
          inactiveSlideOpacity={0.4}
          inactiveSlideScale={0.8}
          onSnapToItem={(index) => setActiveIndex(index)}
        />
        <Pagination
          dotsLength={images.length}
          activeDotIndex={activeIndex}
          containerStyle={{ paddingTop: 10 }}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: colors.ui.tertiary,
          }}
          inactiveDotStyle={{
            backgroundColor: colors.ui.quaternary,
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        /> */}
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  slide: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: 400, // Adjust the height as needed
    resizeMode: "cover",
    borderRadius: 10,
  },
  modalContainer: {
    //backgroundColor: colors.ui.accent2,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  menuHeaderText: {
    fontFamily: "blackItalic",
    letterSpacing: 0.3,
    fontSize: 32,
    color: colors.ui.tertiary,
    marginBottom: 10,
  },
  closeButton: {
    position: "absolute",
    top: 5,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.ui.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonText: {
    color: colors.ui.error50,
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default TransparentImageSlider;
