import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Button from "./Button";
import * as COLORS from "../../assets/colors";

const DatePicker = ({}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [prevDate, setPrevDate] = useState(new Date());

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const backToPreviousDate = () => {
    setDate(prevDate);
    setModalVisible(!modalVisible);
  };

  const showDateMode = (currentMode) => {
    setPrevDate(date);
    setShowDatePicker(true);
    setModalVisible(true);
  };

  return (
    <View>
      <View>
        <TouchableOpacity
          style={styles.datePicker}
          onPress={() => showDateMode("date")}
        >
          <View style={styles.datePickerTextContainer}>
            <Text style={styles.datePickerText}>{date.getDate()}</Text>
          </View>
          <View style={styles.datePickerTextContainer}>
            <Text style={styles.datePickerText}>{date.getMonth() + 1}</Text>
          </View>
          <View
            style={[
              styles.datePickerTextContainer,
              { flex: 3, borderRightWidth: 0 },
            ]}
          >
            <Text style={styles.datePickerText}>{date.getFullYear()}</Text>
          </View>
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
            <TouchableOpacity
              onPress={() => backToPreviousDate()}
              style={styles.centeredView}
            >
              <View style={styles.modalView}>
                <DateTimePicker
                  display="spinner"
                  style={{ width: "100%" }}
                  testID="dateTimePicker"
                  value={date}
                  textColor="#BF80FF"
                  mode="date"
                  is24Hour={true}
                  onChange={onChangeDate}
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
                  {/* <TouchableOpacity
                    style={[styles.button, { backgroundColor: "#BF80FF" }]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text
                      style={[
                        styles.buttonText,
                        { color: "white", fontWeight: "700" },
                      ]}
                    >
                      ОК
                    </Text>
                  </TouchableOpacity> */}
                  <View style={{ flex: 1, marginHorizontal: 10, }}>
                    <Button
                      text="Отменить"
                      color={COLORS.BACKGROUND_GRAY}
                      colorOnPress={COLORS.HIGHLIGHT_GRAY}
                      textColor={COLORS.BLACK}
                      onPress={()=>backToPreviousDate()}
                    />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </Modal>
        </View>
      )}

      {Platform.OS != "ios" && showDatePicker && (
        <View>
          <DateTimePicker
            display="default"
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={true}
            onChange={onChangeDate}
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
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

  datePicker: {
    width: 150,
    flexDirection: "row",
    height: 32,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D1D1D1",
    backgroundColor: "#F9F9F9",
  },
  datePickerTextContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderColor: "#D1D1D1",
  },
  datePickerText: {},
});

export default DatePicker;
