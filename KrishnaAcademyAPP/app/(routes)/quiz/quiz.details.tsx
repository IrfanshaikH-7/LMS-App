



import { SERVER_URI } from '@/utils/uri'
import { useRoute } from '@react-navigation/native'
import axios from 'axios'
import React, { useEffect } from 'react'
import { View, Text } from 'react-native'


type Props = {}

const quizDetails = (props: Props) => {


    const route = useRoute()

    const { quizId } = route.params;

    const [quizDetails, setQuizDetails] = React.useState<any>(null)

    useEffect(() => {
        const getQuizDetails = async () => {


            const res = await axios.get(`${SERVER_URI}/api/v1/quiz/getQuizById/${quizId}`)

            console.log('quizDetails', res.data.data)
            setQuizDetails(res.data)
        
        }
        quizId && getQuizDetails();


    }, [])

    console.log('quizDetails',quizId)
  return (
    <View>
      <Text>quizDetails</Text>
    </View>
  )
}

export default quizDetails