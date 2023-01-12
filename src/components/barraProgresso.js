import React from "react";
import { StyleSheet, View } from "react-native";
import { ProgressBar } from 'react-native-paper';

export default function BarraProgresso(props){
    return(
        <ProgressBar progress={1} color={props.color} style={style.barra}/>
    )
}
const style = StyleSheet.create({
    barra:{
        width:330,
        left: 15,
        top:10
    }
})