import React, { useRef } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { PlayNestColors, Shadows } from '@/constants/playNestTheme';

interface PlayfulButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'sun';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  loading?: boolean;
}

export const PlayfulButton: React.FC<PlayfulButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  style,
  textStyle,
  disabled = false,
  loading = false,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 30,
      bounciness: 6,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 25,
      bounciness: 8,
    }).start();
  };

  const getBackgroundColor = () => {
    if (disabled) return PlayNestColors.border;
    switch (variant) {
      case 'primary':
        return PlayNestColors.primaryDark;
      case 'secondary':
        return PlayNestColors.blue;
      case 'sun':
        return PlayNestColors.yellow;
      case 'outline':
        return 'transparent';
      case 'ghost':
        return PlayNestColors.primaryMuted;
      case 'danger':
        return PlayNestColors.danger;
      default:
        return PlayNestColors.primaryDark;
    }
  };

  const getTextColor = () => {
    if (disabled) return PlayNestColors.textMuted;
    switch (variant) {
      case 'outline':
        return PlayNestColors.primary;
      case 'ghost':
        return PlayNestColors.primary;
      case 'sun':
        return '#78350F';
      default:
        return PlayNestColors.textWhite;
    }
  };

  const sizeStyles: Record<'sm' | 'md' | 'lg', { container: ViewStyle; text: TextStyle }> = {
    sm: {
      container: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20 },
      text: { fontSize: 13, fontWeight: '700' },
    },
    md: {
      container: { paddingVertical: 13, paddingHorizontal: 22, borderRadius: 26 },
      text: { fontSize: 15, fontWeight: '700' },
    },
    lg: {
      container: { paddingVertical: 16, paddingHorizontal: 28, borderRadius: 32 },
      text: { fontSize: 17, fontWeight: '800' },
    },
  };
  const currentSize = sizeStyles[size];

  return (
    <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, style]}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        style={[
          styles.base,
          currentSize.container,
          {
            backgroundColor: getBackgroundColor(),
            borderWidth: variant === 'outline' ? 2 : 0,
            borderColor: variant === 'outline' ? PlayNestColors.primary : 'transparent',
          },
          variant === 'primary' && !disabled ? Shadows.glow(PlayNestColors.primary) : Shadows.soft,
        ]}>
        {loading ? (
          <ActivityIndicator color={getTextColor()} size="small" />
        ) : (
          <>
            {icon && iconPosition === 'left' && <>{icon}</>}
            <Text
              style={[
                styles.text,
                currentSize.text,
                {
                  color: getTextColor(),
                  marginLeft: icon && iconPosition === 'left' ? 8 : 0,
                  marginRight: icon && iconPosition === 'right' ? 8 : 0,
                },
                textStyle,
              ]}>
              {title}
            </Text>
            {icon && iconPosition === 'right' && <>{icon}</>}
          </>
        )}
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    letterSpacing: 0.2,
  },
});
