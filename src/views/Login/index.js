import React,{useState, useContext} from 'react';
import { Text, View, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Inputs from '../../components/inputs.js';
import InputsSenha from '../../components/inputsSenha.js';
import style from  './style';
import {Context} from '../../context/provider.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({navigation}) {

  const[user, setUser] = useState(null);
  const[senha, setSenha] = useState(null);
  const[display, setDisplay]= useState('none');
  const {setDados} = useContext(Context);
  //const{userId, setUserId} = useContext(Context);

  //envio do formulario de cadastro
  async function login(){

    let response = await fetch('http://192.168.0.15:3000/usuarios/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: user,
        senha: senha,
      })
    });
    let json = await response.json();

    //setUserId(json._id);
    
    if(json == 404){
      setDisplay("Usuário ou senha inválida!");
      setTimeout(() => {
          setDisplay('none')
      },3000);
    }else if(json == 422){
      setDisplay("Preencha todos os campos!");
      setTimeout(() => {
          setDisplay('none')
      },3000);
    }else{
      await AsyncStorage.setItem('userData', JSON.stringify(json));
      listarTarefa();
      navigation.navigate("MainPrincipal");
    }
    //setUserId(null)
  }
  // listar todas as tarefas
  async function listarTarefa(){
    let res = await AsyncStorage.getItem('userData');
    let user = JSON.parse(res);
    
    let response = await fetch('http://192.168.0.15:3000/tarefas/listarTodas', {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        user: user._id,
    })
    });
    let json = await response.json();
    setDados(json);
  }
  return (
   
      <KeyboardAvoidingView style={style.container}>
        <StatusBar style="light" />
        <LinearGradient colors={['#65ebbe','#4458be']}  style={style.background} />

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

        <SafeAreaView>
          <View style={style.view}>

            <Image style={style.logo} source={require('../../assets/logoBranca.png')} />
            {display && (
              <View   style={{top: 150, width:300, alignItems: "center", display:'flex'}}>
              <Text style={style.mensagem(display)}>{display}</Text>
              </View>
            )}
            <View style={{top: 180}}> 

              <Inputs place='Usuário' onChangeText={(text) => setUser(text)} > </Inputs>
              <InputsSenha place='Senha' onChangeText={(text) => setSenha(text)}> </InputsSenha>
            </View>

            <TouchableOpacity style={style.botao} onPress={() => login()}> 
              <Text style={style.textLogin} >LOGIN</Text> 
            </TouchableOpacity>
        
            <Text style={style.textEsqueceuSenha}>Esqueceu sua senha?</Text> 

            <Text 
              style={style.textCadastro} 
              onPress={() => navigation.navigate('Cadastro')}>Cadastre-se
            </Text> 
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
