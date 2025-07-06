import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FFF700',
        tabBarInactiveTintColor: '#888',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            backgroundColor: '#222',
            borderTopWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
          },
          default: {
            backgroundColor: '#222',
            borderTopWidth: 0,
            elevation: 0,
          },
        }),
        tabBarLabelStyle: {
          fontFamily: 'System',
          fontWeight: 'bold',
          fontSize: 12,
          letterSpacing: 1,
          marginTop: 2,
        },
        tabBarIconStyle: {
          marginBottom: 2,
        },
      }}>
      <Tabs.Screen
        name="timer"
        options={{
          title: 'Treino',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="stopwatch" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Personalizar',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paintbrush" color={color} />,
        }}
      />
    </Tabs>
  );
}
