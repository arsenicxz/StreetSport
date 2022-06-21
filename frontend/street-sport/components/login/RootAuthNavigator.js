import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from "./Login";
import { Registration } from "./Registartion";

const Stack = createNativeStackNavigator();

const RootAuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Вход" component={Login} />
      <Stack.Screen name="Регистрация" component={Registration} />
    </Stack.Navigator>
  );
};

export default RootAuthNavigator;
