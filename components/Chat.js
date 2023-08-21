import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const ChatScreen = ({ route, navigation }) => {
    const { name, backgroundColor } = route.params;

    useEffect(() => {
        navigation.setOptions({ title: name });
        navigation.setOptions({ headerStyle: { backgroundColor } });
    }, []);

    return (
        <View style={[styles.container, { backgroundColor }]} >
            <Text>Hello {name}!</Text>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ChatScreen;
