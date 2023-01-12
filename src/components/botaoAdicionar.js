import React from "react";
import { StyleSheet, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function BotaoAdicionar(){
    return(

        <View style={style.circulo}>
            <LinearGradient colors={['#65ebbe','#4458be']} style={style.background}/>
            <Ionicons name="add-sharp" size={44} color="#fff"  />       
        </View>
    )
}
const style = StyleSheet.create({
    circulo:{
        width: 80,
        height: 80,
        borderRadius: 75,
        alignItems: 'center',
        justifyContent: 'center',
    },
    view:{
        alignItems: 'center',
        justifyContent: 'center',
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: 80,
        height: 80,
        borderRadius: 75,
    },
})

