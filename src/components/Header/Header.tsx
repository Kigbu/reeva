import React from "react";

import { Image, Platform, StatusBar, TouchableOpacity } from "react-native";
import { h, w } from "core/utils/responsive";
import { View } from "react-native";
import colors from "core/theme/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AppText from "components/widgets/Text";
import { Ionicons } from "@expo/vector-icons";
import MyAppButton from "components/Form/AppButton";
import usePost from "core/hooks/usePost";

const statusBarHeight = Platform.OS === "android" ? StatusBar.currentHeight : 0;

interface HeaderProps {
  main?: boolean;
  semiMain?: boolean;
  hasBackBtn?: any;
  route: any;
  options: any;
  navigation: any;
  hasBottomBorder?: any;
  more?: boolean;
  onMorePress?: any;
  bgColor?: string;
  onPostPress?: any;
  buttonLabel?: string;
}

const Header: React.FC<HeaderProps> = ({
  main,
  semiMain,
  route,
  options,
  navigation,
  hasBottomBorder,
  more,
  onMorePress,
  bgColor,
  onPostPress,
  buttonLabel,
}: HeaderProps) => {
  const { files, isValid, handleSubmit } = usePost();

  const insets = useSafeAreaInsets();

  // Ensure we respect the top inset on iOS devices with a notch
  const safeAreaStyle =
    Platform.OS === "ios" ? { paddingTop: insets.top + w(16) } : {};

  const isFormValid = () => {
    if (files.length > 0 && isValid) return true;

    return false;
  };

  return (
    <>
      {Platform.OS === "ios" && (
        <View
          style={{
            width: "100%",
            paddingTop: insets.top,
            backgroundColor: bgColor ? bgColor : "white",
          }}
        />
      )}

      <View
        style={[
          {
            height: h(56),
            paddingHorizontal: w(20),
            justifyContent: main ? "space-between" : "space-between",
            alignItems: "center",
            flexDirection: "row",
            paddingVertical: h(15),
            backgroundColor: bgColor ? bgColor : "white",
            borderBottomWidth: hasBottomBorder === true ? 1 : 0,
            borderBottomColor: "rgba(226, 232, 240, 1)",
            gap: !main ? w(8) : w(16),
          },
        ]}
      >
        {main && (
          <TouchableOpacity
            style={{
              padding: w(2),
            }}
          >
            {/* <Profile variant={"Bulk"} color={"#000000"} size={w(20)} /> */}
            <Image
              style={{ height: w(24), width: w(24) }}
              source={require("../../assets/icons/sort.png")}
            />
          </TouchableOpacity>
        )}

        {main && (
          <View style={{}}>
            <Image
              style={{ height: w(27), width: w(33.63) }}
              source={require("../../assets/icons/logo.png")}
            />
          </View>
        )}

        {main && (
          <TouchableOpacity style={{ flexDirection: "row", gap: w(20) }}>
            <Image
              style={{ height: w(24), width: w(24) }}
              source={require("../../assets/icons/instant_mix.png")}
            />
          </TouchableOpacity>
        )}

        {!main && (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => navigation.goBack()}
          >
            {/* <Ionicons
              name={"add"}
              size={w(24)}
              color={!bgColor ? "#666666" : "white"}
              style={{ transform: [{ rotate: "45deg" }] }}
            /> */}

            <Image
              source={require("../../assets/icons/x.png")}
              style={{ height: 28, width: 28 }}

              // style={{ transform: [{ rotate: "45deg" }] }}
            />
          </TouchableOpacity>
        )}

        {!main && (
          <>
            <AppText
              style={{
                // fontFamily: family.ExtraBold,
                fontWeight: "800",
                fontSize: w(18),
                lineHeight: w(25.2),
                color: !bgColor ? colors.grey950 : "white",
              }}
            >
              {options.title
                ? options.title
                : route.params?.ScreenTitle
                ? route.params?.ScreenTitle
                : route.name}
            </AppText>
          </>
        )}

        {!main && (
          <View style={{ height: w(35), width: w(70) }}>
            <MyAppButton
              buttonVariant={"solid"}
              label={buttonLabel ? buttonLabel : `Post`}
              // disabled={!isValid}
              onPress={onPostPress}
            />
          </View>
        )}
      </View>
    </>
  );
};

export default Header;
