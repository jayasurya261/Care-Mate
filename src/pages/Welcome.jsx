import React from 'react';
import { SafeAreaView, Text, ImageBackground, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native'; 

const Welcome = () => {
  const navigation = useNavigation();
  return (
    <ImageBackground
      source={require('../assets/welcome.jpg')}
      style={tw`flex-1 justify-center items-center`}
    >
      <TouchableOpacity style={tw`bg-blue-500 p-3 w-[300px] rounded-[20px] justify-center items-center mt-[550px]`} onPress={() => navigation.navigate('Login')}>
        <Text style={tw`text-white text-center text-[18px]`}>Get Started</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default Welcome;
