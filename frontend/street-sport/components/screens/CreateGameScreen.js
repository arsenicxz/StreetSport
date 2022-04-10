
import { 
    StyleSheet, 
    Text, 
    View,  
    SafeAreaView,
    TextInput, 
    Image, 
    ScrollView,
} from 'react-native';
import Switcher from '../uiElements/Switcher';

export const CreateGameScreen = props => {
    return (
        <SafeAreaView style={styles.container}>
          {/* <View style={styles.header}>
            <Text style={styles.headerText}>Создание игры</Text>
          </View> */}
          <ScrollView>
            <View style={styles.contentInfoWrap}>
              <View style={styles.contentInfo}>
                <Text style={styles.contentInfoH2}>когда играем</Text>
                <Text style={styles.contentInfoContent}>1.04.2022</Text>
              </View>
              
              <View style={styles.contentInfo}>
                <Text style={styles.contentInfoH2}>тип игры</Text>
                <Switcher
                    selectionMode={1}
                    roundCorner={true}
                    option1={'Свободная'}
                    option2={'Рейтинговая'}
                    //onSelectSwitch={onSelectSwitch}
                    selectionColor={'#585858'}
                />
              </View>

              <View style={styles.contentInfo}>
                <Text style={styles.contentInfoH2}>во что играем</Text>
                <TextInput 
                    style={styles.input}
                    placeholder={"Игра..."}
                />
                
              </View>

              <View style={styles.contentInfo}>
                <Text style={styles.contentInfoH2}>где играем</Text>
                <TextInput 
                    style={styles.input}
                    placeholder={"Введите адрес"}
                />
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
    },
    input: {
        width: "100%",
        height: 50,
        paddingHorizontal: 20,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#D1D1D1',
        backgroundColor: '#F9F9F9',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
      },
  });

