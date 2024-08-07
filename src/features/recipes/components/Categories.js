import React from "react";
import { FlatList, Text, TouchableOpacity, StyleSheet } from "react-native";
//import colors from "../constants/colors";
import { colors } from "../../../infrastructure/theme/colors";

const Categories = ({ categories, selectedCategory, onCategoryPress }) => {
  return (
    <FlatList
      horizontal
      data={categories}
      keyExtractor={(item) => String(item)}
      showsHorizontalScrollIndicator={false}
      style={{ marginHorizontal: -24, marginTop: 24 }}
      renderItem={({ item, index }) => {
        const selected = selectedCategory === item;
        const displayName = item?.replace("_", " ");

        return (
          <TouchableOpacity
            onPress={() => onCategoryPress(item)}
            style={[
              styles.itemContainer,
              selected ? styles.selectedItemContainer : {},
              index === 0 ? { marginLeft: 24 } : {},
            ]}
          >
            <Text style={[styles.item, selected ? styles.selectedItem : {}]}>
              {displayName}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default React.memo(Categories);
const styles = StyleSheet.create({
  item: {
    // fontSize: 12,
    color: colors.ui.fiftary,
    fontFamily: "bold",
    padding: 8,
    paddingHorizontal: 12,
    textTransform: "capitalize",
    letterSpacing: 0.5,
  },
  selectedItem: {
    color: colors.text.grey10,
  },
  itemContainer: {
    marginRight: 8,
    marginBottom: 14,
  },
  selectedItemContainer: {
    backgroundColor: colors.ui.fiftary,
    borderRadius: 10,
  },
});
