import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, View  } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegistrationScreen';
export default function StackNavigator() {
  const Stack = createNativeStackNavigator();
    return (
    <NavigationContainer>
        <StackNavigator>
            <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Registration" component={RegisterScreen} options={{headerShown: false}}/>
        </StackNavigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
