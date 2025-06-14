import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { WebView } from "react-native-webview";

const { width } = Dimensions.get("window");

const ModelViewer = ({ modelData, navigation }) => {
  const { embedUrl, title, description } = modelData;
  const [isLoading, setIsLoading] = useState(true);
  const [showDescription, setShowDescription] = useState(false);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Start entrance animations
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
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Continuous pulse animation for loading
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    if (isLoading) {
      pulseAnimation.start();
    } else {
      pulseAnimation.stop();
    }

    return () => pulseAnimation.stop();
  }, [isLoading]);

  const handleBack = () => {
    // Exit animation before navigation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -50,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.goBack();
    });
  };

  const handleWebViewLoad = () => {
    setIsLoading(false);
    // Show description after model loads
    setTimeout(() => {
      setShowDescription(true);
    }, 1000);
  };

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Animated Background Gradient */}
      <Animated.View
        style={[styles.backgroundGradient, { opacity: fadeAnim }]}
      />

      {/* Floating Particles */}
      <View style={styles.particlesContainer}>
        {[...Array(6)].map((_, i) => (
          <Animated.View
            key={i}
            style={[
              styles.particle,
              {
                left: `${15 + i * 15}%`,
                animationDelay: `${i * 0.5}s`,
                transform: [
                  {
                    translateY: slideAnim.interpolate({
                      inputRange: [0, 50],
                      outputRange: [0, -20 - i * 5],
                    }),
                  },
                ],
                opacity: fadeAnim,
              },
            ]}
          />
        ))}
      </View>

      {/* Back Arrow with Glow Effect */}
      <Animated.View
        style={[
          styles.backArrowContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <TouchableOpacity
          style={styles.backArrow}
          onPress={handleBack}
          activeOpacity={0.7}
        >
          <Text style={styles.backArrowText}>←</Text>
          <View style={styles.backArrowGlow} />
        </TouchableOpacity>
      </Animated.View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Animated Title */}
        <Animated.View
          style={[
            styles.titleContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
            },
          ]}
        >
          <Text style={styles.title}>{title}</Text>
          <View style={styles.titleUnderline} />
        </Animated.View>

        {/* 3D Model Container with Loading Animation */}
        <Animated.View
          style={[
            styles.modelContainer,
            {
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim },
                { scale: isLoading ? pulseAnim : scaleAnim },
              ],
            },
          ]}
        >
          {/* Loading Overlay */}
          {isLoading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color="#4ecdc4" />
              <Text style={styles.loadingText}>Loading 3D Model...</Text>
              <View style={styles.loadingBar}>
                <Animated.View
                  style={[
                    styles.loadingProgress,
                    {
                      transform: [{ scaleX: pulseAnim }],
                    },
                  ]}
                />
              </View>
            </View>
          )}

          {/* Glowing Border */}
          <View style={styles.modelGlow} />

          <WebView
            source={{ uri: embedUrl }}
            style={styles.modelFrame}
            allowsFullscreenVideo={true}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            scalesPageToFit={true}
            onLoad={handleWebViewLoad}
            onLoadEnd={handleWebViewLoad}
          />

          {/* Corner Decorations */}
          <View style={[styles.cornerDecor, styles.topLeft]} />
          <View style={[styles.cornerDecor, styles.topRight]} />
          <View style={[styles.cornerDecor, styles.bottomLeft]} />
          <View style={[styles.cornerDecor, styles.bottomRight]} />
        </Animated.View>

        {/* Interactive Description Toggle */}
        <Animated.View
          style={[
            styles.descriptionToggle,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={toggleDescription}
            activeOpacity={0.8}
          >
            <Text style={styles.toggleButtonText}>
              {showDescription ? "Hide Details" : "Show Details"}
            </Text>
            <Animated.Text
              style={[
                styles.toggleArrow,
                {
                  transform: [
                    {
                      rotate: showDescription ? "180deg" : "0deg",
                    },
                  ],
                },
              ]}
            >
              ▼
            </Animated.Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Animated Description */}
        {showDescription && (
          <Animated.View
            style={[
              styles.descriptionContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <View style={styles.descriptionHeader}>
              <Text style={styles.descriptionTitle}>Key Points</Text>
              <View style={styles.descriptionIcon}>
                <Text style={styles.iconText}>🔬</Text>
              </View>
            </View>

            {description.map((point, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.pointContainer,
                  {
                    opacity: fadeAnim,
                    transform: [
                      {
                        translateX: slideAnim.interpolate({
                          inputRange: [0, 50],
                          outputRange: [0, -20],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <View style={styles.pointBullet} />
                <Text style={styles.descriptionPoint}>{point}</Text>
              </Animated.View>
            ))}
          </Animated.View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0e1a",
  },
  backgroundGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 300,
    backgroundColor: "transparent",
    background:
      "linear-gradient(135deg, rgba(78, 205, 196, 0.1) 0%, rgba(26, 31, 46, 0.8) 100%)",
  },
  particlesContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "100%",
    zIndex: 1,
  },
  particle: {
    position: "absolute",
    width: 4,
    height: 4,
    backgroundColor: "#4ecdc4",
    borderRadius: 2,
    opacity: 0.6,
    top: "20%",
  },
  backArrowContainer: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 100,
  },
  backArrow: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(78, 205, 196, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#4ecdc4",
    shadowColor: "#4ecdc4",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  backArrowGlow: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(78, 205, 196, 0.1)",
    shadowColor: "#4ecdc4",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
  },
  backArrowText: {
    color: "#4ecdc4",
    fontSize: 24,
    fontWeight: "bold",
    textShadowColor: "#4ecdc4",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  scrollView: {
    flex: 1,
    zIndex: 2,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 120,
    paddingBottom: 40,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: "900",
    color: "#ffffff",
    textAlign: "center",
    textShadowColor: "rgba(78, 205, 196, 0.5)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
    letterSpacing: 1,
  },
  titleUnderline: {
    width: 60,
    height: 4,
    backgroundColor: "#4ecdc4",
    marginTop: 10,
    borderRadius: 2,
    shadowColor: "#4ecdc4",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
  },
  modelContainer: {
    width: "100%",
    height: 450,
    marginBottom: 30,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#1a1f2e",
    position: "relative",
    shadowColor: "#4ecdc4",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  modelGlow: {
    position: "absolute",
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: 22,
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#4ecdc4",
    opacity: 0.6,
    shadowColor: "#4ecdc4",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 15,
  },
  modelFrame: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  cornerDecor: {
    position: "absolute",
    width: 20,
    height: 20,
    borderColor: "#4ecdc4",
    borderWidth: 3,
  },
  topLeft: {
    top: 10,
    left: 10,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderTopLeftRadius: 5,
  },
  topRight: {
    top: 10,
    right: 10,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderTopRightRadius: 5,
  },
  bottomLeft: {
    bottom: 10,
    left: 10,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomLeftRadius: 5,
  },
  bottomRight: {
    bottom: 10,
    right: 10,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomRightRadius: 5,
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(26, 31, 46, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    borderRadius: 20,
  },
  loadingText: {
    color: "#4ecdc4",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 15,
    textShadowColor: "rgba(78, 205, 196, 0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 5,
  },
  loadingBar: {
    width: 200,
    height: 4,
    backgroundColor: "rgba(78, 205, 196, 0.2)",
    borderRadius: 2,
    marginTop: 20,
    overflow: "hidden",
  },
  loadingProgress: {
    height: "100%",
    backgroundColor: "#4ecdc4",
    borderRadius: 2,
    shadowColor: "#4ecdc4",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  descriptionToggle: {
    marginBottom: 20,
  },
  toggleButton: {
    backgroundColor: "rgba(78, 205, 196, 0.15)",
    borderRadius: 15,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(78, 205, 196, 0.3)",
    shadowColor: "#4ecdc4",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  toggleButtonText: {
    color: "#4ecdc4",
    fontSize: 18,
    fontWeight: "600",
    textShadowColor: "rgba(78, 205, 196, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  toggleArrow: {
    color: "#4ecdc4",
    fontSize: 16,
    fontWeight: "bold",
  },
  descriptionContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderRadius: 20,
    padding: 25,
    borderWidth: 1,
    borderColor: "rgba(78, 205, 196, 0.2)",
    shadowColor: "#4ecdc4",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  descriptionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  descriptionTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#4ecdc4",
    textShadowColor: "rgba(78, 205, 196, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 5,
  },
  descriptionIcon: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(78, 205, 196, 0.2)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#4ecdc4",
  },
  iconText: {
    fontSize: 20,
  },
  pointContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 15,
    paddingLeft: 10,
  },
  pointBullet: {
    width: 8,
    height: 8,
    backgroundColor: "#4ecdc4",
    borderRadius: 4,
    marginRight: 15,
    marginTop: 8,
    shadowColor: "#4ecdc4",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  descriptionPoint: {
    fontSize: 16,
    lineHeight: 24,
    color: "#ffffff",
    flex: 1,
    fontWeight: "400",
    textShadowColor: "rgba(255, 255, 255, 0.1)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});

export default ModelViewer;
