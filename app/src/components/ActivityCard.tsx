import React, { useRef } from 'react';
import { StyleSheet, Text, View, Pressable, Animated } from 'react-native';
import { Activity } from '@/types';
import { PlayNestColors, Shadows } from '@/constants/playNestTheme';
import { Heart, Clock, Users, Flame, ChevronRight, Zap } from 'lucide-react-native';

interface ActivityCardProps {
  activity: Activity;
  variant?: 'featured' | 'list';
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
  onPress: () => void;
  onBookPress?: () => void;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  activity,
  variant = 'list',
  isFavorite = false,
  onToggleFavorite,
  onPress,
  onBookPress,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const heartScaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 35,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
      bounciness: 6,
    }).start();
  };

  const handleHeartPress = () => {
    Animated.sequence([
      Animated.spring(heartScaleAnim, {
        toValue: 1.35,
        useNativeDriver: true,
        speed: 40,
        bounciness: 12,
      }),
      Animated.spring(heartScaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        speed: 30,
        bounciness: 8,
      }),
    ]).start();

    if (onToggleFavorite) {
      onToggleFavorite(activity.id);
    }
  };

  if (variant === 'featured') {
    return (
      <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, styles.featuredWrapper]}>
        <Pressable
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={[styles.featuredContainer, Shadows.card]}>
          
          {/* Top Banner with playful gradient / color background */}
          <View style={[styles.featuredBanner, { backgroundColor: activity.badgeBg }]}>
            <View style={styles.bannerEmojiCircle}>
              <Text style={styles.featuredEmoji}>{activity.emoji}</Text>
            </View>

            {/* Top badges & Favorite */}
            <View style={styles.bannerHeader}>
              <View style={[styles.agePill, { backgroundColor: 'rgba(255, 255, 255, 0.9)' }]}>
                <Users size={12} color={activity.accentColor} style={{ marginRight: 4 }} />
                <Text style={[styles.agePillText, { color: activity.accentColor }]}>
                  {activity.ageRange}
                </Text>
              </View>

              <Pressable
                onPress={handleHeartPress}
                hitSlop={10}
                style={styles.heartCircle}>
                <Animated.View style={{ transform: [{ scale: heartScaleAnim }] }}>
                  <Heart
                    size={18}
                    color={isFavorite ? PlayNestColors.coral : '#64748B'}
                    fill={isFavorite ? PlayNestColors.coral : 'none'}
                  />
                </Animated.View>
              </Pressable>
            </View>

            {/* Popular Pill */}
            {activity.isPopular && (
              <View style={styles.popularBadge}>
                <Zap size={11} color="#FFFFFF" style={{ marginRight: 3 }} />
                <Text style={styles.popularBadgeText}>POPULAR</Text>
              </View>
            )}
          </View>

          {/* Body Content */}
          <View style={styles.featuredBody}>
            <View style={styles.categoryRow}>
              <Text style={[styles.featuredCategory, { color: activity.accentColor }]}>
                {activity.categoryLabel}
              </Text>
              <Text style={styles.featuredPrice}>{activity.price}</Text>
            </View>

            <Text style={styles.featuredTitle} numberOfLines={1}>
              {activity.name}
            </Text>
            <Text style={styles.featuredTagline} numberOfLines={2}>
              {activity.tagline}
            </Text>

            {/* Meta row */}
            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <Clock size={13} color={PlayNestColors.textSecondary} style={{ marginRight: 4 }} />
                <Text style={styles.metaText}>{activity.duration}</Text>
              </View>

              <View style={styles.metaDot} />

              <View style={styles.metaItem}>
                <Flame size={13} color={PlayNestColors.orange} style={{ marginRight: 4 }} />
                <Text style={[styles.metaText, { color: PlayNestColors.orange, fontWeight: '700' }]}>
                  {activity.energyLevel} Energy
                </Text>
              </View>
            </View>

            {/* Action Button */}
            <View style={styles.featuredActionRow}>
              <Pressable
                onPress={onBookPress || onPress}
                style={({ pressed }) => [
                  styles.bookBtn,
                  { backgroundColor: activity.accentColor },
                  pressed && { opacity: 0.9 },
                ]}>
                <Text style={styles.bookBtnText}>Book Session</Text>
                <ChevronRight size={16} color="#FFFFFF" />
              </Pressable>
            </View>
          </View>
        </Pressable>
      </Animated.View>
    );
  }

  // List / Grid Variant
  return (
    <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, styles.listWrapper]}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[styles.listContainer, Shadows.card]}>
        
        <View style={[styles.listEmojiBox, { backgroundColor: activity.badgeBg }]}>
          <Text style={styles.listEmoji}>{activity.emoji}</Text>
        </View>

        <View style={styles.listContent}>
          <View style={styles.listHeaderRow}>
            <View style={[styles.listAgePill, { backgroundColor: PlayNestColors.primaryGhost }]}>
              <Text style={styles.listAgeText}>{activity.ageRange}</Text>
            </View>
            <Text style={styles.listPriceText}>{activity.price}</Text>
          </View>

          <Text style={styles.listTitle} numberOfLines={1}>
            {activity.name}
          </Text>
          <Text style={styles.listDesc} numberOfLines={2}>
            {activity.description}
          </Text>

          <View style={styles.listFooter}>
            <View style={styles.listMetaItem}>
              <Clock size={12} color={PlayNestColors.textSecondary} style={{ marginRight: 3 }} />
              <Text style={styles.listMetaText}>{activity.duration}</Text>
            </View>
            <View style={styles.listMetaDot} />
            <View style={styles.listMetaItem}>
              <Flame size={12} color={PlayNestColors.orange} style={{ marginRight: 3 }} />
              <Text style={[styles.listMetaText, { color: PlayNestColors.orange, fontWeight: '700' }]}>
                {activity.energyLevel}
              </Text>
            </View>
          </View>
        </View>

        <Pressable
          onPress={handleHeartPress}
          hitSlop={8}
          style={styles.listHeartBtn}>
          <Animated.View style={{ transform: [{ scale: heartScaleAnim }] }}>
            <Heart
              size={18}
              color={isFavorite ? PlayNestColors.coral : '#94A3B8'}
              fill={isFavorite ? PlayNestColors.coral : 'none'}
            />
          </Animated.View>
        </Pressable>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  // Featured Variant
  featuredWrapper: {
    width: 280,
    marginRight: 16,
    marginBottom: 8,
  },
  featuredContainer: {
    backgroundColor: PlayNestColors.card,
    borderRadius: 26,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: PlayNestColors.borderLight,
  },
  featuredBanner: {
    height: 130,
    position: 'relative',
    padding: 14,
    justifyContent: 'space-between',
  },
  bannerEmojiCircle: {
    position: 'absolute',
    alignSelf: 'center',
    top: 25,
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featuredEmoji: {
    fontSize: 42,
  },
  bannerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 2,
  },
  agePill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  agePillText: {
    fontSize: 12,
    fontWeight: '800',
  },
  heartCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  popularBadge: {
    position: 'absolute',
    bottom: 10,
    left: 14,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PlayNestColors.orange,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  popularBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  featuredBody: {
    padding: 16,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  featuredCategory: {
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  featuredPrice: {
    fontSize: 16,
    fontWeight: '900',
    color: PlayNestColors.text,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: PlayNestColors.text,
    marginBottom: 4,
    letterSpacing: -0.2,
  },
  featuredTagline: {
    fontSize: 13,
    color: PlayNestColors.textSecondary,
    lineHeight: 18,
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    color: PlayNestColors.textSecondary,
    fontWeight: '600',
  },
  metaDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: PlayNestColors.border,
    marginHorizontal: 8,
  },
  featuredActionRow: {
    flexDirection: 'row',
  },
  bookBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 18,
  },
  bookBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    marginRight: 4,
  },

  // List Variant
  listWrapper: {
    marginBottom: 14,
  },
  listContainer: {
    flexDirection: 'row',
    backgroundColor: PlayNestColors.card,
    borderRadius: 24,
    padding: 14,
    borderWidth: 1,
    borderColor: PlayNestColors.borderLight,
    alignItems: 'center',
  },
  listEmojiBox: {
    width: 68,
    height: 68,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  listEmoji: {
    fontSize: 34,
  },
  listContent: {
    flex: 1,
    marginRight: 8,
  },
  listHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  listAgePill: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  listAgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: PlayNestColors.primary,
  },
  listPriceText: {
    fontSize: 14,
    fontWeight: '800',
    color: PlayNestColors.text,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: PlayNestColors.text,
    marginBottom: 2,
  },
  listDesc: {
    fontSize: 12,
    color: PlayNestColors.textSecondary,
    lineHeight: 16,
    marginBottom: 6,
  },
  listFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listMetaText: {
    fontSize: 11,
    color: PlayNestColors.textSecondary,
    fontWeight: '600',
  },
  listMetaDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: PlayNestColors.border,
    marginHorizontal: 6,
  },
  listHeartBtn: {
    padding: 6,
  },
});
