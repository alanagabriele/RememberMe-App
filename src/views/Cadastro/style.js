import {StyleSheet} from 'react-native';

export default StyleSheet.create({    
    container: {
        flex: 1
    },
    view: {
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    logo: {
        padding: '15%',
        top: 120,
    },
    input: {
        width: 250,
        height: 50,
        marginBottom: 10,
        padding: 6,
        bottom: 20,
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
        bottom: 65, 
        left:12, 
        width: 20
    },
    botao: {
        backgroundColor: '#fff',
        width: 250,
        borderRadius: 10,
        padding: 6,
        height: 40,
        top: 110 
    },
    textCadastrar: {
        color:'#508ebe', 
        fontSize:16, 
        textAlign: 'center', 
        letterSpacing: 2
    },
    textEntrar: {
        color:'#fff', 
        fontSize:12, 
        textAlign: 'center', 
        letterSpacing: 2, 
        top: 130 , 
        textDecorationLine: 'underline'
    },
    mensagem:(text='none') =>({
        color: "red",
        fontSize: 14,
        marginTop: 10,
        marginBottom: 15,
        display: text
      })
});      