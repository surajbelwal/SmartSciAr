import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Animated,
  ImageBackground,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

export default function WelcomeScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

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
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Floating animation
    const floatingAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 10,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );
    floatingAnimation.start();
  }, []);

  const handleGetStarted = () => {
    navigation.navigate("Home");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {/* Animated Background */}
      <LinearGradient
        colors={['#0D1B2A', '#1E3A5F', '#2E5077', '#3E6B8A']}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      {/* Floating Science Icons */}
      <Animated.View style={[styles.floatingIcon, styles.atom, { 
        transform: [{ translateY: floatAnim }] 
      }]}>
        <Text style={styles.floatingIconText}>⚛️</Text>
      </Animated.View>
      
      <Animated.View style={[styles.floatingIcon, styles.molecule, { 
        transform: [{ translateY: floatAnim.interpolate({
          inputRange: [0, 10],
          outputRange: [0, -8]
        }) }] 
      }]}>
        <Text style={styles.floatingIconText}>🧬</Text>
      </Animated.View>

      <Animated.View style={[styles.floatingIcon, styles.flask, { 
        transform: [{ translateY: floatAnim.interpolate({
          inputRange: [0, 10],
          outputRange: [0, 12]
        }) }] 
      }]}>
        <Text style={styles.floatingIconText}>🧪</Text>
      </Animated.View>

      {/* Header Section */}
      <Animated.View
        style={[
          styles.headerSection,
          { 
            opacity: fadeAnim, 
            transform: [
              { translateY: slideAnim },
              { scale: scaleAnim }
            ] 
          },
        ]}
      >
        <View style={styles.logoContainer}>
          <LinearGradient
            colors={['#4ECDC4', '#44A08D']}
            style={styles.logoGradient}
          >
            <Text style={styles.logoIcon}>🔬</Text>
          </LinearGradient>
        </View>
        
        <Text style={styles.title}>Smart Sci AR</Text>
        <Text style={styles.subtitle}>Science learning through AR & AI</Text>
        
        <View style={styles.badgeContainer}>
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={styles.gradeBadge}
          >
            <Text style={styles.gradeText}>Classes 6-12</Text>
          </LinearGradient>
          
          <View style={styles.subjectBadges}>
            <View style={[styles.subjectBadge, styles.physicsBadge]}>
              <Text style={styles.subjectBadgeText}>Physics</Text>
            </View>
            <View style={[styles.subjectBadge, styles.chemistryBadge]}>
              <Text style={styles.subjectBadgeText}>Chemistry</Text>
            </View>
            <View style={[styles.subjectBadge, styles.biologyBadge]}>
              <Text style={styles.subjectBadgeText}>Biology</Text>
            </View>
          </View>
        </View>
      </Animated.View>

      {/* Content Section */}
      <Animated.View style={[styles.contentSection, { opacity: fadeAnim }]}>
        <View style={styles.featuresList}>
          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Text style={styles.featureIconText}>📱</Text>
            </View>
            <Text style={styles.featureText}>Interactive 3D Models</Text>
          </View>
          
          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Text style={styles.featureIconText}>🤖</Text>
            </View>
            <Text style={styles.featureText}>AI-Powered Learning</Text>
          </View>
          
          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Text style={styles.featureIconText}>🎯</Text>
            </View>
            <Text style={styles.featureText}>Personalized Experience</Text>
          </View>
        </View>
        
        <Text style={styles.welcomeText}>
          Explore the wonders of science with cutting-edge AR technology and AI assistance
        </Text>
      </Animated.View>

      {/* Action Section */}
      <Animated.View style={[styles.actionSection, { opacity: fadeAnim }]}>
        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={handleGetStarted}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#11998e', '#38ef7d']}
            style={styles.buttonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.getStartedButtonText}>Get Started</Text>
            <Text style={styles.buttonArrow}>→</Text>
          </LinearGradient>
        </TouchableOpacity>
        
        <Text style={styles.footerText}>Join thousands of students learning science</Text>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D1B2A",
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: height,
  },
  floatingIcon: {
    position: 'absolute',
    zIndex: 1,
  },
  atom: { top: '15%', right: '10%' },
  molecule: { top: '25%', left: '15%' },
  flask: { top: '35%', right: '20%' },
  floatingIconText: {
    fontSize: 30,
    opacity: 0.3,
  },
  headerSection: {
    flex: 2.5,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 60,
    zIndex: 2,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logoGradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#4ECDC4",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  logoIcon: {
    fontSize: 50,
  },
  title: {
    fontSize: 42,
    fontWeight: "900",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 8,
    letterSpacing: 1.2,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 18,
    color: "#4ECDC4",
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 30,
    opacity: 0.9,
  },
  badgeContainer: {
    alignItems: 'center',
  },
  gradeBadge: {
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
    marginBottom: 20,
    shadowColor: "#667eea",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  gradeText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
  subjectBadges: {
    flexDirection: 'row',
    gap: 12,
  },
  subjectBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 2,
  },
  physicsBadge: {
    borderColor: '#ff6b6b',
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
  },
  chemistryBadge: {
    borderColor: '#4ecdc4',
    backgroundColor: 'rgba(78, 205, 196, 0.1)',
  },
  biologyBadge: {
    borderColor: '#45b7d1',
    backgroundColor: 'rgba(69, 183, 209, 0.1)',
  },
  subjectBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  contentSection: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  featuresList: {
    marginBottom: 30,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  featureIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(78, 205, 196, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: 'rgba(78, 205, 196, 0.3)',
  },
  featureIconText: {
    fontSize: 24,
  },
  featureText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  welcomeText: {
    fontSize: 16,
    color: "#B8C5D6",
    textAlign: "center",
    lineHeight: 24,
    fontWeight: "400",
    opacity: 0.9,
  },
  actionSection: {
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 50,
    paddingHorizontal: 30,
  },
  getStartedButton: {
    width: width * 0.8,
    height: 60,
    borderRadius: 30,
    marginBottom: 20,
    shadowColor: "#11998e",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  buttonGradient: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  getStartedButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 0.5,
    marginRight: 8,
  },
  buttonArrow: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  footerText: {
    fontSize: 14,
    color: "#7A8B9A",
    textAlign: 'center',
    fontWeight: '500',
  },
});