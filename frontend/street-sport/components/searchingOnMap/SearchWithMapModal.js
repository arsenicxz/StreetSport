import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Marker } from "react-native-maps";
import MapView from "react-native-maps";
import Button from "../uiElements/Button";
import COLORS from "../../assets/colors";

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
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.1,
              shadowRadius: 20,
              elevation: 24,
            }}
          >
            {currentLocation.value != ""
              ? currentLocation.value
              : "Введите адрес"}
          </Text>
          <View style={{ flex: 1, flexDirection: "row" }}>
            {visibleConfirmButton && (
              <Button
                onPress={() => {
                  props.onConfirmButton(currentLocation);
                }}
                text="Подтвердить"
                color={COLORS.LIGHT_PURPLE}
                colorOnPress={COLORS.DARK_PURPLE}
              />
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
    width: "90%",
    position: "absolute",
    top: 30,
    zIndex: 2,
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

export default SearchWithMapModal;
