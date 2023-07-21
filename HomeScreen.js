import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';

const HomeScreen = () => {
  const scaleAnimation = new Animated.Value(1);

  const handleViewHistory = () => {

  };

  const handleRedirectToCamera = () => {

  };

  const startAnimation = () => {
    Animated.sequence([
      Animated.timing(scaleAnimation, {
        toValue: 1.2,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnimation, {
        toValue: 1,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Hello, welcome to surf an amazing application to help you surf throughout your journey of emotions
      </Text>
      <View style={styles.widgetsContainer}>
        <TouchableOpacity onPress={handleViewHistory} style={[styles.widget, styles.viewHistoryButton]}>
          <Text style={styles.widgetText}>View History</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleRedirectToCamera}
          style={[styles.widget, styles.redirectToCameraButton]}
          onPressIn={startAnimation}
        >
          <Animated.Text style={[styles.widgetText, { transform: [{ scale: scaleAnimation }] }]}>
            Redirect to Camera
          </Animated.Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  widgetsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  widget: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 10,
    elevation: 4,
  },
  viewHistoryButton: {
    backgroundColor: '#ff8080',
  },
  redirectToCameraButton: {
    backgroundColor: '#66cc99',
  },
  widgetText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
