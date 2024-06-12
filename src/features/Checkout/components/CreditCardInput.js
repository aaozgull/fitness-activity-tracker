import React from "react";
import { LiteCreditCardInput } from "react-native-credit-card-input";
import { cardTokenRequest } from "../../../utils/actions/checkoutActions";

import createStripe from "stripe-client";

const stripe = createStripe(
  "pk_test_51OiuEGDKMH60l9lkYQi7YdCctLLE196HmZe9XSli9haZLFNaFX1gJKKe42J4eQQRoxHKeTjVTYfF1e5TSxdbbCaW00pkrK0lG7"
);
const CreditCardInput = () => {
  const onChange = async (formData) => {
    /// console.log(formData);
    /**Object {
  "status": Object {
    "cvc": "incomplete",
    "expiry": "incomplete",
    "number": "incomplete",
  },
  "valid": false,
  "values": Object {
    "cvc": "",
    "expiry": "42",
    "number": "",
    "type": undefined,
  },
} */
    const { values, status } = formData;
    const isIncomplete = Object.values(status).includes("incomplete");
    const card = {
      number: "4242424242424242",
      exp_month: "12",
      exp_year: "34",
      cvc: "244",
      name: "Mo",
    };
    //const info = await stripe.createToken({ card });
    const info = await cardTokenRequest(card);
    console.log(info);
    //console.log(info);
    console.log(isIncomplete);
  };
  return <LiteCreditCardInput onChange={onChange} />;
};

export default CreditCardInput;
/* import React from "react";
import { LiteCreditCardInput } from "react-native-credit-card-input";
import { cardTokenRequest } from "../../../utils/actions/checkoutActions";

const CreditCardInput = ({ name = "Me", onSuccess, onError }) => {
  const onChange = async (formData) => {
    const { values, status } = formData;
    const isIncomplete = Object.values(status).includes("incomplete");
    console.log(isIncomplete);
    const expiry = values.expiry.split("/");
    console.log(expiry);
    const card = {
      number: values.number,
      exp_month: expiry[0],
      exp_year: expiry[1],
      cvc: values.cvc,
      name: name,
    };

    if (!isIncomplete) {
      try {
        const info = await cardTokenRequest(card);
        console.log(info);
        onSuccess(info);
      } catch (e) {
        onError();
      }
    }
  };
  return <LiteCreditCardInput onChange={onChange} />;
};

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 20,
    flex: 1,
    backgroundColor: theme.colors.bg.primary,
  },
});

export default CreditCardInput; */
