import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { mockHabits } from '../constants/mockHabits';
import { useTheme } from '../context/ThemeContext';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: colors.background }]}>
      <FlatList
        data={mockHabits}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: colors.card }]}>
            <Text style={[styles.name, { color: colors.cardText }]}>{item.name}</Text>
            <Text style={[styles.type, { color: colors.type }]}>{item.type}</Text>
            <Text style={[styles.status, { color: colors.status }]}>{item.doneToday ? '✓' : ''}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  card: {
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    flex: 1,
  },
  type: {
    fontSize: 14,
    marginHorizontal: 8,
  },
  status: {
    fontSize: 16,
  },
}); 