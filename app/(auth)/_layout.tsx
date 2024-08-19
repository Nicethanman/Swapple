
import { Stack } from "expo-router";
import {useEffect} from 'react'

export default function AuthLayout() {

  return (
    <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="sign_in"/>
    </Stack>
  );
}
