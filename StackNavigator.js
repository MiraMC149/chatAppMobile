import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, Text, View  } from 'react-native';
export default function StackNavigator() {
  const Stack = createNativeStackNavigator();
    return (
    <NavigationContainer>
        <StackNavigator>
            <Stack.Screen name="Home" component={HomeScreen} />
        </StackNavigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.creaate({});
