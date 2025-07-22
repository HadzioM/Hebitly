import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, StyleSheet } from 'react-native';
import HomeScreen from './app/screens/HomeScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './app/context/ThemeContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <HomeScreen />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    color: '#2563eb',
    fontWeight: '600',
  },
  subtitle: {
    color: '#4b5563',
    marginTop: 8,
  },
});
