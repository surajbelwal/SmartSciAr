import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";

export default function SignupScreen({ navigation }) {
  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>🚀 Join the Adventure</Text>
        <Text style={styles.subtitle}>
          Start your science journey today! 🌟
        </Text>

        <View style={styles.comingSoonContainer}>
          <Text style={styles.comingSoonText}>
            📝 Registration Coming Soon!
          </Text>
          <Text style={styles.descriptionText}>
            Soon you'll be able to:
            {"\n"}• Create your student profile
            {"\n"}• Choose your grade level
            {"\n"}• Select favorite subjects
            {"\n"}• Join your classroom
            {"\n"}• Start learning with AR!
          </Text>

          <View style={styles.benefitsContainer}>
            <Text style={styles.benefitsTitle}>🎁 What you'll get:</Text>
            <Text style={styles.benefitsText}>
              ✅ Free access to basic experiments
              {"\n"}🏆 Achievement system
              {"\n"}📊 Progress tracking
              {"\n"}🎮 Gamified learning
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0e1a",
    paddingHorizontal: 20,
  },
  backButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignSelf: "flex-start",
  },
  backButtonText: {
    color: "#64ffda",
    fontSize: 16,
    fontWeight: "600",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#4caf50",
    textAlign: "center",
    marginBottom: 40,
    fontWeight: "500",
  },
  comingSoonContainer: {
    backgroundColor: "rgba(76, 175, 80, 0.1)",
    padding: 25,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#4caf50",
    alignItems: "center",
    width: "100%",
  },
  comingSoonText: {
    fontSize: 20,
    color: "#4caf50",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  descriptionText: {
    fontSize: 16,
    color: "#a0a9c0",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 20,
  },
  benefitsContainer: {
    backgroundColor: "rgba(255, 107, 107, 0.1)",
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#ff6b6b",
    width: "100%",
  },
  benefitsTitle: {
    fontSize: 16,
    color: "#ff6b6b",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  benefitsText: {
    fontSize: 14,
    color: "#a0a9c0",
    textAlign: "center",
    lineHeight: 22,
  },
});
