import { Text, View } from '@tamagui/core';
import { YStack } from '@tamagui/stacks';
import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

interface CustomSplashScreenProps {
  visible: boolean;
}

export default function CustomSplashScreen({ visible }: CustomSplashScreenProps) {
  if (!visible) return null;

  return (
    <>
      <StatusBar style="light" backgroundColor="#222" />
      <View
        flex={1}
        backgroundColor="#222"
        alignItems="center"
        justifyContent="center"
        paddingHorizontal={20}
      >
        <YStack alignItems="center" gap={20}>
          {/* Logo/Ícone */}
          <View
            width={120}
            height={120}
            alignItems="center"
            justifyContent="center"
          >
            <Image
              source={require('@/assets/images/splash-icon.png')}
              style={{
                width: 120,
                height: 120,
              }}
              contentFit="contain"
            />
          </View>
          
          {/* Nome do App */}
          <Text
            fontSize={28}
            fontWeight="bold"
            color="#FFF700"
            letterSpacing={3}
            textAlign="center"
          >
            GYM TIMERS
          </Text>
          
          {/* Subtítulo */}
          <Text
            fontSize={16}
            color="#fff"
            opacity={0.8}
            letterSpacing={2}
            textAlign="center"
          >
            HIIT TIMER
          </Text>
          
          {/* Indicador de carregamento */}
          <View
            width={40}
            height={4}
            backgroundColor="#FFF700"
            borderRadius={2}
            marginTop={20}
          />
        </YStack>
      </View>
    </>
  );
} 