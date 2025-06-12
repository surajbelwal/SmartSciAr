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

export default function HomeScreen({ navigation }) {
  const handlePhysicsPress = () => {
    navigation.navigate("Physics");
  };

  const handleChemistryPress = () => {
    navigation.navigate("Chemistry");
  };

  const handleBiologyPress = () => {
    navigation.navigate("Biology");
  };

  const handleBackToWelcome = () => {
    navigation.navigate("Welcome");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* Back Arrow */}
      <TouchableOpacity
        style={styles.backArrow}
        onPress={handleBackToWelcome}
        activeOpacity={0.7}
      >
        <Text style={styles.backArrowText}>←</Text>
      </TouchableOpacity>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerSection}>
          <Text style={styles.title}>Welcome to Smart Sci AR</Text>
          <Text style={styles.subtitle}>Hello, Student!</Text>
        </View>

        <View style={styles.mainContent}>
          <Text style={styles.welcomeText}>
            Ready to explore science with AR?
          </Text>
          <Text style={styles.descriptionText}>
            Choose your subject and dive into interactive 3D learning
          </Text>

          <View style={styles.featuresContainer}>
            <TouchableOpacity
              style={[styles.featureCard, styles.physicsCard]}
              activeOpacity={0.8}
              onPress={handlePhysicsPress}
            >
              <View style={styles.cardIcon}>
                <Text style={styles.iconText}>⚛️</Text>
              </View>
              <Text style={styles.featureTitle}>Physics</Text>
              <Text style={styles.featureDesc}>
                Explore atoms, forces, and quantum mechanics
              </Text>
              <View style={styles.cardButton}>
                <Text style={styles.cardButtonText}>Start Learning</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.featureCard, styles.chemistryCard]}
              activeOpacity={0.8}
              onPress={handleChemistryPress}
            >
              <View style={styles.cardIcon}>
                <Text style={styles.iconText}>🧪</Text>
              </View>
              <Text style={styles.featureTitle}>Chemistry</Text>
              <Text style={styles.featureDesc}>
                Visualize molecules and chemical reactions
              </Text>
              <View style={styles.cardButton}>
                <Text style={styles.cardButtonText}>Start Learning</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.featureCard, styles.biologyCard]}
              activeOpacity={0.8}
              onPress={handleBiologyPress}
            >
              <View style={styles.cardIcon}>
                <Text style={styles.iconText}>🧬</Text>
              </View>
              <Text style={styles.featureTitle}>Biology</Text>
              <Text style={styles.featureDesc}>
                Study cell structures and life processes
              </Text>
              <View style={styles.cardButton}>
                <Text style={styles.cardButtonText}>Start Learning</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0e1a",
  },
  backArrow: {
    position: "absolute",
    top: 50,
    bottom: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    borderWidth: 1,
    borderColor: "rgba(100, 255, 218, 0.3)",
  },
  backArrowText: {
    color: "#64ffda",
    fontSize: 24,
    fontWeight: "bold",
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
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: "#64ffda",
    textAlign: "center",
    fontWeight: "500",
  },
  mainContent: {
    paddingHorizontal: 10,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 16,
    color: "#a0a9c0",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 30,
  },
  featuresContainer: {
    paddingVertical: 20,
  },
  featureCard: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 20,
    padding: 24,
    marginVertical: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 12,
  },
  physicsCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#ff6b6b",
  },
  chemistryCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#4ecdc4",
  },
  biologyCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#45b7d1",
  },
  cardIcon: {
    width: 60,
    height: 60,
    backgroundColor: "rgba(100, 255, 218, 0.1)",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  iconText: {
    fontSize: 30,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
  },
  featureDesc: {
    fontSize: 14,
    color: "#a0a9c0",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 16,
  },
  cardButton: {
    backgroundColor: "#64ffda",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  cardButtonText: {
    color: "#0a0e1a",
    fontSize: 14,
    fontWeight: "bold",
  },
});
