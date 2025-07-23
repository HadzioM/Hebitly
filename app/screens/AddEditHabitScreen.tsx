import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';

interface Habit {
  id: string;
  name: string;
  type: 'daily' | 'weekly' | 'monthly';
  doneToday?: boolean;
}

interface AddEditHabitScreenProps {
  route?: {
    params?: {
      habit?: Habit;
    };
  };
  navigation?: any;
}

export default function AddEditHabitScreen({ route, navigation }: AddEditHabitScreenProps) {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  
  const [name, setName] = useState('');
  const [type, setType] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [emoji, setEmoji] = useState('');

  const habit = route?.params?.habit;
  const isEditing = !!habit;

  useEffect(() => {
    if (habit) {
      setName(habit.name);
      setType(habit.type);
      const emojiMatch = habit.name.match(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u);
      if (emojiMatch) {
        setEmoji(emojiMatch[0]);
        setName(habit.name.replace(emojiMatch[0], '').trim());
      }
    }
  }, [habit]);

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter habit name');
      return;
    }

    const habitData = {
      id: habit?.id || Date.now().toString(),
      name: emoji ? `${name.trim()} ${emoji}` : name.trim(),
      type,
      doneToday: habit?.doneToday || false,
    };

    if (isEditing) {
      Alert.alert('Success', 'Habit updated successfully');
    } else {
      Alert.alert('Success', 'Habit added successfully');
    }

    navigation?.goBack();
  };

  const habitTypes: Array<{ key: 'daily' | 'weekly' | 'monthly'; label: string }> = [
    { key: 'daily', label: 'Daily' },
    { key: 'weekly', label: 'Weekly' },
    { key: 'monthly', label: 'Monthly' },
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.backButton}>
          <Text style={[styles.backButtonText, { color: colors.cardText }]}>Cancel</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.cardText }]}>
          {isEditing ? 'Edit Habit' : 'Add Habit'}
        </Text>
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={[styles.saveButtonText, { color: colors.status }]}>Save</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.cardText }]}>Habit Name</Text>
          <TextInput
            style={[styles.textInput, { backgroundColor: colors.card, color: colors.cardText, borderColor: colors.type }]}
            value={name}
            onChangeText={setName}
            placeholder="Enter habit name"
            placeholderTextColor={colors.type}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.cardText }]}>Emoji (optional)</Text>
          <TextInput
            style={[styles.textInput, { backgroundColor: colors.card, color: colors.cardText, borderColor: colors.type }]}
            value={emoji}
            onChangeText={setEmoji}
            placeholder="Enter emoji"
            placeholderTextColor={colors.type}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: colors.cardText }]}>Habit Type</Text>
          <View style={styles.typeButtons}>
            {habitTypes.map((habitType) => (
              <TouchableOpacity
                key={habitType.key}
                style={[
                  styles.typeButton,
                  { backgroundColor: type === habitType.key ? colors.status : colors.card },
                  { borderColor: colors.type }
                ]}
                onPress={() => setType(habitType.key)}
              >
                <Text
                  style={[
                    styles.typeButtonText,
                    { color: type === habitType.key ? colors.background : colors.cardText }
                  ]}
                >
                  {habitType.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  saveButton: {
    padding: 8,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  form: {
    flex: 1,
    padding: 16,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  typeButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  typeButton: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  typeButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
}); 