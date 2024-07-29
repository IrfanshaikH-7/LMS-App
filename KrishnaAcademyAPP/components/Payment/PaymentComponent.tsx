import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// Import your payment gateway SDK here

const PaymentComponent = ({ item, itemType }) => {
  const navigation = useNavigation();

  const handlePayment = async () => {
    try {
      // Implement payment logic here using the payment gateway SDK
      // For example, using Stripe:
      // const paymentIntent = await createPaymentIntent(item.price);
      // const paymentResult = await confirmPayment(paymentIntent.client_secret);

      // On successful payment, navigate to the respective item screen
      navigation.navigate(itemType, { item });
    } catch (error) {
      console.error('Payment failed', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Purchase {itemType}</Text>
      <Text style={styles.price}>Price: ${item.price}</Text>
      <TouchableOpacity style={styles.button} onPress={handlePayment}>
        <Text style={styles.buttonText}>Pay Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  heading: {
    fontSize: 24,
    marginBottom: 16,
  },
  price: {
    fontSize: 18,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default PaymentComponent;