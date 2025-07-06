import { Button } from '@tamagui/button';
import { Stack, Text } from '@tamagui/core';
import React from 'react';

interface TamaguiExampleProps {
  title: string;
  onPress?: () => void;
}

export function TamaguiExample({ title, onPress }: TamaguiExampleProps) {
  return (
    <Stack space="$4" padding="$4">
      <Text fontSize="$6" fontWeight="bold" color="$primary">
        {title}
      </Text>
      
      <Stack space="$3" flexDirection="row">
        <Button
          size="$4"
          theme="dark"
          backgroundColor="$preparar"
          color="$background"
          fontWeight="bold"
          onPress={onPress}
        >
          Preparar
        </Button>
        
        <Button
          size="$4"
          theme="dark"
          backgroundColor="$exercicio"
          color="$background"
          fontWeight="bold"
          onPress={onPress}
        >
          Exercício
        </Button>
        
        <Button
          size="$4"
          theme="dark"
          backgroundColor="$descansar"
          color="$background"
          fontWeight="bold"
          onPress={onPress}
        >
          Descansar
        </Button>
      </Stack>
      
      <Text fontSize="$4" color="$colorHover">
        Este é um exemplo de como usar os componentes do Tamagui no seu app de temporizador.
      </Text>
    </Stack>
  );
} 