//Import
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Platform, KeyboardAvoidingView, Alert } from 'react-native';
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import { addDoc, collection, onSnapshot, query, orderBy } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";


const ChatScreen = ({ route, navigation, db, isConnected, }) => {
    const { name, backgroundColor, userID } = route.params;
    const [messages, setMessages] = useState([]);

    let unsubMessages;

    useEffect(() => {
        if (isConnected === true) {
            if (unsubMessages) unsubMessages()
            unsubMessages = null
            const q = query(collection(db, "messages"), orderBy("createdAt", "desc"))
            unsubMessages = onSnapshot(q, (documentsSnapshot) => {
                let newMessages = [];
                documentsSnapshot.forEach((doc) => {
                    newMessages.push({
                        id: doc.id,
                        ...doc.data(),
                        createdAt: new Date(doc.data().createdAt.toMillis())
                    })
                })
                cachedMessages(newMessages)
                setMessages(newMessages)
            })
        } else loadCachedMessages();
        return () => {
            if (unsubMessages) unsubMessages()
        }
    }, [isConnected])

    const loadCachedMessages = async () => {
        const cachedMessages = (await AsyncStorage.getItem('messages')) || []
        setMessages(JSON.parse(cachedMessages))
    }


    const cachedMessages = async (messagesToCache) => {
        try {
            await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache))
        } catch (error) {
            console.log(error.message)
        }
    }

    //Render and input bar or a text depending on the network status
    const renderInputToolbar = (props) => {
        if (isConnected) return <InputToolbar {...props} />;
        else return null;
    }

    //Add new messages to the existing messages
    const onSend = (newMessages) => {
        addDoc(collection(db, "messages"), newMessages[0])
    }


    const renderBubble = (props) => {
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

    useEffect(() => {
        navigation.setOptions({ title: name }); //Setting the title to 'name'
        navigation.setOptions({ headerStyle: { backgroundColor } }); //Setting the title backgroundcolor
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: backgroundColor }]}>
            <GiftedChat
                messages={messages}
                renderBubble={renderBubble}
                renderInputToolbar={renderInputToolbar}
                onSend={messages => onSend(messages)}
                user={{
                    _id: userID,
                    name: name
                }}
            />
            {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
            {Platform.OS === 'ios' ? <KeyboardAvoidingView behavior="padding" /> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default ChatScreen;