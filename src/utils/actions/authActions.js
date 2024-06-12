import { getFirebaseApp } from "../firebaseHelper";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { child, getDatabase, ref, set, update } from "firebase/database";
import { authenticate, logout } from "../../store/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import * as WebBrowser from "expo-web-browser";
//import { useOAuth, useUser } from "@clerk/clerk-expo";
//import { useWarmUpBrowser } from "../../components/hooks/useWarmUpBrowser";
import { getUserData } from "./userActions";
import { Alert } from "react-native";

let timer;
//WebBrowser.maybeCompleteAuthSession();

export const signUp = (firstName, lastName, email, password, authType) => {
  return async (dispatch) => {
    const app = getFirebaseApp();
    const auth = getAuth(app);

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { uid, stsTokenManager } = result.user;
      const { accessToken, expirationTime } = stsTokenManager;

      const expiryDate = new Date(expirationTime);
      const timeNow = new Date();
      const millisecondsUntilExpiry = expiryDate - timeNow;

      const userData = await createUser(
        firstName,
        lastName,
        email,
        uid,
        authType
      );

      dispatch(
        authenticate({ token: accessToken, userData, newRegistration: true })
      );
      saveDataToStorage(accessToken, uid, expiryDate);

      timer = setTimeout(() => {
        dispatch(userLogout());
      }, millisecondsUntilExpiry);
    } catch (error) {
      console.log(error);
      const errorCode = error.code;

      let message = "Something went wrong.";

      if (errorCode === "auth/email-already-in-use") {
        message = "This email is already in use";
      }

      throw new Error(message);
    }
  };
};

export const signIn = (email, password) => {
  return async (dispatch) => {
    const app = getFirebaseApp();
    const auth = getAuth(app);
    // console.log(`signin ${email} ${password}`);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const { uid, stsTokenManager } = result.user;
      const { accessToken, expirationTime } = stsTokenManager;

      const expiryDate = new Date(expirationTime);
      const timeNow = new Date();
      const millisecondsUntilExpiry = expiryDate - timeNow;
      console.log(`signIn userData uid ${uid}`);
      const userData = await getUserData(uid);

      // console.log(`signIn userData ${userData}`);

      dispatch(
        authenticate({ token: accessToken, userData, newRegistration: false })
      );
      saveDataToStorage(accessToken, uid, expiryDate);

      timer = setTimeout(() => {
        dispatch(userLogout());
      }, millisecondsUntilExpiry);
    } catch (error) {
      console.log("----------------------------");
      console.log(error.code);
      console.log(error);
      const errorCode = error.code;

      let message = "Something went wrong.";
      if (errorCode === "auth/network-request-failed") {
        message = "There is no network connectivity.";
      }

      if (
        errorCode === "auth/wrong-password" ||
        errorCode === "auth/user-not-found"
      ) {
        message = "The username or password was incorrect";
      }

      throw new Error(message);
    }
  };
};

export const userLogout = () => {
  return async (dispatch) => {
    AsyncStorage.clear();
    clearTimeout(timer);
    dispatch(logout());
  };
};

export const updateSignedInUserData = async (userId, newData) => {
  if (newData.firstName && newData.lastName) {
    const firstLast = `${newData.firstName} ${newData.lastName}`.toLowerCase();
    newData.firstLast = firstLast;
  }

  const dbRef = ref(getDatabase());
  const childRef = child(dbRef, `users/${userId}`);
  await update(childRef, newData);
};

const createUser = async (firstName, lastName, email, userId, authType) => {
  const firstLast = `${firstName} ${lastName}`.toLowerCase();
  const userData = {
    firstName,
    lastName,
    firstLast,
    email,
    userId,
    authType,
    signUpDate: new Date().toISOString(),
  };

  const dbRef = ref(getDatabase());
  const childRef = child(dbRef, `users/${userId}`);
  await set(childRef, userData);
  return userData;
};

const saveDataToStorage = (token, userId, expiryDate) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token,
      userId,
      expiryDate: expiryDate.toISOString(),
    })
  );
};

/* export const googleSignin = async () => {
  useWarmUpBrowser();
  const user = useUser();
  const { startOAuthFlow } = useOAuth({
    strategy: "oauth_google",
  });

  useEffect(() => {
    if (!user) {
      return;
    }

    (async () => {
      try {
        const email = user.user?.primaryEmailAddress?.emailAddress;
        await signIn(email, "");
      } catch (err) {
        console.error("Failed to store user data:", err);
        return;
      }
    })();
  }, [user]);
  try {
    const { createdSessionId, setActive } = await startOAuthFlow();

    if (createdSessionId && setActive) {
      setActive({ session: createdSessionId });
    } else {
      console.log("failed to sign in");
    }
  } catch (err) {
    Alert.alert("Error occurred, try again");
    console.log(err);
  }
}; */
/* 
export const googleSignin = async () => {
  try {
    const { startOAuthFlow, useUser, signIn } = yourImportsHere; // Import necessary functions

    const user = useUser();
    const { createdSessionId, setActive } = await startOAuthFlow({
      strategy: "oauth_google",
    });

    if (createdSessionId && setActive) {
      setActive({ session: createdSessionId });

      // Assuming user is available after successful OAuth flow
      if (user && user.user?.primaryEmailAddress?.emailAddress) {
        const email = user.user.primaryEmailAddress.emailAddress;

        // Now call your signIn function to sign in with Firebase
        await signIn(email, "");

        // Additional actions after successful sign-in can be placed here
      } else {
        console.log("User data not available for sign-in");
      }
    } else {
      console.log("Failed to start OAuth flow");
    }
  } catch (err) {
    Alert.alert("Error occurred, try again");
    console.log(err);
  }
};

export const googleSignup = async () => {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({
    strategy: "oauth_google",
  });
  try {
    const { createdSessionId, setActive, signUp } = await startOAuthFlow();

    if (createdSessionId && setActive && signUp) {
      setActive({ session: createdSessionId });

      await signUp(
        signUp?.firstName,
        signUp?.lastName,
        signUp.emailAddress,
        "",
        "google"
      );
    } else {
      console.log("failed to sign up");
    }
  } catch (err) {
    console.log(err);
  }
}; */
