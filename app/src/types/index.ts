export type ActivityCategory =
  | 'all'
  | 'gymnastics'
  | 'indoor_play'
  | 'ninja'
  | 'dance'
  | 'sports'
  | 'toddlers';

export interface ActivitySession {
  id: string;
  day: string;
  dateStr: string; // e.g. "Sat, Sep 12"
  time: string;    // e.g. "10:30 AM"
  spotsTotal: number;
  spotsLeft: number;
  coach: string;
}

export interface Activity {
  id: string;
  name: string;
  tagline: string;
  category: ActivityCategory;
  categoryLabel: string;
  ageRange: string;
  duration: string;
  energyLevel: 'Low' | 'Medium' | 'High' | 'Super High';
  badgeColor: string;
  badgeBg: string;
  emoji: string;
  accentColor: string;
  price: string;
  description: string;
  whatKidsLearn: string[];
  whatToBring: string[];
  coachName: string;
  coachRole: string;
  sessions: ActivitySession[];
  isPopular?: boolean;
}

export interface Child {
  id: string;
  name: string;
  age: number;
  avatarEmoji: string;
  avatarBg: string;
  favoriteActivity: string;
  sessionsCompleted: number;
  favoriteColor: string;
  allergiesOrNotes?: string;
}

export interface Booking {
  id: string;
  activityId: string;
  activityName: string;
  activityEmoji: string;
  categoryLabel: string;
  childId: string;
  childName: string;
  childEmoji: string;
  dateStr: string;
  time: string;
  coach: string;
  price: string;
  status: 'confirmed' | 'completed' | 'cancelled';
  bookingRef: string;
  color: string;
}

export interface Promotion {
  id: string;
  title: string;
  subtitle: string;
  badgeText: string;
  buttonText: string;
  bgGradient: [string, string];
  emoji: string;
}

export interface ParentUser {
  name: string;
  greeting: string;
  email: string;
  phone: string;
  membershipStatus: string;
  childrenCount: number;
}
