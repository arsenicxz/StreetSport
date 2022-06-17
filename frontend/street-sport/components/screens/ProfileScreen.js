
import { 
    StyleSheet, 
    Text, 
    View,  
    SafeAreaView, 
    Image, 
    ScrollView,
} from 'react-native';
import Switcher from '../uiElements/Switcher';

export const ProfileScreen = props => {
    return (
        <SafeAreaView style={styles.container}>
          {/* <View style={styles.header}>
            <Text style={styles.headerText}>Профиль спортсмена</Text>
          </View> */}
          <ScrollView>
            <View style={styles.contentProfilePicNameWrap}>
              <Image source={require('../../assets/profilePhoto.jpg')}
                        resizeMode={'contain'}
                        style={styles.contentProfilePicImage}/>
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
                  option1={'Включена'}
                  option2={'Выключена'}
                  //onSelectSwitch={onSelectSwitch}
                  selectionColor={'#585858'}
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
    contentProfilePicNameWrap:{
      marginTop: 20,
      alignItems: 'center',
    },
    contentProfilePicImage:{
      height: 165, 
      width: 165, 
      marginBottom: 20, 
      borderRadius: 165,
    },
    contentProfileName:{
      fontWeight: '700',
      fontSize: 24,
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

