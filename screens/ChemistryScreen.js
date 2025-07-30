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
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
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
      case 'Beginner': return '#4CAF50';
      case 'Intermediate': return '#FF9800';
      case 'Advanced': return '#F44336';
      case 'Expert': return '#9C27B0';
      default: return '#757575';
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

      {/* Background Gradient */}
      <LinearGradient
        colors={['#0D1B2A', '#1E3A5F', '#4ECDC420']}
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
            colors={['rgba(78, 205, 196, 0.2)', 'rgba(78, 205, 196, 0.1)']}
            style={styles.backButtonGradient}
          >
            <Text style={styles.backArrowText}>←</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.headerContent}>
          <View style={styles.headerIconContainer}>
            <LinearGradient
              colors={['#4ecdc4', '#44a08d']}
              style={styles.headerIconGradient}
            >
              <Text style={styles.headerIcon}>🧪</Text>
            </LinearGradient>
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
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{chemistryTopics.length}</Text>
              <Text style={styles.statLabel}>Molecules</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>3D</Text>
              <Text style={styles.statLabel}>Models</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>AI</Text>
              <Text style={styles.statLabel}>Helper</Text>
            </View>
          </View>
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
                        outputRange: [0.9, 1],
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
                  colors={['rgba(78, 205, 196, 0.1)', 'rgba(78, 205, 196, 0.05)']}
                  style={styles.topicCardGradient}
                >
                  <View style={styles.topicCardContent}>
                    <View style={styles.topicHeader}>
                      <View style={styles.topicNumber}>
                        <Text style={styles.topicNumberText}>{index + 1}</Text>
                      </View>
                      <View style={styles.topicMetadata}>
                        <View style={styles.categoryTag}>
                          <Text style={styles.categoryIcon}>{getCategoryIcon(topic.category)}</Text>
                          <Text style={styles.categoryText}>{topic.category}</Text>
                        </View>
                        <View style={styles.durationTag}>
                          <Text style={styles.durationText}>⏱️ {topic.duration}</Text>
                        </View>
                      </View>
                    </View>
                    
                    <Text style={styles.topicTitle}>{topic.title}</Text>
                    
                    <View style={styles.topicFooter}>
                      <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(topic.difficulty) + '20' }]}>
                        <View style={[styles.difficultyDot, { backgroundColor: getDifficultyColor(topic.difficulty) }]} />
                        <Text style={[styles.difficultyText, { color: getDifficultyColor(topic.difficulty) }]}>
                          {topic.difficulty}
                        </Text>
                      </View>
                      
                      <View style={styles.actionButton}>
                        <Text style={styles.actionButtonText}>Explore</Text>
                        <Text style={styles.actionArrow}>→</Text>
                      </View>
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
    backgroundColor: "#0D1B2A",
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
    borderColor: "rgba(78, 205, 196, 0.3)",
  },
  backArrowText: {
    color: "#4ecdc4",
    fontSize: 24,
    fontWeight: "bold",
  },
  headerContent: {
    alignItems: 'center',
    paddingTop: 20,
  },
  headerIconContainer: {
    marginBottom: 16,
  },
  headerIconGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#4ecdc4",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  headerIcon: {
    fontSize: 40,
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: "900",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#4ecdc4",
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
    marginBottom: 30,
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
    borderColor: 'rgba(78, 205, 196, 0.2)',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '900',
    color: '#4ecdc4',
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
    backgroundColor: 'rgba(78, 205, 196, 0.2)',
  },
  topicsSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 20,
    textAlign: "left",
  },
  topicCardContainer: {
    marginBottom: 16,
  },
  topicCard: {
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  topicCardGradient: {
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(78, 205, 196, 0.2)',
    borderRadius: 20,
  },
  cardGlow: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: 22,
    shadowColor: "#4ecdc4",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  topicCardContent: {
    position: 'relative',
    zIndex: 1,
  },
  topicHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  topicNumber: {
    width: 36,
    height: 36,
    backgroundColor: '#4ecdc4',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  topicNumberText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  topicMetadata: {
    flex: 1,
    flexDirection: 'row',
    gap: 8,
  },
  categoryTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  categoryIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  categoryText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  durationTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  durationText: {
    color: '#B8C5D6',
    fontSize: 10,
    fontWeight: '600',
  },
  topicTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    lineHeight: 22,
    marginBottom: 16,
  },
  topicFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  difficultyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
  },
  difficultyDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(78, 205, 196, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(78, 205, 196, 0.3)',
  },
  actionButtonText: {
    color: '#4ecdc4',
    fontSize: 12,
    fontWeight: '700',
    marginRight: 4,
  },
  actionArrow: {
    color: '#4ecdc4',
    fontSize: 14,
    fontWeight: 'bold',
  },
});