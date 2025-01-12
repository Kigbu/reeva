import AppText from "components/widgets/Text";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { h, w } from "core/utils/responsive";

export const btnTypes = {
  WITH_TEXT: "btnWithTxt",
};

interface AppButtonProps {
  type?: String;
  children: any;
  disabled?: boolean;
  style?: any;
  onPress: any;
  testID?: string | undefined;
}

const AppButton = ({
  type,
  children,
  disabled = false,
  style = {},
  testID,
  onPress,
  ...btnProps
}: AppButtonProps) => {
  const bgColor = disabled ? "#6686FF" : "#3861FB";
  const txtColor = disabled ? "rgba(255,255,255,0.5)" : "#fff";

  if (type === btnTypes.WITH_TEXT) {
    return (
      <Pressable
        onPress={onPress}
        testID={testID}
        disabled={disabled}
        style={({ pressed }) => [
          {
            backgroundColor: bgColor,
            opacity: pressed ? 0.5 : 1,
          },
          styles.appBtn,
          { ...style },
        ]}
        {...btnProps}
      >
        <AppText type="btnText" style={{ color: txtColor }}>
          {children}
        </AppText>
      </Pressable>
    );
  }
  return (
    <Pressable
      onPress={onPress}
      testID={testID ? testID : ""}
      disabled={disabled}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.5 : 1,
        },

        { ...style },
      ]}
      {...btnProps}
    >
      {children}
    </Pressable>
  );
};
const styles = StyleSheet.create({
  appBtn: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 5,
    // paddingVertical: h(12),
    width: w(355),
    height: h(60),
  },
});
export default AppButton;
