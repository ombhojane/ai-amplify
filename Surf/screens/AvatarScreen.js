import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Share, StyleSheet } from 'react-native';

// Assuming you have the avatar data in a JSON file or fetched from an API
import avatarData from './avatarData.json';

const AvatarsScreen = ({ navigation }) => {
  const renderItem = ({ item }) => {
    const { name, imageUrl } = item;

    const onShare = async () => {
      try {
        const result = await Share.share({
          message: `Check out this cool avatar of ${name}!`,
          url: imageUrl,
        });

        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error) {
        alert(error.message);
      }
    };

    return (
      <View style={styles.avatarContainer}>
        <Image source={{ uri: imageUrl }} style={styles.avatarImage} />
        <Text style={styles.avatarName}>{name}</Text>
        <TouchableOpacity onPress={onShare} style={styles.shareButton}>
          <Text style={styles.shareButtonText}>Share</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Avatars</Text>
      <FlatList
        data={avatarData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()} // Assuming each avatar object has a unique ID
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    marginBottom: 20,
  },
  listContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  avatarName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  shareButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  shareButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AvatarsScreen;
