import { StyleSheet } from 'react-native';

export const stylesRegister = StyleSheet.create({
    conteiner: {
        height: "100%",
        width: "100%",
      },

      textInput: {
        width: "75%",
        height: 60,
        borderWidth: 1,
        borderRadius: 100,
        borderColor: "white",
        textAlign: "center",
        color: "white",
        fontSize: 20,
        textAlign: "center",
        margin: 4,
      },

      backButton: {
        width: "20%",
        backgroundColor: "rgba(46,100,254,0.3)",
        margin: 25,
        borderRadius: 100
      },
      textTitle: {
        color: "white",
        fontSize: 30,
        fontStyle: "italic",
      },

      buttonRegister: {
        margin: 4,
        justifyContent: "center",
        width: "60%",
        height: 60,
        borderRadius: 100,
        backgroundColor: "rgba(46,100,254,1)",
        marginTop: 20,
      },

      textStyle: {
        margin: 4,
        color: "white",
        fontSize: 20,
        textAlign: "center",
      },

      viewConteiner: {
        width: "100%", 
        alignItems:"center",
        justifyContent: 'space-evenly',
        height: "75%"
      }
    
});