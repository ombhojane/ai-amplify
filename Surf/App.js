// App.js
import React, { useState, useEffect } from 'react';
import { View, Keyboard, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';
import AnalysisScreen from './screens/AnalysisScreen';
import CameraScreen from './screens/CameraScreen';
import MyProfileScreen from './screens/MyProfileScreen';
import MessagingScreen from './screens/MessagingScreen';

const Tab = createBottomTabNavigator();

const App = () => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showKeyboard = () => setKeyboardVisible(true);
    const hideKeyboard = () => setKeyboardVisible(false);

    Keyboard.addListener('keyboardDidShow', showKeyboard);
    Keyboard.addListener('keyboardDidHide', hideKeyboard);

    return () => {
      Keyboard.removeListener('keyboardDidShow', showKeyboard);
      Keyboard.removeListener('keyboardDidHide', hideKeyboard);
    };
  }, []);

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          style={{ flex: 1 }}
          enabled
        >
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                  iconName = focused ? 'home' : 'home-outline';
                } else if (route.name === 'Analysis') {
                  iconName = focused ? 'analytics' : 'analytics-outline';
                } else if (route.name === 'Camera') {
                  iconName = focused ? 'camera' : 'camera-reverse-outline';
                } else if (route.name === 'Messaging') {
                  iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
                } else if (route.name === 'My Profile') {
                  iconName = focused ? 'man' : 'man-outline';
                }

                return <Ionicons name={iconName} size={size} color={color} />;
              },
            })}
            tabBarOptions={{
              activeTintColor: 'grey',
              inactiveTintColor: 'gray',
            }}
            tabBarStyle={{ display: keyboardVisible ? 'none' : 'flex' }}
          >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Analysis" component={AnalysisScreen} />
            <Tab.Screen name="Camera" component={CameraScreen} />
            <Tab.Screen name="Messaging" component={MessagingScreen} />
            <Tab.Screen name="My Profile" component={MyProfileScreen} />
          </Tab.Navigator>
        </KeyboardAvoidingView>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
