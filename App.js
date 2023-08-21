// import the screens
import StartScreen from './components/Start';
import ChatScreen from './components/Chat';

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
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
          name="ChatScreen"
          component={ChatScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

