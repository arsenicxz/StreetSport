import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import Button from "../uiElements/Button";
import COLORS from "../../assets/colors";
import { useDispatch } from "react-redux";
import * as authActions from "../../store/actions/auth";

export const Login = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const emailInputHandler = (enteredtext) => {
    setEmailValue(enteredtext);
  };

  const passwordInputHandler = (enteredtext) => {
    setPasswordValue(enteredtext);
  };

  const dispatch = useDispatch();
  const signUpHandler = async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(authActions.signin(emailValue, passwordValue));
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
    
  };

  useEffect(() => {
    if (error) {
      Alert.alert("Ошибка", error, [{ text: "Okay" }]);
    }
  }, [error]);

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
        <TextInput
          style={styles.input}
          placeholder={"E-mail или телефон"}
          autoCapitalize="none"
          autoComplete="email"
          placeholderTextColor="grey"
          onChangeText={emailInputHandler}
          value={emailValue}
        />
        <TextInput
          style={styles.input}
          placeholder={"Пароль"}
          autoCapitalize="none"
          autoComplete="password"
          secureTextEntry={true}
          placeholderTextColor="grey"
          onChangeText={passwordInputHandler}
          value={passwordValue}
        />
        <Button
          text="Войти"
          color={COLORS.LIGHT_PURPLE}
          colorOnPress={COLORS.DARK_PURPLE}
          onPress={signUpHandler}
          isLoading={isLoading}
          disabled={isLoading ? true : false}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Регистрация")}
          disabled={isLoading ? true : false}
        >
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
    paddingHorizontal: 14,
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
