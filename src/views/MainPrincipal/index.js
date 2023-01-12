import React,{useState, useContext, useEffect} from "react";
import { View, Text, TouchableOpacity, FlatList, Modal, TextInput, RefreshControl} from "react-native";
import { RadioButton  } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import BarraProgresso from "../../components/barraProgresso";
import BotaoAdicionar from "../../components/botaoAdicionar";
import { SimpleLineIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import style from  './style';
import moment from 'moment';
import 'moment/locale/pt-br';
import {Context} from '../../context/provider';
import AsyncStorage from '@react-native-async-storage/async-storage';




moment().format();
moment.locale('pt-br');

var data1 = moment().format('MMM') + ', ' + moment().format('YYYY');   
var data2 = moment().format('dddd') + ', ' + moment().format('DD');  

export default function MainPrincipal({navigation}){
    const [modal1, setModal1] = useState(false);
    const [modal2, setModal2] = useState(false);
    const [modal3, setModal3] = useState(false);
    const [modalApagar, setModalApagar] = useState(false);
    const [checked, setChecked] = useState('');
    const[nomeTarefa, setNomeTarefa]= useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const {dados, setDados} = useContext(Context);
    //const{userId} = useContext(Context);
    const[user, setUser]= useState(null);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        listarTarefa();
        setTimeout(() => {
            setRefreshing(false)
        },1000);
    }, []);

    useEffect(()=>{
        async function getUser(){
            let res = await AsyncStorage.getItem('userData');
            let json = JSON.parse(res);
            setUser(json._id);
        }
        getUser();
    });
      
    //criar tarefa
    async function tarefa(){
        let res = await AsyncStorage.getItem('userData');
        let user = JSON.parse(res);

        await fetch('http://192.168.0.15:3000/tarefas/create', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: user._id,
            nomeTarefa: nomeTarefa,
            prioridade: checked,
        })
        });
        // let json = await response.json();
        listarTarefa();
        setNomeTarefa(null);
        setModal1(false);
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
            user: user,
        })
        });
        let json = await response.json();
        setDados(json);
    }
    // listar  as tarefas por prioridade - baixa
    async function listarTarefaBaixa(){
        let res = await AsyncStorage.getItem('userData');
        let user = JSON.parse(res);
        let response = await fetch('http://192.168.0.15:3000/tarefas/listarPrioridade', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: user._id,
            prioridade: "baixa"
        })
        });
        let json = await response.json();
        setDados(json);
        navigation.navigate('MainPrioridadeBaixa');
    }
    // listar  as tarefas por prioridade - media
    async function listarTarefaMedia(){
        let res = await AsyncStorage.getItem('userData');
        let user = JSON.parse(res);
        let response = await fetch('http://192.168.0.15:3000/tarefas/listarPrioridade', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: user._id,
            prioridade: "media"
        })
        });
        let json = await response.json();
        setDados(json);
        navigation.navigate('MainPrioridadeMedia');
    }
    // listar  as tarefas por prioridade - alta
    async function listarTarefaAlta(){
        let res = await AsyncStorage.getItem('userData');
        let user = JSON.parse(res);
        let response = await fetch('http://192.168.0.15:3000/tarefas/listarPrioridade', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: user._id,
            prioridade: "alta"
        })
        });
        let json = await response.json();
        setDados(json);
        navigation.navigate('MainPrioridadeAlta');
    }
  //deletar todas as tarefas
  async function deletarTarefas(){
    let res = await AsyncStorage.getItem('userData');
        let user = JSON.parse(res);
    await fetch('http://192.168.0.15:3000/tarefas/deletarTudo', {
    method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: user._id,
      })
    }); 
    listarTarefa();
    setModalApagar(false)
  }
  function modal(){
    setModal2(false);
    setModal3(true);
  }

