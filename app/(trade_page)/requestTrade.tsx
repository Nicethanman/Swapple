import { View, Text } from 'react-native'
import {useLocalSearchParams} from 'expo-router'
import React from 'react'

const requestTrade = () => {

  const {id} = useLocalSearchParams();

  return (
    <View>
      <Text>{id}</Text>
    </View>
  )
}

export default requestTrade