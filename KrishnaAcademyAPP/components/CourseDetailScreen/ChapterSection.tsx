import { View, Text, ToastAndroid } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../Utils/Colors';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { CompleteChapterContext } from '../../Context/CompleteChapterContext';

export default function ChapterSection({ chapterList, userEnrolledCourse }) {

  const navigation = useNavigation();
  const { setIsChapterComplete } = useContext(CompleteChapterContext);
  const onChapterPress = (chapter) => {

    if (userEnrolledCourse.length == 0) {
      ToastAndroid.show('Please Enroll Course', ToastAndroid.LONG)
      return;
    }
    else {
      setIsChapterComplete(false);
      navigation.navigate('chapter-content', {
        content: chapter.content,
        chapterId: chapter.id,
        userCourseRecordId: userEnrolledCourse[0]?.id
      })
    }

  }

  const isChapterCompleted = (chapterId) => {

    if (userEnrolledCourse[0]?.completedChapter?.length <= 0) {
      return false;
    }

    const completedChapters = userEnrolledCourse[0]?.completedChapter;


    const res = userEnrolledCourse[0]?.completedChapter?.find(item => item.chapterId == chapterId);
    return !!res;
  }


  return chapterList && (
    <View style={{
      padding: 10,
      backgroundColor: Colors.WHITE,
      marginTop: 20,
      borderRadius: 15
    }}>
      <Text style={{ fontFamily: 'outfit-medium', fontSize: 22 }}>Chapters</Text>
      {chapterList.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={[isChapterCompleted(item.id) ? styles.CompletedChapter : styles.inCompleteChapter]}
            onPress={() => onChapterPress(item)}
          >
            <View style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              marginRight: 5
            }}>
              {isChapterCompleted(item.id) ?
                <Ionicons name="checkmark-circle" size={25} color={Colors.GREEN} />
                : <Text style={{ fontFamily: 'outfit-medium', fontSize: 27, color: Colors.GRAY }}>{index + 1}</Text>
              }
              <Text style={{ fontFamily: 'outfit', fontSize: 15, color: Colors.GRAY }}>{item.title}</Text>
            </View>

            {userEnrolledCourse.length === 0 ?
              <Ionicons name="md-lock-closed" size={25} color={Colors.GRAY} />
              : (isChapterCompleted(item.id)
                ? <Ionicons name="play" size={25} color={Colors.GREEN} />
                : <Ionicons name="play" size={25} color={Colors.GRAY} />)
            }
          </TouchableOpacity>
        )
      }
      )}
    </View>
  )
}

const styles = StyleSheet.create({

  inCompleteChapter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    marginTop: 10,
    borderColor: Colors.GRAY
  },
  CompletedChapter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.LIGHT_GREEN,
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    marginTop: 10,
    borderColor: Colors.GREEN
  }


})