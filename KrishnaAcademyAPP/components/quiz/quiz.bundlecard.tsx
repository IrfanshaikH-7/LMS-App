import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const QuizBundleCard = ({ quizzes }) => {
  return (
    <View style={styles.container}>
      {quizzes.map((quiz) => (
        <View key={quiz.id} style={styles.quizCard}>
          <Image
            source={{
              uri: "https://img.freepik.com/free-vector/realistic-wooden-brown-judge-gavel_88138-139.jpg?size=626&ext=jpg&ga=GA1.1.1387862008.1722622005&semt=sph",

            }}
            style={styles.quizImage}
          />
          <View style={styles.quizInfo}>
            <Text style={styles.itemTitle}>{quiz.name}</Text>
            <Text style={{
                fontSize: 14,
                color: '#666',
                // width: '100%',
                height: 50,
                
                overflow: 'hidden',
                textAlign: 'justify'
            }}> Lorem, ipsum dolor sit amet consectetur  </Text>
            <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                width: '100%',
            }}
            >



            <Text style={styles.itemTitle}>time 1 Hr</Text>
            <Text style={styles.itemSubtitle}>Questions: {quiz.questions}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  quizCard: {
    // backgroundColor: '#fff',
    backgroundColor: '#f2eded',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 20,
    height: 120,
    width: '100%',
    paddingHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  quizImage: {
    width: '20%',
    height: 70,
    borderRadius: 50,
  },
  quizInfo: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 10,
    height: '95%',

    
    marginVertical: 10,
    borderRadius: 10,
    width: '85%',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemSubtitle: {
    fontSize: 14,
    color: '#666',
  },
});

export default QuizBundleCard;