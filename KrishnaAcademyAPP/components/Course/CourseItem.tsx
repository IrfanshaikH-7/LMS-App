
import { View, Text } from 'react-native'
import React from 'react'


import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { Image } from 'expo-image';

export default function CourseItem({ item }) {

    const randomNumber = Math.floor(Math.random() * 5);
    return (
        <View style={{
            padding: 5,
            backgroundColor: Colors.WHITE,
            marginRight: 15,
            borderRadius: 15,
        }}>
            <Image source={{ uri:  !item?.banner?.url ? item?.banner?.url : `https://res.cloudinary.com/dbnnlqq5v/image/upload/v1722503025/cld-sample-${randomNumber+2}.jpg` }}
                style={{ width: 200, height: 150, borderRadius: 15 }}
            />

            <View style={{ padding: 5 }}>
                <Text style={{
                    fontFamily: 'outfit-medium',
                    fontSize: 17,

                }}>
                    {item.name}
                </Text>
                <View style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                }}>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 5,
                        marginTop: 5
                    }}>
                        <Ionicons name="book-outline" size={18} color="black" />
                        <Text style={{ fontFamily: 'outfit' }}>{item.chapters?.length} Chapters</Text>
                    </View>
                    <View>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 5,
                            marginTop: 5
                        }}>
                            <Ionicons name="md-time-outline" size={18} color="black" />
                            <Text style={{ fontFamily: 'outfit' }}>{item.time} Hr</Text>
                        </View>
                    </View>
                </View>
                <Text style={{
                    marginTop: 5,
                    color: Colors.PRIMARY,
                    fontFamily: 'outfit-medium'
                }}>
                    {item.price == 0 ? 'Free' : item.price}
                </Text>
            </View>
        </View>
    )
}