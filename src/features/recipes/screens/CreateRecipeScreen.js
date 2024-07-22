import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Card from "../components/Card";
import Categories from "../components/Categories";
import Input from "../components/Input";
import RecipeCard from "../components/RecipeCard";
import PageTitle from "../../../components/utility/PageTitle";
import { colors } from "../../../infrastructure/theme/colors";

const CreateRecipeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <PageTitle title="Healthy Recipes" />
      <TouchableOpacity
        style={{ flex: 1, marginBottom: 40 }}
        onPress={() => null /* navigation.navigate('') */}
      >
        {/*  <FontAwesome5
          name="expand-arrows-alt"
          size={24}
          color={colors.ui.accent}
          style={styles.expandIcon}
        /> */}
        <Text>Create Meal</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flex: 1, marginBottom: 40 }}
        onPress={() => null /* navigation.navigate('') */}
      >
        {/*  <FontAwesome5
          name="expand-arrows-alt"
          size={24}
          color={colors.ui.accent}
          style={styles.expandIcon}
        /> */}
        <Text>Select Meal</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default React.memo(CreateRecipeScreen);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    backgroundColor: colors.bg.primary,
  },
  list: {
    marginBottom: 24,
  },
});
