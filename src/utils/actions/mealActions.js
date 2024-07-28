import { getAuth } from "firebase/auth";
import { child, getDatabase, push, ref, update } from "firebase/database";
import { getFirebaseApp } from "../firebaseHelper";

export const logMeal = async (loggedInUserId, mealData) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    console.error("User is not authenticated");
    return;
  }

  console.log(" ----------------logMeal loggedInUserId", loggedInUserId);

  const newMealData = {
    ...mealData,
    createdBy: loggedInUserId,
    createdAt: new Date().toISOString(),
  };

  try {
    const app = getFirebaseApp();
    const dbRef = ref(getDatabase(app));
    const newMeal = await push(child(dbRef, "meal"), newMealData);
    await push(child(dbRef, `userMeal/${loggedInUserId}`), newMeal.key);

    return newMeal.key;
  } catch (error) {
    console.error("Failed to log meal:", error);
    throw error;
  }
};

export const updateFavouritesMeal = async (mealId, isFavourite) => {
  const auth = getAuth();
  const user = auth.currentUser;

  // console.log("Current user:", user);

  if (!user) {
    console.error("User is not authenticated");
    return;
  }
  console.log(
    "updateFavouritesMeal called with mealId:",
    mealId,
    "isFavourite:",
    isFavourite
  );

  if (!mealId) {
    console.error(
      "Invalid parameters for updateFavouritesMeal: mealId is missing"
    );
    return;
  }

  try {
    const app = getFirebaseApp();
    const dbRef = ref(getDatabase(app));
    const favouriteRef = child(dbRef, `meal/${mealId}`);
    await update(favouriteRef, { isFavourite: isFavourite });
  } catch (error) {
    console.error("Error updating isFavourite:", error);
  }
};
