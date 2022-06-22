import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
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
import Button from "../uiElements/Button";
import COLORS from "../../assets/colors";
import SearchWithMapModal from "../searchingOnMap/SearchWithMapModal";

export const CreateGameScreen = (props) => {
  const [latitudeState, setLatitude] = useState(37.425);
  const [longitudeState, setLongitude] = useState(-122.085);
  const [address, setAddress] = useState("");

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

          <Button
            text="Создать игру"
            color={COLORS.LIGHT_PURPLE}
            colorOnPress={COLORS.DARK_PURPLE}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};



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

