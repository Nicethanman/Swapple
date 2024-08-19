import { View, Text, Image} from 'react-native'
import React from 'react'

const ProfilePic = () => {
  return (
    <View className='rounded-full bg-white'>
      <Image 
            source={require('../assets/icons/profile.png')}
            className="rounded-full p-10 w-24 h-24"
            resizeMode="stretch"
            >                
        </Image>
    </View>
  )
}

export default ProfilePic