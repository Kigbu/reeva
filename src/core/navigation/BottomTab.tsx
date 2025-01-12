import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BottomTabBar from "components/BottomTabBar/BottomTabBar";
import Header from "components/Header/Header";
import {
  ACCOUNT_SCREEN,
  MESSAGES_SCREEN,
  NOTIFICATIONS_SCREEN,
  SEARCH_SCREEN,
} from "core/constants/screen-names";
import { ButtomTabStackParamList } from "./types";
import Home from "screens/Home/Home";
import Account from "screens/Account/Account";
import Messages from "screens/Messages/Messages";
import Notifications from "screens/Notifications/Notifications";
import Search from "screens/Search/Search";

const Stack = createBottomTabNavigator<ButtomTabStackParamList>();

export default function BottomTab() {
  return (
    <Stack.Navigator
      initialRouteName={"Home"}
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props: any) => <BottomTabBar {...props} />}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: "Home",
          tabBarLabel: "home",
          headerShown: true,
          header: ({ navigation, route, options }) => (
            <Header
              navigation={navigation}
              main
              route={route}
              options={options}
            />
          ),
        }}
      />

      <Stack.Screen
        name={SEARCH_SCREEN}
        component={Search}
        options={{ title: "Search", tabBarLabel: "search" }}
      />

      <Stack.Screen
        name={NOTIFICATIONS_SCREEN}
        component={Notifications}
        options={{ title: "Notifications", tabBarLabel: "notifications" }}
      />

      <Stack.Screen
        name={MESSAGES_SCREEN}
        component={Messages}
        options={{ title: "Messages", tabBarLabel: "sms" }}
      />

      <Stack.Screen
        name={ACCOUNT_SCREEN}
        component={Account}
        options={{ title: "Account", tabBarLabel: "account" }}
      />
    </Stack.Navigator>
  );
}
