
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Login } from './components/login/Login';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { CreateGameScreen } from './components/screens/CreateGameScreen';
import { SearchScreen } from './components/screens/SearchScreen';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './components/navigation/Tabs';

export default function App() {
  return(
      // <Login />

      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  
});
