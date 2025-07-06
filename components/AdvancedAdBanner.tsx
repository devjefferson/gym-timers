import { Button } from '@tamagui/button';
import { Text, View } from '@tamagui/core';
import { XStack, YStack } from '@tamagui/stacks';
import React from 'react';

interface AdvancedAdBannerProps {
  visible?: boolean;
  title?: string;
  subtitle?: string;
  backgroundColor?: string;
  textColor?: string;
  showButton?: boolean;
  buttonText?: string;
  onButtonPress?: () => void;
  showCloseButton?: boolean;
  onClose?: () => void;
}

export default function AdvancedAdBanner({ 
  visible = true, 
  title = "ANÚNCIO",
  subtitle = "Espaço para publicidade",
  backgroundColor = "#FFD700",
  textColor = "#222",
  showButton = false,
  buttonText = "SAIBA MAIS",
  onButtonPress,
  showCloseButton = false,
  onClose
}: AdvancedAdBannerProps) {
  if (!visible) return null;

  return (
    <View
      width="100%"
      backgroundColor={backgroundColor}
      paddingHorizontal={16}
      paddingVertical={12}
      shadowColor="#000"
      shadowOffset={{ width: 0, height: 2 }}
      shadowOpacity={0.1}
      shadowRadius={4}
    >
      <XStack justifyContent="space-between" alignItems="center">
        {/* Conteúdo do Anúncio */}
        <YStack flex={1} alignItems="center" gap={4}>
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
          
          {showButton && (
            <Button
              backgroundColor={textColor}
              paddingHorizontal={12}
              paddingVertical={4}
              borderRadius={4}
              marginTop={4}
              onPress={onButtonPress}
            >
              <Text
                color={backgroundColor}
                fontWeight="bold"
                fontSize={10}
              >
                {buttonText}
              </Text>
            </Button>
          )}
        </YStack>
        
        {/* Botão de Fechar */}
        {showCloseButton && (
          <Button
            backgroundColor="transparent"
            paddingHorizontal={8}
            paddingVertical={4}
            onPress={onClose}
          >
            <Text
              color={textColor}
              fontSize={16}
              fontWeight="bold"
            >
              ×
            </Text>
          </Button>
        )}
      </XStack>
    </View>
  );
} 