import React from "react";
import {
  ActivityIndicator,
  Image,
  StyleProp,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import AppText from "components/widgets/Text";
import { h, w } from "core/utils/responsive";
import { View } from "react-native";

export const btnTypes = {
  WITH_TEXT: "btnWithTxt",
};

interface ButtonProps {
  label?: string;
  width?: string;
  onPress: any;
  textColor?: string;
  textSize?: number;

  borderColor?: string;
  iconType?: string;
  iconSize?: number;
  iconColor?: string;
  disabled?: boolean | undefined;
  btnStyles?: StyleProp<ViewStyle>;

  loading?: boolean;
  btnType?: "btnWithTxt";
}

export default function MyFAB({
  label,
  width,
  onPress,
  textColor,
  textSize,

  borderColor,
  iconType,
  iconSize,
  iconColor,
  disabled,
  btnStyles,

  loading,
  btnType,
}: ButtonProps) {
  const bgColor = disabled ? "#6686FF" : "#3861FB";
  const txtColor = disabled ? "rgba(255,255,255,0.5)" : "#fff";

  return (
    <View style={{}}>
      <TouchableOpacity
        onPress={() => {
          if (disabled) return;
          onPress();
        }}
        style={[
          {
            width: h(64),
            height: h(64),
            paddingVertical: w(12),
            paddingHorizontal: w(16),
            backgroundColor: "#F4BC1E",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: w(99),
            position: "absolute",
            zIndex: 99,
            // Shadow for iOS
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 4.65,
            // Elevation for Android
            elevation: 8,
          },
          btnStyles && { ...(btnStyles as object) },
        ]}
      >
        {loading ? (
          <ActivityIndicator color={"white"} size={"small"} />
        ) : (
          <Image
            source={require("../../assets/icons/x.png")}
            style={{ height: 28, width: 28, transform: [{ rotate: "45deg" }] }}

            // style={{ transform: [{ rotate: "45deg" }] }}
          />
        )}
      </TouchableOpacity>
    </View>
  );
}
