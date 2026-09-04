import React from 'react';
import { Tabs } from 'expo-router';
import { BottomTabs } from '@/components/BottomTabs';

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <BottomTabs {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="activities" options={{ title: 'Activities' }} />
      <Tabs.Screen name="bookings" options={{ title: 'Bookings' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}
