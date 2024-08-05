import React, { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URI } from "@/utils/uri";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Device from 'expo-device';

import { Platform } from "react-native";

import * as Cellular from 'expo-cellular';


export default function useUser() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>();
  const [error, setError] = useState("");
  const [refetch, setRefetch] = useState(false);




const collectDeviceData = async () => {
  try {
    var carrierName = await Cellular.getCarrierNameAsync();



    const deviceData = {
      // deviceId: Platform.OS === 'ios' ? Device.model : Device.androidId, // Be aware of Android ID limitations
      deviceName: Device.modelName,
      systemName: Device.osName,
      systemVersion: Device.osVersion,
      carrier  : carrierName,

    };
    console.log("🚀 ~ collectDeviceData ~ deviceData:", deviceData)
    // Additional data points you might consider:
    // deviceLocale: Device.locale,
    // screenSize: `${Dimensions.get('window').width}x${Dimensions.get('window').height}`,
    // ...

    return deviceData;
  } catch (error) {
    console.error('Error collecting device data:', error);
    return null;
  }
};

  useEffect(() => {
collectDeviceData();



    const subscription = async () => {
      const accessToken = await AsyncStorage.getItem("token");
      const user = await AsyncStorage.getItem("user");
      const isUser = JSON.parse(user);
      console.log("user", isUser);
      if (accessToken && user ) {
        setUser(isUser);
        setLoading(false);
      }
      setLoading(false);
        
    }
    subscription();
  }, [refetch]);

  return { loading, user, error, setRefetch, refetch };
}
