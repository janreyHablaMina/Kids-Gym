import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { usePlayNest } from '@/context/PlayNestContext';
import { PlayNestColors, Shadows } from '@/constants/playNestTheme';
import { PlayfulButton } from '@/components/PlayfulButton';
import { X, Check } from 'lucide-react-native';

const AVATAR_OPTIONS = [
  { emoji: '👧', bg: PlayNestColors.coralMuted, color: PlayNestColors.coral },
  { emoji: '🧒', bg: PlayNestColors.blueMuted, color: PlayNestColors.blue },
  { emoji: '👶', bg: PlayNestColors.yellowMuted, color: PlayNestColors.yellow },
  { emoji: '🦁', bg: PlayNestColors.orangeMuted, color: PlayNestColors.orange },
  { emoji: '🐼', bg: PlayNestColors.primaryMuted, color: PlayNestColors.primary },
  { emoji: '🚀', bg: PlayNestColors.tealMuted, color: PlayNestColors.teal },
];

const AGE_OPTIONS = [2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function AddChildModal() {
  const router = useRouter();
  const { addChild, activities } = usePlayNest();

  const [name, setName] = useState('');
  const [selectedAge, setSelectedAge] = useState(5);
  const [selectedAvatarIndex, setSelectedAvatarIndex] = useState(0);
  const [selectedActivity, setSelectedActivity] = useState(activities[0].name);
  const [notes, setNotes] = useState('');

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert('Child Name Required', 'Please enter your child’s name.');
      return;
    }

    const chosenAvatar = AVATAR_OPTIONS[selectedAvatarIndex];

    addChild({
      name: name.trim(),
      age: selectedAge,
      avatarEmoji: chosenAvatar.emoji,
      avatarBg: chosenAvatar.bg,
      favoriteActivity: selectedActivity,
      favoriteColor: chosenAvatar.color,
      allergiesOrNotes: notes.trim() || undefined,
    });

    router.back();
  };

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      {/* Top Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerSub}>NEW PROFILE</Text>
          <Text style={styles.headerTitle}>Add Child 👶</Text>
        </View>
        <Pressable onPress={() => router.back()} hitSlop={10} style={styles.closeBtn}>
          <X size={20} color={PlayNestColors.text} />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        
        {/* Child Avatar Picker */}
        <View style={styles.formSection}>
          <Text style={styles.sectionLabel}>Pick an Avatar Emoji</Text>
          <View style={styles.avatarRow}>
            {AVATAR_OPTIONS.map((av, idx) => {
              const isSelected = selectedAvatarIndex === idx;
              return (
                <Pressable
                  key={idx}
                  onPress={() => setSelectedAvatarIndex(idx)}
                  style={[
                    styles.avatarOption,
                    { backgroundColor: av.bg },
                    isSelected && {
                      borderColor: PlayNestColors.primary,
                      borderWidth: 3,
                      transform: [{ scale: 1.1 }],
                    },
                  ]}>
                  <Text style={styles.avatarOptionEmoji}>{av.emoji}</Text>
                  {isSelected && (
                    <View style={styles.selectedBadge}>
                      <Check size={10} color="#FFFFFF" strokeWidth={3} />
                    </View>
                  )}
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Name Input */}
        <View style={styles.formSection}>
          <Text style={styles.sectionLabel}>Child's First Name</Text>
          <TextInput
            placeholder="e.g. Oliver, Maya, Leo"
            placeholderTextColor={PlayNestColors.textMuted}
            value={name}
            onChangeText={setName}
            style={styles.textInput}
          />
        </View>

        {/* Age Selector */}
        <View style={styles.formSection}>
          <Text style={styles.sectionLabel}>Age (Years)</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.ageScroll}>
            {AGE_OPTIONS.map((age) => {
              const isSelected = selectedAge === age;
              return (
                <Pressable
                  key={age}
                  onPress={() => setSelectedAge(age)}
                  style={[
                    styles.ageChip,
                    isSelected && styles.ageChipSelected,
                  ]}>
                  <Text
                    style={[
                      styles.ageChipText,
                      isSelected && styles.ageChipTextSelected,
                    ]}>
                    {age}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* Favorite Activity */}
        <View style={styles.formSection}>
          <Text style={styles.sectionLabel}>Favorite or Target Activity</Text>
          <View style={styles.activityChoices}>
            {activities.map((act) => {
              const isSelected = selectedActivity === act.name;
              return (
                <Pressable
                  key={act.id}
                  onPress={() => setSelectedActivity(act.name)}
                  style={[
                    styles.activityChip,
                    isSelected && styles.activityChipSelected,
                  ]}>
                  <Text style={styles.actEmoji}>{act.emoji}</Text>
                  <Text
                    style={[
                      styles.actName,
                      isSelected && styles.actNameSelected,
                    ]}>
                    {act.name}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Notes / Allergies */}
        <View style={styles.formSection}>
          <Text style={styles.sectionLabel}>Special Notes or Allergies (Optional)</Text>
          <TextInput
            placeholder="e.g. Peanut allergy, sensitive to loud music, etc."
            placeholderTextColor={PlayNestColors.textMuted}
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={3}
            style={[styles.textInput, styles.textArea]}
          />
        </View>

        {/* Save CTA */}
        <PlayfulButton
          title="Save Child Profile ✨"
          size="lg"
          variant="primary"
          onPress={handleSave}
          style={{ marginTop: 10, marginBottom: 40 }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: PlayNestColors.canvas,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: PlayNestColors.borderLight,
  },
  headerSub: {
    fontSize: 10,
    fontWeight: '800',
    color: PlayNestColors.primary,
    letterSpacing: 1.2,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: PlayNestColors.text,
    letterSpacing: -0.3,
  },
  closeBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: PlayNestColors.primaryGhost,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  formSection: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: PlayNestColors.text,
    marginBottom: 10,
  },
  avatarRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  avatarOption: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  avatarOptionEmoji: {
    fontSize: 24,
  },
  selectedBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: PlayNestColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    fontWeight: '600',
    color: PlayNestColors.text,
    borderWidth: 1,
    borderColor: PlayNestColors.borderLight,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  ageScroll: {
    gap: 10,
  },
  ageChip: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: PlayNestColors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ageChipSelected: {
    backgroundColor: PlayNestColors.primary,
    borderColor: PlayNestColors.primary,
  },
  ageChipText: {
    fontSize: 16,
    fontWeight: '800',
    color: PlayNestColors.text,
  },
  ageChipTextSelected: {
    color: '#FFFFFF',
  },
  activityChoices: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  activityChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: PlayNestColors.borderLight,
  },
  activityChipSelected: {
    backgroundColor: PlayNestColors.primary,
    borderColor: PlayNestColors.primary,
  },
  actEmoji: {
    fontSize: 16,
    marginRight: 6,
  },
  actName: {
    fontSize: 13,
    fontWeight: '700',
    color: PlayNestColors.textSecondary,
  },
  actNameSelected: {
    color: '#FFFFFF',
  },
});
