import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { PlayNestColors } from '@/constants/playNestTheme';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  emoji?: string;
  actionText?: string;
  onActionPress?: () => void;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  emoji,
  actionText,
  onActionPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <View style={styles.titleRow}>
          {emoji && <Text style={styles.emoji}>{emoji}</Text>}
          <Text style={styles.title}>{title}</Text>
        </View>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      {actionText && onActionPress && (
        <Pressable
          onPress={onActionPress}
          hitSlop={8}
          style={({ pressed }) => [styles.actionButton, pressed && { opacity: 0.7 }]}>
          <Text style={styles.actionText}>{actionText}</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 14,
    paddingHorizontal: 4,
  },
  textContainer: {
    flex: 1,
    paddingRight: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 22,
    marginRight: 6,
  },
  title: {
    fontFamily: 'NunitoBold',
    fontSize: 20,
    color: PlayNestColors.text,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontFamily: 'NunitoBold',
    fontSize: 13,
    color: PlayNestColors.textSecondary,
    marginTop: 2,
  },
  actionButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  actionText: {
    fontFamily: 'NunitoBold',
    fontSize: 14,
    color: PlayNestColors.primary,
  },
});
