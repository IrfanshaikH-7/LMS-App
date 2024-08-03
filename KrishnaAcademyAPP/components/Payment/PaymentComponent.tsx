import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// Import your payment gateway SDK here

const PaymentComponent = ({ isVisible, itemType, itemPrice, onClose, onPaymentSuccess }) => {
  const navigation = useNavigation();

  const [paymentStatus, setPaymentStatus] = useState<boolean | null>(null);

  const handlePayment = async () => {
    try {
      // Implement payment logic here using the payment gateway SDK
      // For example, using Stripe:
      // const paymentIntent = await createPaymentIntent(item.price);
      // const paymentResult = await confirmPayment(paymentIntent.client_secret);

      // On successful payment, navigate to the respective item screen
      // navigation.navigate(itemType, { item });
    } catch (error) {
      console.error('Payment failed', error);
    }
  };

  // const handlePayment = async () => {
  //   var options = {
  //     description: "Room Booking",
  //     image:
  //       "https://res.cloudinary.com/dgheyg3iv/image/upload/v1720931194/dmym7wh5u0vvhp2i1tki.png", //logo

  //     currency: "INR",
  //     key: "rzp_test_lmy83ka5bsXLz8",
  //     amount: `${PaymentPrice * 100}`,
  //     name: "Ekaant",
  //     order_id: "",
  //     prefill: {
  //       email: `${userData.user.email}`,
  //       contact: `${userData.user.phoneNumber}`,
  //       name: `${userData.user.username}`,
  //     },
  //   };
  //   RazorpayCheckout.open(options)
  //     .then((data) => {
  //       // handle success
  //       setPaymentStatus(true);
  //       setPaymentData(data);
  //       setPaymentId(data.razorpay_payment_id);
  //       // console.log(data, "Payment Success");

  //       setIsPaymentComplete(true);
  //       Toast.show("Payment Success", {
  //         successColor: "green",
  //         duration: 4000,
  //         icon: <Ionicons name="checkmark-circle" size={24} color="green" />,
  //       });
  //     })
  //     .catch((error) => {
  //       // handle failure
  //       setPaymentStatus(false);

  //       console.log(
  //         "Error in payment",
  //         error.code,
  //         error.description,
  //         error.source,
  //         error.metadata
  //       );
  //       alert(
  //         `Error: ${error.code} | ${error.description} | ${error.source} | ${error.metadata}`
  //       );
  //     });
  // };


  return (
    <Modal
    transparent={true}
    visible={isVisible}
    animationType="slide"
  >
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <Text style={styles.heading}>Purchase {itemType}</Text>
        {/* <Text style={styles.price}>Price: ${itemPrice}</Text> */}
        <TouchableOpacity style={styles.button} onPress={handlePayment}>
          <Text style={styles.buttonText}>Pay Now</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.closeButton} onPress={()=> console.log(' d ')}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    alignItems: 'center',
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
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 4,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
  },
  closeButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 4,
  },
  closeButtonText: {
    color: 'white',
  },
});

export default PaymentComponent;