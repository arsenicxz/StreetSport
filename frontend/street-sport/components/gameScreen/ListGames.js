import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { FlatList, Platform } from "react-native";
import data from "./games.json";
import BackButton from "./../uiElements/BackButton";

const ListGames = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          {Platform.OS === "web" ? (
            <Text>←</Text>
          ) : (
            <View style={{ height: 22, width: 22 }}>
              <BackButton color="black" />
            </View>
          )}
          <Text style={[styles.headerText, styles.text]}>Поиск игры</Text>
          <View style={{ marginLeft: 22 }}></View>
        </View>
      </View>
      <View style={styles.contentInfoWrap}>
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.gameCard}
              onPress={() =>
                navigation.navigate("Карточка игры", {
                  name: item.name,
                  time: item.time,
                  location: item.location,
                  countPeople: item.countPeople,
                  rating: item.rating,
                })
              }
            >
              <View>
                <Image
                  source={require("../../assets/football.png")}
                  resizeMode={"cover"}
                  style={{ width: 90, height: "100%" }}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: "space-between",
                  paddingLeft: 16,
                  paddingTop: 8,
                  paddingBottom: 4,
                  paddingRight: 4,
                }}
              >
                <View style={styles.wrapHeaderGameCard}>
                  <Text style={styles.headerGameCard}>{item.name}</Text>
                  <Text style={styles.contentInfoContent}>{item.time}</Text>
                </View>
                <View style={styles.contentInfo}>
                  <Text style={styles.contentInfoContent}>{item.location}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      source={require("../../assets/icons/profile.png")}
                      resizeMode={"cover"}
                      style={{ width: 14, height: 14, marginRight: 5 }}
                    />
                    <Text style={styles.contentInfoContent}>
                      {item.countPeople}
                    </Text>
                  </View>
                  {item.rating ? (
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
            </TouchableOpacity>
          )}
        />
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
    color: "black",
  },
  contentInfoWrap: {
    marginHorizontal: 14,
  },
  headerContainer: {
    height: 100,
    justifyContent: "space-between",
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
  gameCard: {
    height: 120,
    width: "100%",
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#c4c4c4",
    marginVertical: 5,
    backgroundColor: "#fff",
    flexDirection: "row",
  },
  headerGameCard: {
    fontSize: 20,
    fontWeight: "700",
    color: "black",
  },
  wrapHeaderGameCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  contentInfo: {
    alignItems: "baseline",
  },
  contentInfoContent: {
    color: "black",
    fontSize: 14,
    fontWeight: "400",
  },
  ratingContainer: {
    backgroundColor: "#FF3D00",
    paddingHorizontal: 13,
    paddingVertical: 6,
    borderRadius: 55,
  },
  ratingText: {
    color: "black",
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
});

export default ListGames;
