import { useRoute } from '@react-navigation/native';

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from "expo-router";
import WebView from 'react-native-webview';

const PDFViewerScreen = () => {
  const route = useRoute();




  const { pdfUri } = route.params;

  console.log(pdfUri);
  const googleDocsViewerUri = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(pdfUri)}`;

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
      <WebView
            source={{ uri: googleDocsViewerUri }}
        style={styles.webview}
      />
      {/* <Pdf
        source={{ uri: pdfUri }}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`);
        }}
        onError={(error) => {
          console.log(error);
        }}
        style={styles.pdf}
      /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
  closeButton: {
    padding: 10,
  },
  closeButtonText: {
    color: 'blue',
  },
  pdf: {
    flex: 1,
  },
  webview: {
    flex: 1,

  },
});

export default PDFViewerScreen;