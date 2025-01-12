import SafeAreaComp from "components/SafeAreaComp/SafeAreaComp";
import useRefresh from "core/hooks/useRefresh";
import { w } from "core/utils/responsive";
import React from "react";
import { View } from "react-native";

export default function Notifications() {
  const { refreshing, onRefresh } = useRefresh([() => {}]);

  return (
    <SafeAreaComp
      refreshing={refreshing}
      enableRefresh
      onRefresh={onRefresh}
      style={{ paddingTop: w(16) }}
    >
      <View style={{ gap: w(32) }}></View>
    </SafeAreaComp>
  );
}
