import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable, SafeAreaView, Image, TouchableOpacity  } from 'react-native';

export default function App() {
  const [emailValue, setEmailValue] = useState('');

  const emailInputHandler = (enteredtext) =>{
    setEmailValue(enteredtext);
  };

  const checkoutEmail = () =>{
    console.log(emailValue);
  }

  return (
    <SafeAreaView style={styles.container}>
      
       
        <Image source={require('./assets/logo.png')}
                resizeMode={'contain'}
                style={{height: 55, width: 160, marginBottom: 8}}/>
        <Text style={{fontSize: 12, fontWeight: '400', marginBottom: 34}}>Сервис для объединения {"\n"}
                                                        уличных спортсменов </Text>
        <Text style={{fontSize: 24, fontWeight: '700', marginBottom: 18}}>Вход</Text>
          
        
        <TextInput 
            style={styles.input}
            placeholder={"E-mail"}
            onChangeText={emailInputHandler}
            value={emailValue}
        />
        <TextInput 
            style={styles.input}
            placeholder={"Пароль"}
        />
        <TouchableOpacity
              style={styles.button}
              onPress={checkoutEmail}
        >
          <Text style={styles.buttonText}>Войти</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={{alignItems: 'center', marginTop: 10}}>
            <Text style={{color: '#A339B2', fontSize: 16}}>Зарегистрироваться</Text>
          </View>
        </TouchableOpacity>
        
        <StatusBar style="auto" />
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flex: 1,
    backgroundColor: '#f3f3f3',
    justifyContent: 'center',
    
  },
  logoBlock: {
    flex:1,
    justifyContent: 'flex-end',
  },
  authBlock: {
    flex: 1,
    alignItems: 'center',
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
  button:{
    width: "100%",
    height: 60,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    backgroundColor: '#BF80FF',
  },
  buttonText: {
    fontSize: 18, 
    fontWeight: '700', 
    color: '#fff'
  },
});
