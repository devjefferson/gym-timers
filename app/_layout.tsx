import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { TamaguiProvider } from '@tamagui/core';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import 'react-native-reanimated';
import config from '../tamagui.config';

import { ConfigProvider } from '@/components/ConfigContext';
import ReactNativeSplashScreen from '@/components/ReactNativeSplashScreen';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [showSplash, setShowSplash] = useState(true);
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  return (
    <TamaguiProvider config={config}>
      <ConfigProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
          
          {showSplash && (
            <ReactNativeSplashScreen onFinish={handleSplashFinish} duration={2500} />
          )}
        </ThemeProvider>
      </ConfigProvider>
    </TamaguiProvider>
  );
}
