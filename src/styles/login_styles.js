import { StyleSheet } from 'react-native';

export const stylesLogin = StyleSheet.create({
  base: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  logoImage: {
    width: 100,
    height: 100,
    borderRadius: 100
  },

  inputStyle: {
    width: 250
  },

  facebookButton: {
    color: 'white',
    padding: 20,
    fontSize: 30,
    width: 50,
    textAlign: 'center',
  }
});