import React from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';

export default function HomeLayout() {
  const [fontsLoaded, fontError] = useFonts({
    'outfit': require('../assets/fonts/Outfit-Regular.ttf'),
    'outfit-bold': require('../assets/fonts/Outfit-Bold.ttf'),
    'outfit-medium': require('../assets/fonts/Outfit-Medium.ttf'),
  });
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />

      <Stack.Screen
        name='add-new-category'
        options={{
          presentation: 'modal',
          headerShown: 'true',
          headerTitle: 'Add New Category',
        }}
      />
    </Stack>
  );
}
