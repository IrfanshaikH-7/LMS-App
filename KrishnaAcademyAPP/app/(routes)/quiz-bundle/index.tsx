
import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { courseData } from '@/screens/search/quiz.screen';
import { createDrawerNavigator } from '@react-navigation/drawer';


const { height, width } = Dimensions.get('window');


const InfoScreen = () => (
  <View style={styles.tabContent}>
    <Text>Info Content</Text>
  </View>
);

const ContentsScreen = () => (
  <View style={styles.tabContent}>
    <Text>Contents Content</Text>
  </View>
);



const Tab = createMaterialTopTabNavigator();

export default function index() {
  return (
    <SafeAreaView
    style={{
        flex:1,
        // alignItems: 'center',
        backgroundColor:'lightblue',
        flexDirection: 'column',
        justifyContent: 'flex-start',

    }}
    >
        <View style={{
            height: height * 0.3,
        }}>

          <Image
        source={{ uri: courseData[0].image }}
        style={styles.image}
        />
      <View style={styles.nameContainer}>
        <Text style={styles.name}>Quiz Bundle Name</Text>
      </View>
        </View>
        <View style={styles.tabContainer}>
        <Tab.Navigator>
      <Tab.Screen name="Home" component={InfoScreen} />
      <Tab.Screen name="Settings" component={ContentsScreen} />
    </Tab.Navigator>
      </View>


    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightblue',
      },
      drawerContainer: {
        flexDirection: 'row',
        height: height * 0.4,
      },
      drawerStyle: {
        width: width * 0.5,
      },
      screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    image: {
      width: '100%',
      height: height * 0.3,
    },
    nameContainer: {
      height: height * 0.1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    tabContent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    tabContainer: {
        flex: 1,
      },
      slide: {
        justifyContent: 'center',
        alignItems: 'center',
      },
    
      slideTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
      },
   
  });