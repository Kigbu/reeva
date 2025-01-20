// import { useLayout } from "core/hooks";
import AppText from "components/widgets/Text";
import { SelectItem } from "core/interfaces/select-item.interface";
import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "core/theme/colors";
import { w } from "core/utils/responsive";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";

interface SelectModalProps {
  visible: boolean;
  onDismiss: any;
  onChange: any;
  options: SelectItem[];
  label: string;
}

const SelectModal: React.FC<SelectModalProps> = React.memo(
  ({ visible, onDismiss, options, label, onChange }: SelectModalProps) => {
    // const styles = useStyleSheet(themedStyles);
    return (
      <Modal
        isVisible={visible}
        animationIn="slideInUp"
        avoidKeyboard={true}
        // transparent={true}
        // onBackdropPress={onDismiss}
        // backdropStyle={styles.backdrop}
        style={styles.modalWrapper}
      >
        <View style={[styles.modalHeader, { marginBottom: 10 }]}>
          <View style={styles.titleWrapper}>
            <AppText style={{ fontSize: w(16), color: "#3D3D3D" }}>
              {label}
            </AppText>
          </View>
          <TouchableOpacity onPress={onDismiss}>
            {/* <Ionicons
              variant={"close"}
              style={{ color: colors.grey800 }}
              size={24}
            /> */}
            <Image
              source={require("../../../assets/icons/x.png")}
              style={{ height: 28, width: 28 }}

              // style={{ transform: [{ rotate: "45deg" }] }}
            />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.modalBody}>
            {options &&
              options.map((option, index) => (
                <TouchableOpacity
                  style={styles.option}
                  key={option.value}
                  onPress={() => {
                    onChange(option.value);
                    onDismiss();
                  }}
                >
                  <AppText style={{ color: "#3D3D3D" }}>{option.label}</AppText>
                </TouchableOpacity>
              ))}
            {(!options || options.length === 0) && (
              <AppText
                style={{ color: "#3D3D3D", textAlign: "center", fontSize: 14 }}
              >
                No item to select
              </AppText>
            )}
          </View>
        </ScrollView>
      </Modal>
    );
  }
);

export default SelectModal;

const styles = StyleSheet.create({
  modalWrapper: {
    backgroundColor: "white",
    // width: width,
    // height: height * 0.8,
    // marginTop: height * 0.15,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    // paddingHorizontal: w(24),
    // paddingVertical: 4,
    // paddingBottom: w(24),
    // bottom: -(wi * 0.2),
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "grey",
    paddingVertical: 16,
  },
  icon: {
    width: w(16),
    height: w(16),
    tintColor: "text-basic-color",
  },
  modalBody: {
    paddingBottom: 8,
  },
  titleWrapper: {
    width: 250,
  },
  option: {
    paddingVertical: 12,
  },
});
