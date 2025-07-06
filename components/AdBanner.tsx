import { Text, View } from '@tamagui/core';
import { YStack } from '@tamagui/stacks';
import React from 'react';

interface AdBannerProps {
  visible?: boolean;
  title?: string;
  subtitle?: string;
  backgroundColor?: string;
  textColor?: string;
}

export default function AdBanner({ 
  visible = true, 
  title = "ANÚNCIO",
  subtitle = "Espaço para publicidade",
  backgroundColor = "#FFD700",
  textColor = "#222"
}: AdBannerProps) {
  if (!visible) return null;

  return (
    <View
      width="100%"
      backgroundColor={backgroundColor}
      paddingHorizontal={16}
      paddingVertical={12}
      alignItems="center"
      justifyContent="center"
      shadowColor="#000"
      shadowOffset={{ width: 0, height: 2 }}
      shadowOpacity={0.1}
      shadowRadius={4}
    >
      <YStack alignItems="center" gap={4}>
        <Text
          fontSize={14}
          fontWeight="bold"
          color={textColor}
          letterSpacing={1}
        >
          {title}
        </Text>
        <Text
          fontSize={12}
          color={textColor}
          opacity={0.8}
          textAlign="center"
        >
          {subtitle}
        </Text>
      </YStack>
    </View>
  );
} 