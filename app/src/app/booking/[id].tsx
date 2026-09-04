import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { usePlayNest } from '@/context/PlayNestContext';
import { PlayNestColors, Shadows } from '@/constants/playNestTheme';
import { PlayfulButton } from '@/components/PlayfulButton';
import { ChildCard } from '@/components/ChildCard';
import { X } from 'lucide-react-native';

const DATES = [
  { dayName: 'TODAY', dateNum: '12', fullStr: 'Saturday, Sep 12' },
  { dayName: 'SUN', dateNum: '13', fullStr: 'Sunday, Sep 13' },
  { dayName: 'MON', dateNum: '14', fullStr: 'Monday, Sep 14' },
  { dayName: 'TUE', dateNum: '15', fullStr: 'Tuesday, Sep 15' },
  { dayName: 'WED', dateNum: '16', fullStr: 'Wednesday, Sep 16' },
  { dayName: 'THU', dateNum: '17', fullStr: 'Thursday, Sep 17' },
];

export default function BookingFlowScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { activities, children, addBooking } = usePlayNest();

  const activity = activities.find((a) => a.id === id) || activities[0];

  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [selectedSessionId, setSelectedSessionId] = useState(activity.sessions[0]?.id || 'sess-1');
  const [selectedChildId, setSelectedChildId] = useState(children[0]?.id || 'child-emma');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedDate = DATES[selectedDateIndex];
  const selectedSession =
    activity.sessions.find((s) => s.id === selectedSessionId) || activity.sessions[0];
  const selectedChild =
    children.find((c) => c.id === selectedChildId) || children[0];

  const handleConfirm = () => {
    if (!selectedChild) {
      Alert.alert('Select a Child', 'Please pick which child is attending this session.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const newBooking = addBooking({
        activityId: activity.id,
        childId: selectedChild.id,
        dateStr: selectedDate.fullStr,
        time: selectedSession.time,
      });

      setIsSubmitting(false);

      router.replace({
        pathname: '/booking/confirmation',
        params: {
          bookingId: newBooking.id,
          activityName: newBooking.activityName,
          activityEmoji: newBooking.activityEmoji,
          dateStr: newBooking.dateStr,
          time: newBooking.time,
          childName: newBooking.childName,
          childEmoji: newBooking.childEmoji,
          bookingRef: newBooking.bookingRef,
          coach: newBooking.coach,
        },
      });
    }, 600);
  };

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      {/* Top Modal Bar */}
      <View style={styles.modalBar}>
        <View>
          <Text style={styles.barSub}>BOOK A SESSION</Text>
          <Text style={styles.barTitle}>Choose Schedule 📅</Text>
        </View>

        <Pressable onPress={() => router.back()} hitSlop={10} style={styles.closeBtn}>
          <X size={20} color={PlayNestColors.text} />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        
        {/* Activity Summary Capsule */}
        <View style={styles.activityCapsule}>
          <View style={[styles.capsuleEmoji, { backgroundColor: activity.badgeBg + '30' }]}>
            <Text style={styles.capsuleEmojiText}>{activity.emoji}</Text>
          </View>
          <View style={styles.capsuleInfo}>
            <Text style={styles.capsuleName}>{activity.name}</Text>
            <Text style={styles.capsuleMeta}>
              {activity.ageRange} • {activity.duration} • {activity.price}
            </Text>
          </View>
        </View>

        {/* Step 1: Select Date */}
        <View style={styles.stepSection}>
          <View style={styles.stepTitleRow}>
            <View style={styles.stepNumberBadge}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <Text style={styles.stepTitle}>Select Date</Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.dateScroll}>
            {DATES.map((item, idx) => {
              const isSelected = selectedDateIndex === idx;
              return (
                <Pressable
                  key={idx}
                  onPress={() => setSelectedDateIndex(idx)}
                  style={[
                    styles.dateChip,
                    isSelected && styles.dateChipSelected,
                  ]}>
                  <Text
                    style={[
                      styles.dateDayText,
                      isSelected && styles.dateDayTextSelected,
                    ]}>
                    {item.dayName}
                  </Text>
                  <Text
                    style={[
                      styles.dateNumText,
                      isSelected && styles.dateNumTextSelected,
                    ]}>
                    {item.dateNum}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* Step 2: Select Session Time */}
        <View style={styles.stepSection}>
          <View style={styles.stepTitleRow}>
            <View style={styles.stepNumberBadge}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <Text style={styles.stepTitle}>Select Time Slot</Text>
          </View>

          <View style={styles.sessionsGrid}>
            {activity.sessions.map((sess) => {
              const isSelected = selectedSessionId === sess.id;
              return (
                <Pressable
                  key={sess.id}
                  onPress={() => setSelectedSessionId(sess.id)}
                  style={[
                    styles.sessionCard,
                    isSelected && styles.sessionCardSelected,
                  ]}>
                  <View style={styles.sessionHeaderRow}>
                    <Text
                      style={[
                        styles.sessionTime,
                        isSelected && styles.sessionTimeSelected,
                      ]}>
                      {sess.time}
                    </Text>
                    <View
                      style={[
                        styles.spotsPill,
                        sess.spotsLeft <= 2 && styles.spotsPillUrgent,
                        isSelected && { backgroundColor: 'rgba(255, 255, 255, 0.15)' },
                      ]}>
                      <Text
                        style={[
                          styles.spotsPillText,
                          sess.spotsLeft <= 2 && styles.spotsPillTextUrgent,
                          isSelected && { color: '#FFFFFF' },
                        ]}>
                        {sess.spotsLeft} spots left
                      </Text>
                    </View>
                  </View>

                  <Text
                    style={[
                      styles.sessionCoach,
                      isSelected && { color: 'rgba(255, 255, 255, 0.8)' },
                    ]}>
                    Coach: {sess.coach}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Step 3: Select Child */}
        <View style={styles.stepSection}>
          <View style={styles.stepTitleRow}>
            <View style={styles.stepNumberBadge}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <Text style={styles.stepTitle}>Who is attending?</Text>
          </View>

          <View style={styles.childrenWrap}>
            {children.map((child) => (
              <ChildCard
                key={child.id}
                child={child}
                variant="chip"
                selected={selectedChildId === child.id}
                onPress={() => setSelectedChildId(child.id)}
              />
            ))}
          </View>
        </View>

        {/* Booking Summary Box */}
        <View style={styles.summaryBox}>
          <Text style={styles.summaryTitle}>Booking Summary</Text>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Session</Text>
            <Text style={styles.summaryValue}>{activity.name}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>When</Text>
            <Text style={styles.summaryValue}>
              {selectedDate.fullStr} • {selectedSession.time}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Child</Text>
            <Text style={styles.summaryValue}>
              {selectedChild ? `${selectedChild.avatarEmoji} ${selectedChild.name}` : '-'}
            </Text>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total Due</Text>
            <Text style={styles.totalPrice}>{activity.price}</Text>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Sticky Confirmation CTA */}
      <View style={styles.bottomBar}>
        <PlayfulButton
          title={isSubmitting ? 'Confirming Booking...' : 'Confirm & Reserve Spot 🎉'}
          size="lg"
          variant="primary"
          onPress={handleConfirm}
          loading={isSubmitting}
          style={{ width: '100%' }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: PlayNestColors.canvas,
  },
  modalBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: PlayNestColors.card,
    borderBottomWidth: 1,
    borderBottomColor: PlayNestColors.borderLight,
  },
  barSub: {
    fontSize: 10,
    fontWeight: '800',
    color: PlayNestColors.primary,
    letterSpacing: 1.2,
  },
  barTitle: {
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
    paddingTop: 16,
  },
  activityCapsule: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PlayNestColors.card,
    borderRadius: 20,
    padding: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: PlayNestColors.borderLight,
  },
  capsuleEmoji: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  capsuleEmojiText: {
    fontSize: 26,
  },
  capsuleInfo: {
    flex: 1,
  },
  capsuleName: {
    fontSize: 16,
    fontWeight: '800',
    color: PlayNestColors.text,
  },
  capsuleMeta: {
    fontSize: 12,
    color: PlayNestColors.textSecondary,
    marginTop: 2,
    fontWeight: '600',
  },
  stepSection: {
    marginBottom: 24,
  },
  stepTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  stepNumberBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: PlayNestColors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  stepNumberText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
  },
  stepTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: PlayNestColors.text,
  },
  dateScroll: {
    gap: 10,
  },
  dateChip: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 66,
    paddingVertical: 12,
    borderRadius: 18,
    backgroundColor: PlayNestColors.card,
    borderWidth: 1.5,
    borderColor: PlayNestColors.borderLight,
  },
  dateChipSelected: {
    backgroundColor: PlayNestColors.primaryDark,
    borderColor: PlayNestColors.primaryDark,
  },
  dateDayText: {
    fontSize: 10,
    fontWeight: '800',
    color: PlayNestColors.textSecondary,
    marginBottom: 4,
  },
  dateDayTextSelected: {
    color: '#FFFFFF',
  },
  dateNumText: {
    fontSize: 18,
    fontWeight: '900',
    color: PlayNestColors.text,
  },
  dateNumTextSelected: {
    color: '#FFFFFF',
  },
  sessionsGrid: {
    gap: 10,
  },
  sessionCard: {
    backgroundColor: PlayNestColors.card,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1.5,
    borderColor: PlayNestColors.borderLight,
  },
  sessionCardSelected: {
    backgroundColor: PlayNestColors.primaryDark,
    borderColor: PlayNestColors.primaryDark,
  },
  sessionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  sessionTime: {
    fontSize: 16,
    fontWeight: '800',
    color: PlayNestColors.text,
  },
  sessionTimeSelected: {
    color: '#FFFFFF',
  },
  spotsPill: {
    backgroundColor: PlayNestColors.greenMuted,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  spotsPillUrgent: {
    backgroundColor: PlayNestColors.orangeMuted,
  },
  spotsPillText: {
    fontSize: 11,
    fontWeight: '800',
    color: PlayNestColors.green,
  },
  spotsPillTextUrgent: {
    color: PlayNestColors.orange,
  },
  sessionCoach: {
    fontSize: 12,
    color: PlayNestColors.textSecondary,
    fontWeight: '500',
  },
  childrenWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  summaryBox: {
    backgroundColor: PlayNestColors.card,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: PlayNestColors.borderLight,
    marginTop: 4,
  },
  summaryTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: PlayNestColors.text,
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 13,
    color: PlayNestColors.textSecondary,
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 13,
    fontWeight: '700',
    color: PlayNestColors.text,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: PlayNestColors.borderLight,
    marginVertical: 10,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '800',
    color: PlayNestColors.text,
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: '900',
    color: PlayNestColors.primary,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: PlayNestColors.card,
    borderTopWidth: 1,
    borderTopColor: PlayNestColors.borderLight,
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 28,
  },
});
