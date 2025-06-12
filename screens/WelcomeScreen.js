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
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1200,
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

      {/* Animated Background Elements */}
      <View style={styles.backgroundElements}>
        <View style={[styles.floatingElement, styles.element1]} />
        <View style={[styles.floatingElement, styles.element2]} />
        <View style={[styles.floatingElement, styles.element3]} />
      </View>

      {/* Header Section */}
      <Animated.View
        style={[
          styles.headerSection,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        <Text style={styles.title}>🚀 Smart Sci AR</Text>
        <Text style={styles.subtitle}>Explore Science Through AR Magic!</Text>
        <View style={styles.gradeContainer}>
          <Text style={styles.gradeText}>
            📚 Classes 6-12 • Physics • Chemistry • Biology 🧬
          </Text>
        </View>
      </Animated.View>

      {/* Welcome Content */}
      <Animated.View
        style={[
          styles.contentSection,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        ]}
      >
        <Text style={styles.welcomeText}>Ready to Make Science Cool? 🔬</Text>
        <Text style={styles.descriptionText}>
          🌟 Interactive AR experiments at your fingertips{"\n"}
          ⚛️ Visualize atoms, molecules, and reactions{"\n"}
          🧪 Virtual labs that feel real{"\n"}
          🎯 Gamified learning for better grades
        </Text>

        <View style={styles.featureHighlight}>
          <Text style={styles.highlightText}>
            ✨ Make Learning an Adventure! ✨
          </Text>
        </View>
      </Animated.View>

      {/* Buttons Section */}
      <Animated.View style={[styles.buttonSection, { opacity: fadeAnim }]}>
        <TouchableOpacity
          style={[styles.button, styles.loginButton]}
          onPress={handleLoginPress}
          activeOpacity={0.7}
        >
          <Text style={styles.loginButtonText}>🎓 Login & Learn</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.signupButton]}
          onPress={handleSignupPress}
          activeOpacity={0.7}
        >
          <Text style={styles.signupButtonText}>🚀 Join the Adventure</Text>
        </TouchableOpacity>

        <Text style={styles.motivationText}>
          Your science journey starts here! 💫
        </Text>
      </Animated.View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>🔬 Discover • 🧠 Learn • 🌟 Excel</Text>
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
  backgroundElements: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  floatingElement: {
    position: "absolute",
    borderRadius: 50,
    opacity: 0.1,
  },
  element1: {
    width: 100,
    height: 100,
    backgroundColor: "#64ffda",
    top: "10%",
    right: "10%",
  },
  element2: {
    width: 80,
    height: 80,
    backgroundColor: "#ff6b6b",
    top: "30%",
    left: "5%",
  },
  element3: {
    width: 60,
    height: 60,
    backgroundColor: "#4ecdc4",
    top: "60%",
    right: "15%",
  },
  headerSection: {
    flex: 1.2,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  title: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 10,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 18,
    color: "#64ffda",
    textAlign: "center",
    fontWeight: "600",
    letterSpacing: 0.5,
    marginBottom: 15,
  },
  gradeContainer: {
    backgroundColor: "rgba(100, 255, 218, 0.1)",
    paddingHorizontal: 20,
    paddingVertical: 10,
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
    paddingHorizontal: 15,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 32,
  },
  descriptionText: {
    fontSize: 16,
    color: "#a0a9c0",
    textAlign: "center",
    lineHeight: 26,
    marginBottom: 20,
  },
  featureHighlight: {
    backgroundColor: "rgba(255, 107, 107, 0.15)",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#ff6b6b",
  },
  highlightText: {
    color: "#ff6b6b",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  buttonSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  button: {
    width: width * 0.85,
    height: 60,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  loginButton: {
    backgroundColor: "#1e88e5",
    borderWidth: 2,
    borderColor: "#1976d2",
  },
  signupButton: {
    backgroundColor: "rgba(76, 175, 80, 0.2)",
    borderWidth: 2,
    borderColor: "#4caf50",
  },
  loginButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  signupButtonText: {
    color: "#4caf50",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  motivationText: {
    color: "#64ffda",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 15,
    fontStyle: "italic",
  },
  footer: {
    paddingBottom: 20,
    alignItems: "center",
  },
  footerText: {
    color: "#64ffda",
    fontSize: 14,
    fontWeight: "400",
    letterSpacing: 1,
  },
});
