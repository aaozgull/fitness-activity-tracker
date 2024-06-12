import { getFirebaseApp } from "../firebaseHelper";
import createStripe from "stripe-client";
import { useDispatch } from "react-redux";

import { host } from "../../utils/env";
import { setCartState } from "../../store/cartSlice";

const stripe = createStripe(
  "pk_test_51OiuEGDKMH60l9lkYQi7YdCctLLE196HmZe9XSli9haZLFNaFX1gJKKe42J4eQQRoxHKeTjVTYfF1e5TSxdbbCaW00pkrK0lG7"
);

export const cardTokenRequest = (card) => stripe.createToken({ card });

export const payRequest = async (token, amount, name) => {
  return fetch(`${host}/pay`, {
    body: JSON.stringify({
      token,
      name,
      amount,
    }),
    method: "POST",
  }).then((res) => {
    if (res.status > 200) {
      return Promise.reject("something went wrong processing your payment");
    }
    return res.json();
  });
};

export const saveCart = async (wrt, crt, uid) => {
  try {
    const jsonValue = JSON.stringify({ workout: wrt, cart: crt });
    await AsyncStorage.setItem(`@cart-${uid}`, jsonValue);
  } catch (e) {
    console.log("error storing", e);
  }
};

const loadCart = async (uid) => {
  try {
    const dispatch = useDispatch();
    const value = await AsyncStorage.getItem(`@cart-${uid}`);
    if (value !== null) {
      const { workout: wrt, cart: crt } = JSON.parse(value);
      dispatch(addToCart({ cart: crt, workout: wrt }));
      // setRestaurant(rst);
      // setCart(crt);
    }
  } catch (e) {
    console.log("error storing", e);
  }
};
