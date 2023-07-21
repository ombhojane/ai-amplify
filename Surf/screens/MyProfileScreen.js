import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Share } from 'react-native';

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

  // Function to toggle between edit and save modes
  const toggleEditMode = () => {
    setIsEditMode((prevMode) => !prevMode);
  };

  // Function to handle saving the profile changes
  const handleSaveProfile = () => {
    // Implement your logic for updating the profile here
    // For this example, we'll update the user state with the edited values.
    setUser({
      ...user,
      name: editedName,
      bio: editedBio,
    });
    setIsEditMode(false); // Switch back to "Edit Profile" mode after saving
    // You can also send the updated data to a backend API for permanent storage.
  };

  // Function to handle sharing the profile
  const handleShareProfile = () => {
    // Implement your logic for sharing the profile here
    // For this example, we'll use the Share API provided by React Native.

    // The content you want to share, here we'll combine the user's name and bio.
    const contentToShare = `Check out ${user.name}'s profile: ${user.bio}`;

    Share.share({
      message: contentToShare,
    });
  };

  return (
    <View style={styles.container}>
      {/* Profile Picture on the left */}
      <View style={styles.avatarContainer}>
        <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
      </View>

      {/* Profile Info (Name, Bio) and Edit/Share Buttons on the right */}
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
          <TouchableOpacity style={[styles.editSaveButton, { marginRight: 10 }]} onPress={isEditMode ? handleSaveProfile : toggleEditMode}>
            <Text style={styles.editSaveButtonText}>{isEditMode ? 'Save Profile' : 'Edit Profile'}</Text>
          </TouchableOpacity>

          {/* Share Button */}
          <TouchableOpacity style={styles.shareButton} onPress={handleShareProfile}>
            <Text style={styles.shareButtonText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // To place the elements side by side
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 30,
    backgroundColor: '#f0f0f0', // Light gray background
  },
  avatarContainer: {
    marginRight: 20, // Add some spacing between avatar and profile info
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff', // White border around the avatar
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
    color: '#888', // Gray bio text color
    marginBottom: 20,
  },
  nameInput: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc', // Gray border color for the input
    paddingVertical: 5,
  },
  bioInput: {
    fontSize: 16,
    color: '#888', // Gray bio text color
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#ccc', // Gray border color for the input
    paddingVertical: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  editSaveButton: {
    backgroundColor: '#1e90ff', // Bright blue button color
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  editSaveButtonText: {
    color: '#fff', // White button text color
    fontSize: 16,
    fontWeight: 'bold',
  },
  shareButton: {
    backgroundColor: '#34a853', // Green button color
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  shareButtonText: {
    color: '#fff', // White button text color
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MyProfile;
