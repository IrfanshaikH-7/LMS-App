
import CartScreen from "@/screens/cart/cart.screen";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export default function index() {
  return (
    <View style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      
    }}>
      <Text>Your cart is empty</Text>
      <Ionicons name="shopping-cart" size={24} color="black" />
    </View>
  );
}
