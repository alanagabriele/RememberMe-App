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
    padding: '18%',
    top: 130,
  },
  botao: {
    backgroundColor: '#fff',
    width: 250,
    borderRadius: 10,
    padding: 6,
    height: 40,
    top: 170 
  },
  textLogin: {
      color:'#508ebe', 
      fontSize:16, 
      textAlign: 'center', 
      letterSpacing: 2
  },
  textEsqueceuSenha: {
      color:'#fff', 
      fontSize:10, 
      textAlign: 'center', 
      letterSpacing: 2, 
      top: 180 
  },
  textCadastro: {
      color:'#fff', 
      fontSize:12, 
      textAlign: 'center', 
      letterSpacing: 2, 
      top: 220, 
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
  