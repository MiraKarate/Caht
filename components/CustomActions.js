// React and React Native imports
import React from "react";
import { TouchableOpacity, View, Text, StyleSheet, Alert } from "react-native";

// Expo libraries for image and location handling
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

// Expo libraries for action sheet handling
import { useActionSheet } from '@expo/react-native-action-sheet';

// Firebase Storage imports for file storage
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const CustomActions = ({ wrapperStyle, iconTextStyle, storage, onSend, userID }) => {
    const actionSheet = useActionSheet();

    const onActionPress = () => {
        const options = ['Choose From Library', 'Take Picture', 'Send Location', 'Cancel'];
        const cancelButtonIndex = options.length - 1;
        actionSheet.showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
            },
            async (buttonIndex) => {
                switch (buttonIndex) {
                    case 0:
                        pickImage();
                        return;
                    case 1:
                        takePhoto()
                        return;
                    case 2:
                        getLocation();
                    default:
                }
            },
        );
    };

    // Function to request permission to access the user's media library and send images if permission is granted.
    const pickImage = async () => {
        let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissions?.granted) {
            let result = await ImagePicker.launchImageLibraryAsync();
            if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
            else Alert.alert("Permissions haven't been granted.");
        }
    }

    //Requests permission to use the devices camera and allow it to be added to the chat 
    const takePhoto = async () => {
        let permissions = await ImagePicker.requestCameraPermissionsAsync();
        if (permissions?.granted) {
            let result = await ImagePicker.launchCameraAsync();
            if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
            else Alert.alert("Permissions haven't been granted.");
        }
    }

    // Function to request permission to use the device's camera and send a photo if permission is granted.
    const getLocation = async () => {
        let permissions = await Location.requestForegroundPermissionsAsync();
        if (permissions?.granted) {
            const location = await Location.getCurrentPositionAsync({});
            if (location) {
                onSend({
                    location: {
                        longitude: location.coords.longitude,
                        latitude: location.coords.latitude,
                    },
                });
            } else Alert.alert("Error occurred while fetching location");
        } else Alert.alert("Permissions haven't been granted.");
    }

    // Function to generate a unique reference for an uploaded image.
    const generateReference = (uri) => {
        // this will get the file name from the uri
        const imageName = uri.split("/")[uri.split("/").length - 1];
        const timeStamp = (new Date()).getTime();
        return `${userID}-${timeStamp}-${imageName}`;
    }

    // Function to convert a file (image) to a blob.
    // XHR required as react native no longer supports the fetch() in the blob conversion

    const convertFileToBlob = async (uri) => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (error) {
                reject(new Error('XHR request failed'));
            };
            xhr.responseType = 'blob';

            xhr.open('GET', uri, true);
            xhr.send();
        });
    };

    //for both takePic and pickImage
    const uploadAndSendImage = async (imageURI) => {
        //to call the generateRef function on the uri
        const uniqueRefString = generateReference(imageURI);
        // location and name in storage
        const newUploadRef = ref(storage, uniqueRefString);
        //convert into blob (binary large object)
        const blob = await convertFileToBlob(imageURI);
        // upload it and get a url for download
        uploadBytes(newUploadRef, blob).then(async (snapshot) => {
            console.log('File uploaded sucessfully');
            const imageURL = await getDownloadURL(snapshot.ref);
            //using the image prop of msg obj, send image
            onSend({ image: imageURL });
        });
    };

    return (
        <TouchableOpacity style={styles.container} onPress={onActionPress}>
            <View style={[styles.wrapper, wrapperStyle]}>
                <Text style={[styles.iconText, iconTextStyle]}>+</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 26,
        height: 26,
        marginLeft: 10,
        marginBottom: 10,
    },
    wrapper: {
        borderRadius: 13,
        borderColor: '#b2b2b2',
        borderWidth: 2,
        flex: 1,
    },
    iconText: {
        color: '#b2b2b2',
        fontWeight: 'bold',
        fontSize: 16,
        backgroundColor: 'transparent',
        textAlign: 'center',
    },
});

export default CustomActions;