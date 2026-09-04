import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { usePlayNest } from '@/context/PlayNestContext';
import { ActivityCategory } from '@/types';
import { PlayNestColors } from '@/constants/playNestTheme';
import { ActivityCard } from '@/components/ActivityCard';
import { Search, X, Sparkles, Filter } from 'lucide-react-native';

const CATEGORIES: { id: ActivityCategory; label: string; emoji: string }[] = [
  { id: 'all', label: 'All Fun', emoji: '🌈' },
  { id: 'gymnastics', label: 'Gymnastics', emoji: '🤸‍♀️' },
  { id: 'ninja', label: 'Ninja', emoji: '🥷' },
  { id: 'toddlers', label: 'Toddlers', emoji: '🧸' },
  { id: 'dance', label: 'Dance', emoji: '💃' },
  { id: 'sports', label: 'Sports', emoji: '🚀' },
  { id: 'indoor_play', label: 'Indoor Play', emoji: '🏰' },
];

export default function ActivitiesScreen() {
  const router = useRouter();
  const { activities, isFavorite, toggleFavorite } = usePlayNest();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ActivityCategory>('all');

  const filteredActivities = useMemo(() => {
    return activities.filter((act) => {
      const matchesCategory =
        selectedCategory === 'all' || act.category === selectedCategory;
      const matchesSearch =
        act.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        act.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        act.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        act.ageRange.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activities, selectedCategory, searchQuery]);

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerSub}>DISCOVER & LEARN</Text>
          <Text style={styles.headerTitle}>Classes & Play 🤸</Text>
        </View>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{filteredActivities.length} available</Text>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Search size={18} color={PlayNestColors.textMuted} style={styles.searchIcon} />
        <TextInput
          placeholder="Search gymnastics, ninja, toddler..."
          placeholderTextColor={PlayNestColors.textMuted}
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />
        {searchQuery.length > 0 && (
          <Pressable onPress={() => setSearchQuery('')} hitSlop={8} style={styles.clearBtn}>
            <X size={16} color={PlayNestColors.textSecondary} />
          </Pressable>
        )}
      </View>

      {/* Horizontal Category Filter Pills */}
      <View style={styles.filterRow}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryPillsScroll}>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <Pressable
                key={cat.id}
                onPress={() => setSelectedCategory(cat.id)}
                style={[
                  styles.categoryPill,
                  isSelected && styles.categoryPillSelected,
                ]}>
                <Text style={styles.pillEmoji}>{cat.emoji}</Text>
                <Text
                  style={[
                    styles.pillLabel,
                    isSelected && styles.pillLabelSelected,
                  ]}>
                  {cat.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {/* Activity Cards List */}
      <ScrollView
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}>
        {filteredActivities.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🔍</Text>
            <Text style={styles.emptyTitle}>No activities found</Text>
            <Text style={styles.emptySubtitle}>
              Try searching with another keyword or pick "All Fun" to see all sessions!
            </Text>
            <Pressable
              onPress={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              style={styles.resetBtn}>
              <Text style={styles.resetBtnText}>Clear Filters</Text>
            </Pressable>
          </View>
        ) : (
          filteredActivities.map((act) => (
            <ActivityCard
              key={act.id}
              activity={act}
              variant="list"
              isFavorite={isFavorite(act.id)}
              onToggleFavorite={toggleFavorite}
              onPress={() =>
                router.push({
                  pathname: '/activities/[id]',
                  params: { id: act.id },
                })
              }
            />
          ))
        )}
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
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 14,
  },
  headerSub: {
    fontSize: 10,
    fontWeight: '800',
    color: PlayNestColors.primary,
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: PlayNestColors.text,
    letterSpacing: -0.4,
  },
  countBadge: {
    backgroundColor: PlayNestColors.primaryMuted,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
  },
  countText: {
    fontSize: 12,
    fontWeight: '800',
    color: PlayNestColors.primary,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    paddingHorizontal: 14,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: PlayNestColors.borderLight,
    marginBottom: 12,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: PlayNestColors.text,
  },
  clearBtn: {
    padding: 4,
  },
  filterRow: {
    marginBottom: 14,
  },
  categoryPillsScroll: {
    paddingHorizontal: 20,
    gap: 8,
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: PlayNestColors.borderLight,
  },
  categoryPillSelected: {
    backgroundColor: PlayNestColors.primary,
    borderColor: PlayNestColors.primary,
  },
  pillEmoji: {
    fontSize: 16,
    marginRight: 6,
  },
  pillLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: PlayNestColors.textSecondary,
  },
  pillLabelSelected: {
    color: '#FFFFFF',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 30,
  },
  emptyEmoji: {
    fontSize: 50,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: PlayNestColors.text,
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 13,
    color: PlayNestColors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 16,
  },
  resetBtn: {
    backgroundColor: PlayNestColors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  resetBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
});
