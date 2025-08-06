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

export default function ChemistryScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const headerAnim = useRef(new Animated.Value(-100)).current;

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
      Animated.spring(headerAnim, {
        toValue: 0,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const chemistryTopics = [
    {
      title: "Atomic Structure",
      modelId: "atom",
      hasModel: true,
      category: "Atomic Theory",
      difficulty: "Beginner",
      duration: "8 min",
    },
    {
      title: "Benzene Molecule",
      modelId: "benzene",
      hasModel: true,
      category: "Organic Chemistry",
      difficulty: "Intermediate",
      duration: "12 min",
    },
    {
      title: "Water Molecule (H₂O)",
      modelId: "water",
      hasModel: true,
      category: "Molecular Structure",
      difficulty: "Beginner",
      duration: "6 min",
    },
    {
      title: "Atomic Model",
      modelId: "atomicModel",
      hasModel: true,
      category: "Atomic Theory",
      difficulty: "Intermediate",
      duration: "10 min",
    },
    {
      title: "Molecular Structure",
      modelId: "molecule",
      hasModel: true,
      category: "Molecular Structure",
      difficulty: "Advanced",
      duration: "15 min",
    },
    {
      title: "Periodic Table",
      modelId: "periodicTable",
      hasModel: true,
      category: "Elements",
      difficulty: "Intermediate",
      duration: "20 min",
    },
    {
      title: "Carbon Dioxide (CO₂)",
      modelId: "carbonDioxide",
      hasModel: true,
      category: "Molecular Structure",
      difficulty: "Beginner",
      duration: "7 min",
    },
    {
      title: "Methane Molecule",
      modelId: "methane",
      hasModel: true,
      category: "Organic Chemistry",
      difficulty: "Beginner",
      duration: "8 min",
    },
    {
      title: "Ethanol Molecule",
      modelId: "ethanol",
      hasModel: true,
      category: "Organic Chemistry",
      difficulty: "Intermediate",
      duration: "10 min",
    },
    {
      title: "Glucose Molecule",
      modelId: "glucose",
      hasModel: true,
      category: "Biochemistry",
      difficulty: "Advanced",
      duration: "14 min",
    },
    {
      title: "Caffeine Molecule",
      modelId: "caffeine",
      hasModel: true,
      category: "Biochemistry",
      difficulty: "Advanced",
      duration: "12 min",
    },
    {
      title: "Aspirin Molecule",
      modelId: "aspirin",
      hasModel: true,
      category: "Biochemistry",
      difficulty: "Advanced",
      duration: "11 min",
    },
    {
      title: "Cyclohexane Molecule",
      modelId: "cyclohexane",
      hasModel: true,
      category: "Organic Chemistry",
      difficulty: "Intermediate",
      duration: "9 min",
    },
    {
      title: "Dopamine Molecule",
      modelId: "dopamine",
      hasModel: true,
      category: "Biochemistry",
      difficulty: "Expert",
      duration: "16 min",
    },
    {
      title: "Phenol Molecule",
      modelId: "phenol",
      hasModel: true,
      category: "Organic Chemistry",
      difficulty: "Advanced",
      duration: "10 min",
    },
    {
      title: "Water Ball-and-Stick Model",
      modelId: "waterBallStick",
      hasModel: true,
      category: "Molecular Structure",
      difficulty: "Beginner",
      duration: "5 min",
    },
    {
      title: "Liquid Water Structure",
      modelId: "liquidWater",
      hasModel: true,
      category: "Molecular Structure",
      difficulty: "Advanced",
      duration: "13 min",
    },
    {
      title: "Sodium Chloride (NaCl)",
      modelId: "nacl",
      hasModel: true,
      category: "Ionic Compounds",
      difficulty: "Intermediate",
      duration: "9 min",
    },
  ];

  const handleBackToHome = () => {
    navigation.navigate("Home");
  };

  const handleTopicPress = (topic) => {
    if (topic.hasModel && topic.modelId) {
      navigation.navigate("ChemistryModel", { modelId: topic.modelId });
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return ['#00FFA3', '#03DAC6'];
      case 'Intermediate': return ['#00F5FF', '#0080FF'];
      case 'Advanced': return ['#FF6B9D', '#C44569'];
      case 'Expert': return ['#667eea', '#764ba2'];
      default: return ['#757575', '#616161'];
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Atomic Theory': return '⚛️';
      case 'Molecular Structure': return '🔬';
      case 'Organic Chemistry': return '🧪';
      case 'Biochemistry': return '🧬';
      case 'Elements': return '📊';
      case 'Ionic Compounds': return '💎';
      default: return '🔬';
    }
  };

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

      {/* Header */}
      <Animated.View
        style={[
          styles.header,
          { transform: [{ translateY: headerAnim }] }
        ]}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBackToHome}
          activeOpacity={0.7}
        >
          <LinearGradient
            colors={['rgba(0, 245, 255, 0.3)', 'rgba(0, 128, 255, 0.2)']}
            style={styles.backButtonGradient}
          >
            <Text style={styles.backArrowText}>←</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.headerContent}>
          <View style={styles.headerIconContainer}>
            <LinearGradient
              colors={['#00F5FF', '#0080FF']}
              style={styles.headerIconGradient}
            >
              <Text style={styles.headerIcon}>🧪</Text>
            </LinearGradient>
            <View style={styles.headerIconGlow} />
          </View>
          <Text style={styles.headerTitle}>Chemistry</Text>
          <Text style={styles.headerSubtitle}>Visualize molecules and chemical reactions</Text>
        </View>
      </Animated.View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Stats Section */}
        <Animated.View 
          style={[
            styles.statsSection,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
          ]}
        >
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']}
            style={styles.statsContainer}
          >
            <View style={styles.statItem}>
              <LinearGradient
                colors={['#00F5FF', '#0080FF']}
                style={styles.statIcon}
              >
                <Text style={styles.statIconText}>🧪</Text>
              </LinearGradient>
              <Text style={styles.statNumber}>{chemistryTopics.length}</Text>
              <Text style={styles.statLabel}>Molecules</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <LinearGradient
                colors={['#FF6B9D', '#C44569']}
                style={styles.statIcon}
              >
                <Text style={styles.statIconText}>🔬</Text>
              </LinearGradient>
              <Text style={styles.statNumber}>3D</Text>
              <Text style={styles.statLabel}>Models</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <LinearGradient
                colors={['#667eea', '#764ba2']}
                style={styles.statIcon}
              >
                <Text style={styles.statIconText}>🤖</Text>
              </LinearGradient>
              <Text style={styles.statNumber}>AI</Text>
              <Text style={styles.statLabel}>Helper</Text>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Topics Grid */}
        <Animated.View 
          style={[
            styles.topicsSection,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
          ]}
        >
          <Text style={styles.sectionTitle}>Molecular Structures</Text>

          {chemistryTopics.map((topic, index) => (
            <Animated.View
              key={index}
              style={[
                styles.topicCardContainer,
                {
                  opacity: fadeAnim,
                  transform: [
                    {
                      translateY: slideAnim.interpolate({
                        inputRange: [0, 50],
                        outputRange: [0, 30],
                      }),
                    },
                    {
                      scale: fadeAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.95, 1],
                      }),
                    },
                  ],
                },
              ]}
            >
              <TouchableOpacity
                style={styles.topicCard}
                activeOpacity={0.9}
                onPress={() => handleTopicPress(topic)}
              >
                <LinearGradient
                  colors={['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']}
                  style={styles.topicCardGradient}
                >
                  <View style={styles.topicCardContent}>
                    <View style={styles.topicHeader}>
                      <LinearGradient
                        colors={['#00F5FF', '#0080FF']}
                        style={styles.topicNumber}
                      >
                        <Text style={styles.topicNumberText}>{index + 1}</Text>
                      </LinearGradient>
                      <View style={styles.topicMetadata}>
                        <LinearGradient
                          colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.10)']}
                          style={styles.categoryTag}
                        >
                          <Text style={styles.categoryIcon}>{getCategoryIcon(topic.category)}</Text>
                          <Text style={styles.categoryText}>{topic.category}</Text>
                        </LinearGradient>
                        <LinearGradient
                          colors={['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.10)']}
                          style={styles.durationTag}
                        >
                          <Text style={styles.durationText}>⏱️ {topic.duration}</Text>
                        </LinearGradient>
                      </View>
                    </View>
                    
                    <Text style={styles.topicTitle}>{topic.title}</Text>
                    
                    <View style={styles.topicFooter}>
                      <LinearGradient
                        colors={getDifficultyColor(topic.difficulty)}
                        style={styles.difficultyBadge}
                      >
                        <View style={styles.difficultyContent}>
                          <View style={styles.difficultyDot} />
                          <Text style={styles.difficultyText}>{topic.difficulty}</Text>
                        </View>
                      </LinearGradient>
                      
                      <LinearGradient
                        colors={['#00F5FF', '#0080FF']}
                        style={styles.actionButton}
                      >
                        <Text style={styles.actionButtonText}>Explore</Text>
                        <Text style={styles.actionArrow}>→</Text>
                      </LinearGradient>
                    </View>
                  </View>
                </LinearGradient>
                
                {/* Card Glow */}
                <View style={styles.cardGlow} />
              </TouchableOpacity>
            </Animated.View>
          ))}
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
  header: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    zIndex: 10,
  },
  backButtonGradient: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0, 245, 255, 0.3)",
  },
  backArrowText: {
    color: "#00F5FF",
    fontSize: 24,
    fontWeight: "bold",
  },
  headerContent: {
    alignItems: 'center',
    paddingTop: 20,
  },
  headerIconContainer: {
    marginBottom: 20,
    position: 'relative',
  },
  headerIconGradient: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#00F5FF",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 16,
  },
  headerIconGlow: {
    position: 'absolute',
    width: 110,
    height: 110,
    borderRadius: 55,
    top: -10,
    left: -10,
    backgroundColor: 'rgba(0, 245, 255, 0.15)',
    shadowColor: "#00F5FF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 25,
  },
  headerIcon: {
    fontSize: 45,
  },
  headerTitle: {
    fontSize: 38,
    fontWeight: "900",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 8,
    textShadowColor: 'rgba(0, 245, 255, 0.4)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 12,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#B8BFF8",
    textAlign: "center",
    fontWeight: "600",
    opacity: 0.9,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  statsSection: {
    marginBottom: 35,
  },
  statsContainer: {
    flexDirection: 'row',
    borderRadius: 25,
    paddingVertical: 25,
    paddingHorizontal: 15,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
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
    shadowColor: "#00F5FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  statIconText: {
    fontSize: 20,
  },
  statNumber: {
    fontSize: 24,
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
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  topicsSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: "900",
    color: "#FFFFFF",
    marginBottom: 25,
    textAlign: "left",
  },
  topicCardContainer: {
    marginBottom: 20,
  },
  topicCard: {
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
  },
  topicCardGradient: {
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  cardGlow: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: 26,
    shadowColor: "#00F5FF",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 12,
    backgroundColor: 'rgba(0, 245, 255, 0.05)',
  },
  topicCardContent: {
    position: 'relative',
    zIndex: 1,
  },
  topicHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  topicNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    shadowColor: "#00F5FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  topicNumberText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
  },
  topicMetadata: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
  },
  categoryTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  categoryIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  durationTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  durationText: {
    color: '#B8BFF8',
    fontSize: 12,
    fontWeight: '600',
  },
  topicTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 24,
    marginBottom: 20,
  },
  topicFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  difficultyBadge: {
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  difficultyContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  difficultyDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
    marginRight: 8,
  },
  difficultyText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 15,
    shadowColor: "#00F5FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    marginRight: 6,
  },
  actionArrow: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});