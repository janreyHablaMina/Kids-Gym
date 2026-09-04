import React from 'react';
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
import { PlayNestColors, Shadows } from '@/constants/playNestTheme';
import { SectionHeader } from '@/components/SectionHeader';
import { ActivityCard } from '@/components/ActivityCard';
import { PromotionBanner } from '@/components/PromotionBanner';
import { PlayfulButton } from '@/components/PlayfulButton';
import {
  Sparkles,
  MapPin,
  Compass,
  ArrowRight,
  Info,
} from 'lucide-react-native';

export default function HomeScreen() {
  const router = useRouter();
  const {
    user,
    activities,
    upcomingBookings,
    promotions,
    isFavorite,
    toggleFavorite,
    cancelBooking,
  } = usePlayNest();

  const nextBooking = upcomingBookings.length > 0 ? upcomingBookings[0] : null;
  const popularActivities = activities.filter((a) => a.isPopular);

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        
        {/* Header Bar */}
        <View style={styles.headerBar}>
          <View style={styles.greetingWrap}>
            <Text style={styles.greetingSub}>PLAYNEST KIDS • PLAY. MOVE. GROW.</Text>
            <Text style={styles.greetingTitle}>Good morning, {user.name}! 👋</Text>
            <Text style={styles.greetingTagline}>{user.greeting}</Text>
          </View>

          <Pressable
            onPress={() => router.push('/about')}
            hitSlop={8}
            style={styles.infoBadge}>
            <Info size={20} color={PlayNestColors.primary} />
          </Pressable>
        </View>

        {/* Hero Card */}
        <View style={[styles.heroCard, Shadows.glow(PlayNestColors.primaryDark)]}>
          <View style={styles.heroDecCircle} />
          <View style={styles.heroContent}>
            <View style={styles.heroBadge}>
              <Sparkles size={12} color="#FFFFFF" style={{ marginRight: 4 }} />
              <Text style={styles.heroBadgeText}>SUMMER FUN 2026</Text>
            </View>

            <Text style={styles.heroTitle}>Adventure Awaits! 🚀</Text>
            <Text style={styles.heroSubtitle}>
              Discover playful classes designed to help kids jump, climb, and grow with confidence.
            </Text>

            <PlayfulButton
              title="Explore Activities"
              variant="sun"
              size="md"
              onPress={() => router.push('/(tabs)/activities')}
              icon={<Compass size={18} color="#78350F" />}
              style={styles.heroBtn}
            />
          </View>
        </View>

        {/* Upcoming Booking Card */}
        {nextBooking && (
          <View style={styles.sectionWrap}>
            <SectionHeader
              title="Upcoming Session"
              emoji="🎟️"
              actionText="All Bookings"
              onActionPress={() => router.push('/(tabs)/bookings')}
            />

            <View style={styles.upcomingCard}>
              <View style={styles.upcomingTop}>
                <View style={[styles.upcomingEmojiBox, { backgroundColor: nextBooking.color + '20' }]}>
                  <Text style={styles.upcomingEmoji}>{nextBooking.activityEmoji}</Text>
                </View>

                <View style={styles.upcomingInfo}>
                  <View style={styles.upcomingRow}>
                    <Text style={styles.upcomingActName}>{nextBooking.activityName}</Text>
                    <View style={styles.confirmedPill}>
                      <Text style={styles.confirmedText}>Confirmed</Text>
                    </View>
                  </View>
                  <Text style={styles.upcomingTime}>
                    📅 {nextBooking.dateStr} • {nextBooking.time}
                  </Text>
                  <Text style={styles.upcomingChild}>
                    {nextBooking.childEmoji} For {nextBooking.childName} • {nextBooking.coach}
                  </Text>
                </View>
              </View>

              <View style={styles.upcomingActionRow}>
                <Pressable
                  onPress={() => router.push('/(tabs)/bookings')}
                  style={styles.viewBookingBtn}>
                  <Text style={styles.viewBookingText}>View Booking Pass</Text>
                  <ArrowRight size={14} color={PlayNestColors.primary} />
                </Pressable>
              </View>
            </View>
          </View>
        )}

        {/* Quick Categories */}
        <View style={styles.sectionWrap}>
          <SectionHeader
            title="Explore by Category"
            emoji="🎈"
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryScroll}>
            {[
              { label: 'All', emoji: '🌟', color: PlayNestColors.primary },
              { label: 'Gymnastics', emoji: '🤸‍♀️', color: PlayNestColors.primary },
              { label: 'Ninja Kids', emoji: '🥷', color: PlayNestColors.orange },
              { label: 'Toddlers', emoji: '🧸', color: PlayNestColors.yellow },
              { label: 'Dance', emoji: '💃', color: PlayNestColors.coral },
              { label: 'Indoor Play', emoji: '🏰', color: PlayNestColors.teal },
            ].map((cat, idx) => (
              <Pressable
                key={idx}
                onPress={() => router.push('/(tabs)/activities')}
                style={styles.categoryCard}>
                <Text style={styles.catEmoji}>{cat.emoji}</Text>
                <Text style={[styles.catLabel, { color: cat.color }]}>{cat.label}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Popular Activities Carousel */}
        <View style={styles.sectionWrap}>
          <SectionHeader
            title="Popular Activities"
            emoji="🔥"
            actionText="See All"
            onActionPress={() => router.push('/(tabs)/activities')}
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carouselContainer}>
            {popularActivities.map((act) => (
              <ActivityCard
                key={act.id}
                activity={act}
                variant="featured"
                isFavorite={isFavorite(act.id)}
                onToggleFavorite={toggleFavorite}
                onPress={() => router.push({ pathname: '/activities/[id]', params: { id: act.id } })}
                onBookPress={() => router.push({ pathname: '/booking/[id]', params: { id: act.id } })}
              />
            ))}
          </ScrollView>
        </View>

        {/* Special Promotion */}
        {promotions.length > 0 && (
          <View style={styles.sectionWrap}>
            <SectionHeader
              title="Special Promotion"
              emoji="🎉"
            />
            <PromotionBanner
              promotion={promotions[0]}
              onPress={() => router.push('/(tabs)/activities')}
            />
          </View>
        )}

        {/* Facility Info Card */}
        <View style={styles.sectionWrap}>
          <View style={styles.locationMiniCard}>
            <View style={styles.locIconBox}>
              <MapPin size={24} color={PlayNestColors.primary} />
            </View>
            <View style={styles.locInfo}>
              <Text style={styles.locTitle}>PlayNest Playground & Gym</Text>
              <Text style={styles.locAddress}>124 Sunnyvale Boulevard, Suite 300</Text>
              <Text style={styles.locHours}>Open Daily: 8:00 AM – 8:00 PM</Text>
            </View>
            <Pressable
              onPress={() => router.push('/about')}
              style={styles.locArrowBtn}>
              <ArrowRight size={18} color={PlayNestColors.primary} />
            </Pressable>
          </View>
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
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 10,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  greetingWrap: {
    flex: 1,
  },
  greetingSub: {
    fontSize: 10,
    fontWeight: '800',
    color: PlayNestColors.primary,
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  greetingTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: PlayNestColors.text,
    letterSpacing: -0.4,
  },
  greetingTagline: {
    fontSize: 14,
    color: PlayNestColors.textSecondary,
    marginTop: 2,
    fontWeight: '500',
  },
  infoBadge: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: PlayNestColors.primaryMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },

  // Hero Card
  heroCard: {
    backgroundColor: PlayNestColors.primaryDark,
    borderRadius: 28,
    padding: 24,
    position: 'relative',
    overflow: 'hidden',
    marginBottom: 24,
  },
  heroDecCircle: {
    position: 'absolute',
    right: -40,
    top: -40,
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  heroContent: {
    zIndex: 2,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 10,
  },
  heroBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.4,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 20,
    marginBottom: 18,
  },
  heroBtn: {
    alignSelf: 'flex-start',
  },

  // Sections
  sectionWrap: {
    marginBottom: 22,
  },

  // Upcoming Card
  upcomingCard: {
    backgroundColor: PlayNestColors.card,
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: PlayNestColors.borderLight,
  },
  upcomingTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  upcomingEmojiBox: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  upcomingEmoji: {
    fontSize: 26,
  },
  upcomingInfo: {
    flex: 1,
  },
  upcomingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  upcomingActName: {
    fontSize: 16,
    fontWeight: '800',
    color: PlayNestColors.text,
  },
  confirmedPill: {
    backgroundColor: PlayNestColors.greenMuted,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  confirmedText: {
    color: PlayNestColors.green,
    fontSize: 11,
    fontWeight: '800',
  },
  upcomingTime: {
    fontSize: 13,
    fontWeight: '700',
    color: PlayNestColors.primary,
    marginBottom: 2,
  },
  upcomingChild: {
    fontSize: 12,
    color: PlayNestColors.textSecondary,
    fontWeight: '500',
  },
  upcomingActionRow: {
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: PlayNestColors.borderLight,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  viewBookingBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewBookingText: {
    fontSize: 13,
    fontWeight: '700',
    color: PlayNestColors.primary,
  },

  // Category Scroll
  categoryScroll: {
    paddingVertical: 4,
    gap: 10,
  },
  categoryCard: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 18,
    minWidth: 80,
    backgroundColor: PlayNestColors.card,
    borderWidth: 1,
    borderColor: PlayNestColors.borderLight,
  },
  catEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  catLabel: {
    fontSize: 12,
    fontWeight: '800',
  },

  // Carousel
  carouselContainer: {
    paddingVertical: 4,
  },

  // Location Card
  locationMiniCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PlayNestColors.card,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: PlayNestColors.borderLight,
  },
  locIconBox: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: PlayNestColors.primaryMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  locInfo: {
    flex: 1,
  },
  locTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: PlayNestColors.text,
  },
  locAddress: {
    fontSize: 12,
    color: PlayNestColors.textSecondary,
    marginTop: 2,
  },
  locHours: {
    fontSize: 11,
    fontWeight: '600',
    color: PlayNestColors.green,
    marginTop: 2,
  },
  locArrowBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: PlayNestColors.primaryMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
});
