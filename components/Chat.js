// React and React Native imports
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Platform, KeyboardAvoidingView } from 'react-native';

// Gifted Chat imports for chat UI components
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";

// Firebase Firestore imports for database operations
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";

// AsyncStorage for caching messages
import AsyncStorage from "@react-native-async-storage/async-storage";

// MapView for rendering location messages
import MapView from 'react-native-maps';

// CustomActions for custom chat actions
import CustomActions from './CustomActions';

const Chat = ({ db, storage, route, navigation, isConnected }) => {
    const [messages, setMessages] = useState([]);
    const { name, backgroundColor, userID } = route.params;

    let unsubMessages;

    useEffect(() => {
        // Set the chat title and header background color.
        navigation.setOptions({ title: name });
        navigation.setOptions({ headerStyle: { backgroundColor } });

        if (isConnected === true) {
            // If connected to the internet, fetch and listen to new chat messages.
            if (unsubMessages) unsubMessages();
            unsubMessages = null;

            const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
            unsubMessages = onSnapshot(q, (docs) => {
                let newMessages = [];
                docs.forEach(doc => {
                    newMessages.push({
                        id: doc.id,
                        ...doc.data(),
                        createdAt: new Date(doc.data().createdAt.toMillis())
                    })
                })
                cacheMessages(newMessages);
                setMessages(newMessages);
            })
        } else {
            // If offline, load cached messages.
            loadCachedMessages();
        }

        return () => {
            // Unsubscribe from real-time updates when the component unmounts.
            if (unsubMessages) unsubMessages();
        }
    }, [isConnected]);

    const loadCachedMessages = async () => {
        // Load cached messages from AsyncStorage when offline.
        const cachedMessages = await AsyncStorage.getItem("messages") || [];
        setMessages(JSON.parse(cachedMessages));
    }

    const cacheMessages = async (messagesToCache) => {
        // Cache messages in AsyncStorage.
        try {
            await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
        } catch (error) {
            console.log(error.message);
        }
    }

    const onSend = (newMessages) => {
        // Send a new message to the chat.
        addDoc(collection(db, "messages"), newMessages[0])
    }

    const renderInputToolbar = (props) => {
        // Render the input toolbar if connected to the internet.
        if (isConnected === true) return <InputToolbar {...props} />;
        else return null;
    }

    const renderBubble = (props) => {
        // Customize the chat bubble styles.
        return <Bubble
            {...props}
            wrapperStyle={{
                right: {
                    backgroundColor: "#000"
                },
                left: {
                    backgroundColor: "#FFF"
                }
            }}
        />
    }

    const renderCustomActions = (props) => {
        // Render custom actions, such as sending images or location, in the chat.
        return <CustomActions userID={userID} storage={storage} {...props} />;
    };

    const renderCustomView = (props) => {
        // Render a custom view for location messages using MapView.
        const { currentMessage } = props;
        if (currentMessage.location) {
            return (
                <MapView
                    style={{
                        width: 150,
                        height: 100,
                        borderRadius: 13,
                        margin: 3
                    }}
                    region={{
                        latitude: currentMessage.location.latitude,
                        longitude: currentMessage.location.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
            );
        }
        return null;
    }

    return (
        <View style={[styles.container, { backgroundColor: backgroundColor }]}>
            <GiftedChat
                messages={messages}
                renderBubble={renderBubble}
                renderInputToolbar={renderInputToolbar}
                onSend={messages => onSend(messages)}
                renderActions={renderCustomActions}
                renderCustomView={renderCustomView}
                user={{
                    _id: userID,
                    name
                }}
            />
            {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default Chat;