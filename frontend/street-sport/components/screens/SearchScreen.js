import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Button from "../uiElements/Button";
import COLORS from "../../assets/colors";
import MultiSelect from "react-native-multiple-select";
import DatePicker from "../uiElements/DatePicker";
import * as gamesActions from "../../store/actions/games";
import { useSelector, useDispatch } from "react-redux";

export const SearchScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const [modalGame, setModalGame] = useState(false);
  const [date, setDate] = useState(new Date());
  const [selected, setSelected] = useState([]);
  const onSelectedItemsChange = (selectedItems) => {
    setSelected(selectedItems);
  };

  const getCurrentDate = (e) => {
    setDate(e);
  };

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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentWrap}>
        <Image
          source={require("../../assets/logo.png")}
          resizeMode={"contain"}
          style={{ height: 55, width: 160, marginBottom: 8 }}
        />
        <Text style={{ fontSize: 12, fontWeight: "400", marginBottom: 34 }}>
          Сервис для объединения {"\n"}
          уличных спортсменов
        </Text>
        <DatePicker getDate={getCurrentDate} />
        <Text>{date.getDate()}</Text>
        <Text>{date.getMonth() + 1}</Text>
        <Text>{date.getUTCFullYear()}</Text>
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
                <View style={{height: 120, justifyContent: 'center', alignItems:'center'}}>
                  <ActivityIndicator size="large" color={COLORS.LIGHT_PURPLE} />
                </View>
              ) : (
                <View>
                  <MultiSelect
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
                    onPress={() => setModalGame(!modalGame)}
                  />
                </View>
              )}
            </View>
          </View>
        </Modal>

        <TouchableOpacity
          style={[
            styles.input,
            {
              borderColor:
                selected == "" ? COLORS.BORDER_GRAY : COLORS.LIGHT_PURPLE,
            },
          ]}
          onPress={() => {
            setModalGame(true);
            gamesButtonHandler();
          }}
        >
          <Text
            style={{
              color: selected == "" ? COLORS.ALMOST_BLACK : COLORS.LIGHT_PURPLE,
            }}
          >
            {selected == "" ? "Выберите игру..." : "Посмотреть выбранные игры"}
          </Text>
        </TouchableOpacity>

        <Button
          text="Найти"
          color={COLORS.LIGHT_PURPLE}
          colorOnPress={COLORS.DARK_PURPLE}
          onPress={() =>
            console.log(
              date.getDate(),
              date.getMonth() + 1,
              date.getUTCFullYear()
            )
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.BACKGROUND_GRAY,
    flex: 1,
    justifyContent: "center",
  },
  contentWrap: {
    marginHorizontal: 14,
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
