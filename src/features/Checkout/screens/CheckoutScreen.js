import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { List, TextInput, ActivityIndicator } from "react-native-paper";
//import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Avatar } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { selectCart, clearCart } from "../../../store/cartSlice";
import { colors } from "../../../infrastructure/theme/colors";
import SubmitButton from "../../../components/utility/SubmitButton";
import {
  payRequest,
  saveCart,
  loadCart,
} from "../../../utils/actions/checkoutActions";

import CreditCardInput from "../components/CreditCardInput";

const CheckoutScreen = ({ navigation }) => {
  const cartData = useSelector((state) => state.cart.cartData);
  const workout = useSelector((state) => state.cart.excercise);
  console.log("====================================");
  console.log(JSON.stringify(cartData));
  console.log(cartData.length);
  console.log("====================================");

  //cconst cart = selectCart();
  const userData = useSelector((state) => state.auth.userData);
  const [sum, setSum] = useState(0);
  const [name, setName] = useState("");
  const [card, setCard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (userData && userData.userId) {
      loadCart(userData.userId);
    }
  }, [userData]);

  useEffect(() => {
    if (userData && userData.userId) {
      saveCart(workout, cartData, userData.userId);
    }
  }, [workout, cartData, userData]);

  useEffect(() => {
    if (!cartData.length) {
      setSum(0);
      return;
    }
    const newSum = cartData.reduce((acc, { price }) => {
      return (acc += price);
    }, 0);
    setSum(newSum);
  }, [cartData]);
  /////above useEffect can me use in cart slice too. work on it

  const onPay = () => {
    setIsLoading(true);
    if (!card || !card.id) {
      setIsLoading(false);
      console.log("some error");
      navigation.navigate("CheckoutError", {
        error: "Please fill in a valid credit card",
      });
      return;
    }
    payRequest(card.id, sum, name)
      .then((result) => {
        setIsLoading(false);
        clearCart();
        navigation.navigate("CheckoutSuccess");
      })
      .catch((err) => {
        setIsLoading(false);
        navigation.navigate("CheckoutError", {
          error: err,
        });
      });
  };

  useEffect(() => {
    onPay();
  }, []);

  if (!cartData.length || !workout) {
    return (
      <View style={styles.container}>
        <View style={styles.cartIconContainer}>
          <Avatar.Icon
            icon="cart-off"
            size={128}
            backgroundColor={colors.ui.primary}
          />
          <Text>Your cart is empty!</Text>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {workout && (
        <View style={styles.exerciseContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: workout.gifUrl }}
              resizeMode="cover"
              style={styles.image}
            />
          </View>
        </View>
      )}
      {/* <RestaurantInfoCard restaurant={restaurant} /> */}//Fitness plan cards
      {isLoading && (
        <ActivityIndicator
          size={128}
          color={colors.ui.tertiary}
          animating={true}
          style={styles.indicator}
        />
      )}
      <ScrollView>
        {/*   <Spacer position="left" size="medium">
        <Spacer position="top" size="large"> */}
        <View>
          <View>
            <Text>Your Order</Text>
            <Text>{JSON.stringify(cartData)}</Text>
            <Text>{JSON.stringify(workout)}</Text>
          </View>
          <List.Section>
            {cart.map(({ item, price }) => {
              return <List.Item title={`${item} - ${price / 100}`} />;
            })}
          </List.Section>
          <Text>Total: {sum / 100}</Text>
        </View>
        <TextInput
          label="Name"
          value={name}
          style={styles.textInput}
          onChangeText={(t) => {
            setName(t);
          }}
        />
        {name.length > 0 && (
          <CreditCardInput
            name={name}
            onSuccess={setCard}
            onError={() =>
              navigation.navigate("CheckoutError", {
                error: "Something went wrong processing your credit card",
              })
            }
          />
        )}
        //add icone cash-usd
        <SubmitButton
          disabled={isLoading}
          title="Pay"
          dollarIcon={true}
          style={styles.button}
          onPress={onPay}
        />
        <SubmitButton
          disabled={isLoading}
          CartIcon={true}
          title="clear"
          color={colors.ui.error500}
          style={styles.button}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 20,
    flex: 1,
    backgroundColor: colors.bg.primary,
  },
  exerciseContainer: {
    backgroundColor: colors.ui.primary,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    elevation: 5,
  },
  imageContainer: {
    overflow: "hidden",
  },
  image: {
    width: wp(100),
    height: wp(60),
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
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

export default CheckoutScreen;
