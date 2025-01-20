import AppText from "components/widgets/Text";
import { w } from "core/utils/responsive";
import React from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";

export default function Creators() {
  const advert_card = [
    {
      imgUrl: require("../../../assets/images/post/03.jpeg"),
    },
    {
      imgUrl: require("../../../assets/images/post/01.jpeg"),
    },
    {
      imgUrl: require("../../../assets/images/post/04.jpeg"),
    },
    {
      imgUrl: require("../../../assets/images/post/02.png"),
    },
  ];

  return (
    <View style={{ gap: w(12) }}>
      <View
        style={{
          paddingHorizontal: w(20),
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <AppText
          style={{
            color: "#0F1419",
            fontSize: w(14),
            // fontFamily: family.Bold,
            fontWeight: "800",
            lineHeight: w(16),
          }}
        >
          Creators for you
        </AppText>

        <TouchableOpacity>
          <AppText
            style={{
              color: "#0F1419",
              fontSize: w(12),
              // fontFamily: family.Bold,
              fontWeight: "500",
              lineHeight: w(14),
            }}
          >
            See more
          </AppText>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: w(8), paddingHorizontal: w(20) }}
      >
        {advert_card.map((ad, i) => (
          <View key={i.toString()} style={{}}>
            <Image
              source={ad.imgUrl}
              style={{ width: w(170), height: w(247), borderRadius: w(6) }}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
