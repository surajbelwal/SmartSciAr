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

export default function ChemistryScreen({ navigation }) {
  const chemistryTopics = [
    {
      title: "Atomic Structure & Periodic Table",
      modelId: "atom",
      hasModel: true,
    },
    {
      title: "Atomic Models & Theory",
      modelId: "atomicModel",
      hasModel: true,
    },
    {
      title: "Periodic Table of Elements",
      modelId: "periodicTable",
      hasModel: true,
    },
    {
      title: "Water Molecule (H₂O)",
      modelId: "water",
      hasModel: true,
    },
    {
      title: "Water Ball-and-Stick Model",
      modelId: "waterBallStick",
      hasModel: true,
    },
    {
      title: "Liquid Water Structure",
      modelId: "liquidWater",
      hasModel: true,
    },
    {
      title: "Benzene - Aromatic Compounds",
      modelId: "benzene",
      hasModel: true,
    },
    {
      title: "Molecular Structure & Bonding",
      modelId: "molecule",
      hasModel: true,
    },
    {
      title: "Carbon Dioxide (CO₂)",
      modelId: "carbonDioxide",
      hasModel: true,
    },
    {
      title: "Glucose - Carbohydrates",
      modelId: "glucose",
      hasModel: true,
    },
    {
      title: "Methane (CH₄) - Alkanes",
      modelId: "methane",
      hasModel: true,
    },
    {
      title: "Ethane Molecule",
      modelId: "ethane",
      hasModel: true,
    },
    {
      title: "Diamond Crystal Structure",
      modelId: "diamond",
      hasModel: true,
    },
    {
      title: "F Orbital - Quantum Chemistry",
      modelId: "orbitalF",
      hasModel: true,
    },
    {
      title: "Dxz Orbital - Transition Metals",
      modelId: "orbitalDxz",
      hasModel: true,
    },
    {
      title: "Cyclohexane Chair Conformation",
      modelId: "cyclohexane",
      hasModel: true,
    },
    {
      title: "Dopamine - Neurotransmitters",
      modelId: "dopamine",
      hasModel: true,
    },
    {
      title: "Phenol - Aromatic Alcohols",
      modelId: "phenol",
      hasModel: true,
    },
    {
      title: "Sodium Chloride (NaCl)",
      modelId: "nacl",
      hasModel: true,
    },
    { title: "Chemical Equilibrium", modelId: null, hasModel: false },
    { title: "Thermochemistry", modelId: null, hasModel: false },
    { title: "Electrochemistry", modelId: null, hasModel: false },
  ];

  const handleBackToHome = () => {
    navigation.navigate("Home");
  };

  const handleTopicPress = (topic) => {
    if (topic.hasModel && topic.modelId) {
      navigation.navigate("ChemistryModel", { modelId: topic.modelId });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* Back Arrow */}
      <TouchableOpacity
        style={styles.backArrow}
        onPress={handleBackToHome}
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
          <View style={styles.iconContainer}>
            <Text style={styles.iconText}>🧪</Text>
          </View>
          <Text style={styles.title}>Chemistry</Text>
          <Text style={styles.subtitle}>
            Discover the world of molecules and reactions
          </Text>
        </View>

        <View style={styles.topicsSection}>
          <Text style={styles.sectionTitle}>Topics You Can Learn</Text>

          {chemistryTopics.map((topic, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.topicCard,
                topic.hasModel && styles.topicCardActive,
              ]}
              activeOpacity={0.8}
              onPress={() => handleTopicPress(topic)}
            >
              <View style={styles.topicNumber}>
                <Text style={styles.topicNumberText}>{index + 1}</Text>
              </View>
              <View style={styles.topicContent}>
                <Text style={styles.topicTitle}>{topic.title}</Text>
                <Text style={styles.topicSubtitle}>
                  {topic.hasModel
                    ? "3D model available - Tap to explore!"
                    : "Coming soon..."}
                </Text>
              </View>
              <View style={styles.arrowIcon}>
                <Text
                  style={[
                    styles.arrowText,
                    topic.hasModel && styles.arrowTextActive,
                  ]}
                >
                  →
                </Text>
              </View>
            </TouchableOpacity>
          ))}
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
    backgroundColor: "rgba(78, 205, 196, 0.15)",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#4ecdc4",
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
    color: "#4ecdc4",
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
    borderColor: "rgba(78, 205, 196, 0.3)",
    borderLeftWidth: 4,
    borderLeftColor: "#4ecdc4",
  },
  topicNumber: {
    width: 40,
    height: 40,
    backgroundColor: "#4ecdc4",
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
    color: "#4ecdc4",
    fontSize: 18,
    fontWeight: "bold",
  },
  topicCardActive: {
    backgroundColor: "rgba(78, 205, 196, 0.1)",
    borderColor: "#4ecdc4",
    borderWidth: 2,
  },
  arrowTextActive: {
    color: "#ffffff",
    fontSize: 20,
  },
});
