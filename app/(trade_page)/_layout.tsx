import { Stack } from "expo-router";

export default function TradePageLayout() {

  return (
    <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="requestTrade"/>
    </Stack>
  );
}