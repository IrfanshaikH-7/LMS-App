import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import AnimatedLoader from "react-native-animated-loader";
import { View, Text, TouchableOpacity } from "react-native";

export default function Loader() {
  const [showLoader, setShowLoader] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (showLoader) {
      const timer = setTimeout(() => {
        setShowLoader(false);
        setShowMessage(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showLoader]); // Add showLoader as a dependency

  if (showLoader) {
    return (
      <LinearGradient
        colors={["#E5ECF9", "#F6F7F9"]}
        style={{ flexDirection: 'column', justifyContent: "center", alignItems: "center", height: "30%" }}
      >
        <AnimatedLoader
          visible={true}
          overlayColor="rgba(255,255,255,0.75)"
          source={require("@/assets/animation/Online data Manager.json")}
          animationStyle={{ width: 250, height: 250 }}
          speed={1.5}
        />
      </LinearGradient>
    );
  } else if (showMessage) {
    return (
      <View style={{ flexDirection: 'column', justifyContent: "center", alignItems: "center", height: "100%" }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#192f6a",
            marginBottom: 20,

          }}
        >
          Try Again
        </Text>
        <TouchableOpacity onPress={() => { setShowLoader(true); setShowMessage(false); }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#192f6a", 
          fontFamily: "Roboto", padding: 10, borderRadius: 10, backgroundColor: "#E5EC39"


          }}>Start Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return null;
}