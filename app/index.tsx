import { Text, View } from "react-native";
import {Redirect, router} from 'expo-router';
import { FONTFAMILY } from '../constants/theme.js';
import { useFonts } from 'expo-font';
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from '../components/CustomButton'


export default function Index() {

  const [fontsLoaded] = useFonts({
    'Fredoka': require("../assets/fonts/Fredoka-VariableFont_wdth,wght.ttf")
  });

  if(!fontsLoaded) return null;

  return (
    <SafeAreaView className="items-center">
      <View className="w-full justify-center items-center h-full">
        <Text className="py-20 text-7xl text-primary" style={{...FONTFAMILY.fredoka}}>Swapple</Text>
        <CustomButton 
          title="Continue to Login"
          handlePress= {() => router.push('/sign_in')}
          containerStyles="w-80 h-16 mt-2"
          textStyles="color-white"
          isLoading={false}
        />
      </View>
    </SafeAreaView>
  );
}
