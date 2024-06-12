import React, { useContext } from "react";
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";

import { FavouritesContext } from "../../services/favourites/favourites.context";

export const Favourite = ({ workout }) => {
  const { favourites, addToFavourites, removeFromFavourites } =
    useContext(FavouritesContext);

  const isFavourite = favourites.find(
    (w) => w.categoryId === workout.categoryId
  );

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() =>
        !isFavourite ? addToFavourites(workout) : removeFromFavourites(workout)
      }
    >
      <AntDesign
        name={isFavourite ? "heart" : "hearto"}
        size={24}
        color={isFavourite ? "red" : "white"}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: absolute,
    top: 25,
    right: 25,
    zindex: 9,
  },
});
