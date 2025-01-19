import React from "react";
import { Controller } from "react-hook-form";
import {
  DimensionValue,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SelectItem } from "core/interfaces/select-item.interface";
import { w } from "core/utils/responsive";
import SelectModal from "./elements/SelectModal";
import AppText from "components/widgets/Text";
import { ArrowDown2 } from "iconsax-react-native";
import colors from "core/theme/colors";

interface FormSelectInputProps {
  name: string;
  control: any;
  rules?: any;
  defaultValue?: any;
  label?: string;
  placeholder: string;
  width?: DimensionValue;
  options: SelectItem[];
  setValue: any;
  onSelectChange?: any;
  data?: any;
  applydefaultRule?: boolean;
  disabled?: boolean;
}

const FormSelectInput = React.memo(
  ({
    name,
    control,
    rules,
    defaultValue,
    label,
    placeholder,
    width,
    options,
    setValue,
    onSelectChange,
    data,
    applydefaultRule,
    disabled,
  }: FormSelectInputProps) => {
    // const styles = useStyleSheet(themedStyles);

    const [modalVisible, setModalVisible] = React.useState(false);

    const getSelectedLabel = (value: any) => {
      if (!value) return placeholder;
      const selectedOption = options.find((x) => x.value === value);
      if (!selectedOption) return placeholder;
      return selectedOption.label;
    };

    const onChange = (selectedValue: any) => {
      setValue(name, selectedValue);
      if (onSelectChange) onSelectChange(selectedValue, data);
    };

    return (
      <>
        <TouchableOpacity
          style={{ width: width ? width : "100%" }}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <Controller
            name={name}
            control={control}
            rules={
              rules
                ? rules
                : applydefaultRule
                ? { required: `${label} is required` }
                : undefined
            }
            render={({ field, fieldState: { error } }: any) => {
              return (
                <View style={{ gap: w(6) }}>
                  {label && (
                    <AppText
                      style={{
                        fontSize: w(12),
                        color: "#0A4751",
                        lineHeight: w(19.2),
                        fontWeight: "600",
                      }}
                    >
                      {label}
                    </AppText>
                  )}
                  <View style={styles.input}>
                    <AppText
                      style={{
                        fontSize: w(14),
                        color: "#3D3D3D",
                        lineHeight: w(14.2),
                        fontWeight: "600",
                      }}
                    >
                      {getSelectedLabel(field.value)}
                    </AppText>

                    <ArrowDown2
                      variant={"Linear"}
                      color={colors.grey600}
                      size={20}
                    />
                  </View>
                  {error?.message && (
                    <AppText
                      type="body"
                      style={{
                        color: "red",
                        fontSize: w(10),
                        lineHeight: w(12),
                      }}
                    >
                      {error?.message || ""}
                    </AppText>
                  )}
                </View>
              );
            }}
          />
        </TouchableOpacity>

        <SelectModal
          label={label ? label : "Select From List"}
          visible={modalVisible}
          onDismiss={() => setModalVisible(false)}
          onChange={onChange}
          options={options}
        />
      </>
    );
  }
);

export default FormSelectInput;

const styles = StyleSheet.create({
  input: {
    borderRadius: w(4),
    // height: w(30),
    paddingHorizontal: w(8),
    paddingVertical: w(7),
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    borderWidth: 0.3,
    borderColor: colors.grey500,
  },
});
