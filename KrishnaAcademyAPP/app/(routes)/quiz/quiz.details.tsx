import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Button,
  ScrollView,
  Animated,
  Modal,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { SERVER_URI } from "@/utils/uri";
import React from "react";

import { ImageBackground } from "expo-image";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { quizData } from "@/constants/quiz";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomLoader from "@/components/CustomLoader";
import { Toast } from "react-native-toast-notifications";

const renderItem = ({ item }) => {
  console.log(item, "item");
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#d2cccc",

        // marginBottom: 10,
        minWidth: "45%",
        maxWidth: "50%",
        marginHorizontal: 5,
        height: 250, // Ensure this is set to control the size
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 4,

        padding: 4,
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
          top: 12,
          left: 12,
          justifyContent: "flex-start", // Aligns children vertically to the top
          alignItems: "flex-start", // Aligns children horizontally to the left
          backgroundColor: "green", // Dark background color
          borderRadius: 10,
          alignSelf: "flex-start",
          padding: 5, // Add padding for better appearance
        }}
      >
        <Text
          style={{
            color: "white", // White text color
            fontSize: 14,
            // fontWeight: "bold",
            textAlign: "left", // Align text to the left
          }}
        >
          R100
        </Text>
      </View>

      <View
        style={{
          backgroundColor: "#EBEBEB",
          borderRadius: 10,
          width: 150,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          // marginBottom: 10,
          marginTop: 48,
        }}
      >
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
          <Ionicons
            name="image-outline"
            size={140}
            color="red"
            style={
              {
                // marginVertical: 10,
              }
            }
          />
        )}
      </View>
      <View
        style={{
          backgroundColor: "#fff",
          // marginTop: -15,
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
          {item.shortDescription.slice(0, 10)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default function QuizScreen() {
  const [language, setLanguage] = useState<"en" | "hin">("en");
  const [quizDetails, setQuizDetails] = React.useState<any>(null);
  const route = useRoute();

  const [count, setCount] = useState<number>(0);
  const { quizId } = route.params;
  // const quizId = 1

  const [questions, setQuestions] = useState<any[]>([]);
  // const [time, setTime] = useState<number>(20);
  const [userScore, setUserScore] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [selectedBox, setSelectedBox] = useState<number | null>(null);
  const [getResultClicked, setGetResultClicked] = useState<boolean>(false);
  const [timer, setTimer] = useState(0);
  const [scoreModalVisible, setScoreModalVisible] = useState<boolean>(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const toggleLanguage = () => {
    setLanguage(language === "english" ? "hindi" : "english");
  };
  const [quizzes, setQuizzes] = useState(quizData);
  const [refreshing, setRefreshing] = useState(false);

  const [loading , setLoading] = useState(true)

  console.log("hello");
  useEffect(() => {
    const getQuizDetails = async () => {
      const res = await axios.post(
        `${SERVER_URI}/api/v1/quiz/getQuizById/${quizId}`
      );

      const quizData = res?.data?.data;
      setQuizDetails(quizData);
      setRemainingTime(quizData.time);

      console.log("quizData.questions:", quizData);
      setQuestions(quizData.questions);

      setLoading(false)
    };

    getQuizDetails();
  }, [quizId]);

  const handleSave = () => {
    // console.log(
    //   "questions[count].correctAnswer[language]",
    //   questions[count].correctAnswer[language],
    //   userAnswer
    // );

    if (count < quizData.length - 1) {
      if (quizData[count].correctAnswer[language] === userAnswer) {
        setUserScore((userScore) => userScore + 1);
      }
      setCount((count) => count + 1);
      setSelectedBox(null);
      // setTime(20);
    } else {
      setGetResultClicked(true);
      console.log("userScore", userScore);
      setScoreModalVisible(true);
    }
    console.log("userScore", userScore, count);
  };

  const toggleColor = (index: number | null) => {
    const optionsArray = Object.values(quizData[count]?.options);
    console.log(optionsArray[index][language], "----l", index);
    if (index === null) return;
    setSelectedBox(index);
    setUserAnswer(optionsArray[index][language]);
  };

  const handleSkip = () => {
    if (count <= 1) {
      setCount((count) => count - 1);
      setSelectedBox(null);
      // setTime(15);
    }
  };

  // console.log("quizDetails---",questions, count);

  // console.log("questions-------->", questions[count]);
  const getOptionsArray = (quizData, language) => {
    if (!quizData || !quizData.options) {
      return [];
    }
    return Object.entries(quizData.options).map(([key, value]) => ({
      key,
      value: value[language],
    }));
  };

  const currentQuestion = quizData[count];
  const currentOptions = getOptionsArray(currentQuestion, language);
  const [isOpen, setIsOpen] = useState(false);
  const translateX = useRef(new Animated.Value(280)).current;

  const handleMenuPress = () => {
    setIsOpen((prev) => !prev);
    Animated.timing(translateX, {
      toValue: isOpen ? 0 : 280,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleSaveQuestion = async()=>{
    try {
        Toast.show("Saving question")
    } catch (error) {
      Toast.show("Error saving question")
      
    }

  }
  if(loading){
    return <CustomLoader name="2-curves" color="red" />


  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        // backgroundColor:'red',
        padding: 12,
      }}
    >

      <View>
        {/* {  -- top part including timer, submit, toggle and hambuger  --} */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 8,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 4,
            }}
          >
            <CountdownCircleTimer
              isPlaying
              duration={setRemainingTime}
              colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
              colorsTime={[7, 5, 2, 0]}
              size={30}
              strokeWidth={4}
              onComplete={() => {
                // Handle timer completion here
              }}
            >
              {/* {({ remainingTime }) => <Text>{remainingTime}</Text>} */}
            </CountdownCircleTimer>
            <Text style={{ fontWeight: "800", fontSize: 14 }}>
            {setRemainingTime}
            </Text>
          </View>
          <Button
            onPress={() => setScoreModalVisible(true)}
            title="submit"
            color={"red"}
          ></Button>
        </View>
        <View
          style={{ width: "100%", height: 1, backgroundColor: "#D3D4DB" }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 8,
            position: "relative",
          }}
        >
          <TouchableOpacity
            style={{
              paddingVertical: 6,
              paddingHorizontal: 16,
              backgroundColor: "red",
              width: 80,
              alignItems: "center",
            }}
            onPress={toggleLanguage}
          >
            <Text style={{ fontWeight: "800", fontSize: 12, color: "white" }}>
              {language === "english" ? "English" : "Hindi"}
            </Text>
          </TouchableOpacity>
          <Animated.View
            style={{
              position: "absolute",
              flex: 1,
              backgroundColor: "#e2e2e2",
              zIndex: 99,
              height: 740, //TODO: unjust to screen higth as screen-top part later on
              width: 260,
              top: 6,
              right: -12,
              transform: [{ translateX }],
            }}
          >
            <TouchableOpacity onPress={handleMenuPress}>
              <Ionicons
                style={{
                  alignSelf: "center",
                  position: "absolute",
                  left: -60,
                  backgroundColor: "#e2e2e2",
                  padding: 4,
                }}
                name="menu"
                size={24}
                color={"black"}
                zIndex={999}
              />
            </TouchableOpacity>
            <View></View>
          </Animated.View>
        </View>
      </View>
      <View style={{ width: "100%", height: 1, backgroundColor: "#D3D4DB" }} />

      {/* {  -- Questions mapping  --} */}
      <ScrollView
        stickyHeaderIndices={[0]}
        style={{ flex: 1, marginTop: 12 }}
        showsVerticalScrollIndicator={false}
      >
        {/* TODO: change bg white to defaul bg color */}
        <View style={{ backgroundColor: "white" }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {/* {left} */}
            <View style={{ flexDirection: "row", paddingVertical: 4 }}>
              <Text style={{ fontWeight: "600" }}>{`Q.${count + 1}`}</Text>
              <Text
              style={{
                fontSize: 18,
                color: "black",
                fontWeight: "800",
                alignSelf: "center",
                marginLeft: 4,
              }}
              >/ {questions.length}</Text>
            </View>
            {/* {right} */}
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
             
             <TouchableOpacity onPress={handleSaveQuestion}>
        <MaterialCommunityIcons
          style={{ alignSelf: "center" }}
          name={true ? "bookmark" : "bookmark-outline"}
          size={35}
          color="#d7f776"
        />
      </TouchableOpacity>

            </View>
          </View>
        </View>

        
        <View style={{ flex: 1, marginTop: 20 }}>
          <Text style={{ fontWeight: "800" }}>
            {"SECTION A : ENGLISH LANGUAGE"}
          </Text>

          <Text
            style={{
              marginTop: 16,
              fontSize: 15,
              textAlign: "left",
              fontWeight: "bold",
              color: "gray",
            }}
          >
            {quizData[count]?.question[language]}
          </Text>

          <View style={{ alignItems: "center", marginTop: 12, padding: 12 }}>
            {currentOptions.map((option, index) => (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 5,
                  backgroundColor: "#ffffff",
                  paddingVertical: 12,
                  paddingHorizontal: 12,
                  borderRadius: 8,
                  marginBottom: 8,
                  borderWidth: 1,
                  borderColor: selectedBox === index ? "#f97316" : "#e2e2e2",
                  width: "100%",
                }}
                key={index}
                onPress={() => toggleColor(index)}
              >
                <Text
                  style={{
                    fontWeight: "500",
                    fontSize: 16,
                    textAlign: "left",
                  }}
                >
                  {option.value}
                </Text>
                <View
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: selectedBox === index ? "black" : "gray",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {selectedBox === index ? (
                    <View
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 6,
                        backgroundColor: "black",
                      }}
                    />
                  ) : null}
                </View>
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
                onPress={() => setScoreModalVisible(true)}
                // disabled={true}
                style={{
                  backgroundColor: "#d1d5db",
                  padding: 16,
                  borderRadius: 20,
                  width: "66%",
                  flexDirection: "column",

                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 20,
                    textAlign: "center",
                  }}
                >
                  Your score: {userScore}
                </Text>
                <Text
                style={{

                  fontSize: 15,
                  color: "green",
                  textAlign: "right",
                  
                }}
                >
                  View Result
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                marginTop: 12,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                // position: "absolute",
                // bottom: 20,
              }}
            >
              <TouchableOpacity
                onPress={handleSkip}
                style={{
                  backgroundColor: "white",
                  paddingVertical: 12,
                  paddingHorizontal: 18,
                  borderRadius: 8,
                  width: "auto",
                }}
              >
                <Text
                  style={{
                    fontWeight: "800",
                    fontSize: 14,
                    color: "black",
                    textAlign: "center",
                  }}
                >
                  {" << PREVIOUS"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSave}
                style={{
                  backgroundColor: "red",
                  paddingVertical: 12,
                  paddingHorizontal: 18,
                  borderRadius: 8,
                  width: "33%",
                }}
              >
                <Text
                  style={{
                    fontWeight: "800",
                    fontSize: 14,
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  {count === quizData.length - 1 ? "Get Result" : "NEXT >>"}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
      <Modal
        transparent={true}
        visible={scoreModalVisible}
        animationType="fade"
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              width: 300,
              paddingHorizontal: 12,
              paddingVertical: 18,
              backgroundColor: "white",
              borderRadius: 8,
              gap: 24,
              alignItems: "flex-start",
            }}
          >
            <Text
              style={{ fontSize: 16, fontWeight: "800", textAlign: "left" }}
            >
              Score Card
            </Text>
            <View style={{ paddingHorizontal: 24, gap: 8 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderBottomColor: "#e2e2e2",
                  borderBottomWidth: 1,
                  width: "100%",
                }}
              >
                <View style={{ flexDirection: "row", gap: 3 }}>
                  <MaterialCommunityIcons
                    style={{ alignSelf: "center" }}
                    name="timer"
                    size={20}
                    color="black"
                  />
                  <Text style={{ fontSize: 14, color: "gray" }}>Time left</Text>
                </View>
                <Text style={{ fontSize: 14, color: "gray" }}>
                  {"00:28:31"}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderBottomColor: "#e2e2e2",
                  borderBottomWidth: 1,
                  width: "100%",
                }}
              >
                <View style={{ flexDirection: "row", gap: 3 }}>
                  <MaterialCommunityIcons
                    style={{ alignSelf: "center" }}
                    name="timer"
                    size={20}
                    color="black"
                  />
                  <Text style={{ fontSize: 14, color: "gray" }}>Answered</Text>
                </View>
                <Text style={{ fontSize: 14, color: "gray" }}>{"7"}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderBottomColor: "#e2e2e2",
                  borderBottomWidth: 1,
                  width: "100%",
                }}
              >
                <View style={{ flexDirection: "row", gap: 3 }}>
                  <MaterialCommunityIcons
                    style={{ alignSelf: "center" }}
                    name="timer"
                    size={20}
                    color="black"
                  />
                  <Text style={{ fontSize: 14, color: "gray" }}>
                    Unanswered
                  </Text>
                </View>
                <Text style={{ fontSize: 14, color: "gray" }}>{"2"}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderBottomColor: "#e2e2e2",
                  borderBottomWidth: 1,
                  width: "100%",
                }}
              >
                <View style={{ flexDirection: "row", gap: 3 }}>
                  <MaterialCommunityIcons
                    style={{ alignSelf: "center" }}
                    name="timer"
                    size={20}
                    color="black"
                  />
                  <Text style={{ fontSize: 14, color: "gray" }}>Saved</Text>
                </View>
                <Text style={{ fontSize: 14, color: "gray" }}>{"5"}</Text>
              </View>
            </View>
            <Text style={{ alignSelf: "center" }}>
              You are submitting the quiz
            </Text>
            <View style={{ flexDirection: "row", gap: 8, alignSelf: "center" }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "white",
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 4,
                }}
                onPress={() => setScoreModalVisible(false)}
              >
                <Text
                  style={{
                    color: "black",
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: "#f44336",
                  padding: 10,
                  borderRadius: 4,
                }}
                onPress={() =>
                  router.push({
                    pathname: "/(routes)/quiz/quiz.result",
                    // params: { quizId: item._id },
                  })
                }
              >
                <Text
                  style={{
                    color: "white",
                  }}
                >
                  Yes, submit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
