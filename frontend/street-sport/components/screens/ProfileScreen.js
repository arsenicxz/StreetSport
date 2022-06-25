import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import Switcher from "../uiElements/Switcher";
import * as ImagePicker from "expo-image-picker";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logout } from "../../store/actions/auth";

export const ProfileScreen = (props) => {
  const [image, setImage] = useState(null);

  const dispatch = useDispatch();

  const onLogout = async () =>{
    dispatch({
      type: "LOGOUT"
    })
    await AsyncStorage.removeItem("userData");
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }

  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.header}>
            <Text style={styles.headerText}>Профиль спортсмена</Text>
          </View> */}
      <ScrollView>
        <View style={styles.contentProfilePicNameWrap}>
          {image ? (
            <Image
              source={{ uri: image }}
              resizeMode={'cover'}
              style={styles.contentProfilePicImage}
            />
          ) : (
            <Image
              source={require("../../assets/user-avatar.jpg")}
              resizeMode={"contain"}
              style={styles.contentProfilePicImage}
            />
          )}

          <Text style={styles.contentProfileName}>Кирилл Тимофеев</Text>
        </View>
        <View style={styles.contentInfoWrap}>
          <View style={styles.contentInfo}>
            <Text style={styles.contentInfoH2}>телефон</Text>
            <Text style={styles.contentInfoContent}>+7 (919) ••• •• ••</Text>
          </View>

          <View style={styles.contentInfo}>
            <Text style={styles.contentInfoH2}>почта</Text>
            <Text style={styles.contentInfoContent}>ki••••.••••@yandex.ru</Text>
          </View>

          <View style={styles.contentInfo}>
            <Text style={styles.contentInfoH2}>геолокация</Text>
            <Switcher
              selectionMode={1}
              roundCorner={true}
              option1={"Включена"}
              option2={"Выключена"}
              //onSelectSwitch={onSelectSwitch}
              selectionColor={"#585858"}
            />
          </View>
        </View>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Button title="Pick an image from camera roll" onPress={pickImage} />
          <Button title="Log out" onPress={onLogout} />
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
  contentProfilePicNameWrap: {
    marginTop: 20,
    alignItems: "center",
  },
  contentProfilePicImage: {
    height: 165,
    width: 165,
    marginBottom: 20,
    borderRadius: 165,
  },
  contentProfileName: {
    fontWeight: "700",
    fontSize: 24,
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
  },
  contentInfoContent: {
    fontSize: 20,
    fontWeight: "700",
  },
});
