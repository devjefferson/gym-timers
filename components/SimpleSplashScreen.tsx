import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface SimpleSplashScreenProps {
  visible: boolean;
}

export default function SimpleSplashScreen({ visible }: SimpleSplashScreenProps) {
  if (!visible) return null;

  return (
    <>
      <StatusBar style="light" backgroundColor="#222" />
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>GYM TIMERS</Text>
          <Text style={styles.subtitle}>HIIT TIMER</Text>
          <View style={styles.loader} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  content: {
    alignItems: 'center',
    gap: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF700',
    letterSpacing: 3,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
    letterSpacing: 2,
    textAlign: 'center',
  },
  loader: {
    width: 40,
    height: 4,
    backgroundColor: '#FFF700',
    borderRadius: 2,
    marginTop: 20,
  },
}); 