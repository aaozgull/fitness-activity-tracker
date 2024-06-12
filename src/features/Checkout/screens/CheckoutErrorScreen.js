import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Avatar } from "react-native-paper";
import PageContainer from "../../../components/utility/PageContainer";
import { colors } from "../../../infrastructure/theme/colors";

const CheckoutErrorScreen = ({ route }) => {
  const { error = "" } = route.params;
  return (
    <PageContainer style={{ paddingHorizontal: 20 }}>
      <View style={styles.container}>
        <View style={styles.cartIconContainer}>
          <Avatar.Icon
            icon="close"
            size={128}
            backgroundColor={colors.ui.error500}
          />
          <Text>{error}</Text>
        </View>
      </View>
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 20,
    flex: 1,
    backgroundColor: colors.bg.primary,
  },
  cartIconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarIcon: {
    backgroundColor: colors.ui.primary,
  },
  textInput: {
    margin: 12,
  },
  button: {
    margin: 20,
  },
  indicator: {
    position: "absolute",
    top: "50%",
    left: "35%",
    zIndex: 999,
  },
});

export default CheckoutErrorScreen;
