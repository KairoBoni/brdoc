import { StyleSheet } from 'react-native';

export const stylesDoctor = StyleSheet.create({
  conteinerDoc: {
    flex: 1
  },


  status: {
    flexDirection: 'row',
    borderWidth: 1,
    flexWrap: 'wrap',
    borderRadius: 20,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,
    height: 200,
    justifyContent: 'space-around',
    height: 145,
  },

  cometarios: {
    borderWidth: 1,
    borderRadius: 20,
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    flex: 1,
  },

  statusText: {
    alignItems: "center",
    marginTop: 5,
    marginBottom: 5,
  },

  add: {
    borderRadius: 20,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,
    borderWidth: 1,
  },

  addCom: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },

  textCom: {
    width: 200,
  },

  textComentario: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    borderBottomWidth: 1,
  }

});