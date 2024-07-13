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
import { Feather, FontAwesome5 } from "@expo/vector-icons";
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
import { addProgressData } from "../../../store/progressSlice";
import TransparentImageSelector from "./TransparentImageSelector";
import TransparentImageSlider from "./TransparentImageSlider";
import { logProgress } from "../../../utils/actions/progressActions";
import { validateInput } from "../../../utils/actions/formActions";
import { reducer } from "../../../utils/reducers/formReducer";

const LogProgress = ({ navigation }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [weight, setWeight] = useState(null);
  const [note, setNote] = useState("");
  const [weightErrorText, setWeightErrorText] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isFrontLoading, setIsFrontLoading] = useState(false);
  const [isBackLoading, setIsBackLoading] = useState(false);
  const [isSideLoading, setIsSideLoading] = useState(false);
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

  // const note = progressData.note || "";

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
      frontImage: images[0],
      backImage: images[1],
      sideImage: images[2],
    };

    try {
      setIsLoading(true);
      const progresskey = await logProgress(userData.userId, updatedValues);
      //dispatch(updateLoggedInUserData({ newData: updatedValues }));
      dispatch(addProgressData({ progresskey, progressData: updatedValues }));

      setShowSuccessMessage(true);

      setTimeout(() => {
        setShowSuccessMessage(false);
        setImages([front, back, side]);
        setWeight(null);
        setNote("");
        navigation.goBack();
      }, 6000);
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
  // Function to update the images state based on the selected image angle
  const setImageState = useCallback(
    (uploadUrl) => {
      setImages((prevImages) => {
        const newImages = [...prevImages];
        if (selectedImageAngle === "1") {
          newImages[0] = { uri: uploadUrl };
          setIsFrontLoading(false);
        } else if (selectedImageAngle === "2") {
          newImages[1] = { uri: uploadUrl };
          setIsBackLoading(false);
        } else if (selectedImageAngle === "3") {
          newImages[2] = { uri: uploadUrl };
          setIsSideLoading(false);
        }
        return newImages;
      });
    },
    [selectedImageAngle]
  );

  const setImageFolderName = () => {
    if (selectedImageAngle === "1") {
      setIsFrontLoading(true);
      return "FrontPicture";
    }
    if (selectedImageAngle === "2") {
      setIsBackLoading(true);
      return "BackPicture";
    }
    if (selectedImageAngle === "3") {
      setIsSideLoading(true);
      return "SidePicture";
    }
    return "";
  };

  const pickImage = useCallback(async () => {
    try {
      setMenuVisible(false);
      const result = await launchImagePicker();
      if (!result.canceled) {
        const tempUri = result.assets[0].uri;
        const imageFolder = setImageFolderName(); // Set image folder name based on selected angle
        const uploadUrl = await uploadImageAsync(tempUri, false, imageFolder); // Upload image and get URL
        setImageState(uploadUrl); // Update the images state
      }
    } catch (error) {
      console.log(error);
    }
  }, [setImageState, setImageFolderName]);

  const takePhoto = useCallback(async () => {
    try {
      setMenuVisible(false);
      const tempUri = await openCamera();
      if (tempUri) {
        const imageFolder = setImageFolderName(); // Set image folder name based on selected angle
        const uploadUrl = await uploadImageAsync(tempUri, false, imageFolder); // Upload image and get URL

        setImageState(uploadUrl); // Update the images state
      }
    } catch (error) {
      console.log(error);
      setMenuVisible(false);
      setIsLoading(false);
    }
  }, [setImageState, setImageFolderName]);

  const Container =
    isFrontLoading || isBackLoading || isSideLoading ? View : TouchableOpacity;
  return (
    <PageContainer style={{ paddingHorizontal: 20 }}>
      <ScrollView contentContainerStyle={styles.formContainer}>
        <Card elevation={5} style={styles.card}>
          <Container
            style={{ flex: 1, marginBottom: 40 }}
            onPress={() => handleExpandImagesPress()}
          >
            <FontAwesome5
              name="expand-arrows-alt"
              size={24}
              color={colors.ui.accent}
              style={styles.expandIcon}
            />
          </Container>
          <View style={styles.ImagesContainer}>
            <Container
              style={styles.mediaButton}
              onPress={() => handleItemPress("1")}
            >
              <View style={styles.coverContainer}>
                <Card.Cover key="1" style={styles.cover} source={images[0]} />
                {isFrontLoading && (
                  <ActivityIndicator
                    size={"large"}
                    color={colors.ui.accent2}
                    style={styles.activityIndicator}
                  />
                )}
              </View>
              <Feather
                name="camera"
                size={24}
                color={colors.ui.tertiary}
                style={styles.cameraIcon}
              />
            </Container>

            <Container
              style={styles.mediaButton}
              onPress={() => handleItemPress("2")}
            >
              <View style={styles.coverContainer}>
                <Card.Cover key="2" style={styles.cover} source={images[1]} />
                {isBackLoading && (
                  <ActivityIndicator
                    size={"large"}
                    color={colors.ui.accent2}
                    style={styles.activityIndicator}
                  />
                )}
              </View>
              <Feather
                name="camera"
                size={24}
                color={colors.ui.tertiary}
                style={styles.cameraIcon}
              />
            </Container>

            <Container
              style={styles.mediaButton}
              onPress={() => handleItemPress("3")}
            >
              <View style={styles.coverContainer}>
                <Card.Cover key="3" style={styles.cover} source={images[2]} />
                {isSideLoading && (
                  <ActivityIndicator
                    size={"large"}
                    color={colors.ui.accent2}
                    style={styles.activityIndicator}
                  />
                )}
              </View>
              <Feather
                name="camera"
                size={24}
                color={colors.ui.tertiary}
                style={styles.cameraIcon}
              />
            </Container>
          </View>

          <Text style={{ marginTop: 30 }}></Text>
        </Card>
        <View style={styles.topContainer}>
          <PageTitle title="Log Progress" textStyle={styles.pageTitleStyle} />
          <Text style={styles.about} numberOfLines={2}>
            {todayDate}
          </Text>

          <View>
            <Divider />
            <View style={{ marginBottom: 10 }}></View>
            <Input
              id="note"
              label="note"
              icon="pen"
              iconPack={FontAwesome5}
              onInputChanged={inputChangedHandler}
              autoCapitalize="none"
              errorText={formState.inputValidities["note"]}
              initialValue={note}
            />
            <Input
              id="weight"
              label="weight"
              icon="weight"
              iconPack={FontAwesome5}
              onInputChanged={inputChangedHandler}
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
                size={"Large"}
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
      {/*  <TransparentImageSlider
        isVisible={imageSliderVisible}
        onClose={handleCloseMenu}
        images={images}
      /> */}
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
  cover1: {
    //flex: 1,
    marginHorizontal: 4,
    marginVertical: 4,
    minHeight: 350,
    // marginTop: 100,
    backgroundColor: colors.ui.tertiary,
    //height: 200,
  }, //"white" },
  coverContainer: {
    //  flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cover: {
    width: "95%",
    height: 350,
    backgroundColor: colors.ui.tertiary,
    // marginHorizontal: 4,
    // marginVertical: 4,
  },
  activityIndicator: {
    position: "absolute",
  },
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
  pageTitleStyle: {
    fontFamily: "black",
    letterSpacing: 0.5,
    fontSize: 26,
  },
});
