import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from '../store/Store';
import Login from './Login'

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Login />
      </Provider>
    );
  }
}