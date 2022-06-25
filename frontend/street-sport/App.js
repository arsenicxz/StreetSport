import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Login } from "./components/login/Login";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./components/navigation/Tabs";
import Header from "./components/uiElements/Header";
import { Provider, useSelector, useDispatch } from "react-redux";
import { store } from "./store/store";
import { Registration } from "./components/login/Registartion";
import RootAuthNavigator from "./components/login/RootAuthNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { SIGNIN } from "./store/actions/auth";



const Root = () => {
  const dispatch = useDispatch();
  let userID = useSelector((state) => state.auth.userID);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      const transformedData = JSON.parse(userData);
      console.log(transformedData);
      if(transformedData == null){
        setIsLoading(false);
        setData(null);
      }else{
        dispatch({type:SIGNIN, userID:transformedData.userID, username: transformedData.userID, login: transformedData.userID});
        setData(transformedData);
      }
      console.log("data:", data);
      setIsLoading(false);
      
    };

    tryLogin();
  }, []);

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      const transformedData = JSON.parse(userData);
      if(transformedData == null){
        setData(null);
      }else{
        setData(transformedData);
      }
      console.log(data);
      setIsLoading(false);
      
    };

    tryLogin();
  }, [userID]);

  
  return (
    <NavigationContainer>
      {isLoading ? (
        <View style={styles.screen}>
          <ActivityIndicator size='small' />
        </View>
      ) : data === null ? (
        <RootAuthNavigator />
      ) : (
        <Tabs />
      )}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <Root />
      {/* <NavigationContainer>
          <Tabs />
        </NavigationContainer>   */}
    </Provider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
