import SafeAreaComp from "components/SafeAreaComp/SafeAreaComp";
import AppText from "components/widgets/Text";
import useRefresh from "core/hooks/useRefresh";
import { w } from "core/utils/responsive";
import React from "react";
import { View } from "react-native";

export default function Messages() {
  const { refreshing, onRefresh } = useRefresh([() => {}]);

  return (
    <SafeAreaComp
      refreshing={refreshing}
      enableRefresh
      onRefresh={onRefresh}
      addPaddingTop
      // style={{ paddingTop: w(16) }}
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
          Messages Screen
        </AppText>
      </View>
    </SafeAreaComp>
  );
}
