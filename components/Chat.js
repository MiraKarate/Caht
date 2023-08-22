import React, { useState, useEffect } from "react";
import { StyleSheet, View, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat } from "react-native-gifted-chat";

const ChatScreen = ({ route, navigation }) => {
    const { name, backgroundColor } = route.params;
    const [messages, setMessages] = useState([]);

    const onSend = (newMessages) => {
        setMessages(previousMessages =>
            GiftedChat.append(previousMessages, newMessages)
        );
    };

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: "Hello developer",
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: "React Native",
                    avatar: "https://placeimg.com/140/140/any",
                },
            },
            {
                _id: 2,
                text: 'This is a system message',
                createdAt: new Date(),
                system: true,
            },
        ]);
    }, []);

    useEffect(() => {
        navigation.setOptions({ title: name });
        navigation.setOptions({ headerStyle: { backgroundColor } });
    }, []);

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
                keyboardVerticalOffset={
                    Platform.OS === "ios" ? 0 : 25 // Adjust this value as needed
                }
            >
                <GiftedChat
                    messages={messages}
                    onSend={messages => onSend(messages)}
                    user={{
                        _id: 1,
                    }}
                />
            </KeyboardAvoidingView>
            {Platform.OS === "ios" ? <KeyboardAvoidingView behavior="padding" /> : null}
            {Platform.OS === "android" ? <KeyboardAvoidingView behavior="height" /> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default ChatScreen;