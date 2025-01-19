import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import AppContainer from "core/navigation/AppContainer";
import PostProvider from "core/store/providers/post-provider";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function App() {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#fff",
    },
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={MyTheme}>
        <PostProvider>
          <AppContainer />
          <Toast

          // config={toastConfig}
          />
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
