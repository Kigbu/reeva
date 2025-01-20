import { NavigatorScreenParams } from "@react-navigation/native";

export type AppStackParamList = {
  LoadingScreen: undefined;
  MyTabs: NavigatorScreenParams<ButtomTabStackParamList> | undefined;
  AlertBox: undefined;
  AddPost: undefined;
  EditCover: undefined;
};

export type ButtomTabStackParamList = {
  Home: undefined;
  Account: undefined;
  Messages: undefined;
  Notifications: undefined;
  Search: undefined;
};
