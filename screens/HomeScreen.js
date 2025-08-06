import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

export default function HomeScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const cardAnimations = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
  ];

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
    ]).start();

    // Staggered card animations
    cardAnimations.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: 1,
        duration: 800,
        delay: index * 300,
        useNativeDriver: true,
      }).start();
    });
  }, []);

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

  const subjects = [
    {
      id: 'physics',
      title: 'Physics',
      icon: '⚛️',
      description: 'Explore atoms, forces, and quantum mechanics',
      color: ['#FF6B9D', '#C44569'],
      glowColor: '#FF6B9D',
      topics: '25+ Models',
      onPress: handlePhysicsPress,
    },
    {
      id: 'chemistry',
      title: 'Chemistry',
      icon: '🧪',
      description: 'Visualize molecules and chemical reactions',
      color: ['#00F5FF', '#0080FF'],
      glowColor: '#00F5FF',
      topics: '20+ Molecules',
      onPress: handleChemistryPress,
    },
    {
      id: 'biology',
      title: 'Biology',
      icon: '🧬',
      description: 'Study cell structures and life processes',
      color: ['#00FFA3', '#03DAC6'],
      glowColor: '#00FFA3',
      topics: '18+ Systems',
      onPress: handleBiologyPress,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* Enhanced Background Gradient */}
      <LinearGradient
        colors={['#0F0F23', '#1A1A3A', '#2D1B69', '#1A1A3A', '#0F0F23']}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      {/* Back Button */}
      <Animated.View
        style={[
          styles.backButtonContainer,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
        ]}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBackToWelcome}
          activeOpacity={0.7}
        >
          <LinearGradient
            colors={['rgba(102, 126, 234, 0.3)', 'rgba(118, 75, 162, 0.2)']}
            style={styles.backButtonGradient}
          >
            <Text style={styles.backArrowText}>←</Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <Animated.View 
          style={[
            styles.headerSection,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
          ]}
        >
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeTitle}>Welcome Back, Explorer!</Text>
            <Text style={styles.studentName}>Ready to unlock the secrets of science?</Text>
          </View>
          
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']}
            style={styles.statsContainer}
          >
            <View style={styles.statItem}>
              <LinearGradient
                colors={['#667eea', '#764ba2']}
                style={styles.statIcon}
              >
                <Text style={styles.statIconText}>📊</Text>
              </LinearGradient>
              <Text style={styles.statNumber}>60+</Text>
              <Text style={styles.statLabel}>3D Models</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <LinearGradient
                colors={['#00F5FF', '#0080FF']}
                style={styles.statIcon}
              >
                <Text style={styles.statIconText}>🤖</Text>
              </LinearGradient>
              <Text style={styles.statNumber}>AI</Text>
              <Text style={styles.statLabel}>Assistant</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <LinearGradient
                colors={['#FF6B9D', '#C44569']}
                style={styles.statIcon}
              >
                <Text style={styles.statIconText}>🚀</Text>
              </LinearGradient>
              <Text style={styles.statNumber}>AR</Text>
              <Text style={styles.statLabel}>Experience</Text>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Progress Section */}
        <Animated.View 
          style={[
            styles.progressSection,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
          ]}
        >
          <Text style={styles.sectionTitle}>Your Learning Journey</Text>
          <LinearGradient
            colors={['rgba(102, 126, 234, 0.15)', 'rgba(118, 75, 162, 0.10)']}
            style={styles.progressCard}
          >
            <View style={styles.progressHeader}>
              <LinearGradient
                colors={['#667eea', '#764ba2']}
                style={styles.progressIcon}
              >
                <Text style={styles.progressIconText}>🎓</Text>
              </LinearGradient>
              <View style={styles.progressTextContainer}>
                <Text style={styles.progressText}>Continue your exploration</Text>
                <Text style={styles.progressSubtext}>Choose a subject to dive deeper into science</Text>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Subjects Section */}
        <Animated.View 
          style={[
            styles.subjectsSection,
            { opacity: fadeAnim }
          ]}
        >
          <Text style={styles.sectionTitle}>Explore Science</Text>
          
          {subjects.map((subject, index) => (
            <Animated.View
              key={subject.id}
              style={[
                styles.subjectCardContainer,
                {
                  opacity: cardAnimations[index],
                  transform: [
                    {
                      translateY: cardAnimations[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [80, 0],
                      }),
                    },
                    {
                      scale: cardAnimations[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.8, 1],
                      }),
                    },
                  ],
                },
              ]}
            >
              <TouchableOpacity
                style={styles.subjectCard}
                activeOpacity={0.9}
                onPress={subject.onPress}
              >
                <LinearGradient
                  colors={['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']}
                  style={styles.subjectCardGradient}
                >
                  <View style={styles.subjectCardContent}>
                    <View style={styles.subjectHeader}>
                      <LinearGradient
                        colors={subject.color}
                        style={styles.subjectIconContainer}
                      >
                        <Text style={styles.subjectIcon}>{subject.icon}</Text>
                      </LinearGradient>
                      <View style={styles.subjectInfo}>
                        <Text style={styles.subjectTitle}>{subject.title}</Text>
                        <Text style={styles.subjectTopicsCount}>{subject.topics}</Text>
                      </View>
                      <LinearGradient
                        colors={subject.color}
                        style={styles.arrowContainer}
                      >
                        <Text style={styles.arrowText}>→</Text>
                      </LinearGradient>
                    </View>
                    
                    <Text style={styles.subjectDescription}>{subject.description}</Text>
                    
                    <View style={styles.subjectFooter}>
                      <View style={styles.featuresRow}>
                        <LinearGradient
                          colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.10)']}
                          style={styles.featureTag}
                        >
                          <Text style={styles.featureTagText}>🔬 3D Models</Text>
                        </LinearGradient>
                        <LinearGradient
                          colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.10)']}
                          style={styles.featureTag}
                        >
                          <Text style={styles.featureTagText}>🤖 AI Chat</Text>
                        </LinearGradient>
                      </View>
                    </View>
                  </View>
                </LinearGradient>
                
                {/* Enhanced Glow Effect */}
                <View style={[styles.cardGlow, { 
                  shadowColor: subject.glowColor,
                  backgroundColor: subject.glowColor + '10'
                }]} />
              </TouchableOpacity>
            </Animated.View>
          ))}
        </Animated.View>

        {/* Bottom Section */}
        <Animated.View 
          style={[
            styles.bottomSection,
            { opacity: fadeAnim }
          ]}
        >
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.03)']}
            style={styles.motivationCard}
          >
            <View style={styles.motivationHeader}>
              <LinearGradient
                colors={['#00FFA3', '#03DAC6']}
                style={styles.motivationIcon}
              >
                <Text style={styles.motivationIconText}>💡</Text>
              </LinearGradient>
              <View style={styles.motivationTextContainer}>
                <Text style={styles.motivationTitle}>Science Fact</Text>
                <Text style={styles.motivationText}>
                  The human brain has about 86 billion neurons, more than the number of stars in the Milky Way galaxy!
                </Text>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>
      </ScrollView>
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
    bottom: 0,
  },
  backButtonContainer: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
  },
  backButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  backButtonGradient: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(102, 126, 234, 0.3)",
  },
  backArrowText: {
    color: "#667eea",
    fontSize: 24,
    fontWeight: "bold",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 120,
    paddingBottom: 40,
  },
  headerSection: {
    marginBottom: 35,
  },
  welcomeContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: "900",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 8,
    textShadowColor: 'rgba(102, 126, 234, 0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  studentName: {
    fontSize: 18,
    color: "#B8BFF8",
    textAlign: "center",
    fontWeight: "600",
    opacity: 0.9,
  },
  statsContainer: {
    flexDirection: 'row',
    borderRadius: 25,
    paddingVertical: 25,
    paddingHorizontal: 15,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: "#667eea",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  statIconText: {
    fontSize: 20,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#B8BFF8',
    fontWeight: '600',
  },
  statDivider: {
    width: 1,
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  progressSection: {
    marginBottom: 35,
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: "900",
    color: "#FFFFFF",
    marginBottom: 20,
    textAlign: "left",
  },
  progressCard: {
    borderRadius: 20,
    padding: 25,
    borderWidth: 1,
    borderColor: 'rgba(102, 126, 234, 0.2)',
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    shadowColor: "#667eea",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  progressIconText: {
    fontSize: 24,
  },
  progressTextContainer: {
    flex: 1,
  },
  progressText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  progressSubtext: {
    fontSize: 14,
    color: '#B8BFF8',
    fontWeight: '500',
  },
  subjectsSection: {
    marginBottom: 35,
  },
  subjectCardContainer: {
    marginBottom: 25,
  },
  subjectCard: {
    borderRadius: 28,
    overflow: 'hidden',
    position: 'relative',
  },
  subjectCardGradient: {
    padding: 28,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  cardGlow: {
    position: 'absolute',
    top: -3,
    left: -3,
    right: -3,
    bottom: -3,
    borderRadius: 31,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 15,
  },
  subjectCardContent: {
    position: 'relative',
    zIndex: 1,
  },
  subjectHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  subjectIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  subjectIcon: {
    fontSize: 36,
  },
  subjectInfo: {
    flex: 1,
  },
  subjectTitle: {
    fontSize: 26,
    fontWeight: "900",
    color: "#FFFFFF",
    marginBottom: 6,
  },
  subjectTopicsCount: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '600',
  },
  arrowContainer: {
    width: 45,
    height: 45,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  arrowText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "900",
  },
  subjectDescription: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.85)',
    lineHeight: 26,
    marginBottom: 25,
    fontWeight: '500',
  },
  subjectFooter: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingTop: 18,
  },
  featuresRow: {
    flexDirection: 'row',
    gap: 15,
  },
  featureTag: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  featureTagText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  bottomSection: {
    marginBottom: 20,
  },
  motivationCard: {
    borderRadius: 20,
    padding: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  motivationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  motivationIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    shadowColor: "#00FFA3",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  motivationIconText: {
    fontSize: 24,
  },
  motivationTextContainer: {
    flex: 1,
  },
  motivationTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#00FFA3',
    marginBottom: 8,
  },
  motivationText: {
    fontSize: 14,
    color: '#B8BFF8',
    lineHeight: 22,
    fontWeight: '500',
  },
});