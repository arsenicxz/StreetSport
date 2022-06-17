import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import NavigationBetweenGames from "./NavigationBetweenGames";
import BackButton from "./../uiElements/BackButton";

const GameScreen = ({ navigation, route }) => {
  const { name, time, location, countPeople, rating } = route.params;
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <ImageBackground
            source={require("../../assets/football.png")}
            resizeMode={"cover"}
            style={{ width: "100%", height: "100%" }}
          >
            <View style={styles.headerInfoWrap}>
              <View style={styles.header}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}
                >
                  {Platform.OS === "web" ? (
                    <Text>←</Text>
                  ) : (
                    <View style={{ height: 22, width: 22 }}>
                      <BackButton color="white" />
                    </View>
                  )}
                </TouchableOpacity>
                <Text style={[styles.headerText, styles.text]}>Игра </Text>
                <Text></Text>
              </View>
              <View style={styles.gameName}>
                <Text style={[styles.headerText, styles.text]}> {name} </Text>
                {rating ? (
                  <View style={styles.ratingContainer}>
                    <Text style={styles.ratingText}>На рейтинг</Text>
                  </View>
                ) : (
                  <View style={styles.freeContainer}>
                    <Text style={styles.ratingText}>Свободная</Text>
                  </View>
                )}
              </View>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.contentInfoWrap}>
          <View style={styles.contentInfo}>
            <Text style={styles.contentInfoH2}>Адрес</Text>
            <Text style={styles.contentInfoContent}>{location}</Text>
          </View>
          <View style={styles.contentInfo}>
            <Text style={styles.contentInfoH2}>Время</Text>
            <Text style={styles.contentInfoContent}>{time}</Text>
          </View>
          <View style={styles.contentInfo}>
            <Text style={styles.contentInfoH2}>Записались</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../../assets/icons/profile.png")}
                resizeMode={"cover"}
                style={{ width: 14, height: 14, marginRight: 5 }}
              />

              <Text style={styles.contentInfoContent}>{countPeople}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          paddingHorizontal: 14,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Найти</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f3f3f3",
    flex: 1,
  },
  text: {
    color: "white",
  },
  contentInfoWrap: {
    marginHorizontal: 14,
  },
  headerContainer: {
    height: 300,
    borderBottomWidth: 1,
    borderBottomColor: "#737373",
    justifyContent: "space-between",
  },
  headerInfoWrap: {
    justifyContent: "space-between",
    height: "100%",
    paddingHorizontal: 14,
  },
  header: {
    paddingBottom: 20,
    paddingTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontWeight: "700",
    fontSize: 18,
  },
  gameName: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 25,
    alignItems: "center",
  },
  ratingContainer: {
    backgroundColor: "#FF3D00",
    paddingHorizontal: 13,
    paddingVertical: 6,
    borderRadius: 55,
  },
  ratingText: {
    color: "white",
    fontSize: 10,
    textTransform: "uppercase",
  },
  freeContainer: {
    paddingHorizontal: 13,
    paddingVertical: 6,
    borderRadius: 55,
    borderWidth: 1,
    borderColor: "#737373",
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
  button: {
    width: "100%",
    height: 60,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
    backgroundColor: "#BF80FF",
    position: "absolute",
    bottom: 10,
    marginHorizontal: 14,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
});

export default GameScreen;
