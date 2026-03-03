import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { PlayNestColors } from '@/constants/playNestTheme';
import { usePlayNest } from '@/context/PlayNestContext';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Check,
  Calendar,
  Clock,
  User,
} from 'lucide-react-native';

export default function BookingConfirmationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    bookingId?: string;
    activityId?: string;
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
  const childName = params.childName || 'Emma';
  const childEmoji = params.childEmoji || '👦';
  const dateStr = params.dateStr || 'Saturday, September 12';
  const time = params.time || '10:30 AM';
  const bookingRef = params.bookingRef || 'PNK-7842';
  const coach = params.coach || 'Coach Maya';

  const { activities } = usePlayNest();
  const activity = activities.find(a => a.id === params.activityId);
  const headerImage = activity?.image || require('../../../assets/images/kid_jumping_illustration.jpg');

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Animated Header Graphic */}
        <Animated.View
          style={[
            styles.headerGraphicWrap,
            {
              opacity: fadeAnim,
              transform: [{ scale: bounceAnim.interpolate({ inputRange: [0, 1], outputRange: [0.8, 1] }) }],
            },
          ]}>
          <Image
            source={headerImage}
            style={styles.headerGraphic}
            resizeMode="cover"
          />
          <View style={styles.successBadgeCircle}>
            <Check size={28} color="#FFFFFF" strokeWidth={3} />
          </View>
        </Animated.View>

        {/* Title & Subtitle */}
        <Animated.View style={[styles.textWrap, { opacity: fadeAnim }]}>
          <Text style={styles.title}>You're All Booked!</Text>
          <Text style={styles.subtitle}>
            {childName} is ready for an exciting adventure.
          </Text>
        </Animated.View>

        {/* Glassmorphic Summary Card */}
        <Animated.View
          style={[
            styles.glassCard,
            {
              opacity: fadeAnim,
              transform: [{ translateY: bounceAnim.interpolate({ inputRange: [0, 1], outputRange: [30, 0] }) }],
            },
          ]}>
          <LinearGradient
            colors={['rgba(124, 58, 237, 0.15)', 'rgba(124, 58, 237, 0.05)']}
            style={styles.glassBackground}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
          
          <View style={styles.glassHeader}>
            <View style={styles.cardIconBox}>
               <Calendar size={28} color="#FFFFFF" />
            </View>
            <View style={styles.glassHeaderInfo}>
              <Text style={styles.glassActivityName}>{activityName}</Text>
              <Text style={styles.glassCoach}>With {coach}</Text>
            </View>
          </View>
          
          <View style={styles.glassDivider} />
          
          <View style={styles.glassGrid}>
            <View style={styles.glassCol}>
              <Text style={styles.glassLabel}>DATE</Text>
              <Text style={styles.glassVal}>{dateStr}</Text>
            </View>
            <View style={styles.glassCol}>
              <Text style={styles.glassLabel}>TIME</Text>
              <Text style={styles.glassVal}>{time}</Text>
            </View>
          </View>

          <View style={[styles.glassGrid, { marginTop: 20 }]}>
            <View style={styles.glassCol}>
              <Text style={styles.glassLabel}>CHILD</Text>
              <Text style={styles.glassVal}>{childEmoji} {childName}</Text>
            </View>
            <View style={styles.glassCol}>
              <Text style={styles.glassLabel}>BOOKING REF</Text>
              <Text style={styles.glassValRef}>#{bookingRef}</Text>
            </View>
          </View>
          
        </Animated.View>

        {/* Action Buttons */}
        <Animated.View style={[styles.buttonGroup, { opacity: fadeAnim }]}>
          
          <Pressable style={styles.primaryButton} onPress={() => router.replace('/(tabs)/bookings')}>
            <LinearGradient
              colors={['#8B5CF6', '#7C3AED']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.btnGradient}
            >
              <Text style={styles.primaryButtonText}>View My Booking</Text>
            </LinearGradient>
          </Pressable>

          <Pressable style={styles.outlineButton} onPress={() => router.dismissAll()}>
            <Text style={styles.outlineButtonText}>Back to Home</Text>
          </Pressable>
          
        </Animated.View>
        
        <View style={{height: 60}} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#090B2A',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 10,
    alignItems: 'center',
  },
  headerGraphicWrap: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 40,
    position: 'relative',
  },
  headerGraphic: {
    width: 280,
    height: 280,
    borderRadius: 20,
  },
  successBadgeCircle: {
    position: 'absolute',
    bottom: -20,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#34D399',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#090B2A',
    shadowColor: '#34D399',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
  textWrap: {
    alignItems: 'center',
    marginBottom: 32,
    width: '100%',
  },
  title: {
    fontFamily: 'NunitoBold',
    fontSize: 28,
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'NunitoBold',
    fontSize: 15,
    color: '#A9A8D6',
    textAlign: 'center',
  },
  glassCard: {
    width: '100%',
    borderRadius: 24,
    padding: 24,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.3)',
    overflow: 'hidden',
    position: 'relative',
  },
  glassBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  glassHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardIconBox: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#7C3AED',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  glassHeaderInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  glassActivityName: {
    fontFamily: 'NunitoBold',
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  glassCoach: {
    fontFamily: 'NunitoBold',
    fontSize: 13,
    color: '#A9A8D6',
  },
  glassDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginBottom: 20,
  },
  glassGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  glassCol: {
    flex: 1,
  },
  glassLabel: {
    fontFamily: 'NunitoBold',
    fontSize: 11,
    color: '#A9A8D6',
    letterSpacing: 1,
    marginBottom: 6,
  },
  glassVal: {
    fontFamily: 'NunitoBold',
    fontSize: 15,
    color: '#FFFFFF',
  },
  glassValRef: {
    fontFamily: 'NunitoBold',
    fontSize: 15,
    color: '#F472B6',
  },
  buttonGroup: {
    width: '100%',
    gap: 16,
  },
  primaryButton: {
    width: '100%',
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  btnGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    fontFamily: 'NunitoBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  outlineButton: {
    width: '100%',
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  outlineButtonText: {
    fontFamily: 'NunitoBold',
    fontSize: 16,
    color: '#E2E8F0',
  },
});
