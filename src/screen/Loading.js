import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";

export default function Loading() {
  return (
    <>
      <View style={styles.fullscreen}>
        <ActivityIndicator size="large" color="#bcbcbc" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'transparent'
  },
});