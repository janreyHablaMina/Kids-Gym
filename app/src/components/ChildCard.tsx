import React, { useRef } from 'react';
import { StyleSheet, Text, View, Pressable, Animated } from 'react-native';
import { Child } from '@/types';
import { PlayNestColors, Shadows } from '@/constants/playNestTheme';

interface ChildCardProps {
  child: Child;
  selected?: boolean;
  onPress?: () => void;
  variant?: 'card' | 'chip';
}

export const ChildCard: React.FC<ChildCardProps> = ({
  child,
  selected = false,
  onPress,
  variant = 'card',
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    if (!onPress) return;
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
      speed: 35,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    if (!onPress) return;
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
      bounciness: 6,
    }).start();
  };

  if (variant === 'chip') {
    return (
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Pressable
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={[
            styles.chipContainer,
            selected && styles.chipSelected,
            { borderColor: selected ? PlayNestColors.primary : PlayNestColors.border },
          ]}>
          <View style={[styles.chipAvatar, { backgroundColor: child.avatarBg }]}>
            <Text style={styles.chipAvatarText}>{child.avatarEmoji}</Text>
          </View>
          <View style={styles.chipTextWrap}>
            <Text
              style={[
                styles.chipName,
                selected && { color: PlayNestColors.primary, fontWeight: '800' },
              ]}>
              {child.name}
            </Text>
            <Text style={styles.chipAge}>Age {child.age}</Text>
          </View>
          {selected && (
            <View style={styles.checkPill}>
              <Text style={styles.checkText}>✓</Text>
            </View>
          )}
        </Pressable>
      </Animated.View>
    );
  }

  return (
    <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, styles.cardWrapper]}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          styles.cardContainer,
          selected && styles.cardSelected,
          Shadows.card,
        ]}>
        <View style={[styles.avatarCircle, { backgroundColor: child.avatarBg }]}>
          <Text style={styles.avatarEmoji}>{child.avatarEmoji}</Text>
        </View>

        <View style={styles.cardInfo}>
          <View style={styles.headerRow}>
            <Text style={styles.childName}>{child.name}</Text>
            <View style={styles.ageBadge}>
              <Text style={styles.ageBadgeText}>Age {child.age}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>⭐ Favorite:</Text>
            <Text style={styles.detailValue} numberOfLines={1}>
              {child.favoriteActivity}
            </Text>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statPill}>
              <Text style={styles.statEmoji}>🏆</Text>
              <Text style={styles.statText}>
                <Text style={styles.statBold}>{child.sessionsCompleted}</Text> sessions
              </Text>
            </View>
            <View style={[styles.statPill, { backgroundColor: PlayNestColors.greenMuted }]}>
              <Text style={styles.statEmoji}>✨</Text>
              <Text style={[styles.statText, { color: PlayNestColors.green }]}>Active Explorer</Text>
            </View>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    marginBottom: 12,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PlayNestColors.card,
    borderRadius: 24,
    padding: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  cardSelected: {
    borderColor: PlayNestColors.primary,
    backgroundColor: PlayNestColors.primaryGhost,
  },
  avatarCircle: {
    width: 62,
    height: 62,
    borderRadius: 31,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  avatarEmoji: {
    fontSize: 32,
  },
  cardInfo: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  childName: {
    fontSize: 18,
    fontWeight: '800',
    color: PlayNestColors.text,
  },
  ageBadge: {
    backgroundColor: PlayNestColors.primaryMuted,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },
  ageBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: PlayNestColors.primary,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 13,
    color: PlayNestColors.textSecondary,
    fontWeight: '600',
    marginRight: 4,
  },
  detailValue: {
    fontSize: 13,
    fontWeight: '700',
    color: PlayNestColors.text,
    flex: 1,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PlayNestColors.yellowMuted,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  statEmoji: {
    fontSize: 12,
    marginRight: 4,
  },
  statText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#92400E',
  },
  statBold: {
    fontWeight: '800',
  },
  // Chip variant
  chipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PlayNestColors.card,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 2,
    marginRight: 10,
    marginBottom: 10,
  },
  chipSelected: {
    backgroundColor: PlayNestColors.primaryGhost,
  },
  chipAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  chipAvatarText: {
    fontSize: 18,
  },
  chipTextWrap: {
    marginRight: 12,
  },
  chipName: {
    fontSize: 15,
    fontWeight: '700',
    color: PlayNestColors.text,
  },
  chipAge: {
    fontSize: 12,
    color: PlayNestColors.textSecondary,
  },
  checkPill: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: PlayNestColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
});
