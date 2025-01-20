import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import useCachedResources from "core/hooks/useCachedResources";
import AppContainer from "core/navigation/AppContainer";
import PostProvider from "core/store/providers/post-provider";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

export default function App() {
  const { isLoadingComplete } = useCachedResources();

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#fff",
    },
  };

  const toastConfig = {
    success: (props: any) => (
      <BaseToast
        {...props}
        style={{ minHeight: 80, borderLeftColor: "green" }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 17,
          fontWeight: "500",
        }}
        text1NumberOfLines={3}
      />
    ),
    error: (props: any) => (
      <ErrorToast
        {...props}
        style={{ minHeight: 80, borderLeftColor: "red" }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 17,
          fontWeight: "500",
        }}
        text2Style={{
          fontSize: 14,
        }}
        text1NumberOfLines={3}
      />
    ),
  };

  if (!isLoadingComplete) return null;

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={MyTheme}>
        <PostProvider>
          <AppContainer />
          <Toast config={toastConfig} />
        </PostProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
