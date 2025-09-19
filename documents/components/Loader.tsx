import { COLORS } from "@/constants/theme";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const Loader = () => {
  return (
    <View style={styles.loadingContainer} testID="loader">
      <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
