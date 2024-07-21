import React, { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URI } from "@/utils/uri";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useUser() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>();
  const [error, setError] = useState("");
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    const subscription = async () => {
      const accessToken = await AsyncStorage.getItem("token");
      const user = await AsyncStorage.getItem("user");
      const isUser = JSON.parse(user);
      console.log("user", isUser);
      if (accessToken && user ) {
        setUser(isUser);
        setLoading(false);
      }
        
    }
    subscription();
  }, [refetch]);

  return { loading, user, error, setRefetch, refetch };
}
