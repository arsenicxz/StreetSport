import { View, Text, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import reactDom from 'react-dom';
import { CreateGameScreen } from '../screens/CreateGameScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { SearchScreen } from '../screens/SearchScreen';

const Tab = createBottomTabNavigator();

const Tabs = () =>{
    return(
        <Tab.Navigator
            screenOptions={{
                "tabBarShowLabel":false,
                "tabBarStyle":[
                    {
                        "position":"absolute",
                        "bottom": 0,
                        "borderRadius": 20,
                        "borderBottomLeftRadius":0,
                        "borderBottomRightRadius":0,
                        "height": 80,
                        "shadowColor":"white",
                        "shadowOpacity":0,
                        "borderWidth":0,
                    },
                    null
                ]
            }}
        >
            <Tab.Screen name="Поиск" component={SearchScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 82,
                        height: 64,
                        borderRadius: 16,
                        backgroundColor: focused ? '#e9e9e9' : '#fff'
                    }}>
                        <Image 
                            source={require('../../assets/icons/search.png')}
                            resizeMode="contain"
                            style={{
                                width: 20,
                                height: 20,
                                marginBottom: 6,
                            }}
                        />
                        <Text>Поиск</Text>
                    </View>
                )
            }} />
            <Tab.Screen name="Создать" component={CreateGameScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 82,
                        height: 64,
                        borderRadius: 16,
                        backgroundColor: focused ? '#e9e9e9' : '#fff'
                    }}>
                        <Image 
                            source={require('../../assets/icons/create.png')}
                            resizeMode="contain"
                            style={{
                                width: 20,
                                height: 20,
                                marginBottom: 6,
                            }}
                        />
                        <Text>Создать</Text>
                    </View>
                )
            }}/>
            <Tab.Screen name="Профиль" component={ProfileScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 82,
                        height: 64,
                        borderRadius: 16,
                        backgroundColor: focused ? '#e9e9e9' : '#fff'
                    }}>
                        <Image 
                            source={require('../../assets/icons/profile.png')}
                            resizeMode="contain"
                            style={{
                                width: 20,
                                height: 20,
                                marginBottom: 6,
                            }}
                        />
                        <Text>Профиль</Text>
                    </View>
                )
            }}/>
        </Tab.Navigator>
    )
}

export default Tabs;