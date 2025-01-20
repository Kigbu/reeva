import React from "react";
import SafeAreaComp from "components/SafeAreaComp/SafeAreaComp";
import useRefresh from "core/hooks/useRefresh";
import { w } from "core/utils/responsive";
import { View } from "react-native";
import AppText from "components/widgets/Text";

export default function Account() {
  const { refreshing, onRefresh } = useRefresh([() => {}]);

  return (
    <SafeAreaComp
      refreshing={false}
      enableRefresh
      onRefresh={onRefresh}
      addPaddingTop
    >
      <View style={{ gap: w(32) }}>
        <AppText
          // type="header"
          style={{
            color: "#111010",
            fontSize: w(17),
            // fontFamily: family.Bold,
            fontWeight: "800",
            lineHeight: w(22.1),
          }}
        >
          Account Screen
        </AppText>
      </View>
    </SafeAreaComp>
  );
}
