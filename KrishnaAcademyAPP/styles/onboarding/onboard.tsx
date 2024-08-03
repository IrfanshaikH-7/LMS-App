import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

export const styles = StyleSheet.create({
  firstContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  logo: {
    width: wp("23%"),
    height: hp("10%"),
  },
  titleWrapper: {
    flexDirection: "row",
  },
  titleTextShape1: {
    position: "absolute",
    left: -28,
    top: -20,
  },
  titleText: {
    fontSize: hp("4%"),
    textAlign: "center",
  },
  titleTextShape2: {
    position: "absolute",
    right: -40,
    top: -20,
  },
  titleShape3: {
    position: "absolute",
    left: 60,
  },
  dscpWrapper: {
    marginTop: 30,
  },
  dscpText: {
    textAlign: "center",
    color: "#575757",
    fontSize: hp("2%"),
  },
  buttonWrapper: {
    backgroundColor: "#ED3137",
    width: wp("75%"),
    paddingVertical: 18,

    borderRadius: 50,
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: hp("2.5%"),
    
  },
  welcomeButtonStyle:{
    backgroundColor: "#ED3137",
    width: responsiveWidth(88),
    height: responsiveHeight(5.5),
    alignSelf: "center",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",

  }
});
