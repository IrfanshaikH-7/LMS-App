import { SERVER_URI } from "@/utils/uri";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";

type Props = {};

const quizDetails = (props: Props) => {
  const route = useRoute();

  const { quizId } = route.params;

  const [quizDetails, setQuizDetails] = React.useState<any>(null);

  const [count, setCount] = useState<number>(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [time, setTime] = useState<number>(15);
  const [userScore, setUserScore] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [selectedBox, setSelectedBox] = useState<number | null>(null);
  const [getResultClicked, setGetResultClicked] = useState<boolean>(false);

  useEffect(() => {
    const getQuizDetails = async () => {
      const res = await axios.post(
        `${SERVER_URI}/api/v1/quiz/getQuizById/${quizId}`
      );

      console.log("quizDetails", res.data.data);
      setQuizDetails(res.data.data);
    };
    getQuizDetails();
  }, []);

  console.log("quizDetails", quizId);
  return (
    <SafeAreaView style={{ flex: 1, paddingTop:40 , paddingHorizontal:10}}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 24,
          alignItems: "center",
          width: "100%",
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="cancel" size={44} color="#f97316" />
        </TouchableOpacity>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontWeight: "bold", color: "#f97316", fontSize: 18 }}>
            {questions[count]?.category}
          </Text>
          <Text style={{ color: "#6b7280", fontSize: 18 }}>{count + 1}/40</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <AntDesign
            name="clockcircle"
            size={24}
            color="#f97316"
            style={{ marginBottom: 1 }}
          />
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>
            {time < 10 ? `0${time}` : time}
          </Text>
        </View>
      </View>

      <View
        style={{
          backgroundColor: "rgb(233, 193, 160)",
          paddingVertical: 16,
          height: 200,
          borderRadius: 30,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 8,
          marginBottom: 32,
        }}
      >
        <Text style={{ fontSize: 24, textAlign: "center", fontWeight: "bold" }}>
          {questions[count]?.question}
        </Text>
      </View>

      <Text
        style={{
          fontSize: 18,
          marginBottom: 12,
          color: "#f97316",
          fontWeight: "bold",
        }}
      >
        Select your answer
      </Text>
      <View style={{ alignItems: "center", marginBottom: 16 }}>
        {questions[count]?.options.map((item, index) => (
          <TouchableOpacity
            style={{
              backgroundColor: selectedBox === index ? "#fed7aa" : "#ffffff",
              paddingVertical: 24,
              paddingHorizontal: 16,
              borderRadius: 30,
              marginBottom: 12,
              borderWidth: selectedBox === index ? 1 : 0,
              borderColor: "#f97316",
              width: "100%",
            }}
            key={index}
            // onPress={() => toggleColor(index)}
          >
            <Text style={{ fontSize: 20, textAlign: "center" }}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {getResultClicked ? (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            disabled={true}
            style={{
              backgroundColor: "#d1d5db",
              padding: 16,
              borderRadius: 20,
              width: "66%",
            }}
          >
            <Text
              style={{ fontWeight: "bold", fontSize: 20, textAlign: "center" }}
            >
              Generating your score...
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            // onPress={handleSkip}
            style={{
              backgroundColor: "#fdba74",
              padding: 16,
              borderRadius: 20,
              width: "33%",
            }}
          >
            <Text
              style={{ fontWeight: "bold", fontSize: 20, textAlign: "center" }}
            >
              SKIP
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={handleSave}
            style={{
              backgroundColor: "#86efac",
              padding: 16,
              borderRadius: 20,
              width: "33%",
            }}
          >
            <Text
              style={{ fontWeight: "bold", fontSize: 20, textAlign: "center" }}
            >
              {count === questions.length - 1 ? "Get Result" : "SAVE"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default quizDetails;
