import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { PlayNestColors, Shadows } from '@/constants/playNestTheme';
import { PlayfulButton } from '@/components/PlayfulButton';
import { SectionHeader } from '@/components/SectionHeader';
import {
  ArrowLeft,
  MapPin,
  Clock,
  Phone,
  Mail,
  Sparkles,
  Navigation,
  CheckCircle2,
} from 'lucide-react-native';

export default function AboutScreen() {
  const router = useRouter();

  const handleGetDirections = () => {
    Alert.alert(
      'Navigating to PlayNest Kids 🚗',
      'Address: 124 Sunnyvale Boulevard, Suite 300\n\nEstimated drive time: 12 minutes.\nFree parking is available right in front of the main entrance!',
      [{ text: 'Great, thanks!', style: 'default' }]
    );
  };

  const handleCall = () => {
    Alert.alert('Call PlayNest Front Desk', '(555) 349-5437', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Simulate Call', style: 'default' },
    ]);
  };

  const handleEmail = () => {
    Alert.alert('Email PlayNest Kids', 'hello@playnestkids.com', [
      { text: 'Close', style: 'cancel' },
    ]);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.safeTop}>
        <View style={styles.navBar}>
          <Pressable onPress={() => router.back()} hitSlop={10} style={styles.backBtn}>
            <ArrowLeft size={20} color={PlayNestColors.text} />
          </Pressable>
          <Text style={styles.navTitle}>About & Location</Text>
          <View style={{ width: 42 }} />
        </View>
      </SafeAreaView>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        
        {/* Brand Banner */}
        <View style={[styles.brandBanner, Shadows.glow(PlayNestColors.primaryDark)]}>
          <View style={styles.bannerEmojiCircle}>
            <Text style={styles.bannerEmoji}>🏰</Text>
          </View>
          <Text style={styles.brandName}>PlayNest Kids</Text>
          <Text style={styles.brandTagline}>"Play. Move. Grow."</Text>
          <Text style={styles.brandStory}>
            A joyful, modern indoor play haven where children build motor skills, explore boundless imagination, and build confidence through active movement.
          </Text>
        </View>

        {/* Operating Hours */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Clock size={20} color={PlayNestColors.primary} style={{ marginRight: 8 }} />
            <Text style={styles.cardTitle}>Operating Hours</Text>
          </View>

          <View style={styles.hoursRow}>
            <Text style={styles.hoursDay}>Monday – Friday</Text>
            <Text style={styles.hoursTime}>9:00 AM – 7:00 PM</Text>
          </View>
          <View style={styles.hoursDivider} />
          <View style={styles.hoursRow}>
            <Text style={styles.hoursDay}>Saturday – Sunday</Text>
            <Text style={styles.hoursTime}>8:00 AM – 8:00 PM</Text>
          </View>
        </View>

        {/* Simulated Map View */}
        <View style={styles.mapCard}>
          <View style={styles.simulatedMapBg}>
            <View style={styles.mapGridPattern} />
            <View style={styles.mapPinPulse}>
              <View style={styles.mapPinInner}>
                <MapPin size={22} color="#FFFFFF" />
              </View>
            </View>
            <View style={styles.mapBadge}>
              <Text style={styles.mapBadgeText}>PlayNest HQ • Sunnyvale</Text>
            </View>
          </View>

          <View style={styles.addressSection}>
            <Text style={styles.venueName}>PlayNest Indoor Play & Gym</Text>
            <Text style={styles.addressText}>124 Sunnyvale Boulevard, Suite 300</Text>
            <Text style={styles.cityState}>Sunnyvale, CA 94086</Text>

            <PlayfulButton
              title="Get Directions"
              variant="primary"
              size="md"
              onPress={handleGetDirections}
              icon={<Navigation size={16} color="#FFFFFF" />}
              style={{ marginTop: 14 }}
            />
          </View>
        </View>

        {/* Contact Quick Actions */}
        <View style={styles.contactRow}>
          <Pressable
            onPress={handleCall}
            style={({ pressed }) => [styles.contactCard, pressed && { opacity: 0.7 }]}>
            <View style={[styles.contactIconBox, { backgroundColor: PlayNestColors.greenMuted }]}>
              <Phone size={20} color={PlayNestColors.green} />
            </View>
            <Text style={styles.contactLabel}>Phone</Text>
            <Text style={styles.contactValue}>(555) 349-5437</Text>
          </Pressable>

          <Pressable
            onPress={handleEmail}
            style={({ pressed }) => [styles.contactCard, pressed && { opacity: 0.7 }]}>
            <View style={[styles.contactIconBox, { backgroundColor: PlayNestColors.blueMuted }]}>
              <Mail size={20} color={PlayNestColors.blue} />
            </View>
            <Text style={styles.contactLabel}>Email</Text>
            <Text style={styles.contactValue}>hello@playnest.com</Text>
          </Pressable>
        </View>

        {/* Facility Amenities */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Sparkles size={20} color={PlayNestColors.primary} style={{ marginRight: 8 }} />
            <Text style={styles.cardTitle}>Play Space Amenities</Text>
          </View>

          {[
            'Hospital-grade air purification & sanitized foam equipment',
            'Full Olympic tumble tracks with soft landing airbags',
            'Dedicated Toddler Discovery Zone (Ages 0–3)',
            'Parent lounge cafe with viewing glass & complimentary WiFi',
            'Private themed party rooms for birthday celebrations',
            'Certified CPR & pediatric first-aid coaches always on deck',
          ].map((amenity, idx) => (
            <View key={idx} style={styles.amenityRow}>
              <CheckCircle2 size={16} color={PlayNestColors.green} style={{ marginRight: 10 }} />
              <Text style={styles.amenityText}>{amenity}</Text>
            </View>
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PlayNestColors.canvas,
  },
  safeTop: {
    backgroundColor: PlayNestColors.canvas,
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: PlayNestColors.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: PlayNestColors.borderLight,
  },
  navTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: PlayNestColors.text,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  brandBanner: {
    backgroundColor: PlayNestColors.primaryDark,
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
  },
  bannerEmojiCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  bannerEmoji: {
    fontSize: 34,
  },
  brandName: {
    fontSize: 26,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.4,
  },
  brandTagline: {
    fontSize: 14,
    fontWeight: '800',
    color: PlayNestColors.yellowLight,
    marginTop: 2,
    marginBottom: 10,
  },
  brandStory: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 19,
  },
  card: {
    backgroundColor: PlayNestColors.card,
    borderRadius: 22,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: PlayNestColors.borderLight,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: PlayNestColors.text,
  },
  hoursRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  hoursDay: {
    fontSize: 14,
    fontWeight: '600',
    color: PlayNestColors.text,
  },
  hoursTime: {
    fontSize: 14,
    fontWeight: '800',
    color: PlayNestColors.primary,
  },
  hoursDivider: {
    height: 1,
    backgroundColor: PlayNestColors.borderLight,
    marginVertical: 4,
  },
  mapCard: {
    backgroundColor: PlayNestColors.card,
    borderRadius: 22,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: PlayNestColors.borderLight,
  },
  simulatedMapBg: {
    height: 160,
    backgroundColor: '#1a2340',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  mapGridPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 1,
    borderColor: 'rgba(167, 139, 250, 0.1)',
  },
  mapPinPulse: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(124, 58, 237, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapPinInner: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: PlayNestColors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapBadge: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: PlayNestColors.cardElevated,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: PlayNestColors.borderLight,
  },
  mapBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: PlayNestColors.text,
  },
  addressSection: {
    padding: 18,
  },
  venueName: {
    fontSize: 17,
    fontWeight: '800',
    color: PlayNestColors.text,
  },
  addressText: {
    fontSize: 13,
    color: PlayNestColors.textSecondary,
    marginTop: 2,
  },
  cityState: {
    fontSize: 13,
    color: PlayNestColors.textSecondary,
  },
  contactRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  contactCard: {
    flex: 1,
    backgroundColor: PlayNestColors.card,
    borderRadius: 18,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: PlayNestColors.borderLight,
  },
  contactIconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  contactLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: PlayNestColors.textMuted,
    letterSpacing: 0.5,
  },
  contactValue: {
    fontSize: 12,
    fontWeight: '800',
    color: PlayNestColors.text,
    marginTop: 2,
  },
  amenityRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  amenityText: {
    fontSize: 13,
    color: PlayNestColors.text,
    lineHeight: 18,
    fontWeight: '500',
    flex: 1,
  },
});
