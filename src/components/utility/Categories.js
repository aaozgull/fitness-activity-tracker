import React from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import colors from "../../features/recipes/constants/colors";

const Categories = ({ categories, selectedCategory, onCategoryPress }) => {
  return (
    <FlatList
      horizontal
      data={categories}
      keyExtractor={(item) => String(item?.value)}
      showsHorizontalScrollIndicator={false}
      style={{ marginTop: 12 }}
      renderItem={({ item, index }) => {
        const selected = selectedCategory === item?.value;
        const displayName = item?.label;

        return (
          <TouchableOpacity
            onPress={() => onCategoryPress(item?.value)}
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
    fontSize: 12,
    color: colors.blue,
    fontWeight: "bold",
    padding: 8,
    paddingHorizontal: 12,
    textTransform: "capitalize",
  },
  selectedItem: {
    color: colors.blue,
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: colors.blue,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 14,
  },
  selectedItemContainer: {
    borderColor: colors.lightGrey,
    backgroundColor: colors.lightGrey,
  },
});
