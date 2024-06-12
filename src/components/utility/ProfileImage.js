import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import userImage from "../../../assets/images/userImage.jpeg";
//import colors from "../../constants/colors";
import { colors } from "../../infrastructure/theme/colors";
import {
  launchImagePicker,
  uploadImageAsync,
} from "../../utils/imagePickerHelper";
import { updateSignedInUserData } from "../../utils/actions/authActions";
import { useDispatch } from "react-redux";
import { updateLoggedInUserData } from "../../store/authSlice";
import { updateChatData } from "../../utils/actions/chatActions";
import { isNumber } from "validate.js";

const ProfileImage = (props) => {
  const dispatch = useDispatch();

  let source = userImage;
  if (props.uri && isNumber(props.uri)) {
    source = props.uri;
  } else {
    source = props.uri ? { uri: props.uri } : userImage;
  }

  //console.log(source);
  const [image, setImage] = useState(source);
  const [isLoading, setIsLoading] = useState(false);

  const showEditButton = props.showEditButton && props.showEditButton === true;
  const showRemoveButton =
    props.showRemoveButton && props.showRemoveButton === true;

  const userId = props.userId;
  const chatId = props.chatId;

  const pickImage = async () => {
    try {
      const tempUri = await launchImagePicker();

      if (!tempUri) return;

      // Upload the image
      setIsLoading(true);
      const uploadUrl = await uploadImageAsync(tempUri, chatId !== undefined);

      setIsLoading(false);

      if (!uploadUrl) {
        throw new Error("Could not upload image");
      }

      if (chatId) {
        await updateChatData(chatId, userId, { chatImage: uploadUrl });
      } else {
        const newData = { profilePicture: uploadUrl };

        await updateSignedInUserData(userId, newData);
        dispatch(updateLoggedInUserData({ newData }));
      }

      setImage({ uri: uploadUrl });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const Container = props.onPress || showEditButton ? TouchableOpacity : View;

  return (
    <Container style={props.style} onPress={props.onPress || pickImage}>
      {isLoading ? (
        <View
          height={props.size}
          width={props.size}
          style={styles.loadingContainer}
        >
          <ActivityIndicator size={"small"} color={colors.primary} />
        </View>
      ) : (
        <Image
          style={{
            ...(props.size === "60%" ? styles.fullImage : styles.image),
            ...(props.size > 150
              ? { borderRadius: 150 }
              : { borderRadius: 50 }),
            width: props.size,
            height: props.size,
          }}
          source={image}
        />
      )}

      {showEditButton && !isLoading && (
        <View
          style={{
            ...styles.editIconContainer,
            ...(props.editIconContainerStyle
              ? props.editIconContainerStyle
              : { backgroundColor: colors.lightGrey }),
          }}
        >
          <FontAwesome
            name="pencil"
            size={props.editSize ? props.editSize : 15}
            color="black"
          />
        </View>
      )}

      {showRemoveButton && !isLoading && (
        <View style={styles.removeIconContainer}>
          <FontAwesome name="close" size={15} color="black" />
        </View>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  image: {
    //borderRadius: 50,
    borderColor: colors.grey,
    borderWidth: 1,
  },
  fullImage: {
    borderColor: colors.grey,
    borderWidth: 1,
  },
  editIconContainer: {
    position: "absolute",
    bottom: 0,

    //backgroundColor: colors.lightGrey,
    borderRadius: 20,
    padding: 8,
  },
  removeIconContainer: {
    position: "absolute",
    bottom: -3,
    right: -3,
    backgroundColor: colors.lightGrey,
    borderRadius: 20,
    padding: 3,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProfileImage;
