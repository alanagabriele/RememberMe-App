import  React from 'react';
import { StyleSheet, View, TextInput} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Inputs(props){

    return(
        <View>
            <TextInput style={style.input} 
            placeholder={props.place}
            onChangeText={props.onChangeText} 
            placeholderTextColor="rgba(255, 255, 255, 0.68)"
            />
            <View style={style.icon}> 
                <Ionicons name="person" size={20} color="#fff"/>
            </View>
        </View>
    );

}
const style = StyleSheet.create({
    input: {
        width: 250,
        height: 50,
        marginBottom: 10,
        padding: 6,
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
        bottom: 45, 
        left:12, 
        width: 20
    }
});