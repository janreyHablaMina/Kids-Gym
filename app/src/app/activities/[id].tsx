import React, { useMemo, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  ImageBackground,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { usePlayNest } from '@/context/PlayNestContext';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ArrowLeft,
  Heart,
  Check,
  Shirt,
  GlassWater,
  User,
  Clock,
  Users,
  Calendar,
} from 'lucide-react-native';

const gymnasticsArtwork = require('../../../assets/images/activity-gymnastics.png');
const playZoneArtwork = require('../../../assets/images/activity-play-zone.png');
const ninjaArtwork = require('../../../assets/images/activity-ninja-kids.png');
const danceArtwork = require('../../../assets/images/activity-dance.png');

export default function ActivityDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { activities, isFavorite, toggleFavorite } = usePlayNest();
  const [selectedSession, setSelectedSession] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const screenWidth = Dimensions.get('window').width;

  const activityRaw = activities.find((a) => a.id === id) || activities[0];
  
  const activity = useMemo(() => {
    let image = playZoneArtwork;
    if (activityRaw.category === 'gymnastics') image = gymnasticsArtwork;
    else if (activityRaw.category === 'ninja') image = ninjaArtwork;
    else if (activityRaw.category === 'dance') image = danceArtwork;
    else if (activityRaw.category === 'sports') image = gymnasticsArtwork;
    else if (activityRaw.category === 'toddlers') image = playZoneArtwork;
    
    // Create a mock array of images for the slider
    const images = [image, gymnasticsArtwork, ninjaArtwork, playZoneArtwork].filter((img, index, self) => self.indexOf(img) === index).slice(0, 3);
    if (images.length < 3) images.push(danceArtwork);

    return { ...activityRaw, image, sliderImages: images };
  }, [activityRaw]);

  const favorite = isFavorite(activity.id);

  const availableSessions = [
    { day: 'Saturday', date: 'Sep 12', time: '09:00 AM - 10:30 AM' },
    { day: 'Sunday', date: 'Sep 13', time: '10:30 AM - 12:00 PM' },
    { day: 'Monday', date: 'Sep 14', time: '04:00 PM - 05:30 PM' },
  ];

  const whatToBring = [
    { label: 'Comfortable clothes', icon: <Shirt size={16} color="#FBBF24" /> },
    { label: 'Water bottle', icon: <GlassWater size={16} color="#FBBF24" /> },
    { label: 'Socks (or bare feet)', icon: <User size={16} color="#FBBF24" /> },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.headerSection}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            bounces={false}
            onScroll={(e) => {
              const slide = Math.round(e.nativeEvent.contentOffset.x / screenWidth);
              setActiveSlide(slide);
            }}
            scrollEventThrottle={16}
          >
            {activity.sliderImages.map((img, idx) => (
              <ImageBackground 
                key={idx} 
                source={img} 
                style={[styles.headerImage, { width: screenWidth }]} 
                imageStyle={styles.headerImageInner}
                resizeMode="cover"
              />
            ))}
          </ScrollView>

          <SafeAreaView edges={['top']} style={styles.navBarAbsolute}>
            <Pressable
              onPress={() => router.back()}
              hitSlop={10}
              style={styles.navCircle}>
              <ArrowLeft size={20} color="#FFFFFF" />
            </Pressable>

            <Pressable
              onPress={() => toggleFavorite(activity.id)}
              hitSlop={10}
              style={styles.navCircle}>
              <Heart
                size={20}
                color={favorite ? '#F472B6' : '#FFFFFF'}
                fill={favorite ? '#F472B6' : 'none'}
              />
            </Pressable>
          </SafeAreaView>

          <View style={styles.pagination}>
            {activity.sliderImages.map((_, idx) => (
              <View key={idx} style={[styles.dot, activeSlide === idx && styles.activeDot]} />
            ))}
          </View>
        </View>

        <View style={styles.contentBody}>
          <View style={styles.titleRow}>
            <Text style={styles.activityTitle}>{activity.name}</Text>
            <View style={styles.popularBadge}>
              <Text style={styles.popularBadgeText}>Popular</Text>
            </View>
          </View>
          
          <Text style={styles.description}>{activity.description}</Text>
          
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <User size={16} color="#A9A8D6" style={{ marginRight: 6 }} />
              <Text style={styles.metaText}>Ages {activity.ageRange}</Text>
            </View>
            <View style={styles.metaDivider} />
            <View style={styles.metaItem}>
              <Clock size={16} color="#A9A8D6" style={{ marginRight: 6 }} />
              <Text style={styles.metaText}>{activity.duration}</Text>
            </View>
            <View style={styles.metaDivider} />
            <View style={styles.metaItem}>
              <Users size={16} color="#A9A8D6" style={{ marginRight: 6 }} />
              <Text style={styles.metaText}>Medium</Text>
            </View>
          </View>

          <View style={styles.learnSection}>
            <Text style={styles.sectionTitle}>What Kids Learn</Text>
            <View style={styles.learnGrid}>
              {['Balance', 'Coordination', 'Strength', 'Confidence', 'Teamwork', 'Agility'].map((item, idx) => {
                const colors = ['#F472B6', '#38BDF8', '#FBBF24', '#A78BFA', '#34D399', '#F87171'];
                const color = colors[idx % colors.length];
                return (
                  <View key={idx} style={[styles.learnGridItem, { backgroundColor: color + '1A', borderColor: color + '33', borderWidth: 1 }]}>
                    <View style={[styles.learnGridAccent, { backgroundColor: color }]} />
                    <Text style={[styles.learnGridText, { color: color }]} numberOfLines={1}>{item}</Text>
                  </View>
                );
              })}
            </View>
          </View>

          <View style={styles.bringSection}>
            <Text style={styles.sectionTitle}>What to Bring</Text>
            <View style={styles.bringList}>
              {whatToBring.map((item, idx) => {
                const colors = ['#FBBF24', '#38BDF8', '#F472B6'];
                const color = colors[idx % colors.length];
                return (
                  <View key={idx} style={styles.bringCardRow}>
                    <View style={[styles.bringCardIconWrap, { backgroundColor: color + '1A', borderColor: color + '33' }]}>
                      {React.cloneElement(item.icon, { color: color })}
                    </View>
                    <Text style={styles.bringCardLabel}>{item.label}</Text>
                  </View>
                );
              })}
            </View>
          </View>

          <View style={styles.sessionsSection}>
            <Text style={styles.sectionTitle}>Available Sessions</Text>
            <View style={styles.sessionsVerticalList}>
              {availableSessions.map((sess, idx) => {
                const isSelected = selectedSession === idx;
                return (
                  <Pressable key={idx} onPress={() => setSelectedSession(idx)}>
                    <View style={[styles.sessionRow, isSelected && styles.sessionRowSelected]}>
                      <View style={[styles.sessionRowIconWrap, isSelected && styles.sessionRowIconWrapSelected]}>
                        <Calendar size={18} color={isSelected ? '#FFFFFF' : '#A9A8D6'} />
                      </View>
                      
                      <View style={styles.sessionRowInfo}>
                        <Text style={[styles.sessionRowDate, isSelected && styles.sessionRowTextSelected]}>
                          {sess.day}, {sess.date}
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                          <Clock size={12} color={isSelected ? '#F472B6' : '#6B6880'} />
                          <Text style={[styles.sessionRowTime, isSelected && { color: '#E2E8F0' }]}>
                            {sess.time}
                          </Text>
                        </View>
                      </View>

                      <View style={[styles.sessionRadio, isSelected && styles.sessionRadioSelected]}>
                        {isSelected && <View style={styles.sessionRadioInner} />}
                      </View>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View style={{ height: 120 }} />
        </View>
      </ScrollView>

      {/* Floating Bottom Booking CTA */}
      <View style={styles.bottomBar}>
        <Pressable
          style={styles.bookButton}
          onPress={() =>
            router.push({
              pathname: '/booking/[id]',
              params: { id: activity.id },
            })
          }
        >
          <LinearGradient
            colors={['#8B5CF6', '#A78BFA']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.bookButtonGradient}
          >
            <Text style={styles.bookButtonText}>Book This Session</Text>
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090B2A',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  headerSection: {
    marginBottom: 20,
    position: 'relative',
  },
  headerImage: {
    height: 300,
  },
  headerImageInner: {
    borderRadius: 0,
  },
  navBarAbsolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 15,
    zIndex: 10,
  },
  pagination: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  activeDot: {
    backgroundColor: '#34D399',
    width: 20,
  },
  navCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(9,11,42,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentBody: {
    paddingHorizontal: 20,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  activityTitle: {
    fontFamily: 'NunitoBold',
    fontSize: 24,
    color: '#FFFFFF',
    flex: 1,
    marginRight: 10,
  },
  popularBadge: {
    backgroundColor: '#FDE047',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  popularBadgeText: {
    fontFamily: 'NunitoBold',
    fontSize: 12,
    color: '#090B2A',
  },
  description: {
    fontFamily: 'NunitoBold',
    fontSize: 14,
    color: '#E2E8F0',
    lineHeight: 22,
    marginBottom: 20,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontFamily: 'NunitoBold',
    fontSize: 13,
    color: '#A9A8D6',
  },
  metaDivider: {
    width: 1,
    height: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginHorizontal: 12,
  },
  learnSection: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontFamily: 'NunitoBold',
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 16,
  },
  learnGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  learnGridItem: {
    width: '47%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  learnGridAccent: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
  },
  learnGridText: {
    fontFamily: 'NunitoBold',
    fontSize: 13,
    marginLeft: 4,
    flexShrink: 1,
  },
  bringSection: {
    marginBottom: 32,
  },
  bringList: {
    gap: 12,
  },
  bringCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#151843',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  bringCardIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    borderWidth: 1,
  },
  bringCardLabel: {
    fontFamily: 'NunitoBold',
    fontSize: 15,
    color: '#E2E8F0',
    flex: 1,
  },
  sessionsSection: {
    marginBottom: 20,
  },
  sessionsVerticalList: {
    gap: 12,
  },
  sessionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#151843',
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  sessionRowSelected: {
    backgroundColor: 'rgba(124, 58, 237, 0.15)',
    borderColor: 'rgba(124, 58, 237, 0.5)',
  },
  sessionRowIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  sessionRowIconWrapSelected: {
    backgroundColor: '#7C3AED',
  },
  sessionRowInfo: {
    flex: 1,
  },
  sessionRowDate: {
    fontFamily: 'NunitoBold',
    fontSize: 15,
    color: '#A9A8D6',
  },
  sessionRowTextSelected: {
    color: '#FFFFFF',
  },
  sessionRowTime: {
    fontFamily: 'NunitoBold',
    fontSize: 12,
    color: '#6B6880',
    marginLeft: 4,
  },
  sessionRadio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  sessionRadioSelected: {
    borderColor: '#F472B6',
  },
  sessionRadioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#F472B6',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#090B2A',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
  },
  bookButton: {
    height: 56,
    borderRadius: 16,
    overflow: 'hidden',
  },
  bookButtonGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookButtonText: {
    fontFamily: 'NunitoBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});
