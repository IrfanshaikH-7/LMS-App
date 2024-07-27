import { SERVER_URI } from "@/utils/uri";
import axios from "axios";
import { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import {
  useFonts,
  Raleway_700Bold,
  Raleway_600SemiBold,
} from "@expo-google-fonts/raleway";
import {
  Nunito_400Regular,
  Nunito_700Bold,
  Nunito_500Medium,
  Nunito_600SemiBold,
} from "@expo-google-fonts/nunito";
import Loader from "@/components/loader/loader";
import { LinearGradient } from "expo-linear-gradient";
import CourseCard from "@/components/cards/course.card";
import Header from "@/components/header/header";
import React from "react";
import CourseList from "@/components/Course/CourseList";
const sampleItem = [
  {
    "id": 1,
    "name": "React Native Course",
    "banner": {
      "url": "https://example.com/banner1.jpg"
    },
    "chapters": [
      { "title": "Introduction" },
      { "title": "Getting Started" },
      { "title": "Components" }
    ],
    "time": 10,
    "price": 0
  },
  {
    "id": 2,
    "name": "Advanced React Native",
    "banner": {
      "url": "https://example.com/banner2.jpg"
    },
    "chapters": [
      { "title": "Advanced Components" },
      { "title": "State Management" },
      { "title": "Performance Optimization" }
    ],
    "time": 15,
    "price": 50
  },
  {
    "id": 3,
    "name": "React Native with Redux",
    "banner": {
      "url": "https://example.com/banner3.jpg"
    },
    "chapters": [
      { "title": "Introduction to Redux" },
      { "title": "Redux with React Native" },
      { "title": "Advanced Redux" }
    ],
    "time": 12,
    "price": 30
  }
]
export default function CoursesScreen() {
  const [courses, setCourses] = useState<CoursesType[]>([]);
  const [originalCourses, setOriginalCourses] = useState<CoursesType[]>([]);
  const [loading, setLoading] = useState(false);
  const [categories, setcategories] = useState([]);
  const [activeCategory, setactiveCategory] = useState("All");
  const [forceHideLoader, setForceHideLoader] = useState(false);



  // useEffect(() => {
  //   axios
  //     .get(`${SERVER_URI}/get-layout/Categories`)
  //     .then((res) => {
  //       setcategories(res.data.layout.categories);
  //       fetchCourses();
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  // const fetchCourses = () => {
  //   axios
  //     .get(`${SERVER_URI}/get-courses`)
  //     .then((res: any) => {
  //       setCourses(res.data.courses);
  //       setOriginalCourses(res.data.courses);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       setLoading(false);
  //       console.log(error);
  //     });
  // };

  let [fontsLoaded, fontError] = useFonts({
    Raleway_700Bold,
    Nunito_400Regular,
    Nunito_700Bold,
    Nunito_500Medium,
    Nunito_600SemiBold,
    Raleway_600SemiBold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const handleCategories = (e: string) => {
    setactiveCategory(e);
    if (e === "All") {
      setCourses(originalCourses);
    } else {
      const filterCourses = originalCourses.filter(
        (i: CoursesType) => i.categories === e
      );
      setCourses(filterCourses);
    }
  };


  return (
    <View>

      <Header />

      {loading ? (
        <Loader />
      ) : (
        <LinearGradient
          colors={["#E5ECF9", "#F6F7a9"]}
          style={{ paddingTop: 40, height: "100%" }}
        >




          <View style={{ padding: 0 }}>
            {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <TouchableOpacity
                style={{
                  padding: 10,
                  backgroundColor:
                    activeCategory === "All" ? "#2467EC" : "#000",
                  borderRadius: 20,
                  paddingHorizontal: 20,
                  marginRight: 5,
                }}
                onPress={() => handleCategories("All")}
              >
                <Text
                  style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}
                >
                  All
                </Text>
              </TouchableOpacity>
              {categories?.map((i: any, index: number) => (
                <TouchableOpacity
                  style={{
                    padding: 10,
                    backgroundColor:
                      activeCategory === i?.title ? "#2467EC" : "#000",
                    borderRadius: 50,
                    paddingHorizontal: 20,
                    marginHorizontal: 15,
                  }}
                  onPress={() => handleCategories(i?.title)}
                >
                  <Text
                    style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}
                  >
                    {i?.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView> */}
          </View>

            <ScrollView style={{ marginHorizontal: 10, gap: 5, marginBottom:150, marginTop:10 }}>
              {/* {courses?.map((item: CoursesType, index: number) => (
                <CourseCard item={item} key={index} />
              ))} */}
              <CourseList level={"item"} />
              <CourseList level={"item"} />


              <CourseList level={"item"} />
              <CourseList level={"item"} />

            </ScrollView>
            {/* {courses?.length === 0 && (
              <Text
                style={{ textAlign: "center", paddingTop: 50, fontSize: 18 }}
              >
                No data available!
              </Text>
              
            )} */}


        </LinearGradient>
      )}
    </View>
  );
}
