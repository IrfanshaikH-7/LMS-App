import { View, Text, Dimensions, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'
import OptionItem from './OptionItem'
import { StyleSheet } from 'react-native'

export default function DetailSection({ course,enrollCourse,userEnrolledCourse}) {
  return (
    <View style={{
      padding: 10,
      borderRadius: 15,
      backgroundColor: Colors.WHITE,
    }}>
      <Image source={{ uri: course?.banner?.url }}
        style={{
          width: Dimensions.get('screen').width * 0.83,
          height: 190,
          borderRadius: 15,
        }}
      />

      <View style={{ padding: 10 }}>
        <Text style={{
          fontFamily: 'outfit-medium',
          fontSize: 22,
          marginTop: 10,
        }}>{course.name}</Text>
        <View>
          <View style={styles.rowStyle}>
            <OptionItem icon={'book-outline'} value={course?.chapters?.length + " Chapters"} />
            <OptionItem icon={'md-time-outline'} value={course?.time + " Hr"} />
          </View>
          <View style={styles.rowStyle}>
            <OptionItem icon={'person-circle-outline'} value={course?.author} />
            <OptionItem icon={'cellular-outline'} value={course?.level} />
          </View>
        </View>
        <View>
          <Text style={{ fontFamily: 'outfit-medium', fontSize: 20 }}>Description</Text>
          <Text style={{ fontFamily: 'outfit', lineHeight: 23, color: Colors.GRAY }}>{course.description.markdown}</Text>
        </View>

        <View style={{ display: 'flex', flexDirection: 'row', gap:20, justifyContent:'space-evenly' }}>
          
          {userEnrolledCourse?.length == 0 ?
          <TouchableOpacity
            style={{
            padding: 15,
            backgroundColor: Colors.PRIMARY,
            borderRadius: 10,
          }}
            onPress={()=>enrollCourse()}
          >
            <Text style={{
              fontFamily: 'outfit',
              color: Colors.WHITE,
              textAlign: 'center',
              fontSize: 17
            }}>Enrol For Free</Text>
          </TouchableOpacity> : null
          }

          <TouchableOpacity style={{
            padding: 15,
            backgroundColor: Colors.SECONDARY,
            borderRadius: 15,
          }}>
            <Text style={{
              fontFamily: 'outfit',
              color: Colors.WHITE,
              textAlign: 'center',
              fontSize: 17
            }}>Membership $399</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  rowStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  }
})
