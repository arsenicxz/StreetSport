import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListGames from "./ListGames";
import GameScreen from "./GameScreen";

const Stack = createNativeStackNavigator();

const NavigationBetweenGames = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Поиск игры" component={ListGames} />
      <Stack.Screen name="Карточка игры" component={GameScreen} />
    </Stack.Navigator>
  );
};
export default NavigationBetweenGames;
