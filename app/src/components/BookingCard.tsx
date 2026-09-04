import React, { useRef } from 'react';
import { StyleSheet, Text, View, Pressable, Alert, Animated } from 'react-native';
import { Booking } from '@/types';
import { PlayNestColors, Shadows } from '@/constants/playNestTheme';

interface BookingCardProps {
  booking: Booking;
  onPress?: () => void;
  onCancel?: (bookingId: string) => void;
}

export const BookingCard: React.FC<BookingCardProps> = ({
  booking,
  onPress,
  onCancel,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

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

  const handleCancelPress = () => {
    Alert.alert(
      'Cancel Booking',
      `Are you sure you want to cancel the session for ${booking.childName} on ${booking.dateStr} at ${booking.time}?`,
      [
        { text: 'Keep Booking', style: 'cancel' },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: () => onCancel && onCancel(booking.id),
        },
      ]
    );
  };

  const getStatusColor = () => {
    switch (booking.status) {
      case 'confirmed':
        return { bg: PlayNestColors.greenMuted, text: PlayNestColors.green, label: 'Confirmed' };
      case 'completed':
        return { bg: PlayNestColors.border, text: PlayNestColors.textSecondary, label: 'Completed' };
      case 'cancelled':
        return { bg: PlayNestColors.dangerLight, text: PlayNestColors.danger, label: 'Cancelled' };
    }
  };

  const statusStyle = getStatusColor();

  return (
    <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, styles.wrapper]}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[styles.container, Shadows.card]}>
        
        {/* Card Header */}
        <View style={styles.header}>
          <View style={styles.actTitleWrap}>
            <View style={[styles.emojiBox, { backgroundColor: PlayNestColors.primaryMuted }]}>
              <Text style={styles.emojiText}>{booking.activityEmoji}</Text>
            </View>
            <View style={styles.titleColumn}>
              <Text style={styles.activityName}>{booking.activityName}</Text>
              <Text style={styles.categoryLabel}>{booking.categoryLabel} • {booking.coach}</Text>
            </View>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
            <Text style={[styles.statusText, { color: statusStyle.text }]}>
              {statusStyle.label}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Schedule & Child Details */}
        <View style={styles.detailsRow}>
          <View style={styles.detailBlock}>
            <Text style={styles.detailLabel}>DATE & TIME</Text>
            <Text style={styles.detailValue}>
              📅 {booking.dateStr} • {booking.time}
            </Text>
          </View>

          <View style={styles.detailBlock}>
            <Text style={styles.detailLabel}>CHILD</Text>
            <View style={styles.childChip}>
              <Text style={styles.childEmoji}>{booking.childEmoji}</Text>
              <Text style={styles.childName}>{booking.childName}</Text>
            </View>
          </View>
        </View>

        {/* Action Row */}
        <View style={styles.actionRow}>
          <Text style={styles.refText}>Ref: #{booking.bookingRef}</Text>
          
          <View style={styles.btnGroup}>
            {booking.status === 'confirmed' && onCancel && (
              <Pressable
                onPress={handleCancelPress}
                hitSlop={8}
                style={({ pressed }) => [
                  styles.cancelBtn,
                  pressed && { opacity: 0.6 },
                ]}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </Pressable>
            )}

            {onPress && (
              <Pressable
                onPress={onPress}
                hitSlop={8}
                style={({ pressed }) => [
                  styles.viewBtn,
                  pressed && { opacity: 0.7 },
                ]}>
                <Text style={styles.viewBtnText}>View Details →</Text>
              </Pressable>
            )}
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 14,
  },
  container: {
    backgroundColor: PlayNestColors.card,
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: PlayNestColors.borderLight,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  actTitleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  emojiBox: {
    width: 46,
    height: 46,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  emojiText: {
    fontSize: 24,
  },
  titleColumn: {
    flex: 1,
  },
  activityName: {
    fontSize: 17,
    fontWeight: '800',
    color: PlayNestColors.text,
    letterSpacing: -0.2,
  },
  categoryLabel: {
    fontSize: 12,
    color: PlayNestColors.textSecondary,
    marginTop: 2,
    fontWeight: '500',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '800',
  },
  divider: {
    height: 1,
    backgroundColor: PlayNestColors.borderLight,
    marginBottom: 12,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  detailBlock: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: PlayNestColors.textMuted,
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  detailValue: {
    fontSize: 13,
    fontWeight: '700',
    color: PlayNestColors.text,
  },
  childChip: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  childEmoji: {
    fontSize: 16,
    marginRight: 6,
  },
  childName: {
    fontSize: 14,
    fontWeight: '700',
    color: PlayNestColors.text,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 4,
  },
  refText: {
    fontSize: 12,
    fontWeight: '600',
    color: PlayNestColors.textMuted,
  },
  btnGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cancelBtn: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  cancelBtnText: {
    color: PlayNestColors.danger,
    fontSize: 13,
    fontWeight: '700',
  },
  viewBtn: {
    backgroundColor: PlayNestColors.primaryMuted,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 14,
  },
  viewBtnText: {
    color: PlayNestColors.primary,
    fontSize: 13,
    fontWeight: '800',
  },
});
