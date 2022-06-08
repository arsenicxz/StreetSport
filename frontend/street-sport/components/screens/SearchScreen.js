import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";

export const SearchScreen = (props) => {
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
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Найти</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f3f3f3",
    flex: 1,
    justifyContent: "center",
  },
  contentWrap: {
    marginHorizontal: 14,
  },
  button: {
    width: "100%",
    height: 60,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    backgroundColor: "#BF80FF",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
});
