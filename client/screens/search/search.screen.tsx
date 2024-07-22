import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import SearchInput from "@/components/common/search.input";
import { useEffect } from "react";
import axios from "axios";
import { SERVER_URI } from "@/utils/uri";

export default function SearchScreen() {

  useEffect(() => {
    const res = axios.get(`${SERVER_URI}/api/v1/quiz`);

  }, []);

  return (
    <LinearGradient colors={["#E5ECF9", "#F6F7F9"]} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>



        {/* <SearchInput /> */}


        <View>

        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
