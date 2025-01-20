import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as React from "react";

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          "Avenir-Black": require("../../assets/fonts/AvenirLTStd-Black.otf"),
          "Avenir-Heavy": require("../../assets/fonts/AvenirLTStd-Heavy.otf"),
          // "Avenir-Bold": require("../../assets/fonts/Montserrat-Bold.otf"),
          "Avenir-Medium": require("../../assets/fonts/AvenirLTStd-Medium.otf"),
          "Avenir-Regular": require("../../assets/fonts/AvenirLTStd-Book.otf"),
          "Avenir-Light": require("../../assets/fonts/AvenirLTStd-Light.otf"),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return { isLoadingComplete };
}
