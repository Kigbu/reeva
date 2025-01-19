import React from "react";

import { SelectItem as Items } from "core/interfaces/select-item.interface";
import { Controller } from "react-hook-form";
import { DimensionValue, View } from "react-native";
import { h, w } from "core/utils/responsive";
import AppText from "components/widgets/Text";
import colors from "core/theme/colors";
import DropDownPicker from "react-native-dropdown-picker";

interface FormSelectInputProps {
  name: string;
  control: any;
  rules?: any;
  defaultValue?: any;
  label?: string;
  placeholder: string;
  width?: DimensionValue;
  options: Items[];

  onSelectChange?: any;
  data?: any;
  applydefaultRule?: boolean;
  disabled?: boolean;
  open: boolean;
  setOpen: any;
}

const AppSelectInput = React.memo(
  ({
    name,
    control,
    rules,
    defaultValue,
    label,
    placeholder,
    width,
    options,

    onSelectChange,
    data,
    applydefaultRule,
    disabled,
    open,
    setOpen,
  }: FormSelectInputProps) => {
    const [modalVisible, setModalVisible] = React.useState(false);

    const getSelectedLabel = (value: any) => {
      if (!value) return placeholder;
      const selectedOption = options.find((x) => x.value === value);
      if (!selectedOption) return placeholder;
      return selectedOption.label;
    };

    return (
      <>
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
          render={({
            field: { value, onChange },
            fieldState: { error },
          }: any) => {
            return (
              <View style={{ gap: w(4) }}>
                {label && (
                  <AppText
                    style={{
                      color: colors.grey700,
                      fontSize: w(12),
                      lineHeight: w(18),
                      fontWeight: "500",
                    }}
                  >
                    {label}
                  </AppText>
                )}
                <DropDownPicker
                  disabled={false}
                  style={{
                    borderColor: colors.inputBorderColor,
                    borderWidth: w(1),
                    borderRadius: w(4),
                    // color: colors.txtPrimary,
                    // fontFamily: family.iRegular,
                    // fontSize: h(15),
                    paddingVertical: h(7),
                    paddingHorizontal: w(8),

                    // width: "100%",
                    height: h(30),
                    zIndex: 10,
                  }}
                  textStyle={{
                    fontSize: w(12),
                    lineHeight: w(14),
                    fontWeight: "500",
                  }}
                  // containerStyle={styles.dPickerContainerStyle}
                  // dropDownContainerStyle={styles.dPickerDropdownContainerStyle}
                  open={open}
                  value={value}
                  items={options}
                  setOpen={setOpen}
                  setValue={onChange}
                  // setItems={setMonths}
                  placeholder={placeholder}
                  testID={"credit-duration-select"}
                />
              </View>
            );
          }}
        />
      </>
    );
  }
);

export default AppSelectInput;
