import { StyleSheet } from "react-native";
import { theme } from "../../core/theme";
import { size } from "../../core/theme/size";


export const styles = StyleSheet.create({
  profileButton: {
    height: size[32],
    width: size[32],
    marginLeft: "auto",
    borderRadius: size[16],
    backgroundColor: theme.colors.secondary[50],
    alignItems: 'center',
    justifyContent: 'center'
  }
})