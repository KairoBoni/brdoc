import React from 'react';
import { Text, View, TextInput, Button, Image } from 'react-native';
import { stylesConteiner } from '../styles/conteiner_styles';
import { stylesLogin } from '../styles/login_styles';
import Search from './Search';
import Register from './Register';
import { connect } from 'react-redux';
import { tryLogEmail, tryLogFB, registerPress } from '../action/LoginAction'

const logoSrc = "../../images/logo.jpg";

class Login extends React.Component {
  state = {
    pass: "",
    usr: "",
    loginEmail: false,
    loginFB: false,
    user: null,
    isAutenticate: false,
  }

  login = async () => {
    const user = await this.props.login.user;
    if (user) {
      this.setState({
        user: user,
        isAutenticate: true
      })
    }
  }

  handleTryLog = async () => {
    if (this.state.loginEmail) {
      await this.props.tryLogEmail(this.state.usr, this.state.pass);
    }
    if (this.state.loginFB) {
      await this.props.tryLogFB();
    }
    await this.login();
  }

  handleLoginEmail = async () => {
    await this.setState({
      loginEmail: true,
    })
    this.handleTryLog();
  }

  handleLoginFB = async () => {
    await this.setState({
      loginFB: true,
    })
    this.handleTryLog();
  }

  render() {
    if (this.state.isAutenticate) {
      return (<Search user={this.state.user} />);
    } else if (this.props.login.toRegister) {
      return (<Register />);
    } else {
      return (
        <View style={stylesConteiner.container}>
          <View style={stylesLogin.base}>
            <View>
              <Image
                source={require(logoSrc)}
                style={stylesLogin.logoImage} />
            </View>
            <View style={stylesLogin.user}>
              <Text>Usuário</Text>
              <TextInput
                value={this.state.usr}
                onChangeText={usr => {
                  this.setState({ usr })
                }}
                style={stylesLogin.inputStyle}
              ></TextInput>
              <Text>Senha</Text>
              <TextInput secureTextEntry={true}
                textContentType={'password'}
                value={this.state.pass}
                onChangeText={pass => this.setState({ pass })}
                style={stylesLogin.inputStyle}
              ></TextInput>
              <View>
                <View>
                  <Button
                    title={"Entrar"}
                    color="#1F7F25"
                    onPress={this.handleLoginEmail}
                  />
                </View>
                <View>
                  <Button
                    title={"Registrar"}
                    color="#1F7F25"
                    onPress={this.props.registerPress}
                  />
                </View>
              </View>
            </View>
            <Button
              title={"Entrar com Facebook"}
              onPress={this.handleLoginFB}
            />
          </View>
        </View>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.LoginReducer,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    tryLogEmail: (usr, pass) => {
      dispatch(tryLogEmail(usr, pass))
    },

    tryLogFB: () => {
      dispatch(tryLogFB())
    },

    registerPress: () => {
      dispatch(registerPress())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);