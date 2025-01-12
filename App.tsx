import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import AppContainer from "core/navigation/AppContainer";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  const _config = {
    screens: {
      NewPassword: "restorePassword",
      EmailVerified: "verifyEmail",
    },
  };

  const linking = {
    prefixes: [
      "aibanc://",
      "https://www.mydinki.com",
      "https://mydinki.com",
      "http://www.mydinki.com",
    ],
    _config,
  };

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#fff",
    },
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer linking={linking} theme={MyTheme}>
        <AppContainer />
      </NavigationContainer>

      {/* <StatusBar style="auto" /> */}
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
