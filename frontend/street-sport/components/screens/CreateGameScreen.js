import {useState} from 'react';
import { 
    StyleSheet, 
    Text,
    Button, 
    View,  
    SafeAreaView,
    TextInput, 
    Image, 
    ScrollView,
    FlatList,
    TouchableOpacity,
    Platform
} from 'react-native';
import {Marker} from 'react-native-maps';
import MapView from 'react-native-maps';
import Switcher from '../uiElements/Switcher';
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-datepicker';

export const CreateGameScreen = props => {
    const [searchValue, setSearchValue] = useState('');
    const [searchData, setSearchData] = useState([]);
    const [latitudeState, setLatitude] = useState(37.425);
    const [longitudeState, setLongitude] = useState(-122.085);



  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowDatePicker(Platform.OS == 'ios');
    setDate(currentDate);
  };

  const onChangeTime = (event, selectedTime) => {
    const currentDate = selectedTime;
    setShowTimePicker(Platform.OS == 'ios');
    setTime(currentDate);
  };

  const showDateMode = (currentMode) => {
    setShowDatePicker(true);
  };

  const showTimeMode = (currentMode) => {
    setShowTimePicker(true);
  };





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

                {Platform.OS != 'ios' && (
                  <View>
                  <TouchableOpacity style={styles.datePicker} onPress={() => showDateMode('date')}>
                    <Text style={styles.datePickerText}>{date.getDate()}</Text>
                    <Text style={styles.datePickerText}>{date.getMonth()}</Text>
                    <Text style={[styles.datePickerText, {flex: 3, borderRightWidth: 0}]}>{date.getFullYear()}</Text>
                  </TouchableOpacity>
                  </View>
                )}
                
               
                {(Platform.OS == 'ios' || showDatePicker) && (
                  <View style={{width: 110}}>
                  <DateTimePicker
                    display={Platform.OS == 'ios' ? 'compact' : 'default'}
                    
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    is24Hour={true}
                    onChange={onChange}
                  />
                  </View>
                  
                )}

              </View>
              
              <View style={styles.contentInfo}>
                <Text style={styles.contentInfoH2}>во сколько</Text>
                {Platform.OS != 'ios' && (
                  <View>
                  <TouchableOpacity style={styles.timePicker} onPress={() => showTimeMode('time')}>
                    <Text>{time.getHours()}:{time.getMinutes()}</Text>
                  </TouchableOpacity>
                  </View>
                )}

                {(Platform.OS == 'ios' || showTimePicker) && (
                  <View style={{width: 70}}>
                  <DateTimePicker
                    display={Platform.OS == 'ios' ? 'compact' : 'default'}
                    testID="timePicker"
                    value={time}
                    mode="time"
                    is24Hour={true}
                    onChange={onChangeTime}
                  />
                  </View>
                  
                )}
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
      marginBottom: 5,
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
      datePicker: {
        width: 150,
        flexDirection: 'row',
        height: 35,
        
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#D1D1D1',
        backgroundColor: '#F9F9F9',
        alignItems: 'center',
        justifyContent: 'space-between',
        
      },
      datePickerText: {
        height: '100%',
        flex: 2,
        textAlignVertical: 'center',
        textAlign: 'center',
        borderRightWidth: 1,
        borderColor: '#D1D1D1',

      },
      timePicker: {
        width: 90,
        flexDirection: 'row',
        height: 35,
        paddingHorizontal: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#D1D1D1',
        backgroundColor: '#F9F9F9',
        alignItems: 'center',
        justifyContent: 'center',
      }
      

  });

