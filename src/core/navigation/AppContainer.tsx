import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { AppStackParamList } from "./types";
import Header from "components/Header/Header";
import { MY_TABS } from "core/constants/screen-names";
import AlertBox from "components/AlertBox";
import BottomTab from "./BottomTab";

const defaultHeaderOptions = {
  headerShown: true,
  header: ({ navigation, route, options }: any) => (
    <Header
      navigation={navigation}
      route={route}
      options={options}
      hasBackBtn
    />
  ),
};

const Stack = createNativeStackNavigator<AppStackParamList>();

export default function AppContainer() {
  return (
    <Stack.Navigator
      // id={navigatorId.MAIN_APP_STACK}
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={MY_TABS}
    >
      {/* <Stack.Screen name="LoadingScreen" component={LoadingScreen} /> */}
      <Stack.Screen name={MY_TABS} component={BottomTab} />
      <Stack.Screen
        name="AlertBox"
        component={AlertBox}
        options={{
          presentation: "transparentModal",
        }}
      />
      {/* <Stack.Screen
      name={ADD_OUTFIT}
      component={AddOutfit}
      options={{
        ...defaultHeaderOptions,
        title: ' ',
      }}
    /> */}
    </Stack.Navigator>
  );
}
