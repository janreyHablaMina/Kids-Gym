import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { FredokaOne_400Regular } from '@expo-google-fonts/fredoka-one';
import { LuckiestGuy_400Regular } from '@expo-google-fonts/luckiest-guy';
import { Nunito_700Bold } from '@expo-google-fonts/nunito';
import { Bell, ArrowRight, Calendar, Home, Activity, User, Plus } from 'lucide-react-native';

const { height, width } = Dimensions.get('window');
const isCompact = height < 720 || width < 370;
const splashArtwork = require('../../../assets/images/splash-playnest-kids.png');
const homeHeroArtwork = require('../../../assets/images/home-adventure-hero.png');
const homePromoArtwork = require('../../../assets/images/home-weekend-promo.png');
const gymnasticsArtwork = require('../../../assets/images/activity-gymnastics.png');
const playZoneArtwork = require('../../../assets/images/activity-play-zone.png');
const ninjaArtwork = require('../../../assets/images/activity-ninja-kids.png');
const danceArtwork = require('../../../assets/images/activity-dance.png');

const brandLetters = 'PlayNest'.split('');
const kidsLetters = [
  { letter: 'K', color: '#FBBF24', rotate: '-6deg' },
  { letter: 'I', color: '#38BDF8', rotate: '4deg' },
  { letter: 'D', color: '#34D399', rotate: '-3deg' },
  { letter: 'S', color: '#F472B6', rotate: '6deg' },
];

const popularActivities = [
  { name: 'Gymnastics', color: '#8B5CF6', code: 'FLIP', image: gymnasticsArtwork },
  { name: 'Play Zone', color: '#38BDF8', code: 'PLAY', image: playZoneArtwork },
  { name: 'Ninja Kids', color: '#34D399', code: 'JUMP', image: ninjaArtwork },
  { name: 'Dance', color: '#F472B6', code: 'BEAT', image: danceArtwork },
];

const tabs = [
  { name: 'Home', icon: Home, active: true },
  { name: 'Activities', icon: Activity },
  { name: 'Bookings', icon: Calendar },
  { name: 'Profile', icon: User },
];

const CurvedBrandText = () => {
  const middle = (brandLetters.length - 1) / 2;
  const arcHeight = isCompact ? 25 : 32;

  return (
    <View style={styles.brandArc} accessibilityLabel="PlayNest">
      {brandLetters.map((letter, index) => {
        const distance = (index - middle) / middle;
        const lift = distance * distance * arcHeight;
        const rotate = distance * 18;
        const centerBoost = 1 - Math.abs(distance) * 0.13;

        return (
          <Text
            key={`${letter}-${index}`}
            style={[
              styles.brandLetter,
              {
                transform: [
                  { translateY: lift },
                  { rotate: `${rotate}deg` },
                  { scale: centerBoost },
                ],
              },
            ]}
          >
            {letter}
          </Text>
        );
      })}
    </View>
  );
};

const KidsText = () => (
  <View style={styles.kidsRow} accessibilityLabel="KIDS">
    {kidsLetters.map((item) => (
      <Text
        key={item.letter}
        style={[
          styles.kidsLetter,
          {
            color: item.color,
            transform: [{ rotate: item.rotate }],
          },
        ]}
      >
        {item.letter}
      </Text>
    ))}
  </View>
);

const LeafLogo = () => {
  const bounce = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounce, {
          toValue: -6,
          duration: 900,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(bounce, {
          toValue: 0,
          duration: 900,
          easing: Easing.bounce,
          useNativeDriver: true,
        }),
        Animated.delay(700),
      ])
    ).start();
  }, [bounce]);

  return (
    <Animated.View style={[styles.leafLogo, { transform: [{ translateY: bounce }] }]}>
      <View style={[styles.leaf, styles.leafLeft]} />
      <View style={[styles.leaf, styles.leafMiddle]} />
      <View style={[styles.leaf, styles.leafRight]} />
    </Animated.View>
  );
};

const FloatingStar = ({ top, left, size, color, delay }: any) => {
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 1200,
          delay,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [delay, pulse]);

  return (
    <Animated.View
      style={[
        styles.star,
        {
          top,
          left,
          width: size,
          height: size,
          backgroundColor: color,
          opacity: pulse.interpolate({ inputRange: [0, 1], outputRange: [0.45, 1] }),
          transform: [
            { rotate: '45deg' },
            { scale: pulse.interpolate({ inputRange: [0, 1], outputRange: [0.7, 1.25] }) },
          ],
        },
      ]}
    />
  );
};

