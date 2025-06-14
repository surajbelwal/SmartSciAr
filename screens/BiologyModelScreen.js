import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import ModelViewer from "../components/ModelViewer";
import { getModelById } from "../data/biologyData";

export default function BiologyModelScreen({ route, navigation }) {
  const { modelId } = route.params;
  const modelData = getModelById(modelId);

  if (!modelData) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Model not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ModelViewer modelData={modelData} navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0e1a",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
});
