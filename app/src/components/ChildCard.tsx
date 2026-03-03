import React, { useRef } from 'react';
import { StyleSheet, Text, View, Pressable, Animated } from 'react-native';
import { Child } from '@/types';
import { PlayNestColors } from '@/constants/playNestTheme';

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
      toValue: 0.97,
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
          <View style={[styles.chipAvatar, { backgroundColor: child.avatarBg + '40' }]}>
            <Text style={styles.chipAvatarText}>{child.avatarEmoji}</Text>
          </View>
          <View style={styles.chipTextWrap}>
            <Text
              style={[
                styles.chipName,
                selected && { color: PlayNestColors.primary },
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
          selected && { 
            borderColor: PlayNestColors.primary, 
            backgroundColor: PlayNestColors.primaryGhost 
          },
        ]}>
        
        {/* Top Header Section */}
        <View style={styles.cardHeader}>
          <View style={[styles.avatarCircle, { backgroundColor: child.favoriteColor + '20' }]}>
            <Text style={styles.avatarEmoji}>{child.avatarEmoji}</Text>
          </View>
          <View style={styles.headerTextWrap}>
            <Text style={styles.childName}>{child.name}</Text>
            <View style={styles.ageBadge}>
              <Text style={styles.ageBadgeText}>{child.age} Years Old</Text>
            </View>
          </View>
        </View>

        <View style={styles.cardDivider} />

        {/* Structured Info List */}
        <View style={styles.infoList}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Favorite Activity</Text>
            <Text style={styles.infoValue} numberOfLines={1}>{child.favoriteActivity}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Sessions Completed</Text>
            <Text style={styles.infoValue}>{child.sessionsCompleted}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Status</Text>
            <Text style={[styles.infoValue, { color: PlayNestColors.green }]}>Active ✨</Text>
          </View>
        </View>

      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    marginBottom: 16,
  },
  cardContainer: {
    backgroundColor: PlayNestColors.card,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: PlayNestColors.borderLight,
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarEmoji: {
    fontSize: 28,
  },
  headerTextWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  childName: {
    fontFamily: 'NunitoBold',
    fontSize: 22,
    color: PlayNestColors.text,
  },
  ageBadge: {
    backgroundColor: PlayNestColors.primaryMuted,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },
  ageBadgeText: {
    fontFamily: 'NunitoBold',
    fontSize: 12,
    color: PlayNestColors.primary,
  },
  cardDivider: {
    height: 1,
    backgroundColor: PlayNestColors.borderLight,
    marginBottom: 16,
  },
  infoList: {
    gap: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoLabel: {
    fontFamily: 'NunitoBold',
    fontSize: 14,
    color: PlayNestColors.textSecondary,
  },
  infoValue: {
    fontFamily: 'NunitoBold',
    fontSize: 14,
    color: PlayNestColors.text,
    maxWidth: '60%',
    textAlign: 'right',
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
    fontFamily: 'NunitoBold',
    fontSize: 15,
    color: PlayNestColors.text,
  },
  chipAge: {
    fontFamily: 'NunitoBold',
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
    fontFamily: 'NunitoBold',
    color: '#FFFFFF',
    fontSize: 12,
  },
});
