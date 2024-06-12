import React from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
//import chatColors from "../../constants/chatColors";
import { colors } from "../../infrastructure/theme/colors";
import ProfileImage from "./ProfileImage";
import { Ionicons, AntDesign } from "@expo/vector-icons";

let imageSize = 40;

const DataItem = (props) => {
  const { title, subTitle, image, type, isChecked, icon } = props;
  const hideImage = props.hideImage && props.hideImage === true;
  if (type === "workout") {
    imageSize = 80;
  }
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View style={styles.container}>
        {!icon && !hideImage && <ProfileImage uri={image} size={imageSize} />}

        {icon && (
          <View style={styles.leftIconContainer}>
            <AntDesign name={icon} size={20} color={colors.ui.tertiary} />
          </View>
        )}

        <View style={styles.textContainer}>
          <Text
            numberOfLines={1}
            style={{
              ...styles.title,
              ...{
                color:
                  type === "button" ? colors.ui.tertiary : colors.text.primary,
              },
            }}
          >
            {title}
          </Text>
          {subTitle && (
            <Text numberOfLines={1} style={styles.subTitle}>
              {subTitle}
            </Text>
          )}
        </View>

        {type === "checkbox" && (
          <View
            style={{
              ...styles.iconContainer,
              ...(isChecked && styles.checkedStyle),
            }}
          >
            <Ionicons name="checkmark" size={18} color="white" />
          </View>
        )}
        {type === "link" && (
          <View>
            <Ionicons
              name="chevron-forward-outline"
              size={18}
              color={colors.ui.fiftary}
            />
          </View>
        )}
        {type === "workout" && (
          <View>
            <Ionicons
              name="chevron-forward-outline"
              size={24}
              color={colors.ui.fiftary}
            />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 7,
    borderBottomColor: colors.ui.grey10,
    borderBottomWidth: 1,
    alignItems: "center",
    minHeight: 50,
  },
  textContainer: {
    marginLeft: 14,
    flex: 1,
  },
  title: {
    fontFamily: "medium",
    fontSize: 16,
    letterSpacing: 0.3,
  },
  subTitle: {
    fontFamily: "regular",
    color: colors.ui.gray500,
    letterSpacing: 0.3,
  },
  iconContainer: {
    borderWidth: 1,
    borderRadius: 50,
    borderColor: colors.ui.grey300,
    backgroundColor: "white",
  },
  checkedStyle: {
    backgroundColor: colors.ui.tertiary,
    borderColor: "transparent",
  },
  leftIconContainer: {
    backgroundColor: colors.ui.grey100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    width: imageSize,
    height: imageSize,
  },
});

export default DataItem;
