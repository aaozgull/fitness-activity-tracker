import { child, set, get, getDatabase, ref } from "firebase/database";
import { getFirebaseApp } from "../firebaseHelper";

export const getUserInfoData = async (userId) => {
  try {
    const app = getFirebaseApp();
    const dbRef = ref(getDatabase(app));
    const userRef = child(dbRef, `userInfo/${userId}`);

    const snapshot = await get(userRef);
    return snapshot.val();
  } catch (error) {
    console.log(error);
  }
};

export const updateSignedInUserInfoData = async (userId, newInfoData) => {
  const dbRef = ref(getDatabase());
  const childRef = child(dbRef, `userInfo/${userId}`);
  await update(childRef, newInfoData);
};

export const createUserInfo = async (userId, newUserInfoData) => {
  const dbRef = ref(getDatabase());
  const childRef = child(dbRef, `userInfo/${userId}`);
  await set(childRef, newUserInfoData);
  return newUserInfoData;
};
