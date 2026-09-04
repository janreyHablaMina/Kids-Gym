export const PlayNestColors = {
  // Brand Primary (Playful Purple / Violet)
  primary: '#7C3AED',
  primaryDark: '#5B21B6',
  primaryLight: '#8B5CF6',
  primaryMuted: '#EDE9FE',
  primaryGhost: '#F5F3FF',

  // Secondary Accents
  blue: '#0284C7',
  blueLight: '#38BDF8',
  blueMuted: '#E0F2FE',
  
  yellow: '#F59E0B',
  yellowLight: '#FBBF24',
  yellowMuted: '#FEF3C7',

  coral: '#F43F5E',
  coralLight: '#FB7185',
  coralMuted: '#FFE4E6',

  green: '#10B981',
  greenLight: '#34D399',
  greenMuted: '#D1FAE5',

  orange: '#EA580C',
  orangeLight: '#FB923C',
  orangeMuted: '#FFEDD5',

  teal: '#0D9488',
  tealLight: '#2DD4BF',
  tealMuted: '#CCFBF1',

  // Neutrals
  canvas: '#F8FAFC',
  card: '#FFFFFF',
  cardElevated: '#FFFFFF',
  border: '#E2E8F0',
  borderLight: '#F1F5F9',
  
  // Text
  text: '#0F172A',
  textSecondary: '#475569',
  textMuted: '#94A3B8',
  textWhite: '#FFFFFF',

  // System
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  dangerLight: '#FEE2E2',

  // Shadows
  shadowColor: '#1E1B4B',
};

export const Shadows = {
  soft: {
    shadowColor: PlayNestColors.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  card: {
    shadowColor: PlayNestColors.shadowColor,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  glow: (color: string) => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 6,
  }),
};

export const Typography = {
  fontFamily: 'System',
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    title: 28,
    hero: 32,
  },
};
