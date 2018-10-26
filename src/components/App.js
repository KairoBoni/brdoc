import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from '../store/Store';

import { setCustomTextInput, setCustomText } from 'react-native-global-props';
import  AppStackNavigator from '../utils/router'

setCustomTextInput({
  underlineColorAndroid: '#0000',
});

setCustomText({
  style: {
    fontFamily: 'OpenSans',
  }
});

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppStackNavigator />
      </Provider>
    );
  }
}