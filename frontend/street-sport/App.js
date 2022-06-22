import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Login } from './components/login/Login';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './components/navigation/Tabs';
import Header from './components/uiElements/Header';

export default function App() {
  return(
      // <View style={styles.screen}>
      //   <Header title='Hi!' />
      // </View>

      <Login />

      // <NavigationContainer>
      //   <Tabs />
      // </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  screen:{
    flex: 1
  }
});
