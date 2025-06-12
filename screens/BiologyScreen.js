import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";

export default function BiologyScreen({ navigation }) {
  const biologyTopics = [
    "Cell Structure & Function",
    "DNA & Genetics",
    "Photosynthesis",
    "Cellular Respiration",
    "Human Body Systems",
    "Evolution & Natural Selection",
    "Ecology & Ecosystems",
    "Plant Biology",
    "Animal Behavior",
    "Microbiology",
    "Biotechnology",
    "Human Anatomy",
  ];

  const handleBackToHome = () => {
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerSection}>
          <View style={styles.iconContainer}>
            <Text style={styles.iconText}>🧬</Text>
          </View>
          <Text style={styles.title}>Biology</Text>
          <Text style={styles.subtitle}>
            Explore the fascinating world of life
          </Text>
        </View>

        <View style={styles.topicsSection}>
          <Text style={styles.sectionTitle}>Topics You Can Learn</Text>

          {biologyTopics.map((topic, index) => (
            <TouchableOpacity
              key={index}
              style={styles.topicCard}
              activeOpacity={0.8}
            >
              <View style={styles.topicNumber}>
                <Text style={styles.topicNumberText}>{index + 1}</Text>
              </View>
              <View style={styles.topicContent}>
                <Text style={styles.topicTitle}>{topic}</Text>
                <Text style={styles.topicSubtitle}>
                  3D biological models & life processes
                </Text>
              </View>
              <View style={styles.arrowIcon}>
                <Text style={styles.arrowText}>→</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.backButton} onPress={handleBackToHome}>
          <Text style={styles.backButtonText}>← Back to Home</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0e1a",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 40,
  },
  headerSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  iconContainer: {
    width: 80,
    height: 80,
    backgroundColor: "rgba(69, 183, 209, 0.15)",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#45b7d1",
  },
  iconText: {
    fontSize: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#45b7d1",
    textAlign: "center",
    fontWeight: "500",
  },
  topicsSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 20,
    textAlign: "center",
  },
  topicCard: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 16,
    padding: 20,
    marginVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(69, 183, 209, 0.3)",
    borderLeftWidth: 4,
    borderLeftColor: "#45b7d1",
  },
  topicNumber: {
    width: 40,
    height: 40,
    backgroundColor: "#45b7d1",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  topicNumberText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  topicContent: {
    flex: 1,
  },
  topicTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 4,
  },
  topicSubtitle: {
    fontSize: 12,
    color: "#a0a9c0",
  },
  arrowIcon: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  arrowText: {
    color: "#45b7d1",
    fontSize: 18,
    fontWeight: "bold",
  },
  backButton: {
    backgroundColor: "transparent",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.3)",
    marginTop: 20,
  },
  backButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "500",
  },
});
