import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Login } from "./components/login/Login";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./components/navigation/Tabs";
import Header from "./components/uiElements/Header";
import { Provider, useSelector } from "react-redux";
import { store } from "./store/store";
import { Registration } from "./components/login/Registartion";
import RootAuthNavigator from "./components/login/RootAuthNavigator";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootAuthNavigator />
      </NavigationContainer>

      {/* <NavigationContainer>
          <Tabs />
        </NavigationContainer>   */}
    </Provider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
