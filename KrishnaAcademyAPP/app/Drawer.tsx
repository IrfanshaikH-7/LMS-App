// // components/drawer/DrawerContent.tsx
// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

// const DrawerContent = (props) => {
//   const { data } = props;
//   console.log(data, "123");

//   return (
//     <DrawerContentScrollView {...props}>
//     <View style={styles.container}>
//       <Text style={styles.title}>Sidebar Data</Text>
//       {data && data.map((item, index) => (
//         <Text key={index} style={styles.item}>{item}</Text>
//       ))}
//     </View>
//     <DrawerItemList {...props} />
//   </DrawerContentScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   item: {
//     fontSize: 16,
//     marginBottom: 4,
//   },
// });

// export default DrawerContent;