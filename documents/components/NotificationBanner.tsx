import { BORDER_RADIUS, COLORS, FONT_SIZES, SPACING } from "@/constants/theme";
import type { NotificationData } from "@/types/document";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { formatRelativeTime } from "../logic/utils/string";

interface NotificationBannerProps {
  notification: NotificationData | null;
  onDismiss: () => void;
  onPress?: (notification: NotificationData) => void;
}

const { width } = Dimensions.get("window");

export function NotificationBanner({
  notification,
  onDismiss,
  onPress,
}: NotificationBannerProps) {
  const [slideAnim] = useState(new Animated.Value(-100));
  const [opacityAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (notification) {
      // Show animation
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

      // Auto dismiss after 5 seconds
      const timer = setTimeout(() => {
        handleDismiss();
      }, 5000);

      return () => clearTimeout(timer);
    } else {
      // Hide animation
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
  }, [notification]);

  const handleDismiss = () => {
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
    ]).start(() => {
      onDismiss();
    });
  };

  const handlePress = () => {
    if (notification && onPress) {
      onPress(notification);
    }
  };

  if (!notification) return null;

  const getNotificationIcon = () => {
    switch (notification.type) {
      case "document_created":
        return "document-text";
      case "document_updated":
        return "create";
      case "document_deleted":
        return "trash";
      default:
        return "notifications";
    }
  };

  const getNotificationColor = () => {
    switch (notification.type) {
      case "document_created":
        return COLORS.success;
      case "document_updated":
        return COLORS.warning;
      case "document_deleted":
        return COLORS.error;
      default:
        return COLORS.primary;
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateY: slideAnim }],
          opacity: opacityAnim,
        },
      ]}
    >
      <TouchableOpacity
        style={[styles.banner, { borderLeftColor: getNotificationColor() }]}
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Ionicons
              name={getNotificationIcon()}
              size={20}
              color={getNotificationColor()}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {notification.type === "document_created" && "New Document"}
              {notification.type === "document_updated" && "Document Updated"}
              {notification.type === "document_deleted" && "Document Deleted"}
            </Text>
            <Text style={styles.subtitle} numberOfLines={1}>
              {notification.document.Title}
            </Text>
            <Text style={styles.time}>
              {formatRelativeTime(notification.timestamp)}
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
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    paddingHorizontal: SPACING.md,
    paddingTop: 44, // Status bar height
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
    fontWeight: "600",
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
