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
  KeyboardAvoidingView,
  ActivityIndicator
} from "react-native";
import { Marker } from "react-native-maps";
import MapView from "react-native-maps";
import Switcher from "../uiElements/Switcher";
import DatePicker from "../uiElements/DatePicker";
import TimePicker from "../uiElements/TimePicker";
import Button from "../uiElements/Button";
import COLORS from "../../assets/colors";
import SearchWithMapModal from "../searchingOnMap/SearchWithMapModal";
import MultiSelect from "react-native-multiple-select";
import * as gamesActions from "../../store/actions/games";
import { useSelector, useDispatch } from "react-redux";

export const CreateGameScreen = (props) => {
  const [latitudeState, setLatitude] = useState(37.425);
  const [longitudeState, setLongitude] = useState(-122.085);
  const [address, setAddress] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const [modalGame, setModalGame] = useState(false);

  const [selected, setSelected] = useState([]);
  const onSelectedItemsChange = (selectedItems) => {
    setSelected(selectedItems);
  };

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

  //для поля "во что играем"
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const dispatch = useDispatch();
  const gamesButtonHandler = async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(gamesActions.getgames());
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  const games = useSelector((state) => state.games.games);
  //-------------------------

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

            <Modal
              animationType="fade"
              transparent={true}
              visible={modalGame}
              onRequestClose={() => {
                setModalVisible(!modalGame);
              }}
            >
              <View
                style={{
                  flex: 1,
                  backgroundColor: "rgba(0,0,0,0.4)",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <View style={styles.modalView}>
                  {isLoading ? (
                    <View
                      style={{
                        height: 120,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <ActivityIndicator
                        size="large"
                        color={COLORS.LIGHT_PURPLE}
                      />
                    </View>
                  ) : (
                    <View>
                      <MultiSelect
                        single
                        items={games}
                        uniqueKey="gametypeid"
                        displayKey="gametypename"
                        onSelectedItemsChange={onSelectedItemsChange}
                        selectedItems={selected}
                        selectText="Выберите игры"
                        searchInputPlaceholderText="Поиск..."
                        onChangeInput={(text) => console.log(text)}
                        tagRemoveIconColor="#BF80FF"
                        tagBorderColor="#BF80FF"
                        tagTextColor="#BF80FF"
                        itemTextColor="#000"
                        searchInputStyle={{ color: "#CCC" }}
                        submitButtonColor="#BF80FF"
                        submitButtonText="Подтвердить"
                        selectedItemTextColor="#BF80FF"
                        selectedItemIconColor="#BF80FF"
                        styleTextDropdown={{ paddingLeft: 20 }}
                        styleTextDropdownSelected={{ paddingLeft: 20 }}
                        styleMainWrapper={{
                          borderRadius: 10,
                          borderWidth: 1,
                          borderColor: COLORS.BORDER_GRAY,
                          overflow: "hidden",
                        }}
                        styleItemsContainer={{ height: 250 }}
                        //styleSelectorContainer={{}}
                      />
                      <Button
                        text="Закрыть окно изменений"
                        color={COLORS.BACKGROUND_GRAY}
                        colorOnPress={COLORS.ALMOST_BLACK}
                        textColor={COLORS.BLACK}
                        onPress={() => {
                          setModalGame(!modalGame);
                          
                        }}
                      />
                    </View>
                  )}
                </View>
              </View>
            </Modal>

            <TouchableOpacity
              style={styles.input}
              onPress={() => {setModalGame(true);gamesButtonHandler()}}
            >
              <Text style={{ color: COLORS.ALMOST_BLACK }} numberOfLines={1}>
                {selected == ""
                  ? "Выберите игру..."
                  : "Изменить выбранное: " +
                    games.find((el) => el.gametypeid == selected).gametypename}
              </Text>
            </TouchableOpacity>
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
    alignItems: "flex-start",
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
  modalView: {
    width: "95%",
    bottom: 25,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 5,
  },
});
