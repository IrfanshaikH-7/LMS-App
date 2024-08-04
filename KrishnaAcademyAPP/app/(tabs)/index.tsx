import HomeScreen from "@/screens/home/home.screen";
import ProfileScreen from "@/screens/profile/profile.screen";
import { Ionicons } from "@expo/vector-icons";
import { createDrawerNavigator, DrawerContent, DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";



import React from 'react';

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <View style={styles.section}>
        <Text style={styles.heading}>Others</Text>
        <DrawerItem
          label="Share App"
          onPress={() => {/* Add your share app logic here */}}
          icon={({ focused, size }) => (
            <Ionicons
              name="share-social"
              size={size}
              color={focused ? 'blue' : 'black'}
            />
          )}
        />
        <DrawerItem
          label="Rate Others"
          onPress={() => {/* Add your rate others logic here */}}
          icon={({ focused, size }) => (
            <Ionicons
              name="star"
              size={size}
              color={focused ? 'blue' : 'black'}
            />
          )}
        />
      </View>
    </DrawerContentScrollView>
  );
};



export default function index() {
  const Drawer = createDrawerNavigator();
  
  return (

    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
      {/* <Drawer.Screen
        name="index"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      /> */}
      <Drawer.Group
       options={{
        headerShown: false,
      }}
      >
        <Drawer.Screen
          name="index"
          component={HomeScreen}
      
          options={{
            headerShown: false,
            title: 'Home',
          
            drawerIcon: ({ focused, size }) => (
              <Ionicons
                name="home"
                size={size}
                color={focused ? 'blue' : 'black'}
              />
            ),
          }}
        />



<Drawer.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          title: 'Settings',
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name="settings"
              size={size}
              color={focused ? 'blue' : 'black'}
            />
          ),
        }}
      />
        
      </Drawer.Group>
    </Drawer.Navigator>




  )
}
const styles = StyleSheet.create({
  section: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 16,
    marginBottom: 10,
  },
});