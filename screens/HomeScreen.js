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
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    // Staggered card animations
    cardAnimations.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: 1,
        duration: 600,
        delay: index * 200,
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
      color: ['#ff6b6b', '#ee5a52'],
      topics: '25+ Topics',
      onPress: handlePhysicsPress,
    },
    {
      id: 'chemistry',
      title: 'Chemistry',
      icon: '🧪',
      description: 'Visualize molecules and chemical reactions',
      color: ['#4ecdc4', '#44a08d'],
      topics: '20+ Topics',
      onPress: handleChemistryPress,
    },
    {
      id: 'biology',
      title: 'Biology',
      icon: '🧬',
      description: 'Study cell structures and life processes',
      color: ['#45b7d1', '#3498db'],
      topics: '18+ Topics',
      onPress: handleBiologyPress,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* Background Gradient */}
      <LinearGradient
        colors={['#0D1B2A', '#1E3A5F', '#2E5077']}
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
            colors={['rgba(78, 205, 196, 0.2)', 'rgba(78, 205, 196, 0.1)']}
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
            <Text style={styles.welcomeTitle}>Welcome Back!</Text>
            <Text style={styles.studentName}>Ready to explore science?</Text>
          </View>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>60+</Text>
              <Text style={styles.statLabel}>3D Models</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>AI</Text>
              <Text style={styles.statLabel}>Assistant</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>AR</Text>
              <Text style={styles.statLabel}>Experience</Text>
            </View>
          </View>
        </Animated.View>

        {/* Quick Stats */}
        <Animated.View 
          style={[
            styles.quickStatsSection,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
          ]}
        >
          <Text style={styles.sectionTitle}>Your Learning Journey</Text>
          <View style={styles.progressCard}>
            <LinearGradient
              colors={['rgba(102, 126, 234, 0.1)', 'rgba(118, 75, 162, 0.1)']}
              style={styles.progressCardGradient}
            >
              <Text style={styles.progressText}>Continue exploring science concepts</Text>
              <Text style={styles.progressSubtext}>Pick a subject to dive deeper</Text>
            </LinearGradient>
          </View>
        </Animated.View>

        {/* Subjects Section */}
        <Animated.View 
          style={[
            styles.subjectsSection,
            { opacity: fadeAnim }
          ]}
        >
          <Text style={styles.sectionTitle}>Choose Your Subject</Text>
          
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
                        outputRange: [50, 0],
                      }),
                    },
                    {
                      scale: cardAnimations[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.9, 1],
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
                  colors={[...subject.color, subject.color[1] + '40']}
                  style={styles.subjectCardGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View style={styles.subjectCardContent}>
                    <View style={styles.subjectHeader}>
                      <View style={styles.subjectIconContainer}>
                        <Text style={styles.subjectIcon}>{subject.icon}</Text>
                      </View>
                      <View style={styles.subjectInfo}>
                        <Text style={styles.subjectTitle}>{subject.title}</Text>
                        <Text style={styles.subjectTopicsCount}>{subject.topics}</Text>
                      </View>
                      <View style={styles.arrowContainer}>
                        <Text style={styles.arrowText}>→</Text>
                      </View>
                    </View>
                    
                    <Text style={styles.subjectDescription}>{subject.description}</Text>
                    
                    <View style={styles.subjectFooter}>
                      <View style={styles.featuresRow}>
                        <View style={styles.featureTag}>
                          <Text style={styles.featureTagText}>3D Models</Text>
                        </View>
                        <View style={styles.featureTag}>
                          <Text style={styles.featureTagText}>AI Chat</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </LinearGradient>
                
                {/* Glow Effect */}
                <View style={[styles.cardGlow, { shadowColor: subject.color[0] }]} />
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
          <View style={styles.motivationCard}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']}
              style={styles.motivationCardGradient}
            >
              <Text style={styles.motivationTitle}>💡 Did You Know?</Text>
              <Text style={styles.motivationText}>
                Science is everywhere around us! Start with any subject and discover the amazing world of atoms, molecules, and living systems.
              </Text>
            </LinearGradient>
          </View>
        </Animated.View>
      </ScrollView>
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
    borderColor: "rgba(78, 205, 196, 0.3)",
  },
  backArrowText: {
    color: "#4ECDC4",
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
    marginBottom: 30,
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
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  studentName: {
    fontSize: 18,
    color: "#4ECDC4",
    textAlign: "center",
    fontWeight: "600",
    opacity: 0.9,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 20,
    paddingVertical: 20,
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
  statNumber: {
    fontSize: 24,
    fontWeight: '900',
    color: '#4ECDC4',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#B8C5D6',
    fontWeight: '600',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  quickStatsSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 20,
    textAlign: "left",
  },
  progressCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  progressCardGradient: {
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(102, 126, 234, 0.2)',
    borderRadius: 16,
  },
  progressText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  progressSubtext: {
    fontSize: 14,
    color: '#B8C5D6',
    fontWeight: '500',
  },
  subjectsSection: {
    marginBottom: 30,
  },
  subjectCardContainer: {
    marginBottom: 20,
  },
  subjectCard: {
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
  },
  subjectCardGradient: {
    padding: 24,
  },
  cardGlow: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: 26,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 12,
  },
  subjectCardContent: {
    position: 'relative',
    zIndex: 1,
  },
  subjectHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  subjectIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  subjectIcon: {
    fontSize: 32,
  },
  subjectInfo: {
    flex: 1,
  },
  subjectTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  subjectTopicsCount: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '600',
  },
  arrowContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  subjectDescription: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 24,
    marginBottom: 20,
    fontWeight: '500',
  },
  subjectFooter: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingTop: 16,
  },
  featuresRow: {
    flexDirection: 'row',
    gap: 12,
  },
  featureTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  featureTagText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  bottomSection: {
    marginBottom: 20,
  },
  motivationCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  motivationCardGradient: {
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
  },
  motivationTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4ECDC4',
    marginBottom: 8,
  },
  motivationText: {
    fontSize: 14,
    color: '#B8C5D6',
    lineHeight: 20,
    fontWeight: '500',
  },
});