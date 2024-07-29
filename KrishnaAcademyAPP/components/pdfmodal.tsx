import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import Pdf from 'react-native-pdf';

const PDFViewerModal = ({ isVisible, onClose, pdfUri }) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.modal}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
        <Pdf
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
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#007bff',
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  pdf: {
    flex: 1,
    width: '100%',
  },
});

export default PDFViewerModal;