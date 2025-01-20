import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import MyFAB from "components/Form/FAB";
import SafeAreaComp from "components/SafeAreaComp/SafeAreaComp";
import { ADD_POST } from "core/constants/screen-names";
import useRefresh from "core/hooks/useRefresh";
import { height } from "core/utils/dimensions";
import { w } from "core/utils/responsive";
import { FlatList, RefreshControl, TouchableOpacity, View } from "react-native";
import AppText from "components/widgets/Text";
import AdvertCards from "./elements/AdvertCards";
import PostCard from "./elements/PostCard";
import EmptyListComp from "components/EmptyListComp/EmptyListComp";
import usePost from "core/hooks/usePost";
import { L } from "core/utils/helpers";
import Creators from "./elements/Creators";

export default function Home() {
  const navigation = useNavigation<NativeStackNavigationProp<any, any>>();
  const { refreshing, onRefresh } = useRefresh([() => {}]);

  const { posts, setPosts } = usePost();

  React.useEffect(() => {}, []);

  L("posts ::", JSON.stringify(posts, null, 4));

  return (
    <>
      <SafeAreaComp
        refreshing={refreshing}
        noScrollView
        enableRefresh
        onRefresh={onRefresh}
        style={{ paddingTop: w(16), paddingHorizontal: w(0) }}
      >
        <View
          style={{
            paddingHorizontal: w(20),
            borderBottomColor: "rgba(0, 0, 0, 0.1)",
            borderBottomWidth: w(1),
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            style={{
              borderBottomWidth: w(3),
              borderBottomColor: "#F4BC1E",
              // paddingVertical: w(12),
              flexDirection: "row",
              width: w(64),
            }}
          >
            <AppText
              type="header"
              style={{
                color: "#111010",
                fontSize: w(17),
                // fontFamily: family.Bold,
                fontWeight: "800",
                lineHeight: w(22.1),
              }}
            >
              For You
            </AppText>
          </TouchableOpacity>
        </View>
        <View
          style={{
            minHeight: height,
            gap: w(32),
            // paddingHorizontal: w(24),
            paddingTop: w(16),
          }}
        >
          {/*  */}

          <FlatList
            data={posts}
            keyExtractor={(_, i) => i.toString()}
            onEndReachedThreshold={0.3}
            onEndReached={async () => {
              // await loadMoreOrders();
            }}
            ListHeaderComponent={() => (
              <View style={{ gap: w(24) }}>
                <AdvertCards />
                <Creators />
              </View>
            )}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            contentContainerStyle={{
              gap: w(20),
              paddingBottom: w(250),
            }}
            renderItem={({ item, index }) => {
              return (
                <View key={index.toString()} style={{}}>
                  <PostCard item={item} />
                </View>
              );
            }}
            ListEmptyComponent={() => <EmptyListComp />}
          />
        </View>
      </SafeAreaComp>

      <View style={{ position: "absolute", bottom: w(100), right: w(84) }}>
        <MyFAB
          disabled={false}
          onPress={() => {
            navigation.navigate(ADD_POST);
          }}
          loading={false}
        />
      </View>
    </>
  );
}
