import React from 'react';
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
import { useRouter } from 'expo-router';
import { usePlayNest } from '@/context/PlayNestContext';
import { PlayNestColors } from '@/constants/playNestTheme';
import { ChildCard } from '@/components/ChildCard';
import { SectionHeader } from '@/components/SectionHeader';
import { LinearGradient } from 'expo-linear-gradient';
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
    <View style={styles.screen}>
      
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerSub}>ACCOUNT & FAMILY</Text>
            <Text style={styles.headerTitle}>Parent Profile</Text>
          </View>

          {/* Overlapping Parent Info Card */}
          <View style={styles.userCardWrapper}>
            <LinearGradient
              colors={['#2D1B69', '#0F0F2A']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.userCard}
            >
              <View style={styles.userTop}>
                <Image 
                  source={{ uri: 'https://api.dicebear.com/7.x/avataaars/png?seed=JanreyPlayNest&backgroundColor=A78BFA' }} 
                  style={styles.avatarImage} 
                />
                <View style={styles.userInfo}>
                  <View style={styles.nameRow}>
                    <Text style={styles.userName}>{user.name}</Text>
                    <LinearGradient
                      colors={['#8B5CF6', '#F472B6']}
                      start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
                      style={styles.memberBadge}
                    >
                      <Sparkles size={10} color="#FFFFFF" style={{ marginRight: 3 }} />
                      <Text style={styles.memberBadgeText}>VIP</Text>
                    </LinearGradient>
                  </View>
                  <Text style={styles.userRole}>Parent / Guardian Account</Text>
                  <Text style={styles.userEmail}>{user.email}</Text>
                </View>
              </View>

              <View style={styles.userDivider} />

              {/* Structured Stats Grid */}
              <View style={styles.statsGrid}>
                <View style={styles.statBox}>
                  <Text style={[styles.statNumber, { color: '#F472B6' }]}>{children.length}</Text>
                  <Text style={styles.statLabel}>Children</Text>
                </View>
                <View style={styles.statBorder} />
                <View style={styles.statBox}>
                  <Text style={[styles.statNumber, { color: '#34D399' }]}>{upcomingBookings.length}</Text>
                  <Text style={styles.statLabel}>Upcoming</Text>
                </View>
                <View style={styles.statBorder} />
                <View style={styles.statBox}>
                  <Text style={[styles.statNumber, { color: '#60A5FA' }]}>{favorites.length}</Text>
                  <Text style={styles.statLabel}>Favorites</Text>
                </View>
              </View>
            </LinearGradient>
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

            {/* Clean Add Child Button */}
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

          {/* Clean Settings List */}
          <View style={styles.section}>
            <SectionHeader title="Play Space & Info" emoji="🏢" />

            <LinearGradient
            colors={['#1E1B4B', '#0B0D2B']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.menuCard}
          >
              <Pressable
                onPress={() => router.push('/about')}
                style={({ pressed }) => [styles.menuItem, pressed && styles.menuItemPressed]}>
                <View style={[styles.menuIconBox, { backgroundColor: 'rgba(124, 58, 237, 0.15)' }]}>
                  <MapPin size={20} color={PlayNestColors.primary} />
                </View>
                <View style={styles.menuTextWrap}>
                  <Text style={styles.menuTitle}>Play Space Location & Hours</Text>
                  <Text style={styles.menuSubtitle}>Maps, parking, and open play times</Text>
                </View>
                <ChevronRight size={18} color={PlayNestColors.borderLight} />
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
                <View style={[styles.menuIconBox, { backgroundColor: 'rgba(52, 211, 153, 0.15)' }]}>
                  <ShieldCheck size={20} color={PlayNestColors.green} />
                </View>
                <View style={styles.menuTextWrap}>
                  <Text style={styles.menuTitle}>Safety & Cleanliness Pledge</Text>
                  <Text style={styles.menuSubtitle}>Certified coaches and padded equipment</Text>
                </View>
                <ChevronRight size={18} color={PlayNestColors.borderLight} />
              </Pressable>

              <View style={styles.menuDivider} />

              <Pressable
                onPress={handleSupportPress}
                style={({ pressed }) => [styles.menuItem, pressed && styles.menuItemPressed]}>
                <View style={[styles.menuIconBox, { backgroundColor: 'rgba(96, 165, 250, 0.15)' }]}>
                  <Phone size={20} color={PlayNestColors.blue} />
                </View>
                <View style={styles.menuTextWrap}>
                  <Text style={styles.menuTitle}>Parent Support & Questions</Text>
                  <Text style={styles.menuSubtitle}>Contact front desk & party bookings</Text>
                </View>
                <ChevronRight size={18} color={PlayNestColors.borderLight} />
              </Pressable>
            </LinearGradient>
          </View>

          {/* Brand Tagline */}
          <View style={styles.footerBrand}>
            <Text style={styles.brandTitle}>PlayNest Kids</Text>
            <Text style={styles.brandTagline}>"Play. Move. Grow."</Text>
            <Text style={styles.versionText}>Version 1.0.0 (Interactive Prototype)</Text>
          </View>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#090B2A',
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    paddingTop: 12,
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  headerSub: {
    fontFamily: 'NunitoBold',
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  headerTitle: {
    fontFamily: 'NunitoBold',
    fontSize: 32,
    color: '#FFFFFF',
  },
  userCardWrapper: {
    marginHorizontal: 20,
    borderRadius: 24,
    marginBottom: 24,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  userCard: {
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  userTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarImage: {
    width: 62,
    height: 62,
    borderRadius: 31,
    marginRight: 16,
    borderWidth: 2,
    borderColor: 'rgba(139, 92, 246, 0.4)',
  },
  userInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  userName: {
    fontFamily: 'NunitoBold',
    fontSize: 20,
    color: PlayNestColors.text,
    marginRight: 8,
  },
  memberBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  memberBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontFamily: 'NunitoBold',
  },
  userRole: {
    fontFamily: 'NunitoBold',
    fontSize: 13,
    color: PlayNestColors.textSecondary,
  },
  userEmail: {
    fontFamily: 'NunitoBold',
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
    fontFamily: 'NunitoBold',
    fontSize: 20,
    color: PlayNestColors.primary,
  },
  statLabel: {
    fontFamily: 'NunitoBold',
    fontSize: 12,
    color: PlayNestColors.textSecondary,
    marginTop: 2,
  },
  statBorder: {
    width: 1,
    height: 28,
    backgroundColor: PlayNestColors.borderLight,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  addChildBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PlayNestColors.primaryGhost,
    borderWidth: 1,
    borderColor: 'rgba(124, 58, 237, 0.3)',
    borderStyle: 'dashed',
    borderRadius: 20,
    paddingVertical: 14,
    marginTop: 6,
  },
  addIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(124, 58, 237, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  addChildText: {
    fontFamily: 'NunitoBold',
    fontSize: 14,
    color: PlayNestColors.primary,
  },
  menuCard: {
    borderRadius: 22,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
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
    fontFamily: 'NunitoBold',
    fontSize: 15,
    color: PlayNestColors.text,
  },
  menuSubtitle: {
    fontFamily: 'NunitoBold',
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
    fontFamily: 'NunitoBold',
    fontSize: 18,
    color: PlayNestColors.primary,
  },
  brandTagline: {
    fontFamily: 'NunitoBold',
    fontSize: 13,
    color: PlayNestColors.textSecondary,
    marginTop: 2,
  },
  versionText: {
    fontFamily: 'NunitoBold',
    fontSize: 11,
    color: PlayNestColors.textMuted,
    marginTop: 6,
  },
});
