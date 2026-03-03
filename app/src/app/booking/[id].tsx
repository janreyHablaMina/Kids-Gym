import React, { useState, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Alert,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { usePlayNest } from '@/context/PlayNestContext';
import { LinearGradient } from 'expo-linear-gradient';
import { PlayNestColors } from '@/constants/playNestTheme';
import { ArrowLeft, Calendar, ChevronRight } from 'lucide-react-native';

const generateDates = () => {
  const dates = [];
  const today = new Date();
  const currentMonth = today.getMonth();
  for (let i = 0; i < 35; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    
    if (d.getMonth() !== currentMonth) {
      dates.push({
        dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
        dateNum: null,
        fullStr: null,
      });
    } else {
      dates.push({
        dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
        dateNum: d.getDate().toString(),
        fullStr: d.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }),
      });
    }
  }
  return dates;
};

export default function BookingFlowScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { activities, children, addBooking } = usePlayNest();

  const activity = activities.find((a) => a.id === id) || activities[0];

  const DATES = useMemo(() => generateDates(), []);
  
  const [selectedDateIndex, setSelectedDateIndex] = useState(0); // Default to today
  const [selectedSessionId, setSelectedSessionId] = useState(activity.sessions[1]?.id || 'sess-1');
  const [selectedChildIndex, setSelectedChildIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedDate = DATES[selectedDateIndex];
  const selectedSession =
    activity.sessions.find((s) => s.id === selectedSessionId) || activity.sessions[0];
  const selectedChild = children[selectedChildIndex] || children[0];

  const handleCycleChild = () => {
    setSelectedChildIndex((prev) => (prev + 1) % children.length);
  };

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
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={10} style={styles.backBtn}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.headerTitle}>Book a Session</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Step Indicator */}
        <View style={styles.stepContainer}>
          <View style={styles.stepLine} />
          
          <View style={styles.stepItem}>
            <View style={[styles.stepCircle, styles.stepCircleActive]}>
              <Text style={styles.stepTextActive}>1</Text>
            </View>
            <Text style={styles.stepLabelActive}>Date</Text>
          </View>
          
          <View style={styles.stepItem}>
            <View style={styles.stepCircle}>
              <Text style={styles.stepText}>2</Text>
            </View>
            <Text style={styles.stepLabel}>Session</Text>
          </View>
          
          <View style={styles.stepItem}>
            <View style={styles.stepCircle}>
              <Text style={styles.stepText}>3</Text>
            </View>
            <Text style={styles.stepLabel}>Child</Text>
          </View>
          
          <View style={styles.stepItem}>
            <View style={styles.stepCircle}>
              <Text style={styles.stepText}>4</Text>
            </View>
            <Text style={styles.stepLabel}>Confirm</Text>
          </View>
        </View>

        {/* Date Selection */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</Text>
          <ChevronRight size={20} color="#FFFFFF" />
        </View>
        
        <View style={styles.calendarContainer}>
          {/* Single Header Row for Days */}
          <View style={styles.calendarHeaderRow}>
            {DATES.slice(0, 7).map((item, idx) => (
              <Text key={`header-${idx}`} style={styles.calendarDayTextHeader}>
                {item.dayName}
              </Text>
            ))}
          </View>

          {/* 5 Rows of Dates */}
          {Array.from({ length: 5 }).map((_, rowIdx) => (
            <View key={rowIdx} style={styles.calendarStrip}>
              {DATES.slice(rowIdx * 7, rowIdx * 7 + 7).map((item, idx) => {
                const actualIdx = rowIdx * 7 + idx;
                
                if (item.dateNum === null) {
                  return (
                    <View key={actualIdx} style={styles.calendarDay}>
                      <View style={[styles.calendarDateCircle, { backgroundColor: 'transparent' }]} />
                    </View>
                  );
                }
                
                const isSelected = selectedDateIndex === actualIdx;
                return (
                  <Pressable key={actualIdx} onPress={() => setSelectedDateIndex(actualIdx)} style={styles.calendarDay}>
                    <View style={[styles.calendarDateCircle, isSelected && styles.calendarDateCircleActive]}>
                      <Text style={[styles.calendarDateText, isSelected && styles.calendarDateTextActive]}>
                        {item.dateNum}
                      </Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          ))}
        </View>

        {/* Available Sessions */}
        <Text style={styles.sectionTitleSpaced}>Available Sessions</Text>
        <View style={styles.sessionsList}>
          {activity.sessions.map((sess) => {
            const isSelected = selectedSessionId === sess.id;
            return (
              <Pressable key={sess.id} onPress={() => setSelectedSessionId(sess.id)}>
                <LinearGradient
                  colors={isSelected ? ['rgba(124, 58, 237, 0.2)', 'rgba(124, 58, 237, 0.05)'] : ['#151843', '#151843']}
                  start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                  style={[styles.sessionCard, isSelected && styles.sessionCardSelected]}
                >
                  <View style={styles.sessionCardLeft}>
                    <Calendar size={18} color={isSelected ? '#F472B6' : '#A9A8D6'} style={{ marginRight: 12 }} />
                    <Text style={[styles.sessionTime, isSelected && styles.sessionTimeSelected]}>{sess.time}</Text>
                  </View>
                  <View style={styles.sessionCardRight}>
                    <Text style={styles.spotsText}>{sess.spotsLeft} spots left</Text>
                    {isSelected && <ChevronRight size={18} color="#A9A8D6" style={{ marginLeft: 6 }} />}
                  </View>
                </LinearGradient>
              </Pressable>
            );
          })}
        </View>

        {/* Select Child */}
        <Text style={styles.sectionTitleSpaced}>Select Child</Text>
        <Pressable onPress={handleCycleChild} style={styles.childCard}>
          <View style={styles.childAvatarWrap}>
            <View style={styles.childAvatar}>
               <Text style={styles.childEmoji}>{selectedChild?.avatarEmoji}</Text>
            </View>
          </View>
          <View style={styles.childInfo}>
            <Text style={styles.childName}>{selectedChild?.name || 'No Child'}</Text>
            <Text style={styles.childAge}>Age {selectedChild?.age || '?'}</Text>
          </View>
          <ChevronRight size={20} color="#FFFFFF" />
        </Pressable>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomBar}>
        <Pressable style={styles.ctaButton} onPress={handleConfirm}>
          <LinearGradient
            colors={['#8B5CF6', '#7C3AED']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.ctaGradient}
          >
            <Text style={styles.ctaText}>
              {isSubmitting ? 'Confirming...' : 'Next: Confirm Booking'}
            </Text>
          </LinearGradient>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#090B2A',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontFamily: 'NunitoBold',
    fontSize: 18,
    color: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  stepContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 36,
    paddingHorizontal: 10,
    position: 'relative',
  },
  stepLine: {
    position: 'absolute',
    top: 18,
    left: 40,
    right: 40,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.15)',
    zIndex: 0,
  },
  stepItem: {
    alignItems: 'center',
    zIndex: 1,
  },
  stepCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#151843',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  stepCircleActive: {
    backgroundColor: '#A855F7',
    shadowColor: '#A855F7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  stepText: {
    fontFamily: 'NunitoBold',
    fontSize: 14,
    color: '#A9A8D6',
  },
  stepTextActive: {
    fontFamily: 'NunitoBold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  stepLabel: {
    fontFamily: 'NunitoBold',
    fontSize: 12,
    color: '#A9A8D6',
  },
  stepLabelActive: {
    fontFamily: 'NunitoBold',
    fontSize: 12,
    color: '#F472B6',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'NunitoBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  sectionTitleSpaced: {
    fontFamily: 'NunitoBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginTop: 28,
    marginBottom: 16,
  },
  calendarContainer: {
    gap: 14,
  },
  calendarHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  calendarDayTextHeader: {
    width: 38,
    textAlign: 'center',
    fontFamily: 'NunitoBold',
    fontSize: 12,
    color: '#A9A8D6',
  },
  calendarStrip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  calendarDay: {
    alignItems: 'center',
  },
  calendarDateCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarDateCircleActive: {
    backgroundColor: '#8B5CF6',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
  },
  calendarDateText: {
    fontFamily: 'NunitoBold',
    fontSize: 15,
    color: '#E2E8F0',
  },
  calendarDateTextActive: {
    color: '#FFFFFF',
  },
  sessionsList: {
    gap: 12,
  },
  sessionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  sessionCardSelected: {
    borderColor: '#7C3AED',
  },
  sessionCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sessionTime: {
    fontFamily: 'NunitoBold',
    fontSize: 15,
    color: '#E2E8F0',
  },
  sessionTimeSelected: {
    color: '#FFFFFF',
  },
  sessionCardRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spotsText: {
    fontFamily: 'NunitoBold',
    fontSize: 13,
    color: '#34D399',
  },
  childCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#151843',
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  childAvatarWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F472B6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  childAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#4C1D95',
    alignItems: 'center',
    justifyContent: 'center',
  },
  childEmoji: {
    fontSize: 22,
  },
  childInfo: {
    flex: 1,
  },
  childName: {
    fontFamily: 'NunitoBold',
    fontSize: 16,
    color: '#E2E8F0',
    marginBottom: 2,
  },
  childAge: {
    fontFamily: 'NunitoBold',
    fontSize: 13,
    color: '#A9A8D6',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
    backgroundColor: '#090B2A',
  },
  ctaButton: {
    width: '100%',
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  ctaGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaText: {
    fontFamily: 'NunitoBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});
