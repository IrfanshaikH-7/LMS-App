import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";

import SearchInput from "@/components/common/search.input";
import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URI } from "@/utils/uri";
import React from "react";
import Header from "@/components/header/header";


export default function SearchScreen() {

  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {

    const getQuizzes = async () => {

      const res = await axios.post(`${SERVER_URI}/api/v1/quiz/getAllQuiz`);

      console.log(res)
    }
    getQuizzes();


  }, []);



  return (




    <SafeAreaView style={{
      flex: 1,
      paddingTop: 50,
    }}>
      <Header />
      <SearchInput />


      <View
        style={{
          marginHorizontal: 20,
          backgroundColor: 'lightblue',
          // flexDirection: 'row',
          // justifyContent: 'space-between',
          // alignItems: 'center',
          padding: 20,
          flex: 1,
          height: '100%'

        }}
      >



      </View>
    </SafeAreaView>


  );
}
