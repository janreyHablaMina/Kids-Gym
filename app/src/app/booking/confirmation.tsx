import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { PlayNestColors, Shadows } from '@/constants/playNestTheme';
import { PlayfulButton } from '@/components/PlayfulButton';
import {
  CheckCircle,
  Calendar,
  Clock,
  User,
  Ticket,
  Sparkles,
  ArrowRight,
  Home,
} from 'lucide-react-native';

export default function BookingConfirmationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    bookingId?: string;
    activityName?: string;
    activityEmoji?: string;
    dateStr?: string;
    time?: string;
    childName?: string;
    childEmoji?: string;
    bookingRef?: string;
    coach?: string;
  }>();

  const bounceAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(bounceAnim, {
        toValue: 1,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const activityName = params.activityName || 'Kids Gymnastics';
  const activityEmoji = params.activityEmoji || '🤸‍♀️';
  const childName = params.childName || 'Emma';
  const childEmoji = params.childEmoji || '👧';
  const dateStr = params.dateStr || 'Saturday, Sep 12';
  const time = params.time || '10:30 AM';
  const bookingRef = params.bookingRef || 'PNK-7842';
  const coach = params.coach || 'Coach Maya';

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        
        {/* Animated Celebration Icon */}
        <Animated.View
          style={[
            styles.celebrationWrap,
            {
              opacity: fadeAnim,
              transform: [
                {
                  scale: bounceAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.3, 1],
                  }),
                },
              ],
            },
          ]}>
          <View style={[styles.celebrationCircle, Shadows.glow(PlayNestColors.primary)]}>
            <Text style={styles.celebrationEmoji}>🎉</Text>
          </View>
        </Animated.View>

        {/* Title & Subtitle */}
        <Animated.View style={[styles.textWrap, { opacity: fadeAnim }]}>
          <View style={styles.successBadge}>
            <Sparkles size={13} color={PlayNestColors.green} style={{ marginRight: 4 }} />
            <Text style={styles.successBadgeText}>CONFIRMED</Text>
          </View>
          <Text style={styles.title}>You're All Booked!</Text>
          <Text style={styles.subtitle}>
            {childName} is ready for an exciting gym adventure!
          </Text>
        </Animated.View>

        {/* PlayPass Booking Ticket Card */}
        <Animated.View
          style={[
            styles.ticketCard,
            Shadows.card,
            {
              opacity: fadeAnim,
              transform: [
                {
                  translateY: bounceAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0],
                  }),
                },
              ],
            },
          ]}>
          <View style={styles.ticketTop}>
            <View style={styles.ticketEmojiBox}>
              <Text style={styles.ticketEmoji}>{activityEmoji}</Text>
            </View>
            <View style={styles.ticketTitleInfo}>
              <Text style={styles.ticketBrand}>PLAYNEST PLAYPASS</Text>
              <Text style={styles.ticketActivityName}>{activityName}</Text>
              <Text style={styles.ticketCoach}>With {coach}</Text>
            </View>
          </View>

          {/* Perforated ticket cutouts */}
          <View style={styles.perforationRow}>
            <View style={styles.cutoutLeft} />
            <View style={styles.dashedLine} />
            <View style={styles.cutoutRight} />
          </View>

          <View style={styles.ticketBottom}>
            <View style={styles.gridRow}>
              <View style={styles.gridCol}>
                <Text style={styles.ticketLabel}>WHEN</Text>
                <Text style={styles.ticketVal}>{dateStr}</Text>
                <Text style={styles.ticketValSub}>{time}</Text>
              </View>

              <View style={styles.gridCol}>
                <Text style={styles.ticketLabel}>ATTENDEE</Text>
                <Text style={styles.ticketVal}>
                  {childEmoji} {childName}
                </Text>
                <Text style={styles.ticketValSub}>Child Session</Text>
              </View>
            </View>

            <View style={styles.ticketRefRow}>
              <Text style={styles.ticketRefLabel}>BOOKING REFERENCE</Text>
              <Text style={styles.ticketRefCode}>#{bookingRef}</Text>
            </View>
          </View>
        </Animated.View>

        {/* Instructions Reminder */}
        <View style={styles.reminderCard}>
          <Text style={styles.reminderTitle}>Quick Reminder 💡</Text>
          <Text style={styles.reminderText}>
            Please arrive 10 minutes prior to session start for quick grip socks check and warmup!
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonGroup}>
          <PlayfulButton
            title="View My Bookings"
            size="lg"
            variant="primary"
            onPress={() => router.replace('/(tabs)/bookings')}
            icon={<Ticket size={18} color="#FFFFFF" />}
            style={{ width: '100%', marginBottom: 12 }}
          />

          <PlayfulButton
            title="Back to Home"
            size="md"
            variant="ghost"
            onPress={() => router.replace('/(tabs)')}
            icon={<Home size={18} color={PlayNestColors.primary} />}
            style={{ width: '100%' }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: PlayNestColors.canvas,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 40,
    alignItems: 'center',
  },
  celebrationWrap: {
    marginBottom: 18,
  },
  celebrationCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: PlayNestColors.primaryMuted,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  celebrationEmoji: {
    fontSize: 50,
  },
  textWrap: {
    alignItems: 'center',
    marginBottom: 24,
  },
  successBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PlayNestColors.greenMuted,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  successBadgeText: {
    color: PlayNestColors.green,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: PlayNestColors.text,
    letterSpacing: -0.4,
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: PlayNestColors.textSecondary,
    textAlign: 'center',
    fontWeight: '500',
  },
  ticketCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 26,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: PlayNestColors.borderLight,
    marginBottom: 20,
  },
  ticketTop: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    backgroundColor: PlayNestColors.primaryGhost,
  },
  ticketEmojiBox: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  ticketEmoji: {
    fontSize: 28,
  },
  ticketTitleInfo: {
    flex: 1,
  },
  ticketBrand: {
    fontSize: 9,
    fontWeight: '900',
    color: PlayNestColors.primary,
    letterSpacing: 1.2,
    marginBottom: 2,
  },
  ticketActivityName: {
    fontSize: 18,
    fontWeight: '900',
    color: PlayNestColors.text,
    letterSpacing: -0.2,
  },
  ticketCoach: {
    fontSize: 12,
    color: PlayNestColors.textSecondary,
    fontWeight: '600',
  },
  perforationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 24,
    overflow: 'hidden',
  },
  cutoutLeft: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: PlayNestColors.canvas,
    marginLeft: -10,
  },
  dashedLine: {
    flex: 1,
    height: 1,
    borderWidth: 1,
    borderColor: PlayNestColors.border,
    borderStyle: 'dashed',
    marginHorizontal: 8,
  },
  cutoutRight: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: PlayNestColors.canvas,
    marginRight: -10,
  },
  ticketBottom: {
    padding: 18,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  gridCol: {
    flex: 1,
  },
  ticketLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: PlayNestColors.textMuted,
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  ticketVal: {
    fontSize: 14,
    fontWeight: '800',
    color: PlayNestColors.text,
  },
  ticketValSub: {
    fontSize: 12,
    fontWeight: '600',
    color: PlayNestColors.primary,
    marginTop: 2,
  },
  ticketRefRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: PlayNestColors.borderLight,
  },
  ticketRefLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: PlayNestColors.textMuted,
    letterSpacing: 0.8,
  },
  ticketRefCode: {
    fontSize: 14,
    fontWeight: '900',
    color: PlayNestColors.primary,
    letterSpacing: 0.5,
  },
  reminderCard: {
    width: '100%',
    backgroundColor: PlayNestColors.yellowMuted,
    borderRadius: 18,
    padding: 14,
    marginBottom: 24,
  },
  reminderTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#92400E',
    marginBottom: 2,
  },
  reminderText: {
    fontSize: 12,
    color: '#78350F',
    lineHeight: 18,
    fontWeight: '500',
  },
  buttonGroup: {
    width: '100%',
  },
});
