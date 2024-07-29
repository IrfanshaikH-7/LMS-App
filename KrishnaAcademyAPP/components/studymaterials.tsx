import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { SERVER_URI } from '@/utils/uri';

import {
    AntDesign,
    FontAwesome,
    Ionicons,
    MaterialCommunityIcons,
  } from "@expo/vector-icons";
import { router, useNavigation } from 'expo-router';
import PDFViewerModal from './pdfmodal';

interface StudyMaterial {
  _id: string;
  title: string;
  description: string;
  // Add other fields as necessary
}

const StudyMaterialsList: React.FC = () => {


  const [studyMaterials, setStudyMaterials] = useState<StudyMaterial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
const [refreshing, setRefreshing] = useState(false);
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
  useEffect(() => {
    const fetchStudyMaterials = async () => {
      try {
        const response = await axios.get(`${SERVER_URI}/api/v1/study/getAllStudyMaterials`)
        console.log(response.data, "---");
        setStudyMaterials(response.data.data.slice(0, 5)); // Limit to 10 items
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch study materials');
        setLoading(false);
      }
    };

    fetchStudyMaterials();
  }, [refreshing]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <TouchableOpacity style={styles.centered}
      onPress={() => {
        setError(null);
        setLoading(true);
        setRefreshing(!refreshing);
      }}
      >
        <Text>{error}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>

      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
      }}>
        <Text style={styles.heading}>Study Materials</Text>
        <TouchableOpacity onPress={() => router.push({
            pathname: '(routes)/studymaterials',
            params: {study :   JSON.stringify(studyMaterials)},
        })}>
        <Ionicons name="arrow-forward" size={30} color="gray" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={studyMaterials}
        numColumns={3}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item}
        //   onPress={() => openPdfModal(item.pdfUri)} // Open PDF modal on press
          >
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
            }}>

            <AntDesign name="pdffile1" size={24} color="black"   numberOfLines={1}
  ellipsizeMode="tail" />
            <Text style={styles.title}>{item.title}</Text>
            </View>
            <Text>{item.description.slice(0,5)}</Text>
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
    // marginBottom: 16,
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
});

export default StudyMaterialsList;