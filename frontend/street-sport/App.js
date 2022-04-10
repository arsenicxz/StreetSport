
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Login } from './components/login/Login';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { CreateGameScreen } from './components/screens/CreateGameScreen';
import { SearchScreen } from './components/screens/SearchScreen';

export default function App() {
  return(
      <SearchScreen />
  )
}

const styles = StyleSheet.create({
  
});
