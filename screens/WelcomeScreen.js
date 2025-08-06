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
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
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
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 3000,
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
      
      {/* Enhanced Background with multiple layers */}
      <LinearGradient
        colors={['#0F0F23', '#1A1A3A', '#2D1B69', '#1A1A3A', '#0F0F23']}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      {/* Overlay pattern */}
      <View style={styles.backgroundPattern} />

      {/* Floating Science Icons */}
      <Animated.View style={[styles.floatingIcon, styles.atom, { 
        transform: [{ translateY: floatAnim }] 
      }]}>
        <LinearGradient
          colors={['#00F5FF', '#0080FF']}
          style={styles.iconGlow}
        >
          <Text style={styles.floatingIconText}>⚛️</Text>
        </LinearGradient>
      </Animated.View>
      
      <Animated.View style={[styles.floatingIcon, styles.molecule, { 
        transform: [{ translateY: floatAnim.interpolate({
          inputRange: [0, 10],
          outputRange: [0, -8]
        }) }] 
      }]}>
        <LinearGradient
          colors={['#FF6B9D', '#C44569']}
          style={styles.iconGlow}
        >
          <Text style={styles.floatingIconText}>🧬</Text>
        </LinearGradient>
      </Animated.View>

      <Animated.View style={[styles.floatingIcon, styles.flask, { 
        transform: [{ translateY: floatAnim.interpolate({
          inputRange: [0, 10],
          outputRange: [0, 12]
        }) }] 
      }]}>
        <LinearGradient
          colors={['#00FFA3', '#03DAC6']}
          style={styles.iconGlow}
        >
          <Text style={styles.floatingIconText}>🧪</Text>
        </LinearGradient>
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
            colors={['#667eea', '#764ba2', '#f093fb', '#f5576c']}
            style={styles.logoGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.logoIcon}>🔬</Text>
          </LinearGradient>
          <View style={styles.logoGlow} />
        </View>
        
        <Text style={styles.title}>Smart Sci AR</Text>
        <Text style={styles.subtitle}>Science learning through AR & AI</Text>
        
        <View style={styles.badgeContainer}>
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={styles.gradeBadge}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.gradeText}>Classes 6-12</Text>
          </LinearGradient>
          
          <View style={styles.subjectBadges}>
            <LinearGradient
              colors={['#FF6B9D', '#C44569']}
              style={[styles.subjectBadge, styles.physicsBadge]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.subjectBadgeText}>Physics</Text>
            </LinearGradient>
            
            <LinearGradient
              colors={['#00F5FF', '#0080FF']}
              style={[styles.subjectBadge, styles.chemistryBadge]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.subjectBadgeText}>Chemistry</Text>
            </LinearGradient>
            
            <LinearGradient
              colors={['#00FFA3', '#03DAC6']}
              style={[styles.subjectBadge, styles.biologyBadge]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.subjectBadgeText}>Biology</Text>
            </LinearGradient>
          </View>
        </View>
      </Animated.View>

      {/* Content Section */}
      <Animated.View style={[styles.contentSection, { opacity: fadeAnim }]}>
        <View style={styles.featuresList}>
          <View style={styles.featureItem}>
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              style={styles.featureIcon}
            >
              <Text style={styles.featureIconText}>📱</Text>
            </LinearGradient>
            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>Interactive 3D Models</Text>
              <Text style={styles.featureText}>Explore science concepts in 3D</Text>
            </View>
          </View>
          
          <View style={styles.featureItem}>
            <LinearGradient
              colors={['#00F5FF', '#0080FF']}
              style={styles.featureIcon}
            >
              <Text style={styles.featureIconText}>🤖</Text>
            </LinearGradient>
            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>AI-Powered Learning</Text>
              <Text style={styles.featureText}>Get instant answers from AI tutor</Text>
            </View>
          </View>
          
          <View style={styles.featureItem}>
            <LinearGradient
              colors={['#FF6B9D', '#C44569']}
              style={styles.featureIcon}
            >
              <Text style={styles.featureIconText}>🎯</Text>
            </LinearGradient>
            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>Personalized Experience</Text>
              <Text style={styles.featureText}>Tailored learning for every student</Text>
            </View>
          </View>
        </View>
        
        <Text style={styles.welcomeText}>
          Discover the magic of science with cutting-edge AR technology, interactive 3D models, and intelligent AI assistance
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
            colors={['#667eea', '#764ba2', '#f093fb']}
            style={styles.buttonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.getStartedButtonText}>Begin Your Journey</Text>
            <Text style={styles.buttonArrow}>🚀</Text>
          </LinearGradient>
        </TouchableOpacity>
        
        <Text style={styles.footerText}>Join over 10,000 students exploring science</Text>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0F23",
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: height,
  },
  backgroundPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.03,
    backgroundColor: 'transparent',
    backgroundImage: 'radial-gradient(circle at 25% 25%, #667eea 0%, transparent 50%), radial-gradient(circle at 75% 75%, #764ba2 0%, transparent 50%)',
  },
  floatingIcon: {
    position: 'absolute',
    zIndex: 1,
  },
  atom: { top: '15%', right: '10%' },
  molecule: { top: '30%', left: '8%' },
  flask: { top: '45%', right: '15%' },
  iconGlow: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#667eea",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 10,
  },
  floatingIconText: {
    fontSize: 24,
  },
  headerSection: {
    flex: 2.5,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 60,
    zIndex: 2,
  },
  logoContainer: {
    marginBottom: 30,
    position: 'relative',
  },
  logoGradient: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#667eea",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 16,
  },
  logoGlow: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    top: -10,
    left: -10,
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    shadowColor: "#667eea",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 30,
  },
  logoIcon: {
    fontSize: 60,
  },
  title: {
    fontSize: 48,
    fontWeight: "900",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 12,
    letterSpacing: 1.5,
    textShadowColor: 'rgba(102, 126, 234, 0.5)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 8,
  },
  subtitle: {
    fontSize: 20,
    color: "#B8BFF8",
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 40,
    opacity: 0.9,
  },
  badgeContainer: {
    alignItems: 'center',
  },
  gradeBadge: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 30,
    marginBottom: 25,
    shadowColor: "#667eea",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  gradeText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
    textAlign: "center",
  },
  subjectBadges: {
    flexDirection: 'row',
    gap: 15,
  },
  subjectBadge: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  subjectBadgeText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  contentSection: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  featuresList: {
    marginBottom: 35,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  featureIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    shadowColor: "#667eea",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  featureIconText: {
    fontSize: 28,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '700',
    marginBottom: 4,
  },
  featureText: {
    fontSize: 14,
    color: '#B8BFF8',
    fontWeight: '500',
  },
  welcomeText: {
    fontSize: 16,
    color: "#9BA3EB",
    textAlign: "center",
    lineHeight: 26,
    fontWeight: "500",
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
    width: width * 0.85,
    height: 65,
    borderRadius: 32,
    marginBottom: 25,
    shadowColor: "#667eea",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 16,
  },
  buttonGradient: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 32,
  },
  getStartedButtonText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: 0.5,
    marginRight: 10,
  },
  buttonArrow: {
    fontSize: 22,
  },
  footerText: {
    fontSize: 14,
    color: "#7A82D1",
    textAlign: 'center',
    fontWeight: '600',
  },
});