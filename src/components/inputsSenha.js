import  React,{useState} from 'react';
import { StyleSheet, View, TextInput, Pressable  } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function InputsSenha(props){

    return(
        <View>
            <TextInput style={style.input} 
            label="Password"
            secureTextEntry
            placeholder={props.place} 
            placeholderTextColor="rgba(255, 255, 255, 0.68)"
            onChangeText={props.onChangeText}
            />
            <View style={style.icon}> 
                <MaterialCommunityIcons name="account-lock" size={24} color="#fff" />
            </View>
        </View>
    );

}
const style = StyleSheet.create({
    input: {
        width: 250,
        height: 40,
        marginBottom: 10,
        padding: 6,
        bottom: 10,
        borderRadius: 5,
        fontSize: 12,
        letterSpacing: 2,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center', 
        borderBottomColor: "#fff",
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    icon:{
        bottom: 55,
        left:12,
        width: 25
    }
});