import React from "react";
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
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
    <SafeAreaView style={{ flex: 1, padding: 12 }}>
      <FlatList
        data={arrayOfObjects}
        numColumns={3}
        renderItem={({ item }) => (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10, margin: 8, borderRadius: 14, height: 100, borderWidth: 1, borderColor: item.color }}>
            <Text>{item.alpha}</Text>
            <Text>{item.title}</Text>
          </View>)}
        keyExtractor={(item) => item.title}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', bottom: 0, left: 0, right: 0, padding: 12, gap: 12 }}>
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "white",
            borderWidth: 1,
            padding: 16,
            borderRadius: 4,
          }}
        >
          <Text style={{
            textAlign: 'center',
                color: "black",
          }}>Re-attempt Test</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "#f44336",
            padding: 16,
            borderRadius: 4,
          }}

        >
          <Text style={{
            textAlign: 'center',
            color: "white",
          }}>Solutions</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  )
}