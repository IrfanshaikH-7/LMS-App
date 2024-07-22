import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from "react-native";

import SearchInput from "@/components/common/search.input";
import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URI } from "@/utils/uri";
import React from "react";
import Header from "@/components/header/header";
import Button from "@/components/button/button";
import { ImageBackground } from "expo-image";

const renderItem = ({ item }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "white",
        marginBottom: 10,
        minWidth: "45%",
        maxWidth: "50%",
        marginHorizontal: 5,
        height: 180, // Ensure this is set to control the size
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        overflow: "hidden", // Ensure the borderRadius effect applies to children
        elevation: 4, // Adds shadow for Android
        shadowColor: "#000000", // Shadow color for iOS
        shadowOffset: { width: 0, height: 2 }, // Shadow direction and distance for iOS
        shadowOpacity: 0.2, // Shadow opacity for iOS
        shadowRadius: 3.84, // Shadow blur radius for iOS
      }}
    >
      <ImageBackground
        source={{ uri: "https://picsum.photos/seed/picsum/200/300" }}
        style={{
          width: "100%",
          height: "100%", // Adjusted to fill the TouchableOpacity
          // justifyContent: "center",
          // alignItems: "center",
        }}
        imageStyle={{
          borderRadius: 20, // Apply borderRadius to the image itself
        }}
      >
        <View
          style={{
            justifyContent: "flex-start", // Aligns children vertically to the top
            alignItems: "flex-start", // Aligns children horizontally to the left
            margin: 10, // Add margin to the top and left
            // backgroundColor: "rgb(241, 344, 215)",
            borderRadius: 20,
            alignSelf: "flex-start",
          }}
        >
          <Text
            style={{
              color: "green",
              fontSize: 16,
              fontWeight: "bold",
              textAlign: "left", // Align text to the left
            }}
          >
            $100
          </Text>
        </View>

        {/* Overlay View with Text */}
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 80, // Adjust the height for your shadow effect
            backgroundColor: "rgba(0,0,0,0.4)", // Semi-transparent view for shadow effect
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 14,
              fontWeight: "400",
              textAlign: "left",
            }}
          >
            {item.name}
          </Text>
          <Text
            style={{
              color: "white",
              fontSize: 12,
              fontWeight: "condensed",
              textAlign: "right",
            }}
          >
            {item.shortDescription}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};
export default function SearchScreen() {
  const [quizzes, setQuizzes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    const getQuizzes = async () => {
      try {
        const res = await axios.get(`${SERVER_URI}/api/v1/quiz/getAllQuiz`);
        setQuizzes(res.data.data);

        console.log(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getQuizzes();
  }, [refreshing]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Place your data fetching logic here
    setTimeout(() => { // Simulate a network request
      setRefreshing(false);
    }, 2000);
  }, []);

  

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: 50,
      }}
    >
      <Header />
      <SearchInput />

      <View
        style={{
          // marginHorizontal: 10,
          backgroundColor: "lightblue",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          padding: 10,

          // height: "100%",
        }}
      >
        <FlatList

          data={quizzes}
          renderItem={renderItem}
          numColumns={2}
          keyExtractor={(item) => item._id}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        />
      </View>
    </SafeAreaView>
  );
}
