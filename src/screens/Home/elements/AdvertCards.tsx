import { w } from "core/utils/responsive";
import React from "react";
import { Image, ScrollView, View } from "react-native";

export default function AdvertCards() {
  const advert_card = [
    {
      imgUrl: require("../../../assets/images/ad-01.png"),
    },
    {
      imgUrl: require("../../../assets/images/ad-01.png"),
    },
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: w(8), paddingHorizontal: w(20) }}
    >
      {advert_card.map((ad, i) => (
        <View key={i.toString()} style={{}}>
          <Image source={ad.imgUrl} style={{ width: 326.09, height: 123 }} />
        </View>
      ))}
    </ScrollView>
  );
}
