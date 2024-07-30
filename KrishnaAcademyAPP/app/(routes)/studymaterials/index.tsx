import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import PaymentComponent from '@/components/Payment/PaymentComponent';
import PDFViewerModal from '../../../components/pdfmodal';



const StudyMaterials = () => {
    const route = useRoute();
    const { study } = route.params;
    const dataObj = JSON.parse(study);
    console.log("🚀 ~ StudyMaterials ~ dataObj:", dataObj)
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedPdfUri, setSelectedPdfUri] = useState('');
  
    const openPdfModal = (pdfUri) => {
      setSelectedPdfUri(pdfUri);
      setModalVisible(true);
    };
  
    const closePdfModal = () => {
      setModalVisible(false);
      setSelectedPdfUri('');
    };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Study Materials</Text>

   <FlatList
        data={dataObj}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item}
        //   onPress={() => openPdfModal(item.fileUrl)} // Open PDF modal on press
        //   onPress={() => console.log(item)} // Open PDF modal on press
        onPress={() => openPdfModal(item.fileUrl)}
        //   onPress={() =>router.push('StudyMaterialsScreen', { })}
          >
            <View style={styles.itemContent}>
              <AntDesign name="pdffile1" size={24} color="black" />
              <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
                {item.title}
              </Text>
              <Text
              style={{
                color: "#575757",
                fontFamily: "Nunito_400Regular",

              }}
              >{item.description.slice(0,15)}</Text>
              <PaymentComponent item={item} itemType="Study Material" />
            </View>
          </TouchableOpacity>
        )}
      />
        {/* <PDFViewerModal
        isVisible={isModalVisible}
        onClose={closePdfModal}
        pdfUri={selectedPdfUri}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,

  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 18,
    color: 'blue',
  }, 

  item: {
    flex: 1,
    marginBottom: 16,
    flexDirection: 'column',
    gap: 10,
    padding : 10,
    margin: 10,
    
    backgroundColor: 'rgb(233, 221, 221)1)',
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});

export default StudyMaterials;