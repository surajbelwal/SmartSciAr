import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { WebView } from "react-native-webview";

const ModelViewer = ({ modelData, navigation }) => {
  const { embedUrl, title, description } = modelData;

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity
        style={styles.backArrow}
        onPress={handleBack}
        activeOpacity={0.7}
      >
        <Text style={styles.backArrowText}>←</Text>
      </TouchableOpacity>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.title}>{title}</Text>

        <View style={styles.modelContainer}>
          <WebView
            source={{ uri: embedUrl }}
            style={styles.modelFrame}
            allowsFullscreenVideo={true}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            scalesPageToFit={true}
          />
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>Key Points:</Text>
          {description.map((point, index) => (
            <Text key={index} style={styles.descriptionPoint}>
              {point}
            </Text>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0e1a",
  },
  backArrow: {
    position: "absolute",
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    borderWidth: 1,
    borderColor: "rgba(78, 205, 196, 0.3)",
  },
  backArrowText: {
    color: "#4ecdc4",
    fontSize: 24,
    fontWeight: "bold",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 100,
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#ffffff",
    textAlign: "center",
  },
  modelContainer: {
    width: "100%",
    height: 400,
    marginBottom: 30,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#1a1f2e",
    borderWidth: 1,
    borderColor: "rgba(78, 205, 196, 0.3)",
  },
  modelFrame: {
    width: "100%",
    height: "100%",
    border: "none",
  },
  descriptionContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(78, 205, 196, 0.3)",
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
    color: "#4ecdc4",
  },
  descriptionPoint: {
    fontSize: 16,
    lineHeight: 24,
    color: "#ffffff",
    marginBottom: 8,
  },
});

export default ModelViewer;
