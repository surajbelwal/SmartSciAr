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

export default function PhysicsScreen({ navigation }) {
  const physicsTopics = [
    {
      title: "Physics Decoration Model",
      modelId: "decoration",
      hasModel: true,
    },
    {
      title: "Reflection & Refraction Prism",
      modelId: "prism",
      hasModel: true,
    },
    {
      title: "Electric Circuit",
      modelId: "figure121",
      hasModel: true,
    },
    {
      title: "Refraction of Light",
      modelId: "figure1010",
      hasModel: true,
    },
    {
      title: "Concave and Convex Mirror",
      modelId: "figure102",
      hasModel: true,
    },
    {
      title: "Parallel Rays Through Concave Mirror",
      modelId: "figure103",
      hasModel: true,
    },
    {
      title: "Focal Ray Reflection in Mirrors",
      modelId: "figure104",
      hasModel: true,
    },
    {
      title: "Center of Curvature Ray Reflection",
      modelId: "figure105",
      hasModel: true,
    },
    {
      title: "Oblique Ray Reflection at Mirror Pole",
      modelId: "figure106",
      hasModel: true,
    },
    {
      title: "Ray Diagrams for Concave Mirror Image Formation",
      modelId: "figure107",
      hasModel: true,
    },
    {
      title: "Formation of Image by a Convex Mirror",
      modelId: "figure108",
      hasModel: true,
    },
    {
      title: "The New Cartesian Sign Convention for Spherical Mirrors",
      modelId: "figure109",
      hasModel: true,
    },
    {
      title: "Refraction of Light by Glass",
      modelId: "figure1011",
      hasModel: true,
    },
    {
      title: "Converging and Diverging Action of Lenses",
      modelId: "figure1012",
      hasModel: true,
    },
    {
      title: "Principal Axis Ray Refraction in Lenses",
      modelId: "figure1013",
      hasModel: true,
    },
    {
      title: "Focal Ray Refraction in Lenses",
      modelId: "figure1014",
      hasModel: true,
    },
    {
      title: "Ray Through Optical Center of Lens",
      modelId: "figure1015",
      hasModel: true,
    },
    {
      title: "Image Formation by Convex Lens for Various Object Positions",
      modelId: "figure1016",
      hasModel: true,
    },
    {
      title: "Image Formation by Concave Lens",
      modelId: "figure1017",
      hasModel: true,
    },
    {
      title: "Electrical Conductivity of Metals",
      modelId: "figure32",
      hasModel: true,
    },
    {
      title: "The Human Eye",
      modelId: "figure111",
      hasModel: true,
    },
    {
      title: "Myopia and Its Correction with Concave Lens",
      modelId: "figure112",
      hasModel: true,
    },
    {
      title: "Hypermetropia and Its Correction with Convex Lens",
      modelId: "figure113",
      hasModel: true,
    },
    {
      title: "Refraction of Light Through a Triangular Glass Prism",
      modelId: "figure114",
      hasModel: true,
    },
    {
      title: "Dispersion of White Light by the Glass Prism",
      modelId: "figure115",
      hasModel: true,
    },
    {
      title: "Recombination of the Spectrum of White Light",
      modelId: "figure116",
      hasModel: true,
    },
    {
      title: "Rainbow Formation",
      modelId: "figure118",
      hasModel: true,
    },
    {
      title:
        "An Arrangement for Observing Scattering of Light in Colloidal Solution",
      modelId: "figure1111",
      hasModel: true,
    },
  ];

  const handleBackToHome = () => {
    navigation.navigate("Home");
  };

  const handleTopicPress = (topic) => {
    if (topic.hasModel && topic.modelId) {
      navigation.navigate("PhysicsModel", { modelId: topic.modelId });
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
            <Text style={styles.iconText}>⚛️</Text>
          </View>
          <Text style={styles.title}>Physics</Text>
          <Text style={styles.subtitle}>
            Explore the fundamental laws of nature
          </Text>
        </View>

        <View style={styles.topicsSection}>
          <Text style={styles.sectionTitle}>Topics You Can Learn</Text>

          {physicsTopics.map((topic, index) => (
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
    borderColor: "rgba(255, 107, 107, 0.3)",
  },
  backArrowText: {
    color: "#ff6b6b",
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
    backgroundColor: "rgba(255, 107, 107, 0.15)",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#ff6b6b",
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
    color: "#ff6b6b",
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
    borderColor: "rgba(255, 107, 107, 0.3)",
    borderLeftWidth: 4,
    borderLeftColor: "#ff6b6b",
  },
  topicNumber: {
    width: 40,
    height: 40,
    backgroundColor: "#ff6b6b",
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
    color: "#ff6b6b",
    fontSize: 18,
    fontWeight: "bold",
  },
  topicCardActive: {
    backgroundColor: "rgba(255, 107, 107, 0.12)",
    borderColor: "rgba(255, 107, 107, 0.5)",
  },
  arrowTextActive: {
    color: "#ff8a80",
  },
});
