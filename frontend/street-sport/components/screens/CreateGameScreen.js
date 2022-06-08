import { useState, useEffect } from "react";
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
  Dimensions,
  Modal,
} from "react-native";
import { Marker } from "react-native-maps";
import MapView from "react-native-maps";
import Switcher from "../uiElements/Switcher";
import DatePicker from "../uiElements/DatePicker";
import TimePicker from "../uiElements/TimePicker";
import { Picker } from "@react-native-picker/picker";

export const CreateGameScreen = (props) => {
  const [searchValue, setSearchValue] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [latitudeState, setLatitude] = useState(37.425);
  const [longitudeState, setLongitude] = useState(-122.085);

  const [address, setAddress] = useState("");

  const [selectedLanguage, setSelectedLanguage] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  const closeModalMap = () => {
    setModalVisible(false);
  };

  const [gettedAddress, setGettedAddress] = useState({
    data: {
      geo_lat: "37.425",
      geo_lon: "-122.085",
    },
    value: "",
  });

  const getAddressFromSearch = (props) => {
    setGettedAddress(props);
    setAddress(props.value);
    setLatitude(parseFloat(props.data.geo_lat));
    setLongitude(parseFloat(props.data.geo_lon));
    // console.log(gettedAddress);
    setModalVisible(false);
  };

  const [visibleSearchList, setVisibleSearchList] = useState(false);

  var url =
    "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
  var token = "1b276ccfa98080a05a669e7b807851a75a2a0585";

  var options = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Token " + token,
    },
    body: JSON.stringify({ query: searchValue }),
  };

  async function getResponse() {
    let response = await fetch(url, options);
    let content = await response.json();
    setSearchData(content.suggestions);
  }

  const searchInputHandler = (enteredtext) => {
    setSearchValue(enteredtext);
    getResponse();
  };

  const SeacrhItem = ({ props }) => {
    return (
      <TouchableOpacity
        style={styles.searchItems}
        onPress={() => {
          if (props.data.geo_lat != null && props.data.geo_lon != null) {
            setLatitude(parseFloat(props.data.geo_lat));
            setLongitude(parseFloat(props.data.geo_lon));
            setSearchValue(props.value);
            setVisibleSearchList(false);
          }
        }}
      >
        <Text>{props.value}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.header}>
            <Text style={styles.headerText}>Создание игры</Text>
          </View> */}
      <ScrollView>
        <View style={styles.contentInfoWrap}>
          <View style={styles.contentInfo}>
            <Text style={styles.contentInfoH2}>когда играем</Text>
            <DatePicker />
          </View>

          <View style={styles.contentInfo}>
            <Text style={styles.contentInfoH2}>во сколько</Text>
            <TimePicker />
          </View>

          <View style={styles.contentInfo}>
            <Text style={styles.contentInfoH2}>тип игры</Text>

            <Switcher
              selectionMode={1}
              roundCorner={true}
              option1={"Свободная"}
              option2={"Рейтинговая"}
              //onSelectSwitch={onSelectSwitch}
              selectionColor={"#585858"}
            />
          </View>

          <View style={styles.contentInfo}>
            <Text style={styles.contentInfoH2}>во что играем</Text>
            <TextInput style={styles.input} placeholder={"Игра..."} />
            {/* <Picker
                  selectedValue={selectedLanguage}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedLanguage(itemValue)
                  }>
                  <Picker.Item label="Футбол" value="java" />
                  <Picker.Item label="Баскетбол" value="js" />
                  <Picker.Item label="Волейбол" value="js" />
                  <Picker.Item label="Йога" value="js" />
                  <Picker.Item label="Хоккей" value="js" />
                  <Picker.Item label="Хоккей с мячом" value="js" />
                </Picker> */}
          </View>

          <View style={styles.contentInfo}>
            <Text style={styles.contentInfoH2}>где играем</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => {
                setModalVisible(true);
              }}
            >
              <TextInput
                style={{ color: "black", width: "100%" }}
                placeholder="Введите адрес..."
                value={address}
                editable={false}
              />
              {/* <Text style={{}}>{address != '' ? address : 'Введите адрес...'}</Text> */}
            </TouchableOpacity>

            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <SearchWithMapModal
                currentInfo={gettedAddress}
                onCloseButton={closeModalMap}
                onConfirmButton={getAddressFromSearch}
              />
            </Modal>

            <SafeAreaView>
              {visibleSearchList ? (
                <FlatList
                  style={styles.searchContainer}
                  data={searchData}
                  keyExtractor={({ id }, index) => id}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.searchItems}
                      onPress={() => {
                        if (
                          item.data.geo_lat != null &&
                          item.data.geo_lon != null
                        ) {
                          setLatitude(parseFloat(item.data.geo_lat));
                          setLongitude(parseFloat(item.data.geo_lon));
                          setSearchValue(item.value);
                          setVisibleSearchList(false);
                        }
                      }}
                    >
                      <Text>{item.value}</Text>
                    </TouchableOpacity>
                  )}
                />
              ) : (
                <View></View>
              )}
            </SafeAreaView>
          </View>

          <View style={styles.contentInfo}>
            <Text style={styles.contentInfoH2}>на карте</Text>
            <View style={styles.mapInWindow}>
              <MapView
                style={styles.map}
                provider="google"
                region={{
                  latitude: latitudeState,
                  longitude: longitudeState,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0481,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: latitudeState,
                    longitude: longitudeState,
                  }}
                  title="Here you go!"
                ></Marker>
              </MapView>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const SearchWithMapModal = (props) => {
  const [searchValue, setSearchValue] = useState(props.currentInfo.value);
  const [searchData, setSearchData] = useState([]);
  const [latitudeState, setLatitude] = useState(
    parseFloat(props.currentInfo.data.geo_lat)
  );
  const [longitudeState, setLongitude] = useState(
    parseFloat(props.currentInfo.data.geo_lon)
  );

  const [visibleSearchList, setVisibleSearchList] = useState(false);
  const [visibleConfirmButton, setVisibleConfirmButton] = useState(false);

  const [currentLocation, setCurrentLocation] = useState(props.currentInfo);

  var url =
    "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
  var token = "1b276ccfa98080a05a669e7b807851a75a2a0585";

  var options = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Token " + token,
    },
    body: JSON.stringify({ query: searchValue }),
  };

  async function getResponse() {
    let response = await fetch(url, options);
    let content = await response.json();
    setSearchData(content.suggestions);
  }

  const searchInputHandler = (enteredtext) => {
    setSearchValue(enteredtext);
  };

  useEffect(() => {
    if (searchValue.length > 0) {
      getResponse();
    } else {
      setSearchData([]);
    }
  }, [searchValue]);

  useEffect(() => {
    if (currentLocation.value != "") {
      // console.log(currentLocation);
      setVisibleConfirmButton(true);
    }
  }, [currentLocation]);

  return (
    <View style={stylesMap.container}>
      <View style={stylesMap.searchInput}>
        <View style={stylesMap.inputContainer}>
          <TouchableOpacity
            style={{
              width: 50,
              borderRightWidth: 1,
              borderColor: "#D1D1D1",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              visibleSearchList
                ? setVisibleSearchList(false)
                : props.onCloseButton();
            }}
          >
            <Text>✕</Text>
          </TouchableOpacity>
          <TextInput
            style={stylesMap.input}
            placeholder={"Введите адрес..."}
            onChangeText={searchInputHandler}
            value={searchValue}
            onPressIn={() => {
              setVisibleSearchList(true);
            }}
            onSubmitEditing={() => {
              if (
                searchData[0].data.geo_lat != null &&
                searchData[0].data.geo_lon != null
              ) {
                setLatitude(parseFloat(searchData[0].data.geo_lat));
                setLongitude(parseFloat(searchData[0].data.geo_lon));
                setCurrentLocation(searchData[0]);
                setVisibleSearchList(false);
              }
            }}
          />
        </View>
      </View>
      <MapView
        style={stylesMap.map}
        provider="google"
        region={{
          latitude: latitudeState,
          longitude: longitudeState,
          latitudeDelta: 0.1,
          longitudeDelta: 0.05,
        }}
      >
        <Marker
          coordinate={{ latitude: latitudeState, longitude: longitudeState }}
          title="Here you go!"
        ></Marker>
      </MapView>

      {/* <View style={{position:'absolute', backgroundColor: 'rgba(0,0,0,0.25)', width: '100%', height: '100%',}}>

          </View> */}

      {visibleSearchList ? (
        <View style={stylesMap.searchList}>
          <FlatList
            style={stylesMap.searchContainer}
            data={searchData}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={stylesMap.searchItems}
                onPress={() => {
                  if (item.data.geo_lat != null && item.data.geo_lon != null) {
                    setLatitude(parseFloat(item.data.geo_lat));
                    setLongitude(parseFloat(item.data.geo_lon));
                    setCurrentLocation(item);
                    setSearchValue(item.value);
                    setVisibleSearchList(false);
                  }
                }}
              >
                <Text>{item.value}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      ) : (
        <View style={stylesMap.buttonsLayout}>
          <Text
            style={{
              zIndex: 1,
              width: "100%",
              alignSelf: "center",
              justifyContent: "center",
              fontSize: 20,
              paddingHorizontal: 20,
              paddingVertical: 13,
              textAlign: "center",
              marginBottom: 10,
              backgroundColor: "#F9F9F9",
              borderRadius: 14,
            }}
          >
            {currentLocation.value != ""
              ? currentLocation.value
              : "Введите адрес"}
          </Text>
          <View style={{ flex: 1, flexDirection: "row" }}>
            {visibleConfirmButton && (
              <TouchableOpacity
                onPress={() => {
                  props.onConfirmButton(currentLocation);
                }}
                style={[
                  stylesMap.button,
                  { flex: 1, backgroundColor: "#BF80FF" },
                ]}
              >
                <Text
                  style={{ fontSize: 18, fontWeight: "700", color: "white" }}
                >
                  Подтвердить
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

const stylesMap = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonsLayout: {
    zIndex: 2,
    flexWrap: "wrap",
    position: "absolute",
    bottom: 0,
    paddingHorizontal: "5%",
    width: "100%",
    paddingBottom: 20,
  },
  button: {
    zIndex: 1,
    height: 60,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    backgroundColor: "#F3F3F3",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  searchInput: {
    // backgroundColor: 'white',
    width: "90%",
    position: "absolute",
    top: 30,
    zIndex: 2,
    //alignItems: 'center',
  },
  inputContainer: {
    flexDirection: "row",
    zIndex: 1,
    fontSize: 16,
    width: "100%",
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#D1D1D1",
    backgroundColor: "#F9F9F9",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
  },
  input: {
    flex: 1,
    textAlign: "left",
    paddingHorizontal: 10,
  },
  searchContainer: {
    // alignItems: 'center'
  },
  searchItems: {
    padding: 16,
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: "#D1D1D1",
  },
  searchList: {
    position: "absolute",
    paddingTop: 90,
    backgroundColor: "#F3F3F3",
    height: "100%",
    width: "100%",
    paddingHorizontal: "5%",
    zIndex: 1,
  },
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f3f3f3",
    flex: 1,
  },
  header: {
    paddingBottom: 20,
    paddingTop: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontWeight: "700",
    fontSize: 18,
  },
  contentInfoWrap: {
    marginHorizontal: 14,
  },
  contentInfo: {
    marginTop: 20,
  },
  contentInfoH2: {
    color: "#656565",
    textTransform: "uppercase",
    letterSpacing: 1.07,
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 5,
  },
  contentInfoContent: {
    fontSize: 20,
    fontWeight: "700",
  },
  input: {
    width: "100%",
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#D1D1D1",
    backgroundColor: "#F9F9F9",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
  },
  mapInWindow: {
    height: 350,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#D1D1D1",
    overflow: "hidden",
  },
  map: {
    borderRadius: 14,
    width: "100%",
    height: "100%",
  },
  searchContainer: {
    maxHeight: 250,
    backgroundColor: "#F9F9F9",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#D1D1D1",
  },
  searchItems: {
    padding: 16,
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: "#D1D1D1",
  },
});
