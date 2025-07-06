import { Text, View } from '@tamagui/core';
import { YStack } from '@tamagui/stacks';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

interface SplashScreenProps {
  onFinish: () => void;
  duration?: number;
}

export default function SplashScreen({ onFinish, duration = 2000 }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onFinish, 300); // Aguarda a animação de fade out
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onFinish]);

  if (!isVisible) {
    return null;
  }

  return (
    <View
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
      backgroundColor="#222"
      alignItems="center"
      justifyContent="center"
      zIndex={9999}
    >
      <YStack alignItems="center" gap={24}>
        {/* Logo/Ícone */}
        <View
          width={120}
          height={120}
          borderRadius={60}
          backgroundColor="#FFF700"
          alignItems="center"
          justifyContent="center"
          shadowColor="#000"
          shadowOffset={{ width: 0, height: 4 }}
          shadowOpacity={0.3}
          shadowRadius={8}
        >
          <Text
            fontSize={48}
            fontWeight="bold"
            color="#222"
          >
            ⏱️
          </Text>
        </View>

        {/* Título */}
        <YStack alignItems="center" gap={8}>
          <Text
            fontSize={32}
            fontWeight="bold"
            color="#FFF700"
            letterSpacing={2}
          >
            GYM TIMERS
          </Text>
          <Text
            fontSize={16}
            color="#aaa"
            textAlign="center"
          >
            Seu temporizador de treinos
          </Text>
        </YStack>

        {/* Loading */}
        <YStack alignItems="center" gap={12}>
          <ActivityIndicator size="large" color="#FFF700" />
          <Text
            fontSize={14}
            color="#666"
            textAlign="center"
          >
            Carregando...
          </Text>
        </YStack>
      </YStack>
    </View>
  );
} 