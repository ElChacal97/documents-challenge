/* eslint-disable no-undef */
//import jest from "jest";
// Basic Jest setup for testing

// Mock React Native
jest.mock("react-native", () => {
  const RN = {
    View: "View",
    Text: "Text",
    TouchableOpacity: "TouchableOpacity",
    ScrollView: "ScrollView",
    FlatList: "FlatList",
    TextInput: "TextInput",
    ActivityIndicator: "ActivityIndicator",
    Alert: {
      alert: jest.fn(),
    },
    Share: {
      share: jest.fn(),
    },
    Platform: {
      OS: "ios",
      select: jest.fn((obj) => obj.ios || obj.default),
    },
    Dimensions: {
      get: jest.fn(() => ({ width: 375, height: 667 })),
    },
    StyleSheet: {
      create: jest.fn((styles) => styles),
    },
    Animated: {
      View: "Animated.View",
      Text: "Animated.Text",
      FlatList: "Animated.FlatList",
      ScrollView: "Animated.ScrollView",
      createAnimatedComponent: jest.fn((component) => component),
      Value: jest.fn(() => ({
        setValue: jest.fn(),
        setOffset: jest.fn(),
        flattenOffset: jest.fn(),
        extractOffset: jest.fn(),
        addListener: jest.fn(),
        removeListener: jest.fn(),
        removeAllListeners: jest.fn(),
        stopAnimation: jest.fn(),
        resetAnimation: jest.fn(),
        interpolate: jest.fn(() => ({ _value: 0 })),
      })),
      timing: jest.fn(() => ({
        start: jest.fn(),
      })),
      spring: jest.fn(() => ({
        start: jest.fn(),
      })),
      decay: jest.fn(() => ({
        start: jest.fn(),
      })),
    },
    PanResponder: {
      create: jest.fn(() => ({
        panHandlers: {},
      })),
    },
    RefreshControl: "RefreshControl",
  };
  return RN;
});

// Mock AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve()),
  removeItem: jest.fn(() => Promise.resolve()),
  multiSet: jest.fn(() => Promise.resolve()),
  multiGet: jest.fn(() => Promise.resolve()),
  multiRemove: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
  getAllKeys: jest.fn(() => Promise.resolve()),
}));

// Mock React Native Gesture Handler
jest.mock("react-native-gesture-handler", () => ({
  Swipeable: "Swipeable",
  DrawerLayout: "DrawerLayout",
  State: {},
  ScrollView: "ScrollView",
  Slider: "Slider",
  Switch: "Switch",
  TextInput: "TextInput",
  ToolbarAndroid: "ToolbarAndroid",
  ViewPagerAndroid: "ViewPagerAndroid",
  DrawerLayoutAndroid: "DrawerLayoutAndroid",
  WebView: "WebView",
  NativeViewGestureHandler: "NativeViewGestureHandler",
  TapGestureHandler: "TapGestureHandler",
  FlingGestureHandler: "FlingGestureHandler",
  ForceTouchGestureHandler: "ForceTouchGestureHandler",
  LongPressGestureHandler: "LongPressGestureHandler",
  PanGestureHandler: "PanGestureHandler",
  PinchGestureHandler: "PinchGestureHandler",
  RotationGestureHandler: "RotationGestureHandler",
  /* Buttons */
  RawButton: "RawButton",
  BaseButton: "BaseButton",
  RectButton: "RectButton",
  BorderlessButton: "BorderlessButton",
  /* Other */
  FlatList: "FlatList",
  gestureHandlerRootHOC: jest.fn(),
  Directions: {},
}));

// Mock Expo Vector Icons
jest.mock("@expo/vector-icons", () => ({
  Ionicons: ({ name, size, color, ...props }) => {
    const React = require("react");
    return React.createElement("Text", {
      ...props,
      children: name,
      style: { fontSize: size, color },
    });
  },
  MaterialIcons: ({ name, size, color, ...props }) => {
    const React = require("react");
    return React.createElement("Text", {
      ...props,
      children: name,
      style: { fontSize: size, color },
    });
  },
  FontAwesome: ({ name, size, color, ...props }) => {
    const React = require("react");
    return React.createElement("Text", {
      ...props,
      children: name,
      style: { fontSize: size, color },
    });
  },
  Feather: ({ name, size, color, ...props }) => {
    const React = require("react");
    return React.createElement("Text", {
      ...props,
      children: name,
      style: { fontSize: size, color },
    });
  },
  AntDesign: ({ name, size, color, ...props }) => {
    const React = require("react");
    return React.createElement("Text", {
      ...props,
      children: name,
      style: { fontSize: size, color },
    });
  },
  MaterialCommunityIcons: ({ name, size, color, ...props }) => {
    const React = require("react");
    return React.createElement("Text", {
      ...props,
      children: name,
      style: { fontSize: size, color },
    });
  },
}));

// Mock Expo Font
jest.mock("expo-font", () => ({
  loadAsync: jest.fn(() => Promise.resolve()),
  isLoaded: jest.fn(() => true),
  isLoading: jest.fn(() => false),
}));

// Mock Expo Document Picker
jest.mock("expo-document-picker", () => ({
  getDocumentAsync: jest.fn(() =>
    Promise.resolve({
      type: "success",
      name: "test.pdf",
      uri: "file://test.pdf",
    })
  ),
}));

// Mock React Native Modalize
jest.mock("react-native-modalize", () => ({
  Modalize: "Modalize",
}));

// Mock DrawerModal component
jest.mock("./components/modals/DrawerModal", () => {
  return ({ children, visible, onCloseModal, ...props }) => {
    const React = require("react");
    if (!visible) return null;
    return React.createElement(
      "View",
      { testID: "drawer-modal", ...props },
      children
    );
  };
});

// Mock React Native Safe Area Context
jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: jest.fn(() => ({ top: 0, bottom: 0, left: 0, right: 0 })),
  SafeAreaProvider: ({ children }) => children,
  SafeAreaView: "SafeAreaView",
}));

// Mock theme constants
jest.mock("@/constants/theme", () => ({
  COLORS: {
    primary: "#007AFF",
    secondary: "#FF9500",
    success: "#34C759",
    warning: "#FF9500",
    error: "#FF3B30",
    text: "#000000",
    textSecondary: "#666666",
    background: "#FFFFFF",
    surface: "#F2F2F7",
    border: "#C6C6C8",
    icon: "#666666",
  },
  FONT_SIZES: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
  },
  SPACING: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  BORDER_RADIUS: {
    xs: 4,
    sm: 6,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
}));

// Mock utility functions
jest.mock("./logic/utils/string", () => ({
  formatRelativeTime: jest.fn((date) => "just now"),
}));

// Mock common components
jest.mock("./components/Card", () => {
  return ({ children, onPress, ...props }) => {
    const React = require("react");
    return React.createElement(
      "TouchableOpacity",
      { onPress, ...props },
      children
    );
  };
});

jest.mock("./components/Text", () => {
  return ({ children, style, ...props }) => {
    const React = require("react");
    return React.createElement("Text", { style, ...props }, children);
  };
});
