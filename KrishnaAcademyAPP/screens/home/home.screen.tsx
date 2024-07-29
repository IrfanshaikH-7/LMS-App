import { View, Text, StyleSheet, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Header from "@/components/header/header";
import SearchInput from "@/components/common/search.input";
import HomeBannerSlider from "@/components/home/home.banner.slider";
import AllCourses from "@/components/courses/all.courses";
import { useEffect, useState } from "react";

import React from "react";
import { Video } from "expo-av";
import StudyMaterialsList from "@/components/studymaterials";

export default function HomeScreen() {
  const [videoUri, setVideoUri] = useState(null);
  const videoref = React.useRef(null);

  return (
    <LinearGradient
      colors={["#E5ECF9", "#F6F7F9"]}
      style={{ flex: 1, paddingTop: 50 }}
    >
      <Header />
      <SearchInput homeScreen={true} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <HomeBannerSlider />





        <AllCourses />

        <View style={{ height: 300 }}>
          <StudyMaterialsList />
         

          </View>
      </ScrollView>

      {/* <Video
      source={{
        uri: 'https://d33zqdivlk1hm.cloudfront.net/SampleVideo_1280x720_20mb.mp4',
      }}
      useNativeControls

      resizeMode='contain'
      isLooping
      style={{ width: '100%', height: 300 }}
    /> */}
    </LinearGradient>
  );
}

export const styles = StyleSheet.create({});
