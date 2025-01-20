import React from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { w } from "core/utils/responsive";
import colors from "core/theme/colors";
import FileUpload from "core/models/file-upload.model";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
// import { CloseCircle } from "iconsax-react-native";
import { L } from "core/utils/helpers";
import { Video, ResizeMode } from "expo-av";
import { useVideoPlayer, VideoView } from "expo-video";
import AppText from "./widgets/Text";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { EDIT_COVER } from "core/constants/screen-names";

interface AddMediaFilesProps {
  files: FileUpload[];
  setFiles: any;
  aspectRatio?: [number, number] | undefined;
}

export default function AddMediaFiles({
  files,
  setFiles,
  aspectRatio,
}: AddMediaFilesProps) {
  const navigation = useNavigation<NativeStackNavigationProp<any, any>>();
  const [maxAllowedFiles, setMaxAlloedFiles] = React.useState<number>(5);
  const videoRef = React.useRef<any>(null);

  const pickImage = async () => {
    let result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: aspectRatio,
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      await completePicker(result?.assets);
    }
  };

  const pickVideo = async () => {
    let result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["videos"],
      allowsEditing: true,
      aspect: aspectRatio,
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      await completePicker(result?.assets);
    }
  };

  const pickCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (permission.status !== "granted") {
      alert("Camera access is required to use this feature.");
      return;
    }

    let result: any = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: aspectRatio,
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      await completePicker(result?.assets);
    }
  };

  const removeImage = (name: string) => {
    let tempArr: FileUpload[] = [...files];

    tempArr = tempArr.filter((image: FileUpload) => image.name !== name);
    setFiles(tempArr);
  };

  const completePicker = async (assets: any[]) => {
    const selectedAssets: FileUpload[] =
      assets && assets.length > 0
        ? await Promise.all(
            assets.map(async (asset: any) => {
              const fileUpload = new FileUpload();

              const uniquesuffix =
                Date.now() + "-" + Math.round(Math.random() * 1e9);

              const fsRead = await FileSystem.readAsStringAsync(asset.uri, {
                encoding: "base64",
              });

              // L("asset type :>> ", JSON.stringify(asset.type, null, 4));

              // fileUpload.base64url = fsRead;
              // fileUpload.base64url = asset.base64;
              fileUpload.uri = asset.uri;
              fileUpload.name =
                uniquesuffix +
                asset.uri.substring(asset.uri.lastIndexOf("/") + 1);

              fileUpload.size = asset.fileSize || 0;
              fileUpload.type = asset.type || "unknown";
              if (asset.type === "video") fileUpload.duration = asset?.duration;

              return fileUpload;
            })
          )
        : [];

    // L("selectedAssets ::::: :>> ", JSON.stringify(selectedAssets, null, 4));
    setFiles((prev: FileUpload[]) => [...prev, ...selectedAssets]);
  };

  const purgeAppCache = async () => {
    try {
      const cacheDirectory: any = FileSystem.cacheDirectory;

      await FileSystem.deleteAsync(cacheDirectory);

      console.log("app cache purged...");
    } catch (error) {
      console.log(error);
    }
  };

  const media_actions = [
    {
      image: require("../assets/icons/video.png"),
      onPress: pickVideo,
    },
    {
      image: require("../assets/icons/camera.png"),
      onPress: pickCamera,
    },
    {
      image: require("../assets/icons/image.png"),
      onPress: pickImage,
    },
    {
      image: require("../assets/icons/mic.png"),
      onPress: () => {},
    },
  ];

  return (
    <View style={{ gap: w(16) }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: "row",
          alignItems: "center",
          gap: w(14),
          paddingVertical: w(8),
          paddingRight: w(40),
        }}
      >
        {files.map((file, i) => {
          if (file.type === "video")
            return (
              <View
                key={i.toString()}
                style={{
                  backgroundColor: colors.grey50,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Video
                  ref={videoRef}
                  style={{
                    height: w(157),
                    width: w(140),
                  }}
                  source={{
                    uri: file.uri,
                  }}
                  useNativeControls
                  resizeMode={ResizeMode.CONTAIN}
                  isLooping
                  onPlaybackStatusUpdate={(status) => {}}
                />

                {file.thumbnail && (
                  <View
                    style={{
                      position: "absolute",
                      left: w(8),
                      top: w(8),
                      borderWidth: w(2),
                      borderColor: "rgba(244, 188, 30, 1)",
                      borderRadius: w(4),
                    }}
                  >
                    <Image
                      source={{
                        uri: file.thumbnail,
                      }}
                      style={{}}
                      height={40}
                      width={40}
                    />
                  </View>
                )}

                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(EDIT_COVER, { uri: file.uri });
                  }}
                  style={{
                    backgroundColor: "rgba(17, 16, 16, 0.4)",
                    paddingVertical: w(5),
                    paddingHorizontal: w(8),
                    position: "absolute",
                    bottom: w(6),
                    width: "80%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <AppText
                    style={{
                      color: "rgba(255, 255, 255, 1)",
                      fontSize: w(11),
                      // fontFamily: family.Bold,
                      fontWeight: "500",
                      lineHeight: w(13),
                    }}
                  >
                    Edit Cover
                  </AppText>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    removeImage(file.name);
                  }}
                  style={{
                    position: "absolute",
                    right: -w(8),
                    top: -w(8),
                    backgroundColor: "rgba(17, 16, 16, 0.4)",
                    padding: w(4),
                    borderRadius: w(99),
                    height: w(24),
                    width: w(24),
                  }}
                >
                  {/* <CloseCircle
                    variant={"Bulk"}
                    color={colors.grey500}
                    size={w(24)}
                  /> */}
                  <Image
                    source={require("../assets/icons/x-w.png")}
                    style={{ height: 16, width: 16 }}

                    // style={{ transform: [{ rotate: "45deg" }] }}
                  />
                </TouchableOpacity>
              </View>
            );

          return (
            <View key={i.toString()} style={{}}>
              <Image
                source={{
                  uri: file.cloudfrontUrl || file.uri,
                }}
                style={{}}
                height={157}
                width={140}
                // borderRadius={w(20)}
              />
              <TouchableOpacity
                onPress={() => {
                  removeImage(file.name);
                }}
                style={{
                  position: "absolute",
                  right: -w(8),
                  top: -w(8),
                  backgroundColor: "rgba(17, 16, 16, 0.4)",
                  padding: w(4),
                  borderRadius: w(99),
                  height: w(24),
                  width: w(24),
                }}
              >
                {/* <CloseCircle
                    variant={"Bulk"}
                    color={colors.grey500}
                    size={w(24)}
                  /> */}
                <Image
                  source={require("../assets/icons/x-w.png")}
                  style={{ height: 16, width: 16 }}

                  // style={{ transform: [{ rotate: "45deg" }] }}
                />
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>

      {files.length < maxAllowedFiles && (
        <View
          style={{
            gap: w(10),
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: w(16),
          }}
        >
          {media_actions.map((action, i) => (
            <TouchableOpacity
              key={i.toString()}
              onPress={action.onPress}
              style={{
                height: w(40),
                width: w(40),
                borderRadius: w(99),
                backgroundColor: "#0A475112",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={{ height: w(20), width: w(20) }}
                source={action.image}
              />
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}
