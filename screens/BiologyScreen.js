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
    {
      title: "Cell Model - Basic Structure",
      modelId: "cellModel",
      hasModel: true,
    },
    { title: "Plant Cell Structure", modelId: "plantCell", hasModel: true },
    { title: "Animal Cell Structure", modelId: "animalCell", hasModel: true },
    { title: "Human Cell", modelId: "humanCell", hasModel: true },
    { title: "Prokaryotic Cell", modelId: "prokaryoteCell", hasModel: true },
    { title: "Neuron Structure", modelId: "neuron", hasModel: true },
    { title: "DNA & RNA Structure", modelId: "dnaRna", hasModel: true },
    { title: "Human Heart", modelId: "humanHeart", hasModel: true },
    { title: "Human Brain Structure", modelId: "humanBrain", hasModel: true },
    { title: "Human Eye Structure", modelId: "humanEye", hasModel: true },
    { title: "Human Skull", modelId: "humanSkull", hasModel: true },
    { title: "Human Skeleton", modelId: "skeleton", hasModel: true },
    { title: "Digestive System", modelId: "digestiveSystem", hasModel: true },
    { title: "Excretory System", modelId: "excretorySystem", hasModel: true },
    { title: "Heart and Lungs", modelId: "heartLungs", hasModel: true },
    { title: "Coronavirus (COVID-19)", modelId: "coronavirus", hasModel: true },
    {
      title: "Female Muscular System",
      modelId: "femaleMuscular",
      hasModel: true,
    },
    { title: "Cervical Vertebra", modelId: "cervicalVertebra", hasModel: true },
    { title: "Python Skull", modelId: "pythonSkull", hasModel: true },
  ];

  const handleBackToHome = () => {
    navigation.navigate("Home");
  };

  const handleTopicPress = (topic) => {
    if (topic.hasModel) {
      navigation.navigate("BiologyModel", { modelId: topic.modelId });
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
              onPress={() => handleTopicPress(topic)}
            >
              <View style={styles.topicNumber}>
                <Text style={styles.topicNumberText}>{index + 1}</Text>
              </View>
              <View style={styles.topicContent}>
                <Text style={styles.topicTitle}>{topic.title}</Text>
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
    borderColor: "rgba(69, 183, 209, 0.3)",
  },
  backArrowText: {
    color: "#45b7d1",
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
});
