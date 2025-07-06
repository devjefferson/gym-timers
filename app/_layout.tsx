import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { TamaguiProvider } from '@tamagui/core';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import config from '../tamagui.config';

import { ConfigProvider } from '@/components/ConfigContext';
import SimpleSplashScreen from '@/components/SimpleSplashScreen';
import { useColorScheme } from '@/hooks/useColorScheme';

// Manter a splash screen visível
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [appIsReady, setAppIsReady] = useState(false);
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      try {
        // Aguardar carregamento das fontes
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn('Erro durante inicialização:', e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (appIsReady && loaded) {
      // Esconder a splash screen
      SplashScreen.hideAsync();
    }
  }, [appIsReady, loaded]);

  // Mostrar splash screen personalizada enquanto carrega
  if (!loaded || !appIsReady) {
    return <SimpleSplashScreen visible={true} />;
  }

  return (
    <SafeAreaProvider>
      <TamaguiProvider config={config}>
        <ConfigProvider>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="light" backgroundColor="#222" />
          </ThemeProvider>
        </ConfigProvider>
      </TamaguiProvider>
    </SafeAreaProvider>
  );
}
