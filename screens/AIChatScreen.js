import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Animated,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import aiService from "../services/aiService";

const { width } = Dimensions.get("window");

const AIChatScreen = ({ route, navigation }) => {
  const { topicTitle, topicDescription } = route.params;
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: `Hi! I'm your AI assistant for ${topicTitle}. Ask me anything about this topic and I'll help you learn! 🤖`,
      isAI: true,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef(null);

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const headerAnim = useRef(new Animated.Value(-100)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

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
      Animated.spring(headerAnim, {
        toValue: 0,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Pulse animation for AI thinking
  useEffect(() => {
    if (isLoading) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isLoading]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputText.trim(),
      isAI: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    // Scroll to bottom
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);

    try {
      const response = await aiService.askQuestion(
        userMessage.text,
        topicTitle,
        topicDescription
      );

      const aiMessage = {
        id: messages.length + 2,
        text: response.success ? response.answer : response.error,
        isAI: true,
        timestamp: new Date(),
        isError: !response.success,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = {
        id: messages.length + 2,
        text: "Sorry, I encountered an error. Please try again.",
        isAI: true,
        timestamp: new Date(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

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

  const renderMessage = (message) => (
    <Animated.View
      key={message.id}
      style={[
        styles.messageContainer,
        message.isAI ? styles.aiMessageContainer : styles.userMessageContainer,
        { opacity: fadeAnim },
      ]}
    >
      <View
        style={[
          styles.messageBubble,
          message.isAI ? styles.aiMessageBubble : styles.userMessageBubble,
          message.isError && styles.errorMessageBubble,
        ]}
      >
        {message.isAI && !message.isError && (
          <LinearGradient
            colors={['rgba(78, 205, 196, 0.1)', 'rgba(78, 205, 196, 0.05)']}
            style={styles.aiMessageGradient}
          >
            <View style={styles.messageContent}>
              <Text
                style={[
                  styles.messageText,
                  styles.aiMessageText,
                ]}
              >
                {message.text}
              </Text>
              <Text style={styles.aiTimestamp}>
                🤖 AI • {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </View>
          </LinearGradient>
        )}
        
        {!message.isAI && (
          <LinearGradient
            colors={['#11998e', '#38ef7d']}
            style={styles.userMessageGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <View style={styles.messageContent}>
              <Text style={styles.userMessageText}>
                {message.text}
              </Text>
              <Text style={styles.userTimestamp}>
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </View>
          </LinearGradient>
        )}
        
        {message.isError && (
          <View style={styles.errorMessageContent}>
            <Text style={styles.errorMessageText}>
              {message.text}
            </Text>
            <Text style={styles.errorTimestamp}>
              ⚠️ Error • {message.timestamp.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </View>
        )}
      </View>
    </Animated.View>
  );

  const quickPrompts = [
    "What is this?",
    "How does it work?",
    "Real-world applications",
    "Key concepts",
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Background Gradient */}
      <LinearGradient
        colors={['#0D1B2A', '#1E3A5F', '#2E5077']}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      {/* Enhanced Header */}
      <Animated.View
        style={[
          styles.header,
          {
            opacity: fadeAnim,
            transform: [{ translateY: headerAnim }],
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
          <View style={styles.aiAvatarContainer}>
            <LinearGradient
              colors={['#4ECDC4', '#44A08D']}
              style={styles.aiAvatar}
            >
              <Text style={styles.aiAvatarText}>🤖</Text>
            </LinearGradient>
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>AI Assistant</Text>
            <Text style={styles.headerSubtitle}>{topicTitle}</Text>
          </View>
          <View style={styles.statusIndicator}>
            <Animated.View style={[styles.statusDot, { transform: [{ scale: pulseAnim }] }]} />
            <Text style={styles.statusText}>Online</Text>
          </View>
        </View>
      </Animated.View>

      {/* Chat Messages */}
      <KeyboardAvoidingView
        style={styles.chatContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() =>
            scrollViewRef.current?.scrollToEnd({ animated: true })
          }
        >
          {/* Quick Start Guide */}
          {messages.length === 1 && (
            <Animated.View
              style={[
                styles.quickStartContainer,
                { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
              ]}
            >
              <LinearGradient
                colors={['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.03)']}
                style={styles.quickStartGradient}
              >
                <Text style={styles.quickStartTitle}>💡 Quick Start</Text>
                <Text style={styles.quickStartText}>Try asking me about:</Text>
                <View style={styles.quickPromptsContainer}>
                  {quickPrompts.map((prompt, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.quickPrompt}
                      onPress={() => setInputText(prompt)}
                    >
                      <Text style={styles.quickPromptText}>{prompt}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </LinearGradient>
            </Animated.View>
          )}

          {/* Messages */}
          {messages.map(renderMessage)}

          {/* AI Thinking Indicator */}
          {isLoading && (
            <Animated.View
              style={[
                styles.loadingContainer,
                { opacity: fadeAnim, transform: [{ scale: pulseAnim }] }
              ]}
            >
              <LinearGradient
                colors={['rgba(78, 205, 196, 0.1)', 'rgba(78, 205, 196, 0.05)']}
                style={styles.loadingBubble}
              >
                <ActivityIndicator size="small" color="#4ECDC4" />
                <Text style={styles.loadingText}>AI is thinking...</Text>
                <View style={styles.thinkingDots}>
                  <View style={[styles.thinkingDot, { animationDelay: '0ms' }]} />
                  <View style={[styles.thinkingDot, { animationDelay: '200ms' }]} />
                  <View style={[styles.thinkingDot, { animationDelay: '400ms' }]} />
                </View>
              </LinearGradient>
            </Animated.View>
          )}
        </ScrollView>

        {/* Enhanced Input Container */}
        <Animated.View
          style={[
            styles.inputContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.03)']}
            style={styles.inputWrapper}
          >
            <View style={styles.inputSection}>
              <TextInput
                style={styles.textInput}
                value={inputText}
                onChangeText={setInputText}
                placeholder={`Ask about ${topicTitle}...`}
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                multiline
                maxLength={500}
                onSubmitEditing={handleSendMessage}
                blurOnSubmit={false}
              />
              <TouchableOpacity
                style={[
                  styles.sendButton,
                  { opacity: inputText.trim() ? 1 : 0.5 },
                ]}
                onPress={handleSendMessage}
                disabled={!inputText.trim() || isLoading}
                activeOpacity={0.7}
              >
                <LinearGradient
                  colors={inputText.trim() ? ['#11998e', '#38ef7d'] : ['#666', '#555']}
                  style={styles.sendButtonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.sendButtonText}>→</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            
            <View style={styles.inputFooter}>
              <Text style={styles.inputHint}>💬 Ask questions about {topicTitle}</Text>
              <Text style={styles.charCount}>{inputText.length}/500</Text>
            </View>
          </LinearGradient>
        </Animated.View>
      </KeyboardAvoidingView>
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
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
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
  aiAvatarContainer: {
    marginRight: 12,
  },
  aiAvatar: {
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
  aiAvatarText: {
    fontSize: 24,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 2,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#4ECDC4",
    fontWeight: "600",
  },
  statusIndicator: {
    alignItems: "center",
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#4CAF50",
    marginBottom: 4,
    shadowColor: "#4CAF50",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  statusText: {
    fontSize: 10,
    color: "#4CAF50",
    fontWeight: "600",
  },
  chatContainer: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  messagesContent: {
    paddingVertical: 20,
  },
  quickStartContainer: {
    marginBottom: 25,
  },
  quickStartGradient: {
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(78, 205, 196, 0.2)",
  },
  quickStartTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#4ECDC4",
    marginBottom: 8,
  },
  quickStartText: {
    fontSize: 14,
    color: "#B8C5D6",
    marginBottom: 15,
    fontWeight: "500",
  },
  quickPromptsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  quickPrompt: {
    backgroundColor: 'rgba(78, 205, 196, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(78, 205, 196, 0.3)',
  },
  quickPromptText: {
    color: '#4ECDC4',
    fontSize: 12,
    fontWeight: '600',
  },
  messageContainer: {
    marginVertical: 8,
  },
  aiMessageContainer: {
    alignItems: "flex-start",
  },
  userMessageContainer: {
    alignItems: "flex-end",
  },
  messageBubble: {
    maxWidth: "85%",
    borderRadius: 20,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  aiMessageBubble: {
    borderBottomLeftRadius: 8,
    shadowColor: "#4ECDC4",
  },
  userMessageBubble: {
    borderBottomRightRadius: 8,
    shadowColor: "#11998e",
  },
  errorMessageBubble: {
    backgroundColor: "#F44336",
    shadowColor: "#F44336",
  },
  aiMessageGradient: {
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(78, 205, 196, 0.2)",
  },
  userMessageGradient: {
    padding: 16,
  },
  errorMessageContent: {
    padding: 16,
  },
  messageContent: {
    // No additional styles needed as gradients handle the content
  },
  messageText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
  },
  aiMessageText: {
    color: "#FFFFFF",
    fontWeight: "400",
  },
  userMessageText: {
    color: "#FFFFFF",
    fontWeight: "500",
  },
  errorMessageText: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
  },
  aiTimestamp: {
    fontSize: 11,
    color: "#4ECDC4",
    fontWeight: "600",
    opacity: 0.8,
  },
  userTimestamp: {
    fontSize: 11,
    color: "rgba(255, 255, 255, 0.8)",
    fontWeight: "500",
  },
  errorTimestamp: {
    fontSize: 11,
    color: "rgba(255, 255, 255, 0.8)",
    fontWeight: "600",
  },
  loadingContainer: {
    alignItems: "flex-start",
    marginVertical: 8,
  },
  loadingBubble: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    borderBottomLeftRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(78, 205, 196, 0.2)",
  },
  loadingText: {
    color: "#4ECDC4",
    marginLeft: 12,
    fontSize: 14,
    fontWeight: "600",
  },
  thinkingDots: {
    flexDirection: 'row',
    marginLeft: 8,
    gap: 4,
  },
  thinkingDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#4ECDC4',
    opacity: 0.6,
  },
  inputContainer: {
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  inputWrapper: {
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "rgba(78, 205, 196, 0.3)",
    overflow: 'hidden',
  },
  inputSection: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
  },
  textInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 16,
    maxHeight: 120,
    paddingVertical: 8,
    fontWeight: "400",
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 12,
    overflow: 'hidden',
  },
  sendButtonGradient: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonText: {
    fontSize: 20,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  inputFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  inputHint: {
    fontSize: 12,
    color: "rgba(78, 205, 196, 0.8)",
    fontWeight: "500",
  },
  charCount: {
    fontSize: 11,
    color: "rgba(255, 255, 255, 0.5)",
    fontWeight: "500",
  },
});

export default AIChatScreen;