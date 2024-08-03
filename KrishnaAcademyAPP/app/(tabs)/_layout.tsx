import useUser from "@/hooks/auth/useUser";
import { Tabs } from "expo-router";
import React from "react";
import { Image, View } from "react-native";


export default function TabsLayout() {
  const { user } = useUser();
  return (
    <Tabs

      screenOptions={({ route }) => {
        return {
          tabBarIcon: ({ focused }) => {
            let iconName;
            if (route.name === "index") {
              iconName = require("@/assets/icons/HouseSimple.png");
            } else if (route.name === "search/index") {
              iconName = require("@/assets/icons/search.png");
            } else if (route.name === "courses/index") {
              iconName = require("@/assets/icons/BookBookmark.png");
            } else if (route.name === "profile/index") {
              iconName = require("@/assets/icons/User.png");
            }
            return (
              <View style={{
                backgroundColor: focused ? "#ff4e00" : "#fff",
                width: '100%',
                height: '100%',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                paddingBottom: focused ? 10 : 0,
                
              }}>
                <View
                style={{
                  // backgroundColor: focused ? "transparent" : "#fff",
                  // borderColor: focused ? "#000" : "#000",
                  borderColor: focused ? '#fff' : 'transparent', borderWidth: 3,
                   borderRadius: 40,    

                  width: 40,
                  height: 40,

                  justifyContent: 'center',
                  alignItems: 'center',



                }}
                >

                <Image
                  style={{ width: focused ? 30:  25, height:focused ? 30 : 25, 
                    tintColor: focused ? '#fff' : '#000' ,
                    zIndex: 21,
                    // borderColor: focused ? '#fff' : '#000', borderWidth: 2, borderRadius: 20, padding: 15    
                    
                    
                    
                  }}
                  source={iconName}
                  />
                  </View>
              </View>
            );
          },
          headerShown: false,
          tabBarShowLabel: false,
        };
      }}
    >
      <Tabs.Screen name="index"  />
      <Tabs.Screen name="courses/index" />
      <Tabs.Screen name="search/index" />
      <Tabs.Screen name="profile/index" />
    </Tabs>
  );
}
