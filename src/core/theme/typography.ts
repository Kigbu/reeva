import { Platform } from "react-native";

/*
Available font weights

300 Light
400 Regular
500 Medium
600 SemiBold
700 Bold
*/

export const family = {
  Bold: Platform.select({
    ios: "Avenir-Black", // The font family name
    android: "Avenir-Black", // The file name
  }),
  Regular: Platform.select({
    ios: "Avenir-Regular", // The font family name
    android: "Avenir-Regular", // The file name
  }),
  Light: Platform.select({
    ios: "Avenir-Light", // The font family name
    android: "Avenir-Light", // The file name
  }),
  ExtraBold: Platform.select({
    ios: "Avenir-Heavy", // The font family name
    android: "HKNova-Heavy", // The file name
  }),
  Medium: Platform.select({
    ios: "Avenir-Medium", // The font family name
    android: "Avenir-Medium", // The file name
  }),
};
