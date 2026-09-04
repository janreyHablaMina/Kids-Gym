export const PlayNestColors = {
  // Brand Primary (Playful Violet with neon glow)
  primary: '#A78BFA',
  primaryDark: '#7C3AED',
  primaryLight: '#C4B5FD',
  primaryMuted: 'rgba(167, 139, 250, 0.15)',
  primaryGhost: 'rgba(167, 139, 250, 0.08)',

  // Secondary Accents (vivid neon-ish for dark mode)
  blue: '#38BDF8',
  blueLight: '#7DD3FC',
  blueMuted: 'rgba(56, 189, 248, 0.12)',

  yellow: '#FBBF24',
  yellowLight: '#FDE68A',
  yellowMuted: 'rgba(251, 191, 36, 0.12)',

  coral: '#FB7185',
  coralLight: '#FDA4AF',
  coralMuted: 'rgba(251, 113, 133, 0.12)',

  green: '#34D399',
  greenLight: '#6EE7B7',
  greenMuted: 'rgba(52, 211, 153, 0.12)',

  orange: '#FB923C',
  orangeLight: '#FDBA74',
  orangeMuted: 'rgba(251, 146, 60, 0.12)',

  teal: '#2DD4BF',
  tealLight: '#5EEAD4',
  tealMuted: 'rgba(45, 212, 191, 0.12)',

  // Dark Mode Surfaces
  canvas: '#0F0F1A',
  card: '#1A1A2E',
  cardElevated: '#222240',
  border: 'rgba(255, 255, 255, 0.08)',
  borderLight: 'rgba(255, 255, 255, 0.06)',

  // Text
  text: '#F1F0F5',
  textSecondary: '#9B97B0',
  textMuted: '#6B6880',
  textWhite: '#FFFFFF',

  // System
  success: '#34D399',
  warning: '#FBBF24',
  danger: '#FB7185',
  dangerLight: 'rgba(251, 113, 133, 0.15)',

  // Shadows / Glow
  shadowColor: '#A78BFA',
};

export const Shadows = {
  soft: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 3,
  },
  card: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 4,
  },
  glow: (color: string) => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
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
