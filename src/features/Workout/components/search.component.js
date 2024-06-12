import React, { useContext, useState, useEffect } from "react";
import { Searchbar } from "react-native-paper";

import { LocationContext } from "../../../services/location/location.context";

//"../../../services/location/location.context";

export const Search = ({ isFavouritesToggled, onFavouritesToggle }) => {
  const { keyword, search } = useContext(LocationContext);
  const [searchKeyword, setSearchKeyword] = useState(keyword);

  /*   useEffect(() => {
    search(searchKeyword);
  }, []); */ //this is removed because it is cause of infinite loop.
  useEffect(() => {
    setSearchKeyword(keyword);
  }, [keyword]); // this is because, whenever search key word change it will affect on map.search
  return (
    <View style={{ padding: 16 }}>
      <Searchbar
        icon={isFavouritesToggled ? "heart" : "heart-outline"}
        onIconPress={onFavouritesToggle}
        placeholder="Search for a location"
        value={searchKeyword}
        onSubmitEditing={() => {
          search(searchKeyword);
        }}
        onChangeText={(text) => {
          setSearchKeyword(text);
        }}
      />
    </View>
  );
};
