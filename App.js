import React from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// import the screens
import StartScreen from './components/Start';
import ChatScreen from './components/Chat';

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StyleSheet } from 'react-native';

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDMr7E_ZWDnkBVf7eLuq0V2jG6a7EyqR3I",
    authDomain: "chat-app-1f309.firebaseapp.com",
    projectId: "chat-app-1f309",
    storageBucket: "chat-app-1f309.appspot.com",
    messagingSenderId: "787453903649",
    appId: "1:787453903649:web:4f8df2b0bc46e01a9d3460",
    measurementId: "G-WCL2BRMDKB"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);




  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="StartScreen"
      >
        <Stack.Screen
          name="StartScreen"
          component={StartScreen}
        />
        <Stack.Screen
          name="ChatScreen">
          {props => <ChatScreen db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
});

export default App;

