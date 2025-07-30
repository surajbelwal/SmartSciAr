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
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

const ModelViewer = ({ modelData, navigation }) => {
  const { embedUrl, title, description } = modelData;
  const [isLoading, setIsLoading] = useState(true);
  const [showDescription, setShowDescription] = useState(false);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start entrance animations
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

    // Loading progress animation
    if (isLoading) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(progressAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: false,
          }),
          Animated.timing(progressAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false,
          }),
        ])
      ).start();

      // Pulse animation for loading
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.05,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [isLoading]);

  const handleBack = () => {
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
    setTimeout(() => {
      setShowDescription(true);
    }, 1000);
  };

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  const handleAskAI = () => {
    navigation.navigate("AIChat", {
      topicTitle: title,
      topicDescription: description.join(" "),
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Animated Background */}
      <LinearGradient
        colors={['#0D1B2A', '#1E3A5F', '#2E5077', '#0D1B2A']}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      {/* Header */}
      <Animated.View
        style={[
          styles.header,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
          },
        ]}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          activeOpacity={0.7}
        >
          <LinearGradient
            colors={['rgba(78, 205, 196, 0.2)', 'rgba(78, 205, 196, 0.1)']}
            style={styles.backButtonGradient}
          >
            <Text style={styles.backButtonText}>←</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>{title}</Text>
          <View style={styles.statusBadge}>
            <View style={[styles.statusDot, { backgroundColor: isLoading ? '#FF9800' : '#4CAF50' }]} />
            <Text style={styles.statusText}>{isLoading ? 'Loading...' : '3D Model Ready'}</Text>
          </View>
        </View>
      </Animated.View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 3D Model Container */}
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
          {/* Enhanced Loading Overlay */}
          {isLoading && (
            <View style={styles.loadingOverlay}>
              <LinearGradient
                colors={['rgba(26, 31, 46, 0.95)', 'rgba(30, 58, 95, 0.9)']}
                style={styles.loadingGradient}
              >
                <View style={styles.loadingContent}>
                  <ActivityIndicator size="large" color="#4ECDC4" />
                  <Text style={styles.loadingTitle}>Loading 3D Model</Text>
                  <Text style={styles.loadingSubtitle}>Preparing interactive experience...</Text>
                  
                  <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                      <Animated.View
                        style={[
                          styles.progressFill,
                          {
                            width: progressAnim.interpolate({
                              inputRange: [0, 1],
                              outputRange: ['0%', '100%'],
                            }),
                          },
                        ]}
                      />
                    </View>
                    <Text style={styles.progressText}>Please wait...</Text>
                  </View>
                </View>
              </LinearGradient>
            </View>
          )}

          {/* Model Frame with Enhanced Border */}
          <View style={styles.modelFrameContainer}>
            <LinearGradient
              colors={['#4ECDC4', '#44A08D', '#667eea', '#764ba2']}
              style={styles.modelBorder}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
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
            </LinearGradient>
          </View>

          {/* Corner Decorations */}
          <View style={[styles.cornerDecor, styles.topLeft]} />
          <View style={[styles.cornerDecor, styles.topRight]} />
          <View style={[styles.cornerDecor, styles.bottomLeft]} />
          <View style={[styles.cornerDecor, styles.bottomRight]} />
        </Animated.View>

        {/* Action Buttons */}
        <Animated.View
          style={[
            styles.actionButtonsContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <TouchableOpacity
            style={styles.aiButton}
            onPress={handleAskAI}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#11998e', '#38ef7d']}
              style={styles.aiButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <View style={styles.aiButtonContent}>
                <Text style={styles.aiButtonIcon}>🤖</Text>
                <View style={styles.aiButtonTextContainer}>
                  <Text style={styles.aiButtonText}>Ask AI Assistant</Text>
                  <Text style={styles.aiButtonSubtext}>Get instant answers about this topic</Text>
                </View>
                <Text style={styles.aiButtonArrow}>→</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.detailsButton}
            onPress={toggleDescription}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']}
              style={styles.detailsButtonGradient}
            >
              <Text style={styles.detailsButtonText}>
                {showDescription ? "Hide Details" : "Show Details"}
              </Text>
              <Animated.Text
                style={[
                  styles.detailsButtonArrow,
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
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        {/* Enhanced Description */}
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
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.03)']}
              style={styles.descriptionGradient}
            >
              <View style={styles.descriptionHeader}>
                <View style={styles.descriptionIconContainer}>
                  <LinearGradient
                    colors={['#4ECDC4', '#44A08D']}
                    style={styles.descriptionIconGradient}
                  >
                    <Text style={styles.descriptionIcon}>🔬</Text>
                  </LinearGradient>
                </View>
                <View style={styles.descriptionTitleContainer}>
                  <Text style={styles.descriptionTitle}>Key Learning Points</Text>
                  <Text style={styles.descriptionSubtitle}>Essential concepts explained</Text>
                </View>
              </View>

              <View style={styles.pointsList}>
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
                    <View style={styles.pointBulletContainer}>
                      <LinearGradient
                        colors={['#4ECDC4', '#44A08D']}
                        style={styles.pointBullet}
                      />
                    </View>
                    <Text style={styles.descriptionPoint}>{point}</Text>
                  </Animated.View>
                ))}
              </View>

              <View style={styles.descriptionFooter}>
                <View style={styles.interactionHint}>
                  <Text style={styles.interactionHintIcon}>💡</Text>
                  <Text style={styles.interactionHintText}>
                    Rotate and zoom the 3D model to explore different perspectives
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </Animated.View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D1B2A",
  },
  backgroundGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    zIndex: 100,
  },
  backButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
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
  backButtonText: {
    fontSize: 24,
    color: "#4ECDC4",
    fontWeight: "bold",
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: "#FFFFFF",
    marginBottom: 6,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    color: "#B8C5D6",
    fontWeight: "600",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  modelContainer: {
    width: "100%",
    height: 400,
    marginBottom: 25,
    borderRadius: 24,
    overflow: "hidden",
    position: "relative",
  },
  modelFrameContainer: {
    flex: 1,
    borderRadius: 24,
    padding: 3,
  },
  modelBorder: {
    flex: 1,
    borderRadius: 21,
    padding: 2,
  },
  modelFrame: {
    flex: 1,
    borderRadius: 19,
    backgroundColor: '#1a1f2e',
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    borderRadius: 24,
    overflow: 'hidden',
  },
  loadingGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContent: {
    alignItems: 'center',
  },
  loadingTitle: {
    color: "#4ECDC4",
    fontSize: 20,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 8,
    textShadowColor: 'rgba(78, 205, 196, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  loadingSubtitle: {
    color: "#B8C5D6",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 30,
  },
  progressContainer: {
    alignItems: 'center',
    width: 200,
  },
  progressBar: {
    width: 200,
    height: 6,
    backgroundColor: "rgba(78, 205, 196, 0.2)",
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#4ECDC4",
    borderRadius: 3,
    shadowColor: "#4ECDC4",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
  },
  progressText: {
    color: "#4ECDC4",
    fontSize: 12,
    fontWeight: "600",
  },
  cornerDecor: {
    position: "absolute",
    width: 24,
    height: 24,
    borderColor: "#4ECDC4",
    borderWidth: 3,
  },
  topLeft: {
    top: 15,
    left: 15,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderTopLeftRadius: 8,
  },
  topRight: {
    top: 15,
    right: 15,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderTopRightRadius: 8,
  },
  bottomLeft: {
    bottom: 15,
    left: 15,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomLeftRadius: 8,
  },
  bottomRight: {
    bottom: 15,
    right: 15,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomRightRadius: 8,
  },
  actionButtonsContainer: {
    marginBottom: 25,
    gap: 15,
  },
  aiButton: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: "#11998e",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  aiButtonGradient: {
    padding: 20,
  },
  aiButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiButtonIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  aiButtonTextContainer: {
    flex: 1,
  },
  aiButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 4,
  },
  aiButtonSubtext: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
    fontWeight: "500",
  },
  aiButtonArrow: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  detailsButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  detailsButtonGradient: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(78, 205, 196, 0.3)",
  },
  detailsButtonText: {
    color: "#4ECDC4",
    fontSize: 16,
    fontWeight: "700",
  },
  detailsButtonArrow: {
    color: "#4ECDC4",
    fontSize: 16,
    fontWeight: "bold",
  },
  descriptionContainer: {
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 20,
  },
  descriptionGradient: {
    padding: 25,
    borderWidth: 1,
    borderColor: "rgba(78, 205, 196, 0.2)",
  },
  descriptionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  descriptionIconContainer: {
    marginRight: 16,
  },
  descriptionIconGradient: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#4ECDC4",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  descriptionIcon: {
    fontSize: 24,
  },
  descriptionTitleContainer: {
    flex: 1,
  },
  descriptionTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#4ECDC4",
    marginBottom: 4,
    textShadowColor: 'rgba(78, 205, 196, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  descriptionSubtitle: {
    fontSize: 14,
    color: "#B8C5D6",
    fontWeight: "500",
  },
  pointsList: {
    marginBottom: 20,
  },
  pointContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 18,
    paddingLeft: 5,
  },
  pointBulletContainer: {
    marginRight: 16,
    marginTop: 8,
  },
  pointBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    shadowColor: "#4ECDC4",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  descriptionPoint: {
    fontSize: 16,
    lineHeight: 26,
    color: "#FFFFFF",
    flex: 1,
    fontWeight: "400",
    textShadowColor: "rgba(255, 255, 255, 0.1)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  descriptionFooter: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(78, 205, 196, 0.2)',
    paddingTop: 20,
  },
  interactionHint: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(78, 205, 196, 0.1)',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(78, 205, 196, 0.2)',
  },
  interactionHintIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  interactionHintText: {
    flex: 1,
    fontSize: 14,
    color: '#4ECDC4',
    fontWeight: '600',
    lineHeight: 20,
  },
});

export default ModelViewer;