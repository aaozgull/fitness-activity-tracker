import React, { useRef, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Camera, CameraType } from "expo-camera";
import { Button } from "react-native-paper";
import styled from "styled-components/native";

//import { CustomText } from "../../../components/typography/text.component";
import { Text } from "../../../components/typography/text.component";
//import { AuthenticationContext } from "../../../services/authentication/authentication.context";
//import styled from "../../../infrastructure/theme";

const ProfileCamera = styled(Camera)`
  width: 100%;
  height: 100%;
`;

const CameraContainer = styled.View`
  width: 100%;
  height: 100%;
`;

const CameraButton = styled(Button).attrs({
  mode: "contained",
  icon: "camera",
})`
  position: absolute;
  top: 525px;
  left: 140px;
`;

export const CameraScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(false);
  const { user } = useContext(AuthenticationContext);
  const cameraRef = useRef(); //<Camera | null>();

  const snap = async () => {
    if (cameraRef && cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      //console.log(photo);
      AsyncStorage.setItem(`${user.uid}-photo`, photo.uri);
      navigation.goBack();
    }
  };

  useEffect(() => {
    (async () => {
      const { granted } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(granted);
    })();
  }, []);

  if (hasPermission === false) {
    return <Text variant="error">No access to camera</Text>;
  }

  return (
    <CameraContainer>
      <ProfileCamera
        ref={(camera) => (cameraRef.current = camera)}
        ratio={"16:9"}
        type={CameraType.front}
        onCameraReady={() => {
          console.log("Camera Ready");
        }}
      ></ProfileCamera>

      <CameraButton onPress={snap}>Snap!</CameraButton>
    </CameraContainer>
  );
};

//export default CameraScreen;