const SplashView = () => {
  const intro = useRef(new Animated.Value(0)).current;
  const logoPop = useRef(new Animated.Value(0.88)).current;
  const loadingPulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(intro, {
        toValue: 1,
        duration: 850,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.spring(logoPop, {
        toValue: 1,
        delay: 120,
        tension: 48,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(loadingPulse, {
          toValue: 1,
          duration: 850,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(loadingPulse, {
          toValue: 0,
          duration: 850,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [intro, loadingPulse, logoPop]);

  return (
    <ImageBackground source={splashArtwork} resizeMode="cover" style={styles.root}>
      <StatusBar style="light" />
      <LinearGradient
        colors={['rgba(20,12,72,0.15)', 'rgba(20,12,72,0)', 'rgba(20,12,72,0.22)']}
        locations={[0, 0.55, 1]}
        style={StyleSheet.absoluteFill}
      />
      <FloatingStar top="8%" left="26%" size={10} color="#7DD3FC" delay={0} />
      <FloatingStar top="12%" left="84%" size={12} color="#FDE68A" delay={250} />
      <FloatingStar top="25%" left="12%" size={8} color="#FDE68A" delay={500} />
      <FloatingStar top="28%" left="73%" size={6} color="#A78BFA" delay={650} />

      <Animated.View
        style={[
          styles.logoBlock,
          {
            opacity: intro,
            transform: [
              {
                translateY: intro.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-16, 0],
                }),
              },
              { scale: logoPop },
            ],
          },
        ]}
      >
        <LeafLogo />
        <CurvedBrandText />
        <KidsText />
        <Text style={styles.tagline}>Play. Move. Grow.</Text>
      </Animated.View>

      <Animated.View
        style={[
          styles.homeBar,
          {
            opacity: loadingPulse.interpolate({ inputRange: [0, 1], outputRange: [0.42, 0.9] }),
            transform: [
              {
                scaleX: loadingPulse.interpolate({ inputRange: [0, 1], outputRange: [0.82, 1] }),
              },
            ],
          },
        ]}
      />
    </ImageBackground>
  );
};

const Header = () => (
  <View style={styles.header}>
    <View style={styles.avatarRing}>
      <View style={styles.avatar}>
        <View style={styles.avatarFace}>
          <View style={styles.avatarHair} />
          <View style={styles.avatarEyes} />
          <View style={styles.avatarSmile} />
        </View>
      </View>
      <View style={styles.onlineDot} />
    </View>
    <View style={styles.greetingCopy}>
      <Text style={styles.goodMorning}>Good morning</Text>
      <View style={styles.nameRow}>
        <Text style={styles.userName}>Janrey!</Text>
        <View style={styles.proBadge}>
          <Text style={styles.proBadgeText}>PRO</Text>
        </View>
      </View>
      <Text style={styles.readyText}>Ready for some fun today?</Text>
    </View>
    <Pressable>
      <LinearGradient
        colors={['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.05)']}
        style={styles.bellButton}
      >
        <Bell color="#FFFFFF" size={20} />
        <View style={styles.notifyDot} />
      </LinearGradient>
    </Pressable>
  </View>
);

const HeroCard = () => (
  <ImageBackground source={homeHeroArtwork} resizeMode="cover" imageStyle={styles.heroImage} style={styles.heroCard}>
    <LinearGradient
      colors={['rgba(124,58,237,0.96)', 'rgba(124,58,237,0.72)', 'rgba(236,72,153,0.1)']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.heroOverlay}
    >
      <View style={styles.heroCopy}>
        <Text style={styles.heroTitle}>Adventure Awaits!</Text>
        <Text style={styles.heroText}>Discover fun activities designed to help kids play, move, and grow.</Text>
        <Pressable style={styles.heroButton}>
          <Text style={styles.heroButtonText}>Explore Activities</Text>
          <ArrowRight color="#2E1065" size={16} style={{ marginLeft: 6 }} />
        </Pressable>
      </View>
    </LinearGradient>
  </ImageBackground>
);

const BookingCard = () => (
  <View style={styles.bookingCard}>
    <View style={styles.bookingHeader}>
      <View style={styles.bookingIconWrap}>
        <Calendar color="#FDE68A" size={16} />
      </View>
      <Text style={styles.cardLabel}>Upcoming Session</Text>
      <View style={{ flex: 1 }} />
      <View style={styles.bookingStatus}>
        <Text style={styles.bookingStatusText}>Confirmed</Text>
      </View>
    </View>
    
    <View style={styles.bookingBody}>
      <View style={styles.bookingInfo}>
        <Text style={styles.bookingTitle}>Little Gym Explorers</Text>
        <Text style={styles.bookingMeta}>Today, 10:30 AM • 45 mins</Text>
        <View style={styles.bookingTags}>
          <View style={styles.bookingTag}>
            <Text style={styles.bookingTagText}>Ages 3-5</Text>
          </View>
          <View style={[styles.bookingTag, { backgroundColor: 'rgba(52, 211, 153, 0.15)' }]}>
            <Text style={[styles.bookingTagText, { color: '#34D399' }]}>Play Zone</Text>
          </View>
        </View>
      </View>
      <Pressable style={styles.bookingActionBtn}>
        <ArrowRight color="#FFFFFF" size={20} />
      </Pressable>
    </View>
  </View>
);

const PopularActivities = () => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>Popular Activities</Text>
      <Text style={styles.seeAll}>See All</Text>
    </View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.activityScroller}>
      {popularActivities.map((activity, index) => (
        <View key={activity.name} style={styles.activityCard}>
          <ImageBackground
            source={activity.image}
            resizeMode="cover"
            imageStyle={styles.activityImage}
            style={styles.activityImageWrap}
          >
            <LinearGradient
              colors={['rgba(15,23,42,0.08)', 'rgba(15,23,42,0.48)']}
              style={StyleSheet.absoluteFill}
            />
            <View style={[styles.activityCode, { backgroundColor: activity.color }]}>
              <Text style={styles.activityCodeText}>{activity.code}</Text>
            </View>
          </ImageBackground>
          <Text numberOfLines={1} style={styles.activityName}>
            {activity.name}
          </Text>
          {index === 0 && <View style={styles.activityGlow} />}
        </View>
      ))}
    </ScrollView>
  </View>
);

const PromoCard = () => (
  <ImageBackground source={homePromoArtwork} resizeMode="cover" imageStyle={styles.promoImage} style={styles.promoCard}>
    <LinearGradient
      colors={['rgba(124,58,237,0.96)', 'rgba(37,99,235,0.66)', 'rgba(244,114,182,0.12)']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.promoOverlay}
    >
      <View style={styles.promoTextWrap}>
        <Text style={styles.promoTitle}>Weekend Family Fun</Text>
        <Text style={styles.promoText}>Special play sessions for the whole family!</Text>
        <Pressable style={styles.promoButton}>
          <Text style={styles.promoButtonText}>Learn More</Text>
          <ArrowRight color="#2E1065" size={14} style={{ marginLeft: 6 }} />
        </Pressable>
      </View>
    </LinearGradient>
  </ImageBackground>
);

const HomeScreen = () => {
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 650,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [fade]);

  return (
    <SafeAreaView style={styles.homeRoot}>
      <StatusBar style="light" />
      <Animated.View style={[styles.homeShell, { opacity: fade }]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.homeContent}
        >
          <Header />
          <HeroCard />
          <BookingCard />
          <PopularActivities />
          <PromoCard />
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
};

export default function AppStart() {
  const [fontsLoaded] = useFonts({
    FredokaOne: FredokaOne_400Regular,
    LuckiestGuy: LuckiestGuy_400Regular,
    NunitoBold: Nunito_700Bold,
  });
  const [showHome, setShowHome] = useState(false);

  useEffect(() => {
    if (!fontsLoaded) return;

    const timer = setTimeout(() => setShowHome(true), 2300);
    return () => clearTimeout(timer);
  }, [fontsLoaded]);

  if (!fontsLoaded) return <View style={styles.loading} />;

  return showHome ? <HomeScreen /> : <SplashView />;
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#140C48',
    overflow: 'hidden',
  },
  loading: {
    flex: 1,
    backgroundColor: '#140C48',
  },
  logoBlock: {
    position: 'absolute',
    top: isCompact ? '16%' : '22%',
    left: 24,
    right: 24,
    alignItems: 'center',
  },
  leafLogo: {
    width: 92,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: isCompact ? 2 : 6,
  },
  leaf: {
    position: 'absolute',
    bottom: 5,
    width: 28,
    height: 40,
    borderTopLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  leafLeft: {
    left: 13,
    backgroundColor: '#39D98A',
    transform: [{ rotate: '-36deg' }],
  },
  leafMiddle: {
    width: 32,
    height: 48,
    backgroundColor: '#FDE047',
    transform: [{ translateY: -5 }],
  },
  leafRight: {
    right: 13,
    backgroundColor: '#34D399',
    transform: [{ rotate: '36deg' }],
  },
  brandArc: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    minHeight: isCompact ? 74 : 88,
    marginTop: isCompact ? -2 : -4,
  },
  brandLetter: {
    fontFamily: 'LuckiestGuy',
    fontSize: isCompact ? 54 : 66,
    color: '#FFFFFF',
    letterSpacing: 0,
    lineHeight: isCompact ? 60 : 72,
    textAlign: 'center',
    textShadowColor: 'rgba(49, 27, 146, 0.68)',
    textShadowOffset: { width: 0, height: 6 },
    textShadowRadius: 9,
    marginHorizontal: isCompact ? 1 : 2,
  },
  kidsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: isCompact ? -8 : -10,
  },
  kidsLetter: {
    fontFamily: 'LuckiestGuy',
    fontSize: isCompact ? 34 : 42,
    letterSpacing: 0,
    lineHeight: isCompact ? 38 : 46,
    textAlign: 'center',
    textShadowColor: 'rgba(91, 33, 182, 0.48)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 7,
    marginHorizontal: 2,
  },
  tagline: {
    fontFamily: 'NunitoBold',
    fontSize: isCompact ? 15 : 18,
    color: 'rgba(255,255,255,0.9)',
    marginTop: isCompact ? 2 : 5,
    textAlign: 'center',
    textShadowColor: 'rgba(17, 24, 39, 0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 5,
  },
  star: {
    position: 'absolute',
    borderRadius: 3,
  },
  homeBar: {
    position: 'absolute',
    bottom: isCompact ? 22 : 34,
    alignSelf: 'center',
    width: 118,
    height: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.75)',
  },
  homeRoot: {
    flex: 1,
    backgroundColor: '#080A24',
  },
  homeShell: {
    flex: 1,
    backgroundColor: '#0B0D2B',
  },
  homeContent: {
    paddingHorizontal: 15,
    paddingTop: isCompact ? 64 : 84,
    paddingBottom: 104,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 70,
    marginBottom: 28,
  },
  avatarRing: {
    padding: 3,
    borderRadius: 36,
    borderWidth: 2,
    borderColor: 'rgba(124, 58, 237, 0.6)',
    backgroundColor: 'rgba(124, 58, 237, 0.1)',
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#E9D5FF',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  onlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#34D399',
    borderWidth: 2,
    borderColor: '#0B0D2B',
  },
  avatarFace: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FDBA74',
    alignItems: 'center',
  },
  avatarHair: {
    width: 30,
    height: 14,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: '#1F1235',
  },
  avatarEyes: {
    width: 18,
    height: 4,
    borderLeftWidth: 3.5,
    borderRightWidth: 3.5,
    borderColor: '#111827',
    marginTop: 6,
  },
  avatarSmile: {
    width: 12,
    height: 6,
    borderBottomWidth: 3,
    borderColor: '#7F1D1D',
    borderRadius: 9,
    marginTop: 3,
  },
  greetingCopy: {
    flex: 1,
    marginLeft: 16,
  },
  goodMorning: {
    fontFamily: 'NunitoBold',
    color: '#A9A8D6',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  userName: {
    fontFamily: 'FredokaOne',
    color: '#FFFFFF',
    fontSize: 26,
    lineHeight: 32,
  },
  proBadge: {
    backgroundColor: '#FDE68A',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginLeft: 8,
  },
  proBadgeText: {
    fontFamily: 'LuckiestGuy',
    color: '#D97706',
    fontSize: 10,
  },
  readyText: {
    fontFamily: 'NunitoBold',
    color: '#8B5CF6',
    fontSize: 14,
    marginTop: 2,
  },
  bellButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  bellText: {
    fontFamily: 'LuckiestGuy',
    color: '#FFFFFF',
    fontSize: 18,
  },
  notifyDot: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FB3F64',
    borderWidth: 1.5,
    borderColor: '#0B0D2B',
  },
  heroCard: {
    minHeight: isCompact ? 190 : 210,
    borderRadius: 24,
    overflow: 'hidden',
    marginTop: 12,
    marginBottom: 24,
    backgroundColor: '#7C3AED',
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  heroImage: {
    borderRadius: 24,
  },
  heroOverlay: {
    flex: 1,
    justifyContent: 'center',
    padding: 28,
  },
  heroCopy: {
    width: '58%',
  },
  heroTitle: {
    fontFamily: 'FredokaOne',
    color: '#FFFFFF',
    fontSize: isCompact ? 22 : 25,
    lineHeight: isCompact ? 28 : 31,
    marginBottom: 8,
  },
  heroText: {
    fontFamily: 'NunitoBold',
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
    lineHeight: 19,
    marginBottom: 14,
  },
  heroButton: {
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FDE68A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
    alignSelf: 'flex-start',
  },
  heroButtonText: {
    fontFamily: 'NunitoBold',
    color: '#2E1065',
    fontSize: 13,
  },
  heroArrow: {
    fontFamily: 'NunitoBold',
    color: '#2E1065',
    fontSize: 14,
    marginLeft: 8,
  },
  bookingCard: {
    borderRadius: 24,
    backgroundColor: 'rgba(49, 46, 129, 0.4)',
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.4)',
    padding: 20,
    marginBottom: 20,
  },
  bookingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  bookingIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 10,
    backgroundColor: 'rgba(124, 58, 237, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  cardLabel: {
    fontFamily: 'NunitoBold',
    color: '#E9D5FF',
    fontSize: 14,
  },
  bookingStatus: {
    backgroundColor: 'rgba(52, 211, 153, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  bookingStatusText: {
    fontFamily: 'NunitoBold',
    color: '#34D399',
    fontSize: 11,
  },
  bookingBody: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bookingInfo: {
    flex: 1,
  },
  bookingTitle: {
    fontFamily: 'FredokaOne',
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 4,
  },
  bookingMeta: {
    fontFamily: 'NunitoBold',
    color: '#A9A8D6',
    fontSize: 13,
    marginBottom: 12,
  },
  bookingTags: {
    flexDirection: 'row',
    gap: 8,
  },
  bookingTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  bookingTagText: {
    fontFamily: 'NunitoBold',
    color: '#E2E8F0',
    fontSize: 11,
  },
  bookingActionBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#8B5CF6',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  section: {
    marginTop: 2,
    marginBottom: 17,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sectionTitle: {
    fontFamily: 'NunitoBold',
    color: '#FFFFFF',
    fontSize: 17,
  },
  seeAll: {
    fontFamily: 'NunitoBold',
    color: '#C4B5FD',
    fontSize: 12,
  },
  activityScroller: {
    gap: 12,
    paddingRight: 8,
  },
  activityCard: {
    width: 92,
    height: 112,
    borderRadius: 17,
    backgroundColor: '#151843',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  activityImageWrap: {
    height: 76,
    justifyContent: 'flex-end',
    padding: 8,
  },
  activityImage: {
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
  },
  activityCode: {
    height: 24,
    borderRadius: 12,
    alignSelf: 'flex-start',
    paddingHorizontal: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityCodeText: {
    fontFamily: 'LuckiestGuy',
    color: '#FFFFFF',
    fontSize: 9,
  },
  activityName: {
    fontFamily: 'NunitoBold',
    color: '#FFFFFF',
    fontSize: 12,
    paddingHorizontal: 9,
    paddingTop: 8,
  },
  activityGlow: {
    position: 'absolute',
    bottom: -20,
    left: 10,
    right: 10,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(139,92,246,0.45)',
  },
  promoCard: {
    minHeight: 140,
    borderRadius: 22,
    overflow: 'hidden',
    backgroundColor: '#7C3AED',
  },
  promoImage: {
    borderRadius: 22,
  },
  promoOverlay: {
    flex: 1,
    justifyContent: 'center',
    padding: 26,
  },
  promoTextWrap: {
    width: '60%',
  },
  promoTitle: {
    fontFamily: 'FredokaOne',
    color: '#FFFFFF',
    fontSize: 19,
    lineHeight: 24,
  },
  promoText: {
    fontFamily: 'NunitoBold',
    color: 'rgba(255,255,255,0.85)',
    fontSize: 12,
    lineHeight: 16,
    marginTop: 2,
    marginBottom: 9,
  },
  promoButton: {
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    flexDirection: 'row',
  },
  promoButtonText: {
    fontFamily: 'NunitoBold',
    color: '#2E1065',
    fontSize: 12,
  },
  bottomBarWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 94,
    justifyContent: 'flex-end',
  },
  bottomTabs: {
    height: 74,
    backgroundColor: '#090B2A',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderTopWidth: 1,
    borderTopColor: 'rgba(124,58,237,0.3)',
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(124,58,237,0.15)',
    borderRightWidth: 1,
    borderRightColor: 'rgba(124,58,237,0.15)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 10,
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 20,
  },
  tabItem: {
    width: 68,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
  },
  tabLabel: {
    fontFamily: 'NunitoBold',
    color: '#6B6880',
    fontSize: 10,
    marginTop: 4,
  },
  tabLabelActive: {
    color: '#7C3AED',
  },
  centerSpace: {
    width: 60,
  },
  centerButtonWrap: {
    position: 'absolute',
    alignSelf: 'center',
    top: -4,
    alignItems: 'center',
  },
  centerButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#0B0D2B',
    padding: 6,
    shadowColor: '#F472B6',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 10,
  },
  centerButtonGradient: {
    flex: 1,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
