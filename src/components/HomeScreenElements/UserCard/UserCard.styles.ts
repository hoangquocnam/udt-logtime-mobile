import { StyleSheet } from "react-native";
import { WHITE, GRAY } from "../../../theme/colors";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: WHITE,
    marginVertical: 10,
    borderRadius: 10,
    paddingHorizontal: 20,

  },
  contentContainer: {
    justifyContent: "space-between",
    padding: 20,
    flex: 1,
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
    color: "gray",
    marginLeft: 4,
  },
  avatar: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 20,
    borderColor: GRAY,
    width: 50,
    height: 50,
  },
});

export default styles;
