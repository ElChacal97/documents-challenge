import { BORDER_RADIUS, COLORS, FONT_SIZES, SPACING } from "@/constants/theme";
import { useNotificationQueue } from "@/contexts/NotificationQueueContext";
import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { formatRelativeTime } from "../logic/utils/string";

const NotificationBanner: React.FC = () => {
  const [slideAnim] = useState(new Animated.Value(-100));
  const [opacityAnim] = useState(new Animated.Value(0));
  const { state, showNext, hideCurrent } = useNotificationQueue();
  const { currentNotification, isShowing } = state;
  const { top } = useSafeAreaInsets();

  const handleDismiss = useCallback(() => {
    hideCurrent();

    setTimeout(() => {
      showNext();
    }, 2000);
  }, [hideCurrent, showNext]);

  useEffect(() => {
    if (isShowing && currentNotification) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      const dismissTimer = setTimeout(() => {
        handleDismiss();
      }, 3000);

      return () => clearTimeout(dismissTimer);
    } else if (!isShowing) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -100,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isShowing, currentNotification, slideAnim, opacityAnim, handleDismiss]);

  const handlePress = () => {
    handleDismiss();
  };

  if (!isShowing || !currentNotification) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY: slideAnim }],
          opacity: opacityAnim,
          paddingTop: top,
        },
      ]}
    >
      <TouchableOpacity
        style={[styles.banner, { borderLeftColor: COLORS.primary }]}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Ionicons name="notifications" size={20} color={COLORS.primary} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={1}>
              New Document Created!
            </Text>
            <Text style={styles.subtitle} numberOfLines={1}>
              {currentNotification.DocumentTitle}
            </Text>
            <Text style={styles.time}>
              {formatRelativeTime(currentNotification.Timestamp)}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.dismissButton}
            onPress={handleDismiss}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="close" size={16} color={COLORS.textSecondary} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default NotificationBanner;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    paddingHorizontal: SPACING.md,
    paddingTop: 44,
  },
  banner: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    borderLeftWidth: 4,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.md,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.md,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: FONT_SIZES.md,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  time: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
  },
  dismissButton: {
    padding: SPACING.xs,
  },
});
