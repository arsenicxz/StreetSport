// import * as React from 'react';
// import MapView, { Marker } from 'react-native-maps';
// import { StyleSheet, Text, View, Dimensions } from 'react-native';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <GooglePlacesAutocomplete
//       styles={{
//         container: {flex: 0, position:'absolute', width: '90%', zIndex:1, top: 0},
//         listView: {borderColor: 'white'}
//       }}
//         placeholder='Поиск...'
//         onPress={(data, details = null) => {
//           // 'details' is provided when fetchDetails = true
//           console.log(data, details);
//         }}
//         query={{
//           key: 'AIzaSyC42RT39RCL0V6WZsTDujr2f3ptN-AqUnk',
//           language: 'en',
//         }}
//       />
//       <MapView 
//         style={styles.map} 
//         provider="google"
//         initialRegion={{
//           latitude: 37.425,
//           longitude: -122.085,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0481, 
//         }}
//       >
//         {/* <Marker
//           coordinate={{latitude: 37.7825259, logtitude: -122.4351431}}
//           title='San-Francisco'
//         >
          
//         </Marker> */}
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
// });




import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Login } from './components/login/Login';
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
