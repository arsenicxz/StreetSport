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
import * as COLORS from "../../assets/colors";

export const Login = (props) => {
  var reqResult;
  
  function reqReadyStateChange(request) {
    if (request.readyState == 4) {
        var status = request.status;
        if (status == 200) {
            //document.getElementById("output").innerHTML=request.responseText;
            console.log(request.responseText);
        }
    }
  }

  function req(value) {
    var request = new XMLHttpRequest();

    request.open("POST", "https://346b-5-144-118-128.eu.ngrok.io");
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
    var reqLogInf = "mod=" + "authorization" + "&login=" + "&password=";
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
    backgroundColor: "#f3f3f3",
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
    borderColor: "#D1D1D1",
    backgroundColor: "#F9F9F9",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
  },
});
