import React from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { mockHabits } from '../constants/mockHabits';
import { useTheme } from '../context/ThemeContext';

export default function HomeScreen({ navigation }: { navigation?: any }) {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: colors.background }]}>
      <FlatList
        data={mockHabits}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, { backgroundColor: colors.card }]}
            onPress={() => navigation?.navigate('AddEditHabit', { habit: item })}
          >
            <Text style={[styles.name, { color: colors.cardText }]}>{item.name}</Text>
            <Text style={[styles.type, { color: colors.type }]}>{item.type}</Text>
            <Text style={[styles.status, { color: colors.status }]}>{item.doneToday ? '✓' : ''}</Text>
          </TouchableOpacity>
        )}
      />
      
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: colors.status }]}
        onPress={() => navigation?.navigate('AddEditHabit')}
      >
        <Text style={styles.fabText}>➕</Text>
      </TouchableOpacity>
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
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  fabText: {
    fontSize: 24,
    color: '#fff',
  },
}); 