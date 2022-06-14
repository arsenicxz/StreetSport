import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
} from "react-native";
import Button from "../uiElements/Button";
import * as COLORS from "../../assets/colors";

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
        <Button
          text="Найти"
          color={COLORS.LIGHT_PURPLE}
          colorOnPress={COLORS.DARK_PURPLE}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: (COLORS.BACKGROUND_GRAY),
    flex: 1,
    justifyContent: "center",
  },
  contentWrap: {
    marginHorizontal: 14,
  },
});
