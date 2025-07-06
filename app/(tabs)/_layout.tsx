import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Settings2, Timer } from '@tamagui/lucide-icons';

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
          tabBarIcon: ({ color }) => <Timer size={28}  color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Personalizar',
          tabBarIcon: ({ color }) =>  <Settings2 size={28}  color={color} />,
        }}
      />
    </Tabs>
  );
}
