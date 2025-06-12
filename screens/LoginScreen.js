import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";

export default function LoginScreen({ navigation }) {
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
        <Text style={styles.title}>🎓 Student Login</Text>
        <Text style={styles.subtitle}>Welcome back, future scientist! 🔬</Text>

        <View style={styles.comingSoonContainer}>
          <Text style={styles.comingSoonText}>📚 Login Form Coming Soon!</Text>
          <Text style={styles.descriptionText}>
            Get ready to access:
            {"\n"}• Your AR experiments
            {"\n"}• Progress tracking
            {"\n"}• Class assignments
            {"\n"}• Achievement badges
          </Text>
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
    color: "#64ffda",
    textAlign: "center",
    marginBottom: 40,
    fontWeight: "500",
  },
  comingSoonContainer: {
    backgroundColor: "rgba(30, 136, 229, 0.1)",
    padding: 30,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#1e88e5",
    alignItems: "center",
  },
  comingSoonText: {
    fontSize: 20,
    color: "#1e88e5",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  descriptionText: {
    fontSize: 16,
    color: "#a0a9c0",
    textAlign: "center",
    lineHeight: 24,
  },
});
