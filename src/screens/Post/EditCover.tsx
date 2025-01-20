import React from "react";
import SafeAreaComp from "components/SafeAreaComp/SafeAreaComp";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { height } from "core/utils/dimensions";
import { w } from "core/utils/responsive";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import usePost from "core/hooks/usePost";
import FileUpload from "core/models/file-upload.model";
import { Video, ResizeMode } from "expo-av";
import * as VideoThumbnails from "expo-video-thumbnails";
import AppText from "components/widgets/Text";

export default function EditCover() {
  const route: any = useRoute();
  const navigation = useNavigation<NativeStackNavigationProp<any, any>>();

  const {
    files,
    setFiles,
    setPosts,
    control,
    isValid,
    handleSubmit,
    reset,
    setValue,
    watch,
  } = usePost();

  const [loading, setLoading] = React.useState<boolean>(false);
  const [file, setFile] = React.useState<FileUpload>(new FileUpload(null));
  const [thumbnail, setThumbnail] = React.useState<string>("");
  const [position, setPosition] = React.useState(0);
  const [thumbnails, setThumbnails] = React.useState<string[]>([]);

  const videoRef = React.useRef<any>(null);

  const fileUri: string = route?.params?.uri;

  React.useEffect(() => {
    if (fileUri) getFile();
  }, [fileUri]);

  React.useEffect(() => {
    navigation.setParams({
      onPostPress: () => saveThumbnail(fileUri, thumbnails, position),
    });
  }, [fileUri, thumbnails, position, navigation]);

  const getFile = async () => {
    const _file = files && files.find((x: FileUpload) => x.uri === fileUri);
    setFile(_file);
    await generateThumbnails(_file);
    setLoading(false);
  };

  const saveThumbnail = (
    fileUri: string,
    thumbnails: string[],
    position: number
  ) => {
    if (!fileUri || !thumbnails.length) return;
    console.log("Thumbnail updated called", "called");

    // Get the selected thumbnail based on the current position
    const selectedThumbnail = thumbnails[position];

    // Update the file object with the new thumbnail
    const _file = files && files.find((x: FileUpload) => x.uri === fileUri);
    const updatedFile = { ..._file, thumbnail: selectedThumbnail };

    // Update the files array with the new file object
    const updatedFiles = files.map((f: FileUpload) =>
      f.uri === file.uri ? updatedFile : f
    );

    setFiles(updatedFiles);
    setFile(updatedFile);

    navigation.goBack();

    console.log("Thumbnail updated successfully", updatedFile);
  };

  const generateThumbnails = async (file: FileUpload) => {
    const duration = file.duration / 1000; // Assume video is 30 seconds long
    const thumbnailPromises = [];

    for (let sec = 0; sec < duration; sec++) {
      thumbnailPromises.push(
        VideoThumbnails.getThumbnailAsync(file.uri, {
          time: sec * 1000, // Convert seconds to milliseconds
        })
      );
    }

    try {
      const results = await Promise.all(thumbnailPromises);
      setThumbnails(results.map((result) => result.uri));
    } catch (e) {
      console.warn("Error generating thumbnails:", e);
    }
  };

  const generateThumbnail = async () => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(
        "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
        {
          time: 15000,
        }
      );
      setThumbnail(uri);
    } catch (e) {
      console.warn(e);
    }
  };

  const handleSeek = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.setPositionAsync(seconds * 1000);
      setPosition(seconds);
    }
  };

  const captureThumbnail = async () => {
    console.log(`Capturing thumbnail at ${position} seconds`);
    // In actual implementation, use expo-screen-capture or FFmpeg
  };

  console.log("file :>> ", file);

  return !loading && file.uri ? (
    <SafeAreaComp
      refreshing={false}
      // noScrollView
      style={{ paddingTop: w(0), paddingHorizontal: w(20) }}
    >
      <View style={{ minHeight: height, gap: w(24), flex: 1 }}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            // backgroundColor: "grey",
          }}
        >
          <Video
            ref={videoRef}
            style={{
              height: w(height * 0.5),
              width: w(302),
            }}
            source={{
              uri: file.uri,
            }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            onPlaybackStatusUpdate={(status) => {}}
          />
        </View>

        <View>
          <ScrollView
            horizontal
            style={{ margin: 0, padding: 0 }}
            contentContainerStyle={styles.scrollContent}
            showsHorizontalScrollIndicator={false}
          >
            {thumbnails.length > 0 ? (
              thumbnails.map((thumbnail, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleSeek(index)}
                  style={styles.thumbnailContainer}
                >
                  <Image source={{ uri: thumbnail }} style={styles.thumbnail} />
                  <Text style={styles.timeLabel}>{index}s</Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text>Loading thumbnails...</Text>
            )}
          </ScrollView>
        </View>

        <View style={{}}>
          <TouchableOpacity
            style={{
              borderRadius: w(8),
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(10, 71, 81, 0.05)",
              padding: w(12),
              borderWidth: w(1),
              borderStyle: "dashed",
              borderColor: "rgb(10, 71, 81)",
              gap: w(8),
            }}
          >
            {/* <Add variant={`Linear`} size={24} color="rgb(10, 71, 81)" /> */}
            <Image
              source={require("../../assets/icons/x.png")}
              style={{
                height: 20,
                width: 20,
                transform: [{ rotate: "45deg" }],
              }}

              // style={{ transform: [{ rotate: "45deg" }] }}
            />
            <AppText
              style={{
                color: "rgb(10, 71, 81)",
                fontSize: w(14),
                // fontFamily: family.Bold,
                fontWeight: "400",
                lineHeight: w(15),
              }}
            >
              Import from camera roll
            </AppText>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaComp>
  ) : (
    <></>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  video: { width: "100%", height: 300 },
  scrollContainer: { marginVertical: 20 },
  scrollContent: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "blue",
    // height: w(height * 0.13),
  },
  // scrollContent: { flexDirection: "row", alignItems: "center" },
  thumbnailContainer: {},
  thumbnail: {
    width: 80,
    height: 60,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 0,
  },
  timeLabel: {
    marginTop: 5,
    fontSize: 12,
    color: "#333",
  },
  timeMarker: {
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
  },
  button: {
    backgroundColor: "blue",
    padding: 15,
    alignItems: "center",
    borderRadius: 10,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
