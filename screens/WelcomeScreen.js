import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Animated,
} from "react-native";
import { StatusBar } from "expo-status-bar";

const { width, height } = Dimensions.get("window");

export default function WelcomeScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleLoginPress = () => {
    navigation.navigate("Login");
  };

  const handleSignupPress = () => {
    navigation.navigate("Signup");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* Header Section */}
      <Animated.View
        style={[
          styles.headerSection,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        <Text style={styles.title}>Smart Sci AR</Text>
        <Text style={styles.subtitle}>Science learning through AR</Text>
        <View style={styles.gradeContainer}>
          <Text style={styles.gradeText}>
            Classes 6-12 • Physics • Chemistry • Biology
          </Text>
        </View>
      </Animated.View>

      {/* Welcome Content */}
      <Animated.View style={[styles.contentSection, { opacity: fadeAnim }]}>
        <Text style={styles.welcomeText}>
          Learn science with augmented reality
        </Text>
        <Text style={styles.descriptionText}>
          Explore science with interactive 3D AR models and simulations
        </Text>
      </Animated.View>

      {/* Buttons Section */}
      <Animated.View style={[styles.buttonSection, { opacity: fadeAnim }]}>
        <TouchableOpacity
          style={[styles.button, styles.loginButton]}
          onPress={handleLoginPress}
          activeOpacity={0.8}
        >
          <Text style={styles.loginButtonText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.signupButton]}
          onPress={handleSignupPress}
          activeOpacity={0.8}
        >
          <Text style={styles.signupButtonText}>Get Started</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0e1a",
    paddingHorizontal: 30,
  },
  headerSection: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 60,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 18,
    color: "#64ffda",
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 20,
  },
  gradeContainer: {
    backgroundColor: "rgba(100, 255, 218, 0.1)",
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#64ffda",
  },
  gradeText: {
    color: "#64ffda",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "500",
  },
  contentSection: {
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 30,
  },
  descriptionText: {
    fontSize: 16,
    color: "#a0a9c0",
    textAlign: "center",
    lineHeight: 24,
    fontWeight: "400",
  },
  buttonSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 50,
  },
  button: {
    width: width * 0.85,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  loginButton: {
    backgroundColor: "#1565c0",
    borderWidth: 0,
  },
  signupButton: {
    backgroundColor: "#2e7d32",
    borderWidth: 0,
  },
  loginButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  signupButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
});
