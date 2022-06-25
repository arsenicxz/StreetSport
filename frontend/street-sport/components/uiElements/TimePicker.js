import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Platform,
  Pressable
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Button from "./Button";
import COLORS from "../../assets/colors";


const TimePicker = ({}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [prevTime, setPrevTime] = useState(new Date());

  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime;
    setShowTimePicker(false);
    setTime(currentTime);
  };

  const backToPreviousTime = () => {
    setTime(prevTime);
    setModalVisible(!modalVisible);
  };

  const showDateMode = (currentMode) => {
    setPrevTime(time);
    setShowTimePicker(true);
    setModalVisible(true);
  };

  return (
    <View>
      <View>
        <TouchableOpacity
          style={styles.timePicker}
          onPress={() => showDateMode("date")}
        >
          <Text>{time.toLocaleTimeString().slice(0, -3)}</Text>
        </TouchableOpacity>
      </View>

      {Platform.OS == "ios" && (
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <Pressable
              onPress={() => backToPreviousTime()}
              style={styles.centeredView}
            >
              <View style={styles.modalView}>
                <DateTimePicker
                  display="spinner"
                  style={{ width: "100%" }}
                  testID="dateTimePicker"
                  textColor="#BF80FF"
                  value={time}
                  mode="time"
                  is24Hour={true}
                  onChange={onChangeTime}
                />
                <View style={styles.modalViewButtonsLayout}>
                  <View style={{ flex: 1, marginHorizontal: 10 }}>
                    <Button
                      text="ОК"
                      color={COLORS.LIGHT_PURPLE}
                      colorOnPress={COLORS.DARK_PURPLE}
                      onPress={()=>setModalVisible(!modalVisible)}
                    />
                  </View>
                  <View style={{ flex: 1, marginHorizontal: 10, }}>
                    <Button
                      text="Отменить"
                      color={COLORS.BACKGROUND_GRAY}
                      colorOnPress={COLORS.HIGHLIGHT_GRAY}
                      textColor={COLORS.BLACK}
                      onPress={()=>backToPreviousTime()}
                    />
                  </View>
                </View>
              </View>
            </Pressable>
          </Modal>
        </View>
      )}

      {Platform.OS != "ios" && showTimePicker && (
        <View>
          <DateTimePicker
            display="default"
            testID="dateTimePicker"
            value={time}
            mode="time"
            is24Hour={true}
            onChange={onChangeTime}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },

  modalView: {
    width: "95%",
    bottom: 25,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 5,
  },

  button: {
    flex: 1,
    marginHorizontal: 10,
    height: 60,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
  },

  buttonText: {
    fontSize: 18,
  },

  modalViewButtonsLayout: {
    flexDirection: "row-reverse",
  },
  timePicker: {
    width: 90,
    flexDirection: "row",
    height: 32,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D1D1D1",
    backgroundColor: "#F9F9F9",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TimePicker;
