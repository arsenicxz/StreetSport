import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import Button from "../uiElements/Button";
import COLORS from "../../assets/colors";
import { Colors } from "react-native/Libraries/NewAppScreen";

export const Login = (props) => {
  var reqResult;
  
  function reqReadyStateChange(request) {
    if (request.readyState == 4) {
        var status = request.status;
        if (status == 200) {
            console.log(request.responseText);
        }
    }
  }

  function req(value) {
    var request = new XMLHttpRequest();

    request.open("POST", "http://localhost:8001/loginhandler");
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.onreadystatechange = reqReadyStateChange(request);
    request.responseType = 'text';
    request.send(value);
    request.onload = function () {
      reqResult = request.response;
      console.log(reqResult);
    }
  }

  async function getResponse() {
    let response = await fetch(url, options);
    let content = await response.json();
    setSearchData(content.suggestions);
  }

  function LoginTry(){
    var reqLogInf = "mod=" + "CheckUserAuth" + "&login=krosh@mail.ru" + "&password=qwerty";
    console.log(reqLogInf);
    req(reqLogInf);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerWrap}>
        <Image
          source={require("../../assets/logo.png")}
          resizeMode={"contain"}
          style={{ height: 55, width: 160, marginBottom: 8 }}
        />
        <Text style={{ fontSize: 12, fontWeight: "400", marginBottom: 34 }}>
          Сервис для объединения {"\n"}
          уличных спортсменов{" "}
        </Text>
        <Text style={{ fontSize: 24, fontWeight: "700", marginBottom: 18 }}>
          Вход
        </Text>
        <TextInput style={styles.input} placeholder={"E-mail"} />
        <TextInput style={styles.input} placeholder={"Пароль"} />
        <Button
          text="Войти"
          color={COLORS.LIGHT_PURPLE}
          colorOnPress={COLORS.DARK_PURPLE}
          onPress={LoginTry}
        />
        <TouchableOpacity >
          <View style={{ alignItems: "center", marginTop: 10 }}>
            <Text style={{ color: "#A339B2", fontSize: 16 }}>
              Зарегистрироваться
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_GRAY,
    justifyContent: "center",
  },
  containerWrap: {
    marginHorizontal: 14,
  },
  logoBlock: {
    flex: 1,
    justifyContent: "flex-end",
  },
  authBlock: {
    flex: 1,
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.BORDER_GRAY,
    backgroundColor: "#F9F9F9",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
  },
});
