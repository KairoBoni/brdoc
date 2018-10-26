import React from 'react';
import {
  Text,
  View,
  TextInput,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import { stylesLogin } from '../styles/login_styles';
import { connect } from 'react-redux';
import {
  tryLogEmail,
  tryLogFB,
} from '../action/LoginAction'

const backGroundImage = "../../images/login.jpg"

class Login extends React.Component {
  state = {
    pass: "123456",
    usr: "a@a.com",
    loginEmail: false,
    loginFB: false,
    user: null,
  }

  login = async () => {
    const user = await this.props.login.user;
    if (user) {
      await this.setState({
        user: user,
      });
      this.props.navigation.navigate('SearchScreen', {user: this.state.user});
      console.log(user);
    }
  }
  
  componentWillReceiveProps = () => {
    this.setState({
      loginEmail: false,
      loginFB: false,
      user: null
    })
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
    return (
      <ImageBackground style={stylesLogin.conteiner} source={require(backGroundImage)}
        blurRadius={5}>
        <View style={stylesLogin.viewConteiner}>
          <Text style={stylesLogin.textTitle}>
            BRDOC
        </Text>
          <View style={{ width: "100%", alignItems: "center" }}>
            
            <TextInput
              style={stylesLogin.textInput}
              placeholderTextColor="white"
              placeholder= "E-mail"
              value={this.state.usr}
              onChangeText={(usr) => this.setState({usr})}
            />
            <TextInput
              style={stylesLogin.textInput}
              placeholder="Senha"
              placeholderTextColor="white"
              secureTextEntry
              value={this.state.pass}
              onChangeText={(pass) => this.setState({pass})}
            />
            <View style={stylesLogin.viewButton}>
              <TouchableOpacity style={stylesLogin.buttonLogin} onPress={this.handleLoginEmail}>
                <Text style={stylesLogin.textStyle}>
                  Entrar
              </Text>
              </TouchableOpacity>
              <TouchableOpacity style={stylesLogin.buttonLoginFb} onPress={this.handleLoginFB}>
                <Text style={stylesLogin.textStyleFb}>
                  f
              </Text>
              </TouchableOpacity>
            </View>
            <View style={stylesLogin.viewRegistry}>
              <TouchableOpacity>
                <Text style={stylesLogin.textRegistry} >
                  Esqueci a Senha
               </Text>
              </TouchableOpacity>
              <Text style={stylesLogin.textRegistry} > | </Text>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('RegisterScreen', {
                
              })}>
                <Text style={stylesLogin.textRegistry}>
                  Cadastro
              </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    );
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);