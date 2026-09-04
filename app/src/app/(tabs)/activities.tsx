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
import { ActivityCard } from '@/components/ActivityCard';
import { Search } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const gymnasticsArtwork = require('../../../assets/images/activity-gymnastics.png');
const playZoneArtwork = require('../../../assets/images/activity-play-zone.png');
const ninjaArtwork = require('../../../assets/images/activity-ninja-kids.png');
const danceArtwork = require('../../../assets/images/activity-dance.png');

const CATEGORIES: { id: ActivityCategory; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'gymnastics', label: 'Gymnastics' },
  { id: 'indoor_play', label: 'Play' },
  { id: 'ninja', label: 'Ninja' },
  { id: 'dance', label: 'Dance' },
  { id: 'sports', label: 'Sports' },
  { id: 'toddlers', label: 'Toddlers' },
];

export default function ActivitiesScreen() {
  const router = useRouter();
  const { activities, isFavorite, toggleFavorite } = usePlayNest();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ActivityCategory>('all');

  const filteredActivities = useMemo(() => {
    return activities.map(act => {
      // Inject images since mock data doesn't have them
      let image = playZoneArtwork;
      if (act.category === 'gymnastics') image = gymnasticsArtwork;
      else if (act.category === 'ninja') image = ninjaArtwork;
      else if (act.category === 'dance') image = danceArtwork;
      else if (act.category === 'sports') image = gymnasticsArtwork; // reuse
      else if (act.category === 'toddlers') image = playZoneArtwork; // reuse
      return { ...act, image };
    }).filter((act) => {
      const matchesCategory = selectedCategory === 'all' || act.category === selectedCategory;
      const matchesSearch = act.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activities, selectedCategory, searchQuery]);

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Activities</Text>
        <Text style={styles.headerSub}>Discover the perfect activity for your child.</Text>
      </View>

      <View style={styles.searchContainer}>
        <Search size={18} color="#A9A8D6" style={styles.searchIcon} />
        <TextInput
          placeholder="Search activities..."
          placeholderTextColor="#A9A8D6"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />
      </View>

      <View style={styles.filterRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryPillsScroll}>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <Pressable key={cat.id} onPress={() => setSelectedCategory(cat.id)}>
                {isSelected ? (
                  <LinearGradient colors={['#A78BFA', '#E879F9']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.categoryPillSelected}>
                    <Text style={[styles.pillLabel, styles.pillLabelSelected]}>{cat.label}</Text>
                  </LinearGradient>
                ) : (
                  <View style={styles.categoryPill}>
                    <Text style={styles.pillLabel}>{cat.label}</Text>
                  </View>
                )}
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
        <View style={styles.gridRow}>
          {filteredActivities.map((act) => (
            <ActivityCard
              key={act.id}
              activity={act}
              variant="grid"
              isFavorite={isFavorite(act.id)}
              onToggleFavorite={toggleFavorite}
              onPress={() => router.push({ pathname: '/activities/[id]', params: { id: act.id } })}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#090B2A',
  },
  header: {
    paddingHorizontal: 15,
    paddingTop: 24,
    paddingBottom: 16,
  },
  headerTitle: {
    fontFamily: 'NunitoBold',
    fontSize: 28,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSub: {
    fontFamily: 'NunitoBold',
    fontSize: 14,
    color: '#A9A8D6',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#151843',
    marginHorizontal: 15,
    paddingHorizontal: 16,
    height: 44,
    borderRadius: 22,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'NunitoBold',
    color: '#FFFFFF',
  },
  filterRow: {
    marginBottom: 20,
  },
  categoryPillsScroll: {
    paddingHorizontal: 15,
    gap: 12,
  },
  categoryPill: {
    backgroundColor: '#151843',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  categoryPillSelected: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  pillLabel: {
    fontSize: 13,
    fontFamily: 'NunitoBold',
    color: '#A9A8D6',
  },
  pillLabelSelected: {
    color: '#FFFFFF',
  },
  listContent: {
    paddingHorizontal: 15,
    paddingBottom: 120, // Space for floating bottom nav
  },
  gridRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