return(
        <SafeAreaView style={style.container}>
            <LinearGradient colors={['#4458be', '#65ebbe']} style={style.background}/>

            <View>      
                <View style={style.view}>
                    <Text style={style.data1}>{data1[0].toUpperCase() + data1.substr(1)}</Text>
                    <Text style={style.data2}>{data2[0].toUpperCase() + data2.substr(1)}</Text>

                    <View style={style.view1} > 
                        <TouchableOpacity onPress={() => setModalApagar(true)} >    
                                <MaterialIcons name="delete" size={32} color="#4771b3" />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{right: 30, top:2}}>    
                                <SimpleLineIcons name="logout" size={26} color="#4771b3" />
                            </TouchableOpacity>
                    </View>

                    <BarraProgresso color={'#4771b3'}></BarraProgresso>

                    
                    <TouchableOpacity style={style.botaoAdicionar} onPress={() => setModal1(true)} >
                        <BotaoAdicionar></BotaoAdicionar>
                    </TouchableOpacity>
                    
                    <View style={style.flatList} >
                        <FlatList 
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                        data={dados}
                        renderItem={({item}) => (
                            <TouchableOpacity style={style.viewList} onLongPress={() => setModal2(true)}>
                                <Text style={style.textList} icon={'start'}>{item.nomeTarefa} </Text>
                            </TouchableOpacity> 
                        )}
                    />
                    </View>
                    
                    
   
                </View>

                <View style={style.menu}>
                    <View style={style.menuBranco}></View>
                    <TouchableOpacity  onPress={() => listarTarefaBaixa()}>
                        <View style={style.menuVerde}></View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => listarTarefaMedia()}>
                        <View style={style.menuLaranja} ></View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => listarTarefaAlta()}>
                        <View style={style.menuVermelho} ></View>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Modais */}

            {/* Modal Apagar */ }
            <Modal animationType="fade" transparent={true} visible={modalApagar}>
                <View style={style.modal}>
                    <View style={style.modalApagar}>
                        <TouchableOpacity onPress={() => setModalApagar(false)} style={{ width:25}}>    
                            <Ionicons name="md-close-outline" size={30} color={'#fff'} />    
                        </TouchableOpacity>
                        <Text style={style.texto}>Deseja apagar todas as tarefas?</Text>
                    <View style={style.botoes}>
                        <TouchableOpacity onPress={() => deletarTarefas()} style={style.botaoSim}> 
                            <Text style={style.textBotao}>Sim</Text>   
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setModalApagar(false)} style={style.botaoNao}> 
                            <Text style={style.textBotao}>Não</Text>   
                        </TouchableOpacity>
                    </View>
                    </View>
                </View>
            </Modal>

            {/* Modal Adicionar nova tarefa */}
            <Modal animationType="fade" transparent={true} visible={modal1} >
                <View style={style.modal}>
                    <View style={style.modal1View}>
                        <TouchableOpacity onPress={() => setModal1(false)} style={{ width:25 }}>    
                            <Ionicons name="md-close-outline" size={30} color={'white'} />    
                        </TouchableOpacity>

                        <Text style={style.textModal1}>Nova tarefa</Text>
                        <TextInput  style={style.inputModal} placeholder='Nome' placeholderTextColor="#fff" onChangeText={(text) => setNomeTarefa(text)}/>

                        <RadioButton.Group  onValueChange={value => setChecked(value)} value={checked} >
                            <RadioButton.Item label="Prioridade alta" value="alta" labelStyle={{color:"#ffafaf", fontWeight:'500', right:50}} position={"leading"} mode={'android'} color={"white"} uncheckedColor={"white"}/>
                            <RadioButton.Item label="Prioridade média" value="media" labelStyle={{color:"#ffe3a0", fontWeight:'500', right:30}} position={"leading"} mode={'android'} color={"white"} uncheckedColor={"white"}/>
                            <RadioButton.Item label="Prioridade baixa" value="baixa" labelStyle={{color:"#d3e992", fontWeight:'500', right:40}} position={"leading"} mode={'android'} color={"white"} uncheckedColor={"white"}/>
                        </RadioButton.Group>
                            
                        
                        <TouchableOpacity onPress={() => tarefa()} style={style.botaoAdicionarModal}>
                            <Text style={style.textBotaoAdicionarModal}>Adicionar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Modal quando pressiona uma tarefa */}
            <Modal animationType="fade" transparent={true} visible={modal2}>
                <View style={style.modal}>
                    <View style={style.modal2View}>
                        <TouchableOpacity onPress={() => setModal2(false)} style={{ right:110}}>    
                            <Ionicons name="md-close-outline" size={30} color={'#4771b3'} />    

                        </TouchableOpacity>
                        <Text style={style.textModal2}>Tarefa</Text>

                        <TouchableOpacity style={style.botaoRenomear} onPress={() => modal()}>
                            <Text style={style.textRenomear}>Renomear</Text>
                        </TouchableOpacity>

                            <TouchableOpacity style={style.botaoApagar}>
                            <Text style={style.textApagar}>Apagar</Text>

                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Modal renomear uma tarefa */}
            <Modal animationType="fade" transparent={true} visible={modal3}>
                <View style={style.modal}>
                    <View style={style.modal2View}>
                        <TouchableOpacity onPress={() => setModal3(false)} style={{ right:110}}>    
                            <Ionicons name="md-close-outline" size={30} color={'#4771b3'} />
                        </TouchableOpacity>
                        <Text style={style.textModal2}>Tarefa</Text>

                        <TextInput  style={style.inputModalRenomear} defaultValue={"Teste"} onChangeText={(text) => setNomeTarefa(text)}/>

                        <TouchableOpacity style={style.botaoRenomear}>
                            <Text style={style.textRenomear}>Renomear</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}
