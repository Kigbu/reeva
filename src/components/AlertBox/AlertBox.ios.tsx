import React from "react";
import AppButton from "components/Form/AppButton";
import SafeAreaComp from "components/SafeAreaComp/SafeAreaComp";
import AppText from "components/widgets/Text";
import { alertVariants } from "core/constants/types";

import { Image, Modal, StyleSheet, View } from "react-native";
import { family } from "core/theme";
import { h, w } from "core/utils/responsive";
// import useAuthContext from 'core/hooks/useAuthContext';
import BottomSheetComp from "components/widgets/BottomSheetComp";
import { useNavigation, useRoute } from "@react-navigation/native";

const AlertBoxIOS = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  // const {autoLogOutUser} = useAuthContext();

  const alertBoxRef = React.useRef();

  const type = route?.params?.type;
  const variant = route?.params?.variant;

  const msg = route?.params?.msg;
  const dismissable = route?.params?.dismissable ?? true;
  const mainTxt = route?.params?.mainTxt;
  const mainBtnTxt = route?.params?.mainBtnTxt;
  const subBtnTxt = route?.params?.subBtnTxt;
  const mainBtnAction = route?.params?.mainBtnAction;
  const subBtnAction = route?.params?.subBtnAction;
  const nextScreen = route?.params?.nextScreen;
  const subTxt = route?.params?.subTxt;
  const autoLogOut = route?.params?.autoLogOut;

  const snapPoints = React.useMemo(() => ["100%"], []);

  const closeAlert = () => {
    if (dismissable) {
      nextScreen ? navigation.navigate(nextScreen) : navigation.goBack();
    }
  };

  const handleMainAction = () => {
    if (mainBtnAction) {
      mainBtnAction === "SignIn"
        ? navigation.navigate("Onboarding")
        : mainBtnAction === "ResetPassword"
        ? navigation.reset({
            index: 0,
            routes: [{ name: "ResetPassword" }],
          })
        : navigation.navigate(mainBtnAction);
    } else {
      closeAlert();
    }
  };

  const imgSrc =
    variant === alertVariants.INFO
      ? require("assets/images/info.png")
      : require("assets/images/error.png");

  const renderBtns = () => {
    if (mainBtnAction === "SignIn") {
      return (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: h(30),
            alignItems: "center",
          }}
        >
          <AppButton
            style={{
              width: w(100),
              height: h(40),
              backgroundColor: "#377DFF",
              borderRadius: w(4),
              justifyContent: "center",
              alignItems: "center",
              marginRight: w(27),
            }}
            onPress={handleMainAction}
          >
            <AppText
              style={{
                fontFamily: family.Medium,
                fontSize: h(14),
                color: "#fff",
              }}
            >
              {mainBtnTxt}
            </AppText>
          </AppButton>
          <AppButton
            style={{
              width: w(100),
              height: h(40),
              backgroundColor: "#DFEAFD",
              borderRadius: w(4),
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={closeAlert}
          >
            <AppText
              style={{
                fontFamily: family.Medium,
                fontSize: h(14),
                color: "#84A0D4",
              }}
            >
              {subBtnTxt}
            </AppText>
          </AppButton>
        </View>
      );
    } else {
      return (
        <>
          <AppButton style={styles.promptMainBtn} onPress={handleMainAction}>
            <AppText style={styles.promptMainBtnTxt}>
              {mainBtnTxt ? mainBtnTxt : "Cancel"}
            </AppText>
          </AppButton>
          {subBtnTxt ? (
            <AppText style={styles.promptSubBtnText} onPress={closeAlert}>
              {subBtnTxt}
            </AppText>
          ) : null}
        </>
      );
    }
  };

  React.useEffect(() => {
    if (autoLogOut) {
      navigation.goBack();
      // autoLogOutUser();
      return;
    }
    const timeoutId = setTimeout(
      () => {
        closeAlert();
      },
      type === "longError" ? 15000 : 15000
    );

    return () => clearTimeout(timeoutId);
  }, []);

  if (autoLogOut) {
    return (
      <SafeAreaComp
        refreshing={false}
        statusBarStyle="light-content"
        style={styles.centeredView}
      >
        <></>
      </SafeAreaComp>
    );
  }
  return (
    <SafeAreaComp
      refreshing={false}
      statusBarStyle="light-content"
      style={{
        ...styles.centeredView,

        backgroundColor: "rgba(132, 138, 163, 0.42)",
      }}
    >
      <BottomSheetComp
        innerRef={alertBoxRef}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={{
          ...styles.centeredView,

          backgroundColor: "rgba(132, 138, 163, 0.42)",
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.promptView}>
            <View style={styles.promptImgView}>
              <Image source={imgSrc} style={styles.promptImgViewImg} />
            </View>
            <AppText
              style={{
                ...styles.promptMainText,
                marginTop: mainTxt ? h(17) : 0,
              }}
            >
              {mainTxt ? mainTxt : ""}
            </AppText>
            <AppText style={styles.promptSubText}>
              {subTxt ? subTxt : msg}
            </AppText>
            {renderBtns()}
          </View>
        </View>
      </BottomSheetComp>

      {/* </Modal> */}
    </SafeAreaComp>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: w(327),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalSubView: {
    width: "90%",
    paddingTop: h(16),
    paddingBottom: h(16),
  },
  modalHeadingContainer: {
    flexDirection: "row",
    marginBottom: h(10),
  },
  modalParagraphContainer: {
    width: w(216),
    alignSelf: "center",
  },

  promptView: {
    width: w(339),
    // justifyContent: 'center',
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: w(9),

    paddingHorizontal: w(34),
    paddingVertical: h(36),
  },

  promptImgView: { height: h(50), width: w(50) },
  promptImgViewImg: { height: h(50), width: w(50), resizeMode: "contain" },
  promptMainText: {
    color: "#1C1939",
    fontFamily: family.SemiBold,
    fontSize: h(18),
    lineHeight: h(20),
    marginTop: h(17),
    marginBottom: h(7),
    textAlign: "center",
  },
  promptSubText: {
    color: "#001533",
    fontFamily: family.Regular,
    fontSize: h(15),
    lineHeight: h(24),
    textAlign: "center",
    marginBottom: h(27),
  },
  promptMainBtn: {
    backgroundColor: "#3861FB",
    fontFamily: family.Medium,
    justifyContent: "center",
    alignItems: "center",
    width: w(248),
    height: h(50),
    borderRadius: w(5),
  },
  promptMainBtnTxt: {
    color: "#fff",
    fontFamily: family.Medium,
    fontSize: h(14),

    textAlign: "center",
  },
  promptSubBtnText: {
    color: "#3861FB",
    fontFamily: family.Medium,
    fontSize: h(15),
    lineHeight: h(25),
    textAlign: "center",
    marginTop: h(10),
    textDecorationLine: "underline",
    textDecorationColor: "#3861FB",
  },
});

export default AlertBoxIOS;
