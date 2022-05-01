import {useState} from 'react';
import { 
    StyleSheet, 
    Text, 
    View,  
    SafeAreaView,
    TextInput, 
    Image, 
    ScrollView,
    FlatList,
    TouchableOpacity
} from 'react-native';
import {Marker} from 'react-native-maps';
import MapView from 'react-native-maps';
import Switcher from '../uiElements/Switcher';

export const CreateGameScreen = props => {
    const [searchValue, setSearchValue] = useState('');
    const [searchData, setSearchData] = useState([]);
    const [latitudeState, setLatitude] = useState(37.425);
    const [longitudeState, setLongitude] = useState(-122.085);

    const [visibleSearchList, setVisibleSearchList] = useState(false);

    var url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
    var token = "1b276ccfa98080a05a669e7b807851a75a2a0585";

    var options = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Token " + token
        },
        body: JSON.stringify({query: searchValue})
    };

    async function getResponse(){
        let response = await fetch(url, options);
        let content = await response.json();
        setSearchData(content.suggestions);
    }

    const searchInputHandler = (enteredtext) =>{
      setSearchValue(enteredtext);
      getResponse();
    };

    const SeacrhItem = ({props}) => {
      return (
        <TouchableOpacity 
          style={styles.searchItems} 
          onPress={() => {
            if(props.data.geo_lat != null && props.data.geo_lon != null){
              setLatitude(parseFloat(props.data.geo_lat));
              setLongitude(parseFloat( props.data.geo_lon));
              setSearchValue(props.value);
              setVisibleSearchList(false);
            }}}
        >
          <Text>{props.value}</Text>
      </TouchableOpacity>
      )
    }

    return (
        <SafeAreaView style={styles.container}>
          {/* <View style={styles.header}>
            <Text style={styles.headerText}>Создание игры</Text>
          </View> */}
          <ScrollView>
            <View style={styles.contentInfoWrap}>
              <View style={styles.contentInfo}>
                <Text style={styles.contentInfoH2}>когда играем</Text>
                <Text style={styles.contentInfoContent}>1.04.2022</Text>
              </View>
              
              <View style={styles.contentInfo}>
                <Text style={styles.contentInfoH2}>тип игры</Text>
                <Switcher
                    selectionMode={1}
                    roundCorner={true}
                    option1={'Свободная'}
                    option2={'Рейтинговая'}
                    //onSelectSwitch={onSelectSwitch}
                    selectionColor={'#585858'}
                />
              </View>

              <View style={styles.contentInfo}>
                <Text style={styles.contentInfoH2}>во что играем</Text>
                <TextInput 
                    style={styles.input}
                    placeholder={"Игра..."}
                />
                
              </View>

              <View style={styles.contentInfo}>
                <Text style={styles.contentInfoH2}>где играем</Text>
                <TextInput 
                    style={styles.input}
                    placeholder={"Введите адрес"}
                    onChangeText={searchInputHandler}
                    value={searchValue}
                    onPressIn={()=>{
                      setVisibleSearchList(true);
                    }}
                />
                <SafeAreaView>
                {
                    visibleSearchList ? (
                    <FlatList
                    style={styles.searchContainer}
                    data={searchData}
                    keyExtractor={({id}, index) => id}
                    renderItem={({item}) => (
                    <TouchableOpacity style={styles.searchItems} onPress={() => {
                        if(item.data.geo_lat != null && item.data.geo_lon != null){
                        setLatitude(parseFloat(item.data.geo_lat));
                        setLongitude(parseFloat( item.data.geo_lon));
                        setSearchValue(item.value);
                        setVisibleSearchList(false);
                        }       }}>
                        <Text>{item.value}</Text>
                    </TouchableOpacity>
                    )}
                /> ) : (<View></View>)

                }
                
                </SafeAreaView>
              </View>

              <View style={styles.contentInfo}>
                <Text style={styles.contentInfoH2}>на карте</Text>
                <View style={styles.mapInWindow}>
                  <MapView
                    style={styles.map} 
                    // provider="google"
                    region={{
                      latitude: latitudeState,
                      longitude: longitudeState,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0481, 
                    }}
                  >
                        <Marker
                          coordinate={{latitude: latitudeState, longitude: longitudeState}}
                          title='Here you go!'
                        >
                          
                        </Marker>
                  </MapView>
                </View>
              </View>

            </View>
          </ScrollView>
        </SafeAreaView>
      );
};

const styles = StyleSheet.create({
  container:{
    backgroundColor: '#f3f3f3',
    flex:1,
  },
    header: {
      paddingBottom: 20,
      paddingTop: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerText: {
      fontWeight: '700',
      fontSize: 18,
    },
    contentInfoWrap:{
      marginHorizontal: 14,
    },
    contentInfo:{
      marginTop: 20,
    },
    contentInfoH2:{
      color: '#656565',
      textTransform: 'uppercase',
      letterSpacing: 1.07,
      fontSize: 14,
      fontWeight: '700',
    },
    contentInfoContent:{
      fontSize: 20,
      fontWeight: '700',
    },
    input: {
        width: "100%",
        height: 50,
        paddingHorizontal: 20,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#D1D1D1',
        backgroundColor: '#F9F9F9',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
      },
      mapInWindow: {
        height: 350,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#D1D1D1',
        overflow: 'hidden',
      },
      map: {
        borderRadius: 14,
        width: "100%",
        height: "100%",
      },
      searchContainer: {
        maxHeight: 250,
        backgroundColor: '#F9F9F9',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#D1D1D1',
      },  
      searchItems: {
        padding: 16,
        fontSize: 16,
        borderBottomWidth:1,
        borderColor: '#D1D1D1',
      },
  });

