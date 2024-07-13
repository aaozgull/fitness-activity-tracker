import { getAuth } from "firebase/auth";
import { child, getDatabase, push, ref, update } from "firebase/database";
import { getFirebaseApp } from "../firebaseHelper";

export const logProgress = async (loggedInUserId, progressData) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    console.error("User is not authenticated");
    return;
  }

  console.log(" ----------------logProgress loggedInUserId", loggedInUserId);

  const newProgressData = {
    ...progressData,
    createdBy: loggedInUserId,
    createdAt: new Date().toISOString(),
  };

  try {
    const app = getFirebaseApp();
    const dbRef = ref(getDatabase(app));
    const newProgress = await push(child(dbRef, "progress"), newProgressData);
    await push(child(dbRef, `userProgress/${loggedInUserId}`), newProgress.key);
    /*  console.log(
      " ----------------userProgress newProgress.key",
      newProgress.key
    ); */

    return newProgress.key;
  } catch (error) {
    console.error("Failed to log progress:", error);
    throw error;
  }
};

export const updateProgressData = async (progressId, userId, progressData) => {
  console.log(" ----------------updateProgressData ", progressData);
  if (!progressId || !userId) {
    console.error("Invalid parameters for updateProgressData");
    return;
  }

  console.log(
    "updateProgressData called with",
    progressId,
    userId,
    progressData
  );

  try {
    const app = getFirebaseApp();
    const dbRef = ref(getDatabase(app));
    const progressRef = child(dbRef, `progress/${progressId}`);

    await update(progressRef, {
      ...progressData,
      updatedAt: new Date().toISOString(),
      updatedBy: userId,
    });
  } catch (error) {
    console.error("Failed to update progress data:", error);
    throw error;
  }
};
