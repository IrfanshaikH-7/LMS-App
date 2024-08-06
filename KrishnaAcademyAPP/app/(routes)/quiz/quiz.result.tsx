import React from "react";
import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

const arrayOfObjects = [
  { color: 'red', title: 'Apple', alpha: 'a' },
  { color: 'blue', title: 'Blueberry', alpha: 'b' },
  { color: 'green', title: 'Grapes', alpha: 'c' },
  { color: 'yellow', title: 'Lemon', alpha: 'd' },
  { color: 'orange', title: 'Orange', alpha: 'e' },
  { color: 'purple', title: 'Plum', alpha: 'f' }
];
export default function quizresult() {
  return (
    <SafeAreaView style={{padding:12}}>
      <FlatList
      data={arrayOfObjects}
      numColumns={3}
      renderItem={({ item }) => (
        <View style={{ flex: 1,alignItems:'center', justifyContent:'center', padding: 10,margin:8,borderRadius: 14, height:100,borderWidth:1, borderColor: item.color }}>
        <Text>{item.alpha}</Text>
        <Text>{item.title}</Text>
      </View>)}
      keyExtractor={(item) => item.title}
    />
    </SafeAreaView>
  )
}