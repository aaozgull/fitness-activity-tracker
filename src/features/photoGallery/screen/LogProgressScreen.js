import React, { useState, useReducer, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Feather, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../../components/utility/Input";
import PageContainer from "../../../components/utility/PageContainer";
import PageTitle from "../../../components/utility/PageTitle";
import { colors } from "../../../infrastructure/theme/colors";
import front from "../../../../assets/images/front.jpg";
import back from "../../../../assets/images/back.jpg";
import side from "../../../../assets/images/side.jpg";
import { Divider, Card } from "react-native-paper";
import SubmitButton from "../../../components/utility/SubmitButton";
import {
  launchImagePicker,
  openCamera,
  uploadImageAsync,
} from "../../../utils/imagePickerHelper";
//import { updateLoggedInUserData } from "../../../store/authSlice";
import { setProgressData } from "../../../store/progressSlice";
import TransparentImageSelector from "./TransparentImageSelector";
import TransparentImageSlider from "./TransparentImageSlider";
//import { updateSignedInUserData } from "../../../utils/actions/authActions";
import { logProgress } from "../../../utils/actions/progressActions";
import { validateInput } from "../../../utils/actions/formActions";
import { reducer } from "../../../utils/reducers/formReducer";

const LogProgress = ({ navigation }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const progressData = useSelector((state) => state.progress.progressData);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [weight, setWeight] = useState(null);
  const [weightErrorText, setWeightErrorText] = useState("");

  const [tempImageUri, setTempImageUri] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [todayDate, setTodayDate] = useState(
    new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  );
  ////////
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [imageSliderVisible, setImageSliderVisible] = useState(false);
  const [selectedImageAngle, setSelectedImageAngle] = useState(null);
  const [images, setImages] = useState([front, back, side]);

  const handleItemPress = (item) => {
    setSelectedImageAngle(item);
    setMenuVisible(true);
  };
  const handleExpandImagesPress = () => {
    setImageSliderVisible(true);
  };

  const handleCloseMenu = () => {
    setMenuVisible(false);
    setImageSliderVisible(false);
  };

  ////////

  const note = progressData.note || "";

  const initialState = {
    inputValues: {
      note,
    },
    inputValidities: {
      note: undefined,
    },
    formIsValid: false,
  };

  const [formState, dispatchFormState] = useReducer(reducer, initialState);
  const inputChangedHandler = useCallback(
    (inputId, inputValue) => {
      if (inputId === "weight") {
        if (parseInt(inputValue) <= 0 || parseInt(inputValue) >= 1000) {
          setWeightErrorText("Please enter a valid weight");
        } else {
          setWeightErrorText("");
        }
        setWeight(inputValue);
      } else {
        const result = validateInput(inputId, inputValue);
        dispatchFormState({ inputId, validationResult: result, inputValue });
      }
    },
    [dispatchFormState, weight]
  );

  const saveHandler = useCallback(async () => {
    //const updatedValues = formState.inputValues;

    const updatedValues = {
      ...formState.inputValues,
      weight: weight,
      todayDate: todayDate,
      // note: note,
      // FrontPicture: frontImage,
      // BackPicture: backImage,
      // SidePicture: sideImage,
    };

    try {
      setIsLoading(true);
      /// await updateSignedInUserData(userData.userId, updatedValues);
      // await logProgress(userData.userId, updatedValues);
      //dispatch(updateLoggedInUserData({ newData: updatedValues }));
      // dispatch(setProgressData({ progressData: updatedValues }));

      setShowSuccessMessage(true);

      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [formState, dispatch]);

  const hasChanges = () => {
    const currentValues = formState.inputValues;

    return currentValues.note != note;
  };
  const setImageState = () => {
    const newImages = [...images]; // Create a copy of the current images array
    if (selectedImageAngle === "1") {
      newImages[0] = { uri: tempImageUri }; // Update the front image
    } else if (selectedImageAngle === "2") {
      newImages[1] = { uri: tempImageUri }; // Update the back image
    } else if (selectedImageAngle === "3") {
      newImages[2] = { uri: tempImageUri }; // Update the side image
    }
    setImages(newImages); // Update the images state with the modified array
  };

  const setImageFolderName = () => {
    let imageAngle = "";
    if (selectedImageAngle === "1") {
      imageAngle = "FrontPicture";
    } else if (selectedImageAngle === "2") {
      imageAngle = "BackPicture";
    } else if (selectedImageAngle === "3") {
      imageAngle = "SidePicture";
    }
    return imageAngle;
  };

  const pickImage = useCallback(async () => {
    try {
      setMenuVisible(false);
      const result = await launchImagePicker();
      if (!result.cancelled) {
        const tempUri = result.assets[0].uri; // Access the selected image through the assets array
        console.log(`tempUri ${tempUri}`);
        setIsLoading(true);
        const imageFolder = setImageFolderName();
        console.log(`imageFolder ${imageFolder}`);
        //const uploadUrl = await uploadImageAsync(tempUri, imageFolder);
        //  console.log(`uploadUrl ${uploadUrl}`);
        setIsLoading(false);

        /* if (!uploadUrl) {
          throw new Error("Could not upload image");
        } */

        setTempImageUri(tempUri); //uploadUrl);
        setImageState();
        /// const newData = { [imageFolder]: uploadUrl };

        //  await updateSignedInUserData(userData.userId, newData);
        // dispatch(updateLoggedInUserData({ newData }));
      }
    } catch (error) {
      console.log(error);
    }
  }, [tempImageUri]);

  const takePhoto = useCallback(async () => {
    setMenuVisible(false);
    try {
      const tempUri = await openCamera();
      if (!tempUri) return;
      //console.log(`tempUri ${tempUri}`);
      setTempImageUri(tempUri); // Set temporary image URI
      setIsLoading(true);

      const imageFolder = setImageFolderName(); // Determine image folder (e.g., "FrontPicture")
      //console.log(`imageFolder ${imageFolder}`);

      // Perform image processing or uploading (if any)
      // For example:
      // const uploadUrl = await uploadImageAsync(tempUri, imageFolder);
      // console.log(`uploadUrl ${uploadUrl}`);

      // Once image processing is completed, update images state
      setImageState(); // Update images array based on selected angle

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setMenuVisible(false);
      setIsLoading(false);
    }
  }, [tempImageUri]);

  return (
    <PageContainer style={{ paddingHorizontal: 20 }}>
      <Card elevation={5} style={styles.card}>
        <TouchableOpacity
          style={{ flex: 1, marginBottom: 40 }}
          onPress={() => handleExpandImagesPress()}
        >
          <FontAwesome5
            name="expand-arrows-alt"
            size={24}
            color={colors.ui.accent}
            style={styles.expandIcon}
          />
        </TouchableOpacity>
        <View style={styles.ImagesContainer}>
          <TouchableOpacity
            style={styles.mediaButton}
            onPress={() => handleItemPress("1")}
          >
            <Card.Cover key="1" style={styles.cover} source={images[0]} />
            <Feather
              name="camera"
              size={24}
              color={colors.ui.tertiary}
              style={styles.cameraIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.mediaButton}
            onPress={() => handleItemPress("2")}
          >
            <Card.Cover key="2" style={styles.cover} source={images[1]} />
            <Feather
              name="camera"
              size={24}
              color={colors.ui.tertiary}
              style={styles.cameraIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.mediaButton}
            onPress={() => handleItemPress("3")}
          >
            <Card.Cover key="3" style={styles.cover} source={images[2]} />
            <Feather
              name="camera"
              size={24}
              color={colors.ui.tertiary}
              style={styles.cameraIcon}
            />
          </TouchableOpacity>
        </View>
        <Text></Text>
      </Card>
      <ScrollView contentContainerStyle={styles.formContainer}>
        <View style={styles.topContainer}>
          <PageTitle title="Log Progress" />
          <Text style={styles.about} numberOfLines={2}>
            {todayDate}
          </Text>

          <View>
            <Divider />

            <Input
              id="note"
              label="note"
              icon="pen"
              iconPack={FontAwesome5}
              onInputChanged={inputChangedHandler}
              autoCapitalize="none"
              errorText={formState.inputValidities["note"]}
              initialValue=""
            />
            <Input
              id="weight"
              label="weight"
              icon="weight"
              iconPack={FontAwesome5}
              onInputChanged={
                inputChangedHandler
              } /* {(inputId, inputValue) => {
                console.log(
                  `-------------oninputChange ${inputId} ${inputValue}`
                );
                if (parseInt(inputValue) <= 0 || parseInt(inputValue) >= 1000) {
                  setWeightErrorText("Please enter a valid weight");
                  console.log(`under if statement ${weightErrorText}`);
                  console.log(`${weightErrorText}`);
                } else {
                  console.log(`under if else statement ${weightErrorText}`);
                  setWeightErrorText("");
                }
                setWeight(inputValue);
              }} */
              placeholder={`Enter your weight in Kg`}
              keyboardType="numeric"
              errorText={weightErrorText}
              initialValue={weight}
            />
          </View>

          <View style={{ marginTop: 20 }}>
            {showSuccessMessage && <Text>Saved!</Text>}

            {isLoading ? (
              <ActivityIndicator
                size={"small"}
                color={colors.ui.accent2}
                style={{ marginTop: 10 }}
              />
            ) : (
              hasChanges() &&
              weightErrorText === "" && (
                <SubmitButton
                  title="Save"
                  onPress={saveHandler}
                  style={{ marginTop: 20 }}
                  disabled={!formState.formIsValid}
                />
              )
            )}
          </View>
        </View>
      </ScrollView>
      <TransparentImageSelector
        isVisible={isMenuVisible}
        onClose={handleCloseMenu}
        selectedImageAngle={selectedImageAngle}
        onTakePhoto={takePhoto}
        onPickImage={pickImage}
      />
      <TransparentImageSlider
        isVisible={imageSliderVisible}
        onClose={handleCloseMenu}
        images={images}
      />
    </PageContainer>
  );
};

export default LogProgress;
const styles = StyleSheet.create({
  formContainer: {
    //alignItems: "center",
    //backgroundColor: "red",
    //flexGrow: 1, // Add this line
  },
  ImagesContainer: {
    //flex: 1,
    // backgroundColor: "yellow",
    flexDirection: "row",
    alignContent: "space-between",
    height: "100%",
    // alignItems: "center",
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    color: "red",
    fontSize: 13,
    fontFamily: "regular",
    letterSpacing: 0.3,
  },
  card: {
    flex: 1,
    backgroundColor: colors.ui.accent2, //theme.colors.ui.primary, //"white",
    marginTop: 40,
    minHeight: 400, // Use minHeight instead of height
    flex: 1, // Add flex: 1 to allow the card to expand
    //marginVertical: 28,
    // marginHorizontal: 8,
  },
  cover: {
    //flex: 1,
    marginHorizontal: 4,
    marginVertical: 4,
    minHeight: 350,
    // marginTop: 100,
    backgroundColor: colors.ui.tertiary,
    //height: 200,
  }, //"white" },
  inputContainer: {
    width: "100%",
    //backgroundColor: "red",
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 2,
    backgroundColor: colors.ui.grey100,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
    color: colors.ui.gray500,
  },
  input: {
    color: colors.text.primary,
    flex: 1,
    fontFamily: "regular",
    letterSpacing: 0.3,
    paddingTop: 0,
  },
  textInput: {
    color: colors.text.primary,
    flex: 1,
    fontFamily: "regular",
    letterSpacing: 0.3,
    paddingTop: 0,
    width: "100%",
  },
  text: {
    fontSize: 16,
    fontFamily: "medium",
    paddingVertical: 5,
    letterSpacing: 0.3,
    color: colors.text.primary,
  },
  mediaButton: {
    flex: 1,
  },
  cameraIcon: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  expandIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },

  sendButton: {
    backgroundColor: colors.ui.tertiary,
    borderRadius: 50,
    padding: 8,
  },
  popupTitleStyle: {
    fontFamily: "medium",
    letterSpacing: 0.3,
    color: colors.text.primary,
  },
  topContainer: {
    // alignItems: "center",
    justifyContent: "center",
    //backgroundColor: "green",
    marginVertical: 20,
    marginHorizontal: 20,
  },
  about: {
    fontFamily: "medium",
    fontSize: 16,
    letterSpacing: 0.3,
    color: colors.ui.grey300,
  },
  heading: {
    fontFamily: "bold",
    letterSpacing: 0.3,
    color: colors.text.primary,
    marginVertical: 8,
  },
});
