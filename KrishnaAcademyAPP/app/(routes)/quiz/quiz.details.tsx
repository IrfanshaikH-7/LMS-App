import { SERVER_URI } from "@/utils/uri";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import axios from "axios";

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,

  Modal,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
type Props = {};

const quizDetails = (props: Props) => {
  const route = useRoute();

  const { quizId } = route.params;

  const [quizDetails, setQuizDetails] = React.useState<any>(null);

  const [count, setCount] = useState<number>(0);
  const [questions, setQuestions] = useState<any[]>([]);
  // const [time, setTime] = useState<number>(20);
  const [userScore, setUserScore] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [selectedBox, setSelectedBox] = useState<number | null>(null);
  const [getResultClicked, setGetResultClicked] = useState<boolean>(false);
  const [language, setLanguage] = useState<"en" | "hin">("en");
  const [scoreModalVisible, setScoreModalVisible] = useState<boolean>(false);
  useEffect(() => {
    const getQuizDetails = async () => {
      const res = await axios.post(
        `${SERVER_URI}/api/v1/quiz/getQuizById/${quizId}`
      );

      const quizData = res?.data?.data;
      setQuizDetails(quizData);

      console.log("quizData.questions:", quizData);
      setQuestions(quizData.questions);
    };

    getQuizDetails();
  }, [quizId]);


  const handleSave = () => {
    // console.log(
    //   "questions[count].correctAnswer[language]",
    //   questions[count].correctAnswer[language],
    //   userAnswer
    // );

    if (count < questions.length - 1) {
      if (questions[count].correctAnswer[language] === userAnswer) {
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



  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === "en" ? "hin" : "en"));
  };


  const toggleColor = (index: number | null) => {
    const optionsArray = Object.values(questions[count]?.options);
    console.log(optionsArray[index][language], "----l", index);
    if (index === null) return;
    setSelectedBox(index);
    setUserAnswer(optionsArray[index][language]);
  };

  const handleSkip = () => {
    if (count < questions.length - 1) {
      setCount((count) => count + 1);
      setSelectedBox(null);
      // setTime(15);
    }
  };

  // console.log("quizDetails---",questions, count);

  // console.log("questions-------->", questions[count]);
  const getOptionsArray = (question, language) => {
    if (!question || !question.options) {
      return [];
    }
    return Object.entries(question.options).map(([key, value]) => ({
      key,
      value: value[language],
    }));
  };

  const currentQuestion = questions[count];
  const currentOptions = getOptionsArray(currentQuestion, language);

  return (
    <>
      <Modal
        transparent={true}
        visible={scoreModalVisible}
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Score Card</Text>
            <View style={styles.scoreDisplay}>
              <Text>Your Score:</Text>
              <Text style={styles.score}>{userScore}</Text>
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setScoreModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {!quizDetails ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f3f4f6",
          }}
        >
        <ActivityIndicator size="large" color="#ED3137" />
        </View>
      ) : (
        <SafeAreaView
          style={{
            flex: 1,
            paddingTop: 40,
            paddingHorizontal: 20,

            flexDirection: "column",
            // justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              position: "absolute",
              top: 40,
              left: 20,
            }}
          >
            <MaterialIcons name="cancel" size={44} color="#f97316" />
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-between",
              marginBottom: 24,
              alignItems: "center",
              width: "100%",
            }}
          >
            <View style={{ alignItems: "center", marginTop: 20 }}>
              <Text
                style={{ fontWeight: "bold", color: "#f97316", fontSize: 25 }}
              >
                {quizDetails?.category.toUpperCase()}
              </Text>

              <View
                style={{
                  marginTop: 25,
                }}
              >
              
                <CountdownCircleTimer
                  size={100}
                  isPlaying
                  duration={120}
                  colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                  colorsTime={[7, 5, 2, 0]}
                >
                  {({ remainingTime }) => <Text>{remainingTime}</Text>}
                </CountdownCircleTimer>
              </View>
            </View>
          </View>

          <View
            style={{
              width: "100%",
              flexDirection: "row",
              gap: 2,
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            {/* <Text style={{fontSize: 18, fontWeight: "500"}}>{count}/10</Text>
            <TouchableOpacity
            onPress={toggleLanguage}
              style={{
                backgroundColor: "rgb(233, 193, 160)",
                padding: 10,
                borderRadius: 30,
                marginVertical: 8
              }}
            >
              <Text>{language === 'en' ? 'hindi' : 'english'}</Text>
            </TouchableOpacity> */}
            {
              questions.map((question : any, index: any) =>(

                <View
                style={{

                   height: 32,
                   width: 32,
                   borderRadius: 12,
                   borderWidth: 2,
                   backgroundColor: count === index ? 'red' : 'white',
                   borderColor:'gray',
                   alignItems: 'center',
                  //  flexWrap: 'wrap',
                   justifyContent: 'center',
                }}
           ><Text
           style={{
            color: count === index ? 'white' : 'black'
         }}
           >{index}</Text></View>
            
              ))
            }
          </View>

          {/* //question */}
          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-between",

              // marginBottom: 32,
            }}
          >
            <View
              style={{
                paddingVertical: 8,
                alignItems: "flex-start",
                justifyContent: "center",
                paddingHorizontal: 0,
              }}
            >
              <View
              
              >
                <Text  style={{
                fontSize: 20,
                textAlign: "flex-start",
                fontWeight: "700",
              }}>Q.{count + 1}</Text>
              <Text
                style={{
                  fontSize: 18,
                  textAlign: "flex-start",
                  fontWeight: "bold",
                }}
              >
                {questions[count]?.question[language]}
              </Text>

              </View>
              
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
            <View style={{ alignItems: "center", marginBottom: 0,  }}>
              {currentOptions.map((option, index) => (
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor:
                      selectedBox === index ? "#ffffff" : "#ffffff",
                    paddingVertical: 12,
                    paddingHorizontal: 12,
                    borderRadius: 8,
                    marginBottom: 8,
                    borderWidth: 1,
                    borderColor: "#f97316",
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
                  >{option.value}</Text>
                 <View
            style={{
               width: 16,
               height: 16,
               borderRadius: 12,
               borderWidth: 2,
               borderColor: selectedBox === index  ? 'black' : 'gray',
               alignItems: 'center',
               justifyContent: 'center',
            }}
         >
            {selectedBox === index ?  <View style={{ width: 10, height: 10, borderRadius: 6, backgroundColor: 'black' }} /> : null}
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
                  onPress={()=> setScoreModalVisible(true)}
                  // disabled={true}
                  style={{
                    backgroundColor: "#d1d5db",
                    padding: 16,
                    borderRadius: 20,
                    width: "66%",
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
                </TouchableOpacity>
              </View>
            ) : (
              <View
                style={{
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
                      color: 'black',
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
                      color: 'white',
                      textAlign: "center",
                    }}
                  >
                    {count === questions.length - 1 ? "Get Result" : "NEXT >>"}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default quizDetails;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 8,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  scoreDisplay: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  score: {
    fontWeight: "bold",
    color: "#4CAF50",
    marginLeft: 10,
  },
  closeButton: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 4,
  },
  closeButtonText: {
    color: "white",
  },
});
