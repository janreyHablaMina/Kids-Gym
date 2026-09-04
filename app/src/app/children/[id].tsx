import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { usePlayNest } from '@/context/PlayNestContext';
import { PlayNestColors, Shadows } from '@/constants/playNestTheme';
import { PlayfulButton } from '@/components/PlayfulButton';
import { BookingCard } from '@/components/BookingCard';
import { SectionHeader } from '@/components/SectionHeader';
import {
  ArrowLeft,
  Star,
  Plus,
} from 'lucide-react-native';

const ACHIEVEMENTS = [
  { id: '1', title: 'Balance Star', desc: 'Conquered low & high beams', emoji: '🌟', bg: PlayNestColors.yellowMuted },
  { id: '2', title: 'Foam Hero', desc: '10 safe jumps into giant foam lagoon', emoji: '🥷', bg: PlayNestColors.orangeMuted },
  { id: '3', title: 'Super Tumbler', desc: 'Mastered forward & straddle rolls', emoji: '🤸', bg: PlayNestColors.primaryMuted },
  { id: '4', title: 'Friendship Pro', desc: '50 cheerful partner high-fives', emoji: '🤝', bg: PlayNestColors.greenMuted },
];

export default function ChildProfileScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { children, bookings, activities, cancelBooking } = usePlayNest();

  const child = children.find((c) => c.id === id) || children[0];
  const childBookings = bookings.filter((b) => b.childId === child.id);
  const upcomingForChild = childBookings.filter((b) => b.status === 'confirmed');

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.safeTop}>
        <View style={styles.navBar}>
          <Pressable onPress={() => router.back()} hitSlop={10} style={styles.backBtn}>
            <ArrowLeft size={20} color={PlayNestColors.text} />
          </Pressable>
          <Text style={styles.navTitle}>{child.name}'s Profile</Text>
          <View style={{ width: 42 }} />
        </View>
      </SafeAreaView>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        
        {/* Child Avatar & Header Card */}
        <View style={styles.headerCard}>
          <View style={[styles.avatarCircle, { backgroundColor: child.avatarBg + '30' }]}>
            <Text style={styles.avatarEmoji}>{child.avatarEmoji}</Text>
          </View>

          <Text style={styles.childName}>{child.name}</Text>
          <Text style={styles.childAgeText}>{child.age} years old • PlayNest Adventurer</Text>

          {/* Quick Badges Row */}
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statNum}>{child.sessionsCompleted}</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statBox}>
              <Text style={styles.statNum}>4</Text>
              <Text style={styles.statLabel}>Milestones</Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statBox}>
              <Text style={styles.statNum}>Level 2</Text>
              <Text style={styles.statLabel}>Skill Badge</Text>
            </View>
          </View>

          {/* Favorite Activity Banner */}
          <View style={styles.favoriteBar}>
            <Star size={16} color={PlayNestColors.yellow} fill={PlayNestColors.yellow} style={{ marginRight: 6 }} />
            <Text style={styles.favoriteLabel}>Favorite Activity:</Text>
            <Text style={styles.favoriteName} numberOfLines={1}>
              {child.favoriteActivity}
            </Text>
          </View>
        </View>

        {/* Milestone Badges */}
        <View style={styles.section}>
          <SectionHeader
            title="Earned Badges"
            emoji="🏆"
            subtitle="Skills unlocked during gym classes"
          />
          <View style={styles.achievementsGrid}>
            {ACHIEVEMENTS.map((ach) => (
              <View key={ach.id} style={styles.achievementCard}>
                <View style={[styles.achievementEmojiCircle, { backgroundColor: ach.bg }]}>
                  <Text style={styles.achievementEmoji}>{ach.emoji}</Text>
                </View>
                <Text style={styles.achievementTitle}>{ach.title}</Text>
                <Text style={styles.achievementDesc}>{ach.desc}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Upcoming Sessions for this child */}
        <View style={styles.section}>
          <SectionHeader
            title={`Upcoming for ${child.name}`}
            emoji="📅"
            actionText="Book New"
            onActionPress={() => router.push('/(tabs)/activities')}
          />

          {upcomingForChild.length === 0 ? (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyEmoji}>🤸</Text>
              <Text style={styles.emptyTitle}>No sessions scheduled</Text>
              <Text style={styles.emptySubtitle}>
                Ready to schedule {child.name}'s next gymnastics or ninja playtime?
              </Text>
              <PlayfulButton
                title={`Book Class for ${child.name}`}
                size="sm"
                onPress={() => router.push('/(tabs)/activities')}
                style={{ marginTop: 10 }}
              />
            </View>
          ) : (
            upcomingForChild.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onCancel={cancelBooking}
                onPress={() =>
                  router.push({
                    pathname: '/activities/[id]',
                    params: { id: booking.activityId },
                  })
                }
              />
            ))
          )}
        </View>

        {/* Quick Action Button */}
        <PlayfulButton
          title={`Find a Class for ${child.name}`}
          size="lg"
          variant="primary"
          onPress={() => router.push('/(tabs)/activities')}
          icon={<Plus size={18} color="#FFFFFF" strokeWidth={2.8} />}
          style={{ marginTop: 10 }}
        />

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PlayNestColors.canvas,
  },
  safeTop: {
    backgroundColor: PlayNestColors.canvas,
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: PlayNestColors.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: PlayNestColors.borderLight,
  },
  navTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: PlayNestColors.text,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 30,
  },
  headerCard: {
    backgroundColor: PlayNestColors.card,
    borderRadius: 24,
    padding: 22,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: PlayNestColors.borderLight,
  },
  avatarCircle: {
    width: 86,
    height: 86,
    borderRadius: 43,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarEmoji: {
    fontSize: 44,
  },
  childName: {
    fontSize: 24,
    fontWeight: '900',
    color: PlayNestColors.text,
  },
  childAgeText: {
    fontSize: 14,
    color: PlayNestColors.textSecondary,
    marginTop: 2,
    fontWeight: '500',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 16,
    paddingVertical: 12,
    backgroundColor: PlayNestColors.cardElevated,
    borderRadius: 18,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statNum: {
    fontSize: 18,
    fontWeight: '900',
    color: PlayNestColors.primary,
  },
  statLabel: {
    fontSize: 11,
    color: PlayNestColors.textSecondary,
    fontWeight: '600',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: PlayNestColors.border,
  },
  favoriteBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PlayNestColors.yellowMuted,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14,
    width: '100%',
  },
  favoriteLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: PlayNestColors.yellow,
    marginRight: 6,
  },
  favoriteName: {
    fontSize: 12,
    fontWeight: '800',
    color: PlayNestColors.yellowLight,
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  achievementCard: {
    width: '48%',
    backgroundColor: PlayNestColors.card,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: PlayNestColors.borderLight,
  },
  achievementEmojiCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  achievementEmoji: {
    fontSize: 20,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: PlayNestColors.text,
    marginBottom: 2,
  },
  achievementDesc: {
    fontSize: 11,
    color: PlayNestColors.textSecondary,
    lineHeight: 15,
  },
  emptyCard: {
    backgroundColor: PlayNestColors.card,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: PlayNestColors.borderLight,
  },
  emptyEmoji: {
    fontSize: 36,
    marginBottom: 8,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: PlayNestColors.text,
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 13,
    color: PlayNestColors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },
});
