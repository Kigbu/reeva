import React from "react";
import SafeAreaComp from "components/SafeAreaComp/SafeAreaComp";
import {
  Animated,
  Image,
  Keyboard,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { height } from "core/utils/dimensions";
import { h, w } from "core/utils/responsive";
import AppText from "components/widgets/Text";
import { useForm } from "react-hook-form";
import AppTextInput from "components/Form/TextInput";
import FormSelectInput from "components/Form/FormSelectInput";
import { MaterialIcons } from "@expo/vector-icons";
import { KeyboardAccessoryView } from "react-native-keyboard-accessory";
import AddMediaFiles from "components/AddMediaFiles";
import usePost from "core/hooks/usePost";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  getRandomDoubleDigits,
  getRandomSingleDigit,
  showToast,
} from "core/utils/helpers";
import {
  ERROR,
  MAX_IMAGES,
  NO_IMAGE,
  REMOVE_IMG_TRY_AGAIN,
  SELECT_IMG,
  SUCCESS,
} from "core/constants/strings";
import { Post } from "data/app.data";
import { MY_TABS } from "core/constants/screen-names";

export default function AddPost() {
  const route: any = useRoute();
  const navigation = useNavigation<NativeStackNavigationProp<any, any>>();
  // const { control, handleSubmit, setValue, watch } = useForm<any>({
  //   mode: "onChange",
  //   defaultValues: {
  //     body: "",
  //     category: null,
  //   },
  // });

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

  React.useEffect(() => {
    navigation.setParams({ onPostPress: () => handleSubmit(onSubmit)() });
  }, [navigation]);

  const onSubmit = (data: any) => {
    // Handle form submission logic here
    // console.log("Post submitted:", data);

    if (files.length == 0) {
      showToast(ERROR, () => {}, NO_IMAGE, SELECT_IMG);
      return;
    }

    if (files.length > 5) {
      showToast(ERROR, () => {}, MAX_IMAGES, REMOVE_IMG_TRY_AGAIN);
      return;
    }

    const post_data = {
      userName: "@Fvivian",
      readMins: getRandomSingleDigit(),
      category: data.category,
      body: data.body,
      likes: getRandomDoubleDigits(),
      comments: getRandomDoubleDigits(),
      images: [...files],
      isDymamic: true,
    };

    setPosts((prev: Post[]) => [post_data, ...prev]);

    showToast(
      SUCCESS,
      () => {
        navigation.navigate(MY_TABS);
      },
      "Post added successfully",
      "You will be redirected in 3 sec"
    );

    reset({ body: "", category: null });
    setFiles([]);
  };

  return (
    <SafeAreaComp
      refreshing={false}
      style={{ paddingTop: w(0), paddingHorizontal: w(20) }}
    >
      <View style={{ minHeight: height }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingVertical: w(16),
          }}
        >
          <View
            style={{ flexDirection: "row", alignItems: "center", gap: w(6) }}
          >
            <Image
              style={{ height: w(32), width: w(32) }}
              source={require("../../assets/icons/account.png")}
            />

            <AppText
              // type="header"
              style={{
                color: "#0F1419",
                fontSize: w(14),
                // fontFamily: family.Bold,
                fontWeight: "500",
                lineHeight: w(18),
              }}
            >
              @Fvivian
            </AppText>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              // width: "55%",
            }}
          >
            <Image
              style={{ height: w(28), width: w(28) }}
              source={require("../../assets/icons/crown.png")}
            />
            <View style={{}}>
              <FormSelectInput
                control={control}
                name={"category"}
                placeholder={"Select category tag"}
                setValue={setValue}
                options={[
                  { label: "Fittness", value: "Fittness" },
                  { label: "Music", value: "Music" },
                  { label: "Food", value: "Food" },
                  { label: "Science", value: "Science" },
                ]}
                rules={{
                  required: "Category is required",
                }}
              />
            </View>
          </View>
        </View>

        <View style={{ gap: w(16) }}>
          <View>
            <AppTextInput
              name={"body"}
              control={control}
              placeholder={"Enter text"}
              rules={{
                required: "Body is required",
                maxLength: {
                  value: 500,
                  message: "Max length of 500 exceeded",
                },
              }}
              multiline={true}

              // inputAccessoryViewID={inputAccessoryViewID}
            />
          </View>

          <AddMediaFiles files={files} setFiles={setFiles} />
        </View>
      </View>

      {/* <KeyboardAccessoryView style={{}}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            padding: 10,
            backgroundColor: "#f5f5f5",
            borderTopWidth: 1,
            borderTopColor: "#ddd",
          }}
        >
          <TouchableOpacity
            style={{
              alignItems: "center",
            }}
          >
            <MaterialIcons name="camera-alt" size={24} color="black" />
            <Text>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignItems: "center",
            }}
          >
            <MaterialIcons name="image" size={24} color="black" />
            <Text>Image</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignItems: "center",
            }}
          >
            <MaterialIcons name="video-library" size={24} color="black" />
            <Text>Video</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAccessoryView> */}
    </SafeAreaComp>
  );
}
