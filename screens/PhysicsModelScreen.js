import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ModelViewer from "../components/ModelViewer";
import { getModelById } from "../data/physicsData";

const PhysicsModelScreen = ({ route, navigation }) => {
  const { modelId } = route.params;
  const modelData = getModelById(modelId);

  if (!modelData) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Model not found</Text>
      </View>
    );
  }

  return <ModelViewer modelData={modelData} navigation={navigation} />;
};

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0a0e1a",
  },
  errorText: {
    color: "#ffffff",
    fontSize: 18,
  },
});

export default PhysicsModelScreen;
