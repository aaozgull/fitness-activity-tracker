import { child, getDatabase, push, ref, update } from "firebase/database";
import { getFirebaseApp } from "../firebaseHelper";

export const logProgress = async (loggedInUserId, progressData) => {
  const newProgressData = {
    ...progressData,
    createdBy: loggedInUserId,
    createdAt: new Date().toISOString(),
  };

  const app = getFirebaseApp();
  const dbRef = ref(getDatabase(app));
  const newProgress = await push(child(dbRef, "progress"), newProgressData);
  await push(child(dbRef, `userProgress/${loggedInUserId}`), newProgress.key);
  return newProgress.key;
};

export const updateProgressData = async (progressId, userId, progressData) => {
  const app = getFirebaseApp();
  const dbRef = ref(getDatabase(app));
  const progressRef = child(dbRef, `progress/${progressId}`);

  await update(progressRef, {
    ...progressData,
    updatedAt: new Date().toISOString(),
    updatedBy: userId,
  });
};
