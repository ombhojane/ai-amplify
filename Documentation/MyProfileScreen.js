import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Share, Animated } from 'react-native';

const MyProfile = () => {
  // Sample user data (you can replace this with your own data)
  const [user, setUser] = useState({
    name: 'John Doe',
    avatarUrl: 'https://avatars.githubusercontent.com/u/78205431?v=4', // Replace with the user's actual avatar URL
    bio: 'I love surfing and coding!',
  });

  // State variables to hold the edited name and bio values
  const [editedName, setEditedName] = useState(user.name);
  const [editedBio, setEditedBio] = useState(user.bio);

  // State variable to toggle between "Edit Profile" and "Save Profile" mode
  const [isEditMode, setIsEditMode] = useState(false);

  // State variable for the animation
  const [fadeInAnimation] = useState(new Animated.Value(0));

  // Emotion data (you can replace this with your own data)
  const [emotionData, setEmotionData] = useState({
    angry: 15,
    dis: 20,
    fear: 10,
    happy: 30,
    neutral: 10,
    sad: 12,
    surprise: 3,
  });

  // Function to toggle between edit and save modes
  const toggleEditMode = () => {
    setIsEditMode((prevMode) => !prevMode);
  };

  // Function to handle saving the profile changes
  const handleSaveProfile = () => {
    setUser({
      ...user,
      name: editedName,
      bio: editedBio,
    });
    setIsEditMode(false); // Switch back to "Edit Profile" mode after saving
  };

  // Function to handle sharing the profile
  const handleShareProfile = () => {
    const contentToShare = `Check out ${user.name}'s profile: ${user.bio}`;

    Share.share({
      message: contentToShare,
    });
  };

  // Function to handle fade-in animation
  const fadeIn = () => {
    Animated.timing(fadeInAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    fadeIn(); // Trigger the fade-in animation when the component mounts
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        {/* Profile Picture */}
        <View style={styles.avatarContainer}>
          <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
        </View>

        {/* Profile Info (Name, Bio) and Edit/Share Buttons */}
        <View style={styles.profileInfoContainer}>
          {isEditMode ? (
            // Edit Mode: Show editable input fields for name and bio
            <>
              <TextInput
                style={styles.nameInput}
                value={editedName}
                onChangeText={(text) => setEditedName(text)}
                placeholder="Enter your name"
              />
              <TextInput
                style={styles.bioInput}
                value={editedBio}
                onChangeText={(text) => setEditedBio(text)}
                placeholder="Enter your bio"
                multiline
              />
            </>
          ) : (
            // Display mode: Show the user's name and bio
            <>
              <Text style={styles.name}>{user.name}</Text>
              <Text style={styles.bio}>{user.bio}</Text>
            </>
          )}

          {/* Edit and Share Buttons */}
          <View style={styles.buttonsContainer}>
            {/* Edit/Save Button */}
            <TouchableOpacity
              style={[styles.editSaveButton, { marginRight: 10 }]}
              onPress={isEditMode ? handleSaveProfile : toggleEditMode}
            >
              <Text style={styles.editSaveButtonText}>{isEditMode ? 'Save Profile' : 'Edit Profile'}</Text>
            </TouchableOpacity>

            {/* Share Button */}
            <TouchableOpacity style={styles.shareButton} onPress={handleShareProfile}>
              <Text style={styles.shareButtonText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Emotion Icons and Labels */}
      <View style={styles.emotionContainer}>
        <View style={styles.emotionItem}>
          <Text style={styles.emotionIcon}>😠</Text>
          <Text style={styles.emotionLabel}>Angry</Text>
          <Text style={styles.emotionPercentage}>{emotionData.angry}%</Text>
        </View>
        <View style={styles.emotionItem}>
          <Text style={styles.emotionIcon}>😐</Text>
          <Text style={styles.emotionLabel}>Neutral</Text>
          <Text style={styles.emotionPercentage}>{emotionData.neutral}%</Text>
        </View>
        <View style={styles.emotionItem}>
          <Text style={styles.emotionIcon}>😄</Text>
          <Text style={styles.emotionLabel}>Happy</Text>
          <Text style={styles.emotionPercentage}>{emotionData.happy}%</Text>
        </View>
        <View style={styles.emotionItem}>
          <Text style={styles.emotionIcon}>😢</Text>
          <Text style={styles.emotionLabel}>Sad</Text>
          <Text style={styles.emotionPercentage}>{emotionData.sad}%</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDD819', // Update the background color to your desired gradient start color
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  avatarContainer: {
    marginRight: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
  },
  profileInfoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  bio: {
    fontSize: 16,
    color: '#888',
    marginBottom: 10,
    marginTop: 10,
  },
  nameInput: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 5,
  },
  bioInput: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  editSaveButton: {
    backgroundColor: '#1e90ff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  editSaveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  shareButton: {
    backgroundColor: '#34a853',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  shareButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emotionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  emotionItem: {
    alignItems: 'center',
    width: '25%', // Adjust the width to control the spacing between emotion items
  },
  emotionLabel: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  emotionPercentage: {
    fontSize: 14,
    color: '#888',
  },
  emotionIcon: {
    fontSize: 30,
  },
});

export default MyProfile;