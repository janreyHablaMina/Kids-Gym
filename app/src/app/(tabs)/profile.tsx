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
import { usePlayNest } from '@/context/PlayNestContext';
import { PlayNestColors } from '@/constants/playNestTheme';
import { ChildCard } from '@/components/ChildCard';
import { SectionHeader } from '@/components/SectionHeader';
import {
  Plus,
  ShieldCheck,
  MapPin,
  Phone,
  ChevronRight,
  Sparkles,
} from 'lucide-react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, children, favorites, upcomingBookings } = usePlayNest();

  const handleSupportPress = () => {
    Alert.alert(
      'PlayNest Support',
      'Need help with classes, bookings, or birthday parties?\n\nCall: (555) 349-5437\nEmail: hello@playnestkids.com',
      [{ text: 'Close', style: 'cancel' }]
    );
  };

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerSub}>ACCOUNT & FAMILY</Text>
          <Text style={styles.headerTitle}>Parent Profile 👤</Text>
        </View>

        {/* Parent Info Card */}
        <View style={styles.userCard}>
          <View style={styles.userTop}>
            <View style={styles.avatarWrap}>
              <Text style={styles.avatarEmoji}>👨‍👦</Text>
            </View>
            <View style={styles.userInfo}>
              <View style={styles.nameRow}>
                <Text style={styles.userName}>{user.name}</Text>
                <View style={styles.memberBadge}>
                  <Sparkles size={11} color="#FFFFFF" style={{ marginRight: 3 }} />
                  <Text style={styles.memberBadgeText}>VIP</Text>
                </View>
              </View>
              <Text style={styles.userRole}>Parent / Guardian Account</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
            </View>
          </View>

          <View style={styles.userDivider} />

          {/* Quick Stats Grid */}
          <View style={styles.statsGrid}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{children.length}</Text>
              <Text style={styles.statLabel}>Children</Text>
            </View>
            <View style={styles.statBorder} />
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{upcomingBookings.length}</Text>
              <Text style={styles.statLabel}>Upcoming</Text>
            </View>
            <View style={styles.statBorder} />
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{favorites.length}</Text>
              <Text style={styles.statLabel}>Favorites</Text>
            </View>
          </View>
        </View>

        {/* My Children Section */}
        <View style={styles.section}>
          <SectionHeader
            title="My Children"
            emoji="🎈"
            subtitle="Manage profiles, favorite classes, and milestones"
          />

          {children.map((child) => (
            <ChildCard
              key={child.id}
              child={child}
              onPress={() =>
                router.push({
                  pathname: '/children/[id]',
                  params: { id: child.id },
                })
              }
            />
          ))}

          {/* Add Child Button */}
          <Pressable
            onPress={() => router.push('/children/add')}
            style={({ pressed }) => [
              styles.addChildBtn,
              pressed && { opacity: 0.8 },
            ]}>
            <View style={styles.addIconCircle}>
              <Plus size={18} color={PlayNestColors.primary} strokeWidth={2.8} />
            </View>
            <Text style={styles.addChildText}>Add Another Child Profile</Text>
          </Pressable>
        </View>

        {/* About Play Space & Facility Settings */}
        <View style={styles.section}>
          <SectionHeader title="Play Space & Info" emoji="🏢" />

          <View style={styles.menuCard}>
            <Pressable
              onPress={() => router.push('/about')}
              style={({ pressed }) => [styles.menuItem, pressed && styles.menuItemPressed]}>
              <View style={[styles.menuIconBox, { backgroundColor: PlayNestColors.primaryMuted }]}>
                <MapPin size={20} color={PlayNestColors.primary} />
              </View>
              <View style={styles.menuTextWrap}>
                <Text style={styles.menuTitle}>Play Space Location & Hours</Text>
                <Text style={styles.menuSubtitle}>Maps, parking, and open play times</Text>
              </View>
              <ChevronRight size={18} color={PlayNestColors.textMuted} />
            </Pressable>

            <View style={styles.menuDivider} />

            <Pressable
              onPress={() =>
                Alert.alert(
                  'Safety & Hygiene Pledge',
                  'At PlayNest Kids, safety is our top priority:\n\n✓ Hospital-grade sanitization between every session\n✓ 100% padded ASTM-certified foam structures\n✓ First-Aid and CPR certified coaches on deck\n✓ Secure single-entry parent check-in/check-out',
                  [{ text: 'Understood', style: 'default' }]
                )
              }
              style={({ pressed }) => [styles.menuItem, pressed && styles.menuItemPressed]}>
              <View style={[styles.menuIconBox, { backgroundColor: PlayNestColors.greenMuted }]}>
                <ShieldCheck size={20} color={PlayNestColors.green} />
              </View>
              <View style={styles.menuTextWrap}>
                <Text style={styles.menuTitle}>Safety & Cleanliness Pledge</Text>
                <Text style={styles.menuSubtitle}>Certified coaches and padded equipment</Text>
              </View>
              <ChevronRight size={18} color={PlayNestColors.textMuted} />
            </Pressable>

            <View style={styles.menuDivider} />

            <Pressable
              onPress={handleSupportPress}
              style={({ pressed }) => [styles.menuItem, pressed && styles.menuItemPressed]}>
              <View style={[styles.menuIconBox, { backgroundColor: PlayNestColors.blueMuted }]}>
                <Phone size={20} color={PlayNestColors.blue} />
              </View>
              <View style={styles.menuTextWrap}>
                <Text style={styles.menuTitle}>Parent Support & Questions</Text>
                <Text style={styles.menuSubtitle}>Contact front desk & party bookings</Text>
              </View>
              <ChevronRight size={18} color={PlayNestColors.textMuted} />
            </Pressable>
          </View>
        </View>

        {/* Brand Tagline */}
        <View style={styles.footerBrand}>
          <Text style={styles.brandTitle}>PlayNest Kids</Text>
          <Text style={styles.brandTagline}>"Play. Move. Grow."</Text>
          <Text style={styles.versionText}>Version 1.0.0 (Interactive Prototype)</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: PlayNestColors.canvas,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 10,
  },
  header: {
    paddingTop: 12,
    paddingBottom: 14,
  },
  headerSub: {
    fontSize: 10,
    fontWeight: '800',
    color: PlayNestColors.primary,
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: PlayNestColors.text,
    letterSpacing: -0.4,
  },
  userCard: {
    backgroundColor: PlayNestColors.card,
    borderRadius: 24,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: PlayNestColors.borderLight,
  },
  userTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrap: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: PlayNestColors.primaryMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarEmoji: {
    fontSize: 32,
  },
  userInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontSize: 20,
    fontWeight: '900',
    color: PlayNestColors.text,
    marginRight: 8,
  },
  memberBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PlayNestColors.primaryDark,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  memberBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
  },
  userRole: {
    fontSize: 13,
    color: PlayNestColors.textSecondary,
    fontWeight: '600',
    marginTop: 2,
  },
  userEmail: {
    fontSize: 12,
    color: PlayNestColors.textMuted,
    marginTop: 2,
  },
  userDivider: {
    height: 1,
    backgroundColor: PlayNestColors.borderLight,
    marginVertical: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '900',
    color: PlayNestColors.primary,
  },
  statLabel: {
    fontSize: 12,
    color: PlayNestColors.textSecondary,
    fontWeight: '600',
    marginTop: 2,
  },
  statBorder: {
    width: 1,
    height: 28,
    backgroundColor: PlayNestColors.border,
  },
  section: {
    marginBottom: 24,
  },
  addChildBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PlayNestColors.primaryGhost,
    borderWidth: 2,
    borderColor: PlayNestColors.primaryDark,
    borderStyle: 'dashed',
    borderRadius: 20,
    paddingVertical: 14,
    marginTop: 6,
  },
  addIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: PlayNestColors.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  addChildText: {
    fontSize: 14,
    fontWeight: '800',
    color: PlayNestColors.primary,
  },
  menuCard: {
    backgroundColor: PlayNestColors.card,
    borderRadius: 22,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: PlayNestColors.borderLight,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  menuItemPressed: {
    backgroundColor: PlayNestColors.primaryGhost,
  },
  menuIconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  menuTextWrap: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: PlayNestColors.text,
  },
  menuSubtitle: {
    fontSize: 12,
    color: PlayNestColors.textSecondary,
    marginTop: 2,
  },
  menuDivider: {
    height: 1,
    backgroundColor: PlayNestColors.borderLight,
    marginHorizontal: 16,
  },
  footerBrand: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  brandTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: PlayNestColors.primary,
    letterSpacing: -0.2,
  },
  brandTagline: {
    fontSize: 13,
    fontWeight: '700',
    color: PlayNestColors.textSecondary,
    marginTop: 2,
  },
  versionText: {
    fontSize: 11,
    color: PlayNestColors.textMuted,
    marginTop: 6,
  },
});
