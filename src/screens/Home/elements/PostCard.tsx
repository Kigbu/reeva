import React from "react";
import AppText from "components/widgets/Text";
import { w } from "core/utils/responsive";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { Post } from "data/app.data";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FileUpload from "core/models/file-upload.model";
import { Video, ResizeMode } from "expo-av";
import colors from "core/theme/colors";

interface PostCardProps {
  item: Post;
}

const imageMap: { [key: string]: any } = {
  "01": require("../../../assets/images/post/01.jpeg"),
  "02": require("../../../assets/images/post/02.png"),
  "03": require("../../../assets/images/post/03.jpeg"),
  "04": require("../../../assets/images/post/04.jpeg"),
};

export default function PostCard({ item }: PostCardProps) {
  const resolveImage = React.useCallback(
    (imageName: string) => imageMap[imageName],
    []
  );

  const videoRefs = React.useRef<{ [key: string]: any }>({});

  const setVideoRef = (key: string, ref: any) => {
    videoRefs.current[key] = ref;
  };

  return (
    <View
      style={{
        gap: w(12),
        paddingVertical: w(12),
        borderTopColor: "rgba(17, 16, 16, 0.03)",
        borderTopWidth: w(1),
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          gap: w(12),
        }}
      >
        <View style={{ paddingLeft: w(20) }}>
          <Image
            style={{ height: w(40), width: w(40) }}
            source={require("../../../assets/icons/account.png")}
          />
        </View>

        <View style={{ gap: w(12) }}>
          <View
            style={{
              width: "85%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{ gap: w(4), flexDirection: "row", alignItems: "center" }}
            >
              <AppText
                type="header"
                style={{
                  color: "#0F1419",
                  fontSize: w(15),
                  // fontFamily: family.Bold,
                  fontWeight: "800",
                  lineHeight: w(22),
                }}
              >
                {item?.userName}
              </AppText>
              <AppText
                type="header"
                style={{
                  color: "#0F1419",
                  fontSize: w(15),
                  // fontFamily: family.Bold,
                  fontWeight: "400",
                  lineHeight: w(15),
                }}
              >
                .
              </AppText>
              <AppText
                type="header"
                style={{
                  color: "#0F1419",
                  fontSize: w(15),
                  // fontFamily: family.Bold,
                  fontWeight: "400",
                  lineHeight: w(22),
                }}
              >
                {`${item?.readMins}mins`}
              </AppText>
            </View>

            <View
              style={{ gap: w(12), flexDirection: "row", alignItems: "center" }}
            >
              <View
                style={{
                  paddingVertical: w(4),
                  paddingHorizontal: w(6),
                  backgroundColor: "#F8D686",
                  borderRadius: w(4),
                  gap: w(4),
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ height: w(9.63), width: w(12) }}
                  source={require("../../../assets/images/logo-dark.png")}
                />
                <AppText
                  type="header"
                  style={{
                    color: "#0F1419",
                    fontSize: w(10),
                    // fontFamily: family.Bold,
                    fontWeight: "500",
                    lineHeight: w(10),
                  }}
                >
                  {item?.category}
                </AppText>
              </View>

              <View>
                <MaterialCommunityIcons name="dots-horizontal" size={24} />
              </View>
            </View>
          </View>
          <View style={{ width: "87%", marginTop: -w(8) }}>
            <AppText
              type="header"
              style={{
                color: "#0F1419",
                fontSize: w(15),
                // fontFamily: family.Bold,
                fontWeight: "400",
                lineHeight: w(22),
              }}
            >
              {item?.body}
            </AppText>
          </View>
        </View>
      </View>

      {/*  */}
      <View style={{ gap: w(12) }}>
        {item.images.length > 0 ? (
          <>
            {!item.isDymamic ? (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  gap: w(12),
                  paddingLeft: w(72),
                  paddingRight: w(20),
                }}
              >
                {item?.images?.map((image: string, i: number) => {
                  return (
                    <Image
                      key={i.toString()}
                      source={resolveImage(image)}
                      style={{
                        height: 334,
                        width: 298,
                        backgroundColor: "grey",
                        borderRadius: w(4.54),
                      }}
                    />
                  );
                })}
              </ScrollView>
            ) : (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  gap: w(12),
                  paddingLeft: w(72),
                  paddingRight: w(20),
                }}
              >
                {item?.images?.map((image: FileUpload, i: number) => {
                  if (image.type === "video")
                    return (
                      <View
                        key={i.toString()}
                        style={{ backgroundColor: colors.grey50 }}
                      >
                        <Video
                          ref={(ref) => setVideoRef(image.uri, ref)}
                          style={{
                            height: w(334),
                            width: w(298),
                            borderRadius: w(4.54),
                          }}
                          source={{
                            uri: image.uri,
                          }}
                          useNativeControls
                          resizeMode={ResizeMode.CONTAIN}
                          isLooping
                          onPlaybackStatusUpdate={(status) => {}}
                        />
                      </View>
                    );

                  return (
                    <View key={i.toString()} style={{}}>
                      <Image
                        source={{
                          uri: image.uri,
                        }}
                        style={{}}
                        height={334}
                        width={298}
                        borderRadius={w(4.54)}
                      />
                    </View>
                  );
                })}
              </ScrollView>
            )}
          </>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              gap: w(12),
              paddingLeft: w(72),
              paddingRight: w(20),
            }}
          >
            {[0, 0, 0]?.map((image: any, i: number) => {
              return (
                <View
                  key={i.toString()}
                  style={{
                    backgroundColor: colors.grey50,
                    height: w(334),
                    width: w(298),
                    borderRadius: w(4.54),
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    style={{ height: w(120), width: w(120), opacity: 0.3 }}
                    source={require("../../../assets/icons/image.png")}
                  />
                </View>
              );
            })}
          </ScrollView>
        )}

        <View
          style={{
            paddingLeft: w(72),
            flexDirection: "row",
            alignItems: "center",
            gap: w(24),
          }}
        >
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center", gap: w(4) }}
          >
            <Image
              style={{ height: w(17), width: w(17) }}
              source={require("../../../assets/icons/favorite.png")}
            />

            <AppText
              style={{
                color: "#0F1419",
                fontSize: w(12),
                // fontFamily: family.Bold,
                fontWeight: "400",
                lineHeight: w(15.67),
              }}
            >
              {item?.likes}
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center", gap: w(4) }}
          >
            <Image
              style={{ height: w(17), width: w(17) }}
              source={require("../../../assets/icons/chat.png")}
            />

            <AppText
              style={{
                color: "#0F1419",
                fontSize: w(12),
                // fontFamily: family.Bold,
                fontWeight: "400",
                lineHeight: w(15.67),
              }}
            >
              {item?.comments}
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center", gap: w(4) }}
          >
            <Image
              style={{ height: w(17), width: w(17) }}
              source={require("../../../assets/icons/bookmark.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
