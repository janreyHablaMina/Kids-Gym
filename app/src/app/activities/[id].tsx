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
import {
  ArrowLeft,
  Heart,
  Clock,
  Flame,
  Users,
  CheckCircle2,
  Calendar,
  Sparkles,
} from 'lucide-react-native';

export default function ActivityDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { activities, isFavorite, toggleFavorite } = usePlayNest();

  const activity = activities.find((a) => a.id === id) || activities[0];
  const favorite = isFavorite(activity.id);

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.safeTop}>
        {/* Top Floating Navbar */}
        <View style={styles.navBar}>
          <Pressable
            onPress={() => router.back()}
            hitSlop={10}
            style={styles.navCircle}>
            <ArrowLeft size={20} color={PlayNestColors.text} />
          </Pressable>

          <Text style={styles.navTitle} numberOfLines={1}>
            {activity.name}
          </Text>

          <Pressable
            onPress={() => toggleFavorite(activity.id)}
            hitSlop={10}
            style={styles.navCircle}>
            <Heart
              size={20}
              color={favorite ? PlayNestColors.coral : PlayNestColors.text}
              fill={favorite ? PlayNestColors.coral : 'none'}
            />
          </Pressable>
        </View>
      </SafeAreaView>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        
        {/* Large Hero Card with Emoji & Atmosphere */}
        <View style={[styles.heroCard, { backgroundColor: activity.badgeBg }]}>
          <View style={styles.heroDecCircle} />
          <View style={styles.emojiContainer}>
            <Text style={styles.heroEmoji}>{activity.emoji}</Text>
          </View>

          <View style={styles.heroPillsRow}>
            <View style={[styles.pill, { backgroundColor: 'rgba(0, 0, 0, 0.2)' }]}>
              <Users size={12} color="#FFFFFF" style={{ marginRight: 4 }} />
              <Text style={[styles.pillText, { color: '#FFFFFF' }]}>
                {activity.ageRange}
              </Text>
            </View>

            <View style={[styles.pill, { backgroundColor: 'rgba(0, 0, 0, 0.2)' }]}>
              <Clock size={12} color="#FFFFFF" style={{ marginRight: 4 }} />
              <Text style={[styles.pillText, { color: '#FFFFFF' }]}>{activity.duration}</Text>
            </View>

            <View style={[styles.pill, { backgroundColor: 'rgba(0, 0, 0, 0.2)' }]}>
              <Flame size={12} color={PlayNestColors.orange} style={{ marginRight: 4 }} />
              <Text style={[styles.pillText, { color: PlayNestColors.orange }]}>
                {activity.energyLevel}
              </Text>
            </View>
          </View>
        </View>

        {/* Title & Tagline */}
        <View style={styles.titleSection}>
          <View style={styles.categoryBadge}>
            <Sparkles size={12} color={activity.accentColor} style={{ marginRight: 4 }} />
            <Text style={[styles.categoryBadgeText, { color: activity.accentColor }]}>
              {activity.categoryLabel}
            </Text>
          </View>
          <Text style={styles.activityTitle}>{activity.name}</Text>
          <Text style={styles.tagline}>{activity.tagline}</Text>
          <Text style={styles.description}>{activity.description}</Text>
        </View>

        {/* What Kids Learn */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionEmoji}>🎯</Text>
            <Text style={styles.sectionTitle}>What Kids Learn</Text>
          </View>
          <View style={styles.checklist}>
            {activity.whatKidsLearn.map((item, idx) => (
              <View key={idx} style={styles.checkItem}>
                <CheckCircle2
                  size={18}
                  color={PlayNestColors.green}
                  style={{ marginRight: 10 }}
                />
                <Text style={styles.checkText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* What to Bring */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionEmoji}>🎒</Text>
            <Text style={styles.sectionTitle}>What to Bring</Text>
          </View>
          <View style={styles.checklist}>
            {activity.whatToBring.map((item, idx) => (
              <View key={idx} style={styles.checkItem}>
                <View style={styles.bulletDot} />
                <Text style={styles.checkText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Instructor Card */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionEmoji}>👩‍🏫</Text>
            <Text style={styles.sectionTitle}>Session Coach</Text>
          </View>
          <View style={styles.coachRow}>
            <View style={[styles.coachAvatar, { backgroundColor: activity.badgeBg + '40' }]}>
              <Text style={styles.coachAvatarEmoji}>🌟</Text>
            </View>
            <View style={styles.coachInfo}>
              <Text style={styles.coachName}>{activity.coachName}</Text>
              <Text style={styles.coachRole}>{activity.coachRole}</Text>
              <Text style={styles.coachCertified}>Certified Youth Movement & Safety Coach</Text>
            </View>
          </View>
        </View>

        {/* Available Sessions Preview */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionEmoji}>📅</Text>
            <Text style={styles.sectionTitle}>Upcoming Sessions</Text>
          </View>
          {activity.sessions.map((sess) => (
            <View key={sess.id} style={styles.sessionItem}>
              <View style={styles.sessionLeft}>
                <Text style={styles.sessionDay}>{sess.dateStr}</Text>
                <Text style={styles.sessionCoach}>{sess.coach}</Text>
              </View>
              <View style={styles.spotsBadge}>
                <Text style={styles.spotsText}>{sess.spotsLeft} spots left</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Floating Bottom Booking CTA Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.priceColumn}>
          <Text style={styles.priceLabel}>PRICE PER CHILD</Text>
          <Text style={styles.priceValue}>{activity.price}</Text>
        </View>

        <PlayfulButton
          title="Book This Session"
          size="lg"
          variant="primary"
          onPress={() =>
            router.push({
              pathname: '/booking/[id]',
              params: { id: activity.id },
            })
          }
          icon={<Calendar size={18} color="#FFFFFF" />}
          style={{ flex: 1, marginLeft: 16 }}
        />
      </View>
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
    zIndex: 10,
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  navCircle: {
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
    fontSize: 17,
    fontWeight: '800',
    color: PlayNestColors.text,
    maxWidth: 200,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  heroCard: {
    borderRadius: 28,
    paddingVertical: 32,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    marginBottom: 20,
  },
  heroDecCircle: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
  emojiContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  heroEmoji: {
    fontSize: 50,
  },
  heroPillsRow: {
    flexDirection: 'row',
    gap: 8,
    zIndex: 2,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
  },
  pillText: {
    fontSize: 12,
    fontWeight: '800',
  },
  titleSection: {
    marginBottom: 20,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: PlayNestColors.primaryMuted,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginBottom: 6,
  },
  categoryBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  activityTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: PlayNestColors.text,
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  tagline: {
    fontSize: 15,
    fontWeight: '700',
    color: PlayNestColors.primary,
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: PlayNestColors.textSecondary,
    lineHeight: 22,
  },
  sectionCard: {
    backgroundColor: PlayNestColors.card,
    borderRadius: 22,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: PlayNestColors.borderLight,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: PlayNestColors.text,
  },
  checklist: {
    gap: 10,
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkText: {
    fontSize: 14,
    fontWeight: '600',
    color: PlayNestColors.text,
    flex: 1,
  },
  bulletDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: PlayNestColors.primary,
    marginRight: 14,
    marginLeft: 4,
  },
  coachRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coachAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  coachAvatarEmoji: {
    fontSize: 26,
  },
  coachInfo: {
    flex: 1,
  },
  coachName: {
    fontSize: 16,
    fontWeight: '800',
    color: PlayNestColors.text,
  },
  coachRole: {
    fontSize: 13,
    color: PlayNestColors.primary,
    fontWeight: '700',
    marginTop: 1,
  },
  coachCertified: {
    fontSize: 11,
    color: PlayNestColors.textSecondary,
    marginTop: 2,
  },
  sessionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: PlayNestColors.borderLight,
  },
  sessionLeft: {
    flex: 1,
  },
  sessionDay: {
    fontSize: 14,
    fontWeight: '800',
    color: PlayNestColors.text,
  },
  sessionCoach: {
    fontSize: 12,
    color: PlayNestColors.textSecondary,
    marginTop: 2,
  },
  spotsBadge: {
    backgroundColor: PlayNestColors.greenMuted,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  spotsText: {
    fontSize: 12,
    fontWeight: '800',
    color: PlayNestColors.green,
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
    paddingTop: 12,
    paddingBottom: 28,
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceColumn: {
    justifyContent: 'center',
  },
  priceLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: PlayNestColors.textMuted,
    letterSpacing: 0.6,
  },
  priceValue: {
    fontSize: 24,
    fontWeight: '900',
    color: PlayNestColors.text,
  },
});
