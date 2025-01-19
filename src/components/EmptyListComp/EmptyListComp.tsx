import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AppText from "components/widgets/Text";
import { Shop } from "iconsax-react-native";
import React from "react";
import { View } from "react-native";
import colors from "core/theme/colors";
import { w } from "core/utils/responsive";
import { ADD_POST } from "core/constants/screen-names";

export default function EmptyListComp({}) {
  const navigation = useNavigation<NativeStackNavigationProp<any, any>>();
  // const {accessToken, userInfo} = useAuthContext();

  return (
    <View
      style={{
        paddingVertical: w(115),
        paddingTop: w(76),
        paddingHorizontal: w(32),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: w(24),
        borderColor: colors.grey200,
        borderStyle: "dashed",
        borderWidth: w(1),
        width: "100%",
      }}
    >
      <View
        style={{
          gap: w(24),
        }}
      >
        <View
          style={{
            gap: w(16),
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              borderRadius: w(32),
              padding: w(28),
              backgroundColor: colors.grey50,
              alignItems: "center",
              justifyContent: "center",
              gap: w(16),
              width: w(80),
            }}
          >
            <Shop variant={"Broken"} size={w(24)} color={colors.grey300} />
          </View>

          <AppText
            style={{
              textAlign: "center",
              color: "#555",
              fontSize: w(12),
              lineHeight: w(18),
              fontWeight: "400",
            }}
          >
            {`No record found`}
          </AppText>
        </View>

        <AppText
          onPress={() => navigation.navigate(ADD_POST)}
          style={{
            textAlign: "center",
            color: colors.primary700,
            fontSize: w(12),
            lineHeight: w(12),
            fontWeight: "600",
          }}
        >
          Add Post
        </AppText>
      </View>
    </View>
  );
}
