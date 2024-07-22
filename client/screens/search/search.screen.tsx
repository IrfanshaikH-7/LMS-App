import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";

import SearchInput from "@/components/common/search.input";
import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URI } from "@/utils/uri";
import React from "react";
import Header from "@/components/header/header";
import Button from "@/components/button/button";

export default function SearchScreen() {
  const [quizzes, setQuizzes] = useState([]);


  useEffect(() => {
    const getQuizzes = async () => {
      try {
        const res = await axios.get(`${SERVER_URI}/api/v1/quiz/getAllQuiz`);
        setQuizzes(res.data);

        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getQuizzes();
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
          marginHorizontal: 20,
          backgroundColor: "lightblue",
          // flexDirection: 'row',
          // justifyContent: 'space-between',
          // alignItems: 'center',
          padding: 20,
          flex: 1,
          height: "100%",
        }}
      >
        <FlatList
          data={quizzes}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: "white",
                marginBottom: 10,
              }}
            >
              <Text>{item.title}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
}
