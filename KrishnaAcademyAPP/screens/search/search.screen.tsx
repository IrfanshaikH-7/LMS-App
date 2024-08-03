import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from "react-native";

import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URI } from "@/utils/uri";
import React from "react";
import Header from "@/components/header/header";

import { ImageBackground } from "expo-image";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const renderItem = ({ item }) => {
  console.log(item, "item");
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "white",
        marginBottom: 10,
        minWidth: "45%",
        maxWidth: "50%",
        marginHorizontal: 5,
        // height: 180, // Ensure this is set to control the size
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        overflow: "hidden", // Ensure the borderRadius effect applies to children

      
      }}
      onPress={() =>
        router.push({
          pathname: "/(routes)/quiz/quiz.details",
          params: { quizId: item._id },
        })
      }
    >

<View
        style={{
          position: "absolute",
          top: 0,
          left: 10,
          justifyContent: "flex-start", // Aligns children vertically to the top
          alignItems: "flex-start", // Aligns children horizontally to the left
          // margin: 10, // Add margin to the top and left
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
          R100
        </Text>
      </View>
      {!item.image ? (
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
        />
      ) : (
        <Ionicons name="image-outline" size={110} color="red" style={{
          marginVertical: 10,
        }} />
      )}



      <View
        style={{
          backgroundColor:'#fff',
          marginTop: -15,
          width: "100%",
          marginVertical: 10, 
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          paddingHorizontal: 10,

          // position: "absolute",
          // bottom: 0,
          // left: 0,
          // right: 0,
          // height: 80, // Adjust the height for your shadow effect
          // backgroundColor: "rgba(0,0,0,0.4)", // Semi-transparent view for shadow effect
          // flexDirection: "column",
          // justifyContent: "flex-start",
          // alignItems: "center",
          // gap: 10,
        }}
      >
        <Text
          style={{
            // color: "white",
            fontSize: 16,
            fontWeight: "600",
            textAlign: "left",
          }}
        >
          {item.name}

        </Text>
        <Text
          style={{
            // color: "white",
            fontSize: 12,
            fontWeight: "condensed",
            textAlign: "left",
          }}
        >
          {item.shortDescription.slice(0,10)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export default function SearchScreen() {
  const [quizzes, setQuizzes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  console.log("hello");
  useEffect(() => {
    const getQuizzes = async () => {
      try {
        const res = await axios.get(`${SERVER_URI}/api/v1/quiz/getAllQuiz`);
        setQuizzes(res.data.data);

        // console.log(res.data.data,'get all quizes');
      } catch (error) {
        console.log(error);
      }
    };
    getQuizzes();
  }, [refreshing]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Place your data fetching logic here
    setTimeout(() => {
      // Simulate a network request
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
      {/* <SearchInput /> */}

      <View
        style={{
          // marginHorizontal: 10,

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
          contentContainerStyle={{ width: "100%", gap: 10 }}
          columnWrapperStyle={{ gap: 10 }}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          keyExtractor={(item) => item._id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </SafeAreaView>
  );
}
