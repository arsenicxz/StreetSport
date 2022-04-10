
import { 
    StyleSheet, 
    Text, 
    View,  
    SafeAreaView, 
    Image, 
    ScrollView,
} from 'react-native';

export const CreateGameScreen = props => {
    return (
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Создание игры</Text>
          </View>
          <ScrollView>
            <View style={styles.contentInfoWrap}>
              <View style={styles.contentInfo}>
                <Text style={styles.contentInfoH2}>телефон</Text>
                <Text style={styles.contentInfoContent}>+7 (919) ••• •• ••</Text>
              </View>
              
              <View style={styles.contentInfo}>
                <Text style={styles.contentInfoH2}>почта</Text>
                <Text style={styles.contentInfoContent}>ki••••.••••@yandex.ru</Text>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      );
};

const styles = StyleSheet.create({
  container:{
    backgroundColor: '#f3f3f3',
    flex:1,
  },
    header: {
      paddingBottom: 20,
      paddingTop: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerText: {
      fontWeight: '700',
      fontSize: 18,
    },
    contentInfoWrap:{
      marginHorizontal: 14,
    },
    contentInfo:{
      marginTop: 20,
    },
    contentInfoH2:{
      color: '#656565',
      textTransform: 'uppercase',
      letterSpacing: 1.07,
      fontSize: 14,
      fontWeight: '700',
    },
    contentInfoContent:{
      fontSize: 20,
      fontWeight: '700',
    }
  });

