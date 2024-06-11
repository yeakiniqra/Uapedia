import { Stack } from "expo-router";
import Events from "./Events";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{headerShown: false}} />
      <Stack.Screen name="Events" />
      <Stack.Screen name="(tabs)" options={{headerShown: false}} />
    </Stack>
  );
}
