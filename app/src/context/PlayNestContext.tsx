import React, { createContext, useContext, useState, useMemo } from 'react';
import { Activity, Booking, Child, ParentUser, Promotion } from '@/types';
import {
  INITIAL_BOOKINGS,
  INITIAL_CHILDREN,
  INITIAL_USER,
  MOCK_ACTIVITIES,
  MOCK_PROMOTIONS,
} from '@/data/mockData';

interface PlayNestContextType {
  user: ParentUser;
  activities: Activity[];
  children: Child[];
  bookings: Booking[];
  favorites: string[];
  promotions: Promotion[];
  addBooking: (bookingData: {
    activityId: string;
    childId: string;
    dateStr: string;
    time: string;
  }) => Booking;
  cancelBooking: (bookingId: string) => void;
  addChild: (childData: {
    name: string;
    age: number;
    avatarEmoji: string;
    avatarBg: string;
    favoriteActivity: string;
    favoriteColor: string;
    allergiesOrNotes?: string;
  }) => Child;
  updateChild: (childId: string, updates: Partial<Child>) => void;
  toggleFavorite: (activityId: string) => void;
  isFavorite: (activityId: string) => boolean;
  upcomingBookings: Booking[];
  pastBookings: Booking[];
}

const PlayNestContext = createContext<PlayNestContextType | undefined>(undefined);

export function PlayNestProvider({ children }: { children: React.ReactNode }) {
  const [user] = useState<ParentUser>(INITIAL_USER);
  const [activities] = useState<Activity[]>(MOCK_ACTIVITIES);
  const [childrenList, setChildrenList] = useState<Child[]>(INITIAL_CHILDREN);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [favorites, setFavorites] = useState<string[]>(['act-gymnastics', 'act-ninja']);
  const [promotions] = useState<Promotion[]>(MOCK_PROMOTIONS);

  const toggleFavorite = (activityId: string) => {
    setFavorites((prev) =>
      prev.includes(activityId) ? prev.filter((id) => id !== activityId) : [...prev, activityId]
    );
  };

  const isFavorite = (activityId: string) => favorites.includes(activityId);

  const addBooking = ({
    activityId,
    childId,
    dateStr,
    time,
  }: {
    activityId: string;
    childId: string;
    dateStr: string;
    time: string;
  }): Booking => {
    const act = activities.find((a) => a.id === activityId) || activities[0];
    const ch = childrenList.find((c) => c.id === childId) || childrenList[0];

    const randomRef = 'PNK-' + Math.floor(1000 + Math.random() * 9000);
    const newBooking: Booking = {
      id: `booking-${Date.now()}`,
      activityId: act.id,
      activityName: act.name,
      activityEmoji: act.emoji,
      categoryLabel: act.categoryLabel,
      childId: ch.id,
      childName: ch.name,
      childEmoji: ch.avatarEmoji,
      dateStr,
      time,
      coach: act.coachName,
      price: act.price,
      status: 'confirmed',
      bookingRef: randomRef,
      color: act.accentColor,
    };

    setBookings((prev) => [newBooking, ...prev]);

    // Update child's completed sessions / activity stats
    setChildrenList((prev) =>
      prev.map((c) =>
        c.id === ch.id
          ? {
              ...c,
              sessionsCompleted: c.sessionsCompleted + 1,
            }
          : c
      )
    );

    return newBooking;
  };

  const cancelBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'cancelled' as const } : b))
    );
  };

  const addChild = (childData: {
    name: string;
    age: number;
    avatarEmoji: string;
    avatarBg: string;
    favoriteActivity: string;
    favoriteColor: string;
    allergiesOrNotes?: string;
  }): Child => {
    const newChild: Child = {
      id: `child-${Date.now()}`,
      ...childData,
      sessionsCompleted: 0,
    };
    setChildrenList((prev) => [...prev, newChild]);
    return newChild;
  };

  const updateChild = (childId: string, updates: Partial<Child>) => {
    setChildrenList((prev) =>
      prev.map((c) => (c.id === childId ? { ...c, ...updates } : c))
    );
  };

  const upcomingBookings = useMemo(
    () => bookings.filter((b) => b.status === 'confirmed'),
    [bookings]
  );

  const pastBookings = useMemo(
    () => bookings.filter((b) => b.status === 'completed' || b.status === 'cancelled'),
    [bookings]
  );

  return (
    <PlayNestContext.Provider
      value={{
        user,
        activities,
        children: childrenList,
        bookings,
        favorites,
        promotions,
        addBooking,
        cancelBooking,
        addChild,
        updateChild,
        toggleFavorite,
        isFavorite,
        upcomingBookings,
        pastBookings,
      }}>
      {children}
    </PlayNestContext.Provider>
  );
}

export function usePlayNest() {
  const ctx = useContext(PlayNestContext);
  if (!ctx) {
    throw new Error('usePlayNest must be used within a PlayNestProvider');
  }
  return ctx;
}
