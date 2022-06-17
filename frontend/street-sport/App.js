// import { useState , useEffect } from 'react';
// import MapView, { Marker } from 'react-native-maps';
// import { StyleSheet, Text, View, Dimensions,TextInput, TouchableOpacity, FlatList } from 'react-native';

// export default function App() {
//   const [searchValue, setSearchValue] = useState('');
//   const [searchData, setSearchData] = useState([]);
//   const [latitudeState, setLatitude] = useState(37.425);
//   const [longitudeState, setLongitude] = useState(-122.085);

//   const [visibleSearchList, setVisibleSearchList] = useState(false);

//   var url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
//   var token = "1b276ccfa98080a05a669e7b807851a75a2a0585";

//   var options = {
//     method: "POST",
//     mode: "cors",
//     headers: {
//         "Content-Type": "application/json",
//         "Accept": "application/json",
//         "Authorization": "Token " + token
//     },
//     body: JSON.stringify({query: searchValue})
//   };

//   async function getResponse(){
//     let response = await fetch(url, options);
//     let content = await response.json();
//     setSearchData(content.suggestions);
//   }

//   const searchInputHandler = (enteredtext) =>{
//     setSearchValue(enteredtext);
//   };

//   useEffect(() => {
//     if (searchValue.length > 0){
//       getResponse();
//     } else {
//       setSearchData([]);
//     }
//   }, [searchValue])

//   return (
//     <View style={styles.container}>
//       <View style={styles.searchInput}>
//         <TextInput
//             style={styles.input}
//             placeholder={"Найдётся многое..."}
//             onChangeText={searchInputHandler}
//             value={searchValue}
//             onPressIn={()=>{
//               setVisibleSearchList(true);
//             }}
//         />
//         <View>
//           {
//             visibleSearchList ? (
//             <FlatList
//             style={styles.searchContainer}
//             data={searchData}
//             keyExtractor={({id}, index) => id}
//             renderItem={({item}) => (
//               <TouchableOpacity style={styles.searchItems} onPress={() => {
//                 if(item.data.geo_lat != null && item.data.geo_lon != null){
//                   setLatitude(parseFloat(item.data.geo_lat));
//                   setLongitude(parseFloat( item.data.geo_lon));
//                   setSearchValue(item.value);
//                   setVisibleSearchList(false);
//                 }       }}>
//                 <Text>{item.value}</Text>
//               </TouchableOpacity>
//             )}
//           /> ) : (<View></View>)

//           }

//         </View>
//       </View>
//       <MapView
//         style={styles.map}
//         provider="google"
//         region={{
//           latitude: latitudeState,
//           longitude: longitudeState,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0481,
//         }}
//       >
//         <Marker
//           coordinate={{latitude: latitudeState, longitude: longitudeState}}
//           title='Here you go!'
//         >

//         </Marker>
//       </MapView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 50,
//   },
//   map: {
//     width: Dimensions.get('window').width,
//     height: Dimensions.get('window').height,
//   },
//   searchInput: {
//     // backgroundColor: 'white',
//     width: '90%',
//     position: 'absolute',
//     top:0,
//     zIndex: 1,
//     //alignItems: 'center',
//   },
//   input: {
//     fontSize: 16,
//     width: "100%",
//     height: 50,
//     paddingHorizontal: 20,
//     borderRadius: 14,
//     borderWidth: 1,
//     borderColor: '#D1D1D1',
//     backgroundColor: '#F9F9F9',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginVertical: 5,
//   },
//   searchContainer: {
//     maxHeight: 250,
//     backgroundColor: '#F9F9F9',
//     borderRadius: 14,
//     borderWidth: 1,
//     borderColor: '#D1D1D1',
//   },
//   searchItems: {
//     padding: 16,
//     fontSize: 16,
//     borderBottomWidth:1,
//     borderColor: '#D1D1D1',
//   },
// });

import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Login } from "./components/login/Login";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./components/navigation/Tabs";
import GameScreen from "./components/gameScreen/GameScreen";
import ListGames from "./components/gameScreen/ListGames";
import NavigationBetweenGames from "./components/gameScreen/NavigationBetweenGames";

export default function App() {
  return (
    <NavigationContainer>
      <NavigationBetweenGames />
    </NavigationContainer>

    // <Login />

    /*<NavigationContainer>
        <Tabs />
      </NavigationContainer>*/
  );
}

const styles = StyleSheet.create({});
