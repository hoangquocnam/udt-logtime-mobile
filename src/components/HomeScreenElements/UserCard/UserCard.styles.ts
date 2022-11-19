import { StyleSheet } from "react-native";
import { WHITE, GRAY, PRIMARY } from "../../../theme/colors";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: WHITE,
    marginVertical: 10,
    borderRadius: 10,
    padding: 20,
  },
  contentContainer: {
    justifyContent: "space-between",
    flex: 1,
    paddingHorizontal: 20,

  },
  fullName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  addressInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  address: {
    color: GRAY,
    marginLeft: 4,
  },
  avatar: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 20,
    borderColor: PRIMARY,
    width: 60,
    height: 60,
  },
});

export default styles;
