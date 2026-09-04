import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  ImageBackground,
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

const { height, width } = Dimensions.get('window');
const isCompact = height < 720 || width < 370;

const splashArtwork = require('../../assets/images/splash-playnest-kids.png');
const brandLetters = 'PlayNest'.split('');
const kidsLetters = [
  { letter: 'K', color: '#FBBF24', rotate: '-6deg' },
  { letter: 'I', color: '#38BDF8', rotate: '4deg' },
  { letter: 'D', color: '#34D399', rotate: '-3deg' },
  { letter: 'S', color: '#F472B6', rotate: '6deg' },
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
                marginHorizontal: 2,
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

export default function SplashScreen() {
  const [fontsLoaded] = useFonts({
    FredokaOne: FredokaOne_400Regular,
    LuckiestGuy: LuckiestGuy_400Regular,
    NunitoBold: Nunito_700Bold,
  });

  const intro = useRef(new Animated.Value(0)).current;
  const logoPop = useRef(new Animated.Value(0.88)).current;
  const loadingPulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!fontsLoaded) return;

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
  }, [fontsLoaded, intro, loadingPulse, logoPop]);

  if (!fontsLoaded) return <View style={styles.loading} />;

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
    top: isCompact ? '12%' : '16%',
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
});
