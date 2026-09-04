import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Home, Activity, Calendar, User, Plus } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export function BottomTabs({ state, descriptors, navigation }: any) {
  const router = useRouter();
  const currentRoute = state.routes[state.index].name;

  const tabs = [
    { name: 'index', label: 'Home', icon: Home, route: '/' },
    { name: 'activities', label: 'Activities', icon: Activity, route: '/activities' },
    { name: 'bookings', label: 'Bookings', icon: Calendar, route: '/bookings' },
    { name: 'profile', label: 'Profile', icon: User, route: '/profile' },
  ];

  return (
    <View style={styles.bottomBarWrap}>
      <View style={styles.bottomTabs}>
        {tabs.slice(0, 2).map((tab) => {
          const isActive = currentRoute === tab.name;
          return (
            <Pressable key={tab.name} onPress={() => router.push(tab.route as any)} style={styles.tabItem}>
              <tab.icon color={isActive ? '#7C3AED' : '#6B6880'} size={22} />
              <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>{tab.label}</Text>
            </Pressable>
          );
        })}
        <View style={styles.centerSpace} />
        {tabs.slice(2, 4).map((tab) => {
          const isActive = currentRoute === tab.name;
          return (
            <Pressable key={tab.name} onPress={() => router.push(tab.route as any)} style={styles.tabItem}>
              <tab.icon color={isActive ? '#7C3AED' : '#6B6880'} size={22} />
              <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>{tab.label}</Text>
            </Pressable>
          );
        })}
      </View>
      <View style={styles.centerButtonWrap}>
        <Pressable style={styles.centerButton}>
          <LinearGradient
            colors={['#8B5CF6', '#F472B6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.centerButtonGradient}
          >
            <Plus color="#FFFFFF" size={32} />
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
