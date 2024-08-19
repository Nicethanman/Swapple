import { View, Text, TouchableOpacity} from 'react-native'
import React from 'react'

interface ProfileButtonProps{
    username: string;
    handlePress: () => void;
    containerStyles: string;
    textStyles: string;
    profilePic: string;
}

const ProfileButton:  React.FC<ProfileButtonProps> = ({username, handlePress, containerStyles, textStyles, profilePic}) => {
  return (
    <TouchableOpacity 
        onPress={handlePress}
        activeOpacity={0.7}
        className={`bg-primary rounded-xl justify-center items-center mb-4 ${containerStyles}`}
    >
    <Text className={`text-lg ${textStyles}`}>{username}</Text>
    </TouchableOpacity>
  )
}

export default ProfileButton