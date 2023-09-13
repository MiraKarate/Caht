# React Native Mobile Chat App

This README provides an overview of the mobile chat app project developed using React Native, Expo, and Google Firestore Database. The app is designed to facilitate real-time communication between users and includes various features to enhance user experience. The app provides users with a chat interface and options to share images and their
location. 

<img width="300" alt="Simulator Screenshot - iPhone SE (3rd generation) - 2023-09-13 at 11 26 21" src="img/Simulator Screenshot - iPhone SE (3rd generation) - 2023-09-13 at 11.26.21.png"> <img width="300" alt="Simulator Screenshot - iPhone SE (3rd generation) - 2023-09-13 at 11 24 35" src="img/Simulator Screenshot - iPhone SE (3rd generation) - 2023-09-13 at 11.24.35.png"> <img width="300" alt="Simulator Screenshot - iPhone SE (3rd generation) - 2023-09-13 at 11 24 59" src="img/Simulator Screenshot - iPhone SE (3rd generation) - 2023-09-13 at 11.24.59.png">


## Introduction

The prevalence of mobile devices in daily tasks has led to the demand for efficient communication apps. 
This project aims to address this demand by building a native chat app using React Native, Expo, and Google Firestore Database. 
The app serves as a showcase of JavaScript mobile development skills and offers a platform for users to engage in seamless conversations, share images, and exchange location data.  

## Features and Requirements  

### User Stories  
+ As a new user, I want to be able to easily enter a chat room so I can quickly start talking to my
friends and family.  
+ As a user, I want to be able to send messages to my friends and family members to exchange
the latest news.  
+ As a user, I want to send images to my friends to show them what I’m currently doing.  
+ As a user, I want to share my location with my friends to show them where I am.  
+ As a user, I want to be able to read my messages offline so I can reread conversations at any
time.  
+ As a user with a visual impairment, I want to use a chat app that is compatible with a screen
reader so that I can engage with a chat interface.  
  
### Key Features  
  
+ A page where users can enter their name and choose a background color for the chat screen
before joining the chat.  
+ A page displaying the conversation, as well as an input field and submit button.  
+ The chat must provide users with two additional communication features: sending images
and location data.  
+ Data gets stored online and offline.  
  
### Technical Requirements  
  
+ The app must be written in React Native.  
+ The app must be developed using Expo.  
+ The app must be styled according to the given screen design.  
+ Chat conversations must be stored in Google Firestore Database.  
+ The app must authenticate users anonymously via Google Firebase authentication.  
+ Chat conversations must be stored locally.  
+ The app must let users pick and send images from the phone’s image library.  
+ The app must let users take pictures with the device’s camera app, and send them.  
+ The app must store images in Firebase Cloud Storage.  
+ The app must be able to read the user’s location data.  
+ Location data must be sent via the chat in a map view.  
+ The chat interface and functionality must be created using the Gifted Chat library.  
+ The app’s codebase must contain comments.
  
## Set Up and Installation

## Development Environment Setup

### 1. Expo Setup

Set up an Expo account and ensure you have Expo CLI installed globally:

```bash
npm install -g expo-cli
```

### 2. Android Studio:   

If you plan to run the app on an Android emulator, follow the official Expo guide to set up the Android development environment: Expo Android Development Environment.

## Database Configuration  

### 3. Firebase Setup 

1. Visit the Firebase Console and create a new project if you don't have one already. In the "Rules" tab, change "allow read, write: if false;" to "allow read, write: if true;"  

2. Set up Firebase Authentication (Anonymous Authentication is used in this app) and Firestore Database. Make sure to enable anonymous authentication in Firebase.  

3. Obtain the Firebase configuration object for your project. It should look something like this:
   
```bash
javascript
Copy code
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
  measurementId: 'YOUR_MEASUREMENT_ID',
};
```  
4. In the **App.js** file of your project, replace the **firebaseConfig** object with your own Firebase configuration.

## Necessary Libraries to Install

Before running the app, make sure to install the required dependencies using npm or yarn. Ensure you are using Node.js version 16.19.0:

### 4. Install Dependencies  
  
```bash
npm install @react-native-async-storage/async-storage @react-native-community/netinfo @react-navigation/native @react-navigation/native-stack expo firebase react-native react-native-gifted-chat react-native-safe-area-context react-native-screens expo-image-picker expo-location react-native-maps
```

### Running the App

Now that you've set up the environment and Firebase, you can run the app:

### 5.Start the Expo Development Server

```bash
expo start
```

This command will start the Expo development server, and you can run the app on an emulator or a physical device.

+ Use **expo start -c** to clear cache.  
+ Use **expo start --offline** for offline testing.  

### Additional Requirements

Ensure you have the following additional requirements:  
  
+ Node.js
+ Firebase Account
+ Expo
+ Mobile OS Emulator (Android Studio)
+ Personal device (smartphone or tablet)


### Project Setup

### 6. Clone the Repository  
Clone the repository for your project.  

### 7. Navigate to the Project Directory
Navigate to the project directory in the terminal.  

### 8. Install Dependencies

Install the base dependencies:

```bash
npm install 16.19.0
npm use 16.19.0
```

Install required packages:

```bash
npm i firebase
npm i expo
npm i whatwg-fetch@3.6.2
expo install expo-av
```
### 9. Firebase Setup
Sign up for Firebase and set up Firebase as per the Firebase setup instructions mentioned earlier.  

### 10. Android Studio Setup
Download and install Android Studio for Android emulator testing.

### 11. Expo Setup
Sign up for Expo and install Expo Go on your mobile devices for testing.

### 12. Expo Login
In the terminal, run **expo login** and go through the login process.
  
### 13. Start Development Server
For future uses, use **expo start** in the terminal to start the development server.



