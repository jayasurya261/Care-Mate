import React, { useState } from 'react';
import { View, Text, TextInput, Alert, SafeAreaView, TouchableOpacity, ActivityIndicator, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import tw from 'twrnc';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);  // Loading state

  // Validate email using regex
  const isEmailValid = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Handle form submission
  const submit = async () => {
    // Trim email to remove leading or trailing spaces
    const trimmedEmail = email.trim();

    if (!trimmedEmail || !password) {
      Alert.alert('Error', 'Please fill all fields.');
      return;
    }

    if (!isEmailValid(trimmedEmail)) {
      Alert.alert('Error', 'Invalid email format.');
      return;
    }

    const data = {
      email: trimmedEmail,
      password,
    };

    setLoading(true);  // Start loading animation
    try {
      const response = await axios.post('https://naturally-evident-peacock.ngrok-free.app/user/app/login', data);
      console.log('Login successful:', response.data);

      // Store JWT token and email in AsyncStorage
      await AsyncStorage.setItem('token', response.data.token);
      await AsyncStorage.setItem('email', trimmedEmail); // Store the trimmed email

      Alert.alert('Success', 'Login successful!');
      navigation.navigate('Track'); // Navigate to another screen after successful login
    } catch (error) {
      console.error('Login failed:', error);
      Alert.alert('Error', 'Invalid email or password.');
    } finally {
      setLoading(false);  // Stop loading animation
    }
  };

  // Handle opening register link in the browser
  const openRegisterPage = () => {
    const url = 'https://silkworm-nice-mosquito.ngrok-free.app/register';
    Linking.openURL(url).catch((err) => console.error('Error opening link:', err));
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-100 p-5 justify-center`}>
      <View style={tw`mb-10`}>
        <Text style={tw`text-3xl font-bold text-center text-blue-600`}>Login to Connect with Care</Text>
      </View>

      <TextInput
        style={tw`h-12 bg-white border border-gray-300 rounded-lg p-3 mb-5 text-black`}
        placeholder="Enter Email"
        placeholderTextColor="gray"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={tw`h-12 bg-white border border-gray-300 rounded-lg p-3 mb-5 text-black`}
        placeholder="Enter Password"
        placeholderTextColor="gray"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Show loading spinner if loading */}
      {loading ? (
        <ActivityIndicator size="large" color="#1E90FF" style={tw`mt-5`} />
      ) : (
        <TouchableOpacity style={tw`bg-blue-600 p-3 rounded-lg mt-5`} onPress={submit}>
          <Text style={tw`text-white text-center text-lg`}>Login</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={openRegisterPage} style={tw`mt-5`}>
        <Text style={tw`text-blue-600 text-center text-lg`}>Don't have an account? Register Here.</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Login;
