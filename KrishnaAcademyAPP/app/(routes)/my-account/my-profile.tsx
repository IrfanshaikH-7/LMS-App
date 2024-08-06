import useUser from '@/hooks/auth/useUser';
import React, { useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet } from 'react-native';

const ProfileScreen = () => {



  const { user, loading, setRefetch } = useUser();


  const handleInputChange = (key, value) => {
    setRefetch({ ...user, [key]: value})
  }
  return (
    
    <View style={styles.container}>
    
    <View style={styles.userInfoWrapper}>
        <Image
          source={{
            uri: "https://api.dicebear.com/5.x/initials/svg?seed=Harsh",
          }}
          width={80}
          height={80}
          style={{
            borderRadius: 40,
            // margin: 10,
          }}
        />
        <View style={styles.userDetailsWrapper}>
          <Text style={styles.userName}> {user?.name}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
        </View>
      </View>
      <Text style={styles.phoneNumber}>{user?.phoneNumber}</Text>
      <TextInput
        style={styles.editableInput}
        value={user?.dob}
        onChangeText={(value) => handleInputChange('dob', value)}
      />
      <TextInput
        style={styles.editableInput}
        value={user?.state}
        onChangeText={(value) => handleInputChange('state', value)}
      />
      <TextInput
        style={styles.editableInput}
        value={user?.city}
        onChangeText={(value) => handleInputChange('city', value)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  userInfoWrapper: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    // borderBottomColor: "#000",
    // borderBottomWidth: 1,
    // marginBottom: 10,
  }, userDetailsWrapper: {
    marginTop: 25,
    marginLeft: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  userEmail: {
    fontSize: 16,
    fontStyle: "italic",
    textAlign: "center",
    textDecorationLine: "underline",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  email: {
    fontSize: 16,
    marginTop: 10,
  },
  phoneNumber: {
    fontSize: 16,
    marginTop: 10,
  },
  editableInput: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginTop: 10,
  },
});

export default ProfileScreen;
