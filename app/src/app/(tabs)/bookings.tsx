import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { usePlayNest } from '@/context/PlayNestContext';
import { PlayNestColors } from '@/constants/playNestTheme';
import { BookingCard } from '@/components/BookingCard';
import { PlayfulButton } from '@/components/PlayfulButton';
import { CalendarCheck, Compass, Sparkles } from 'lucide-react-native';

export default function BookingsScreen() {
  const router = useRouter();
  const { upcomingBookings, pastBookings, cancelBooking } = usePlayNest();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  const currentList = activeTab === 'upcoming' ? upcomingBookings : pastBookings;

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      {/* Screen Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerSub}>MY SESSIONS</Text>
          <Text style={styles.headerTitle}>My Bookings 🎟️</Text>
        </View>
      </View>

      {/* Segmented Control */}
      <View style={styles.tabContainer}>
        <Pressable
          onPress={() => setActiveTab('upcoming')}
          style={[styles.tabButton, activeTab === 'upcoming' && styles.tabButtonActive]}>
          <Text
            style={[styles.tabText, activeTab === 'upcoming' && styles.tabTextActive]}>
            Upcoming
          </Text>
          {upcomingBookings.length > 0 && (
            <View
              style={[
                styles.badgePill,
                activeTab === 'upcoming'
                  ? styles.badgePillActive
                  : styles.badgePillInactive,
              ]}>
              <Text
                style={[
                  styles.badgePillText,
                  activeTab === 'upcoming' && styles.badgePillTextActive,
                ]}>
                {upcomingBookings.length}
              </Text>
            </View>
          )}
        </Pressable>

        <Pressable
          onPress={() => setActiveTab('past')}
          style={[styles.tabButton, activeTab === 'past' && styles.tabButtonActive]}>
          <Text style={[styles.tabText, activeTab === 'past' && styles.tabTextActive]}>
            Past & History
          </Text>
          {pastBookings.length > 0 && (
            <View
              style={[
                styles.badgePill,
                activeTab === 'past'
                  ? styles.badgePillActive
                  : styles.badgePillInactive,
              ]}>
              <Text
                style={[
                  styles.badgePillText,
                  activeTab === 'past' && styles.badgePillTextActive,
                ]}>
                {pastBookings.length}
              </Text>
            </View>
          )}
        </Pressable>
      </View>

      {/* Bookings List */}
      <ScrollView
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}>
        {currentList.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconCircle}>
              <CalendarCheck size={44} color={PlayNestColors.primary} />
            </View>
            <Text style={styles.emptyTitle}>
              {activeTab === 'upcoming'
                ? 'No upcoming sessions yet!'
                : 'No past session history'}
            </Text>
            <Text style={styles.emptySubtitle}>
              {activeTab === 'upcoming'
                ? 'Choose a fun gymnastics, ninja, or toddler session to spark joy in your kid’s day!'
                : 'Your completed or cancelled bookings will show up here.'}
            </Text>
            {activeTab === 'upcoming' && (
              <PlayfulButton
                title="Explore Activities"
                onPress={() => router.push('/(tabs)/activities')}
                icon={<Compass size={18} color="#FFFFFF" />}
                style={{ marginTop: 12 }}
              />
            )}
          </View>
        ) : (
          currentList.map((booking) => (
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 22,
    padding: 4,
    borderWidth: 1,
    borderColor: PlayNestColors.borderLight,
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 18,
  },
  tabButtonActive: {
    backgroundColor: PlayNestColors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '700',
    color: PlayNestColors.textSecondary,
  },
  tabTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  badgePill: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 6,
  },
  badgePillActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  badgePillInactive: {
    backgroundColor: PlayNestColors.primaryMuted,
  },
  badgePillText: {
    fontSize: 11,
    fontWeight: '800',
    color: PlayNestColors.primary,
  },
  badgePillTextActive: {
    color: '#FFFFFF',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 24,
  },
  emptyIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: PlayNestColors.primaryMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: PlayNestColors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    color: PlayNestColors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
});
