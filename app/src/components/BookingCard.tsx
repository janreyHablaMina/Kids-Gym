import React, { useRef } from 'react';
import { StyleSheet, Text, View, Pressable, Alert, Animated, Image } from 'react-native';
import { Booking } from '@/types';
import { PlayNestColors, Shadows } from '@/constants/playNestTheme';
import { usePlayNest } from '@/context/PlayNestContext';
import { Calendar } from 'lucide-react-native';

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
  const { activities } = usePlayNest();
  const activity = activities.find(a => a.id === booking.activityId);
  const imageSource = activity?.image;
  
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
        return { bg: 'rgba(52, 211, 153, 0.15)', text: '#34D399', label: 'Confirmed' };
      case 'completed':
        return { bg: 'rgba(255, 255, 255, 0.1)', text: PlayNestColors.textSecondary, label: 'Completed' };
      case 'cancelled':
        return { bg: 'rgba(239, 68, 68, 0.15)', text: '#EF4444', label: 'Cancelled' };
    }
  };

  const statusStyle = getStatusColor();

  return (
    <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, styles.wrapper]}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.container}>
        
        <View style={styles.topRow}>
          <View style={styles.imageWrap}>
            {imageSource ? (
              <Image source={imageSource} style={styles.activityImage} resizeMode="cover" />
            ) : (
              <View style={[styles.activityImage, { backgroundColor: PlayNestColors.primaryMuted, alignItems: 'center', justifyContent: 'center' }]}>
                <Text style={{ fontSize: 32 }}>{booking.activityEmoji}</Text>
              </View>
            )}
          </View>
          
          <View style={styles.infoCol}>
            <View style={styles.titleRow}>
              <Text style={styles.activityName} numberOfLines={1}>{booking.activityName}</Text>
              <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
                <Text style={[styles.statusText, { color: statusStyle.text }]}>
                  {statusStyle.label}
                </Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <Calendar size={14} color={PlayNestColors.textSecondary} style={{ marginRight: 6 }} />
              <Text style={styles.detailText}>{booking.dateStr} • {booking.time}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.childEmoji}>{booking.childEmoji}</Text>
              <Text style={styles.detailText}>{booking.childName}</Text>
            </View>
          </View>
        </View>

        <View style={styles.btnGroup}>
          {onPress && (
            <Pressable
              onPress={onPress}
              style={({ pressed }) => [
                styles.viewBtn,
                pressed && { opacity: 0.7 },
              ]}>
              <Text style={styles.viewBtnText}>View Details</Text>
            </Pressable>
          )}
          {booking.status === 'confirmed' && onCancel && (
            <Pressable
              onPress={handleCancelPress}
              style={({ pressed }) => [
                styles.cancelBtn,
                pressed && { opacity: 0.6 },
              ]}>
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </Pressable>
          )}
        </View>

      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  container: {
    backgroundColor: PlayNestColors.card,
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: PlayNestColors.borderLight,
  },
  topRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  imageWrap: {
    width: 80,
    height: 80,
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 16,
    backgroundColor: PlayNestColors.canvas,
  },
  activityImage: {
    width: '100%',
    height: '100%',
  },
  infoCol: {
    flex: 1,
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  activityName: {
    fontFamily: 'NunitoBold',
    fontSize: 16,
    color: PlayNestColors.text,
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  statusText: {
    fontFamily: 'NunitoBold',
    fontSize: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailText: {
    fontFamily: 'NunitoBold',
    fontSize: 13,
    color: PlayNestColors.textSecondary,
  },
  childEmoji: {
    fontSize: 14,
    marginRight: 6,
  },
  btnGroup: {
    flexDirection: 'row',
    gap: 12,
  },
  viewBtn: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewBtnText: {
    fontFamily: 'NunitoBold',
    fontSize: 14,
    color: PlayNestColors.text,
  },
  cancelBtn: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtnText: {
    fontFamily: 'NunitoBold',
    fontSize: 14,
    color: PlayNestColors.danger,
  },
});
