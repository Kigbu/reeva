import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Platform,
  Image,
} from "react-native";
import colors from "core/theme/colors";
import { h, w } from "core/utils/responsive";

interface BottomTabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

const BottomTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  // const {accessToken, userInfo} = useAuthContext();

  return (
    <View
      style={{
        borderTopLeftRadius: w(20),
        borderTopRightRadius: w(20),
        borderTopWidth: w(1),
        borderColor: "#EAEAEA",
        overflow: "hidden",
        backgroundColor: "transparent",
      }}
    >
      <View
        style={{
          paddingVertical: w(16),
          paddingBottom: Platform.OS === "ios" ? w(24) : null,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          borderTopLeftRadius: w(18),
          borderTopRightRadius: w(18),
          overflow: "hidden",
          marginTop: -2,
        }}
      >
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const label =
            options.title !== undefined ? options.title : route.name;

          const isFocused = state.index === index;
          const icon = options.tabBarLabel;
          const authRequired = options?.authRequired;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({ name: route.name, merge: true });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          const itemColor = isFocused ? colors.primary700 : colors.grey300;

          let icon_link: any = "";
          if (icon === "home")
            icon_link = require(`../../assets/icons/home.png`);
          else if (icon === "sms")
            icon_link = require(`../../assets/icons/sms.png`);
          else if (icon === "search")
            icon_link = require(`../../assets/icons/search.png`);
          else if (icon === "notifications")
            icon_link = require(`../../assets/icons/notifications.png`);
          else if (icon === "account")
            icon_link = require(`../../assets/icons/account.png`);

          let icon_opacity = 1;

          if (icon !== "account") {
            icon_opacity = isFocused ? 1 : 0.5;
          }

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              key={index.toString()}
              style={{ flex: 1, alignItems: "center", gap: w(6) }}
            >
              {/* <CustomIcon
                type={"iconsax"}
                icon={icon}
                variant={isFocused ? "Bulk" : "Outline"}
                size={h(24)}
                color={itemColor}
              /> */}

              <Image
                source={icon_link}
                style={{ height: 24, width: 24, opacity: icon_opacity }}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default BottomTabBar;

const styles = StyleSheet.create({
  tabWrapper: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  addItemMenu: {
    backgroundColor: "#00D180",
    justifyContent: "center",
    alignItems: "center",
    height: h(48),
    width: h(48),
    borderRadius: h(20),
    top: -40,
  },
});
