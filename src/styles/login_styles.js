import { StyleSheet } from 'react-native';

export const stylesLogin = StyleSheet.create({
  conteiner: {
    height: "100%",
    width: "100%",

  },

  viewConteiner: {
    alignItems: "center",
    justifyContent: 'space-around',
    height: "80%",
  },

  viewButton: {
    width: "100%",
    justifyContent: "center",
    flexDirection: 'row',
    
  },


  textInput: {
    width: "75%",
    height: 60,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: "white",

    color: "white",
    fontSize: 20,
    textAlign: "center",
    margin: 4,
  },

  buttonLogin: {
    margin: 4,
    justifyContent: "center",
    width: "60%",
    height: 60,
    borderRadius: 100,
    backgroundColor: "#82E0AA",
    marginTop: 20,
  },

  buttonLoginFb: {
    margin: 4,
    justifyContent: "center",
    width: "15%",
    height: 60,
    borderRadius: 100,
    backgroundColor: "#3b5998",
    marginTop: 20,
  },

  textStyle: {
    margin: 4,
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },

  textTitle: {
    color: "white",
    fontSize: 30,
    fontStyle: "italic",
  },

  viewRegistry: {
    margin: 4,
    width: "60%",
    justifyContent: "space-around",
    flexDirection: 'row',
  },

  textRegistry: {
    margin: 4,
    color: "white",
    textAlign: "center",
  },

  textStyleFb: {
    margin: 4,
    color: "white",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold"
  }
});