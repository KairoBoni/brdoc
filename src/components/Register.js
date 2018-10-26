import React from 'react';
import { Text, View, TextInput, Button, ImageBackground, TouchableOpacity } from 'react-native';
import firebase from 'react-native-firebase';
import Login from './Login';
import { stylesRegister } from '../styles/register_styles'
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';

const backGroundImage = "../../images/register.jpg"

export default class App extends React.Component {
    state = {
        user: "",
        passw: "",
        confirmPassw: "",
        isRegistred: false,
    }

    registry = () => {
        if (this.state.confirmPassw === this.state.passw) {
            firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(this.state.user, this.state.passw)
                .then(() => {
                    alert('Registro concluido com sucesso');
                    this.setState({
                        isRegistred: true,
                    })
                }, (error) => {
                    alert('Registro não concluido:\n' + error)
                })
        } else {
            alert('As senhas não são iguais');
        }
    }

    render() {
        return (
            <ImageBackground style={stylesRegister.conteiner} source={require(backGroundImage)}
                blurRadius={5}>
                <View style={{}}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}
                        style={stylesRegister.backButton}
                    >
                        <Icon name='backspace' color='#2E64FE' size={40} />
                    </TouchableOpacity>
                    <View style={stylesRegister.viewConteiner}>
                        <Text style={stylesRegister.textTitle} >Cadastro</Text>
                        <View style={{ width: "100%", alignItems: "center" }}>
                            <TextInput
                                style={stylesRegister.textInput}
                                placeholderTextColor="white"
                                placeholder="E-mail"
                                value={this.state.user}
                                onChangeText={(user) => this.setState({user})}
                            />
                            <TextInput
                                style={stylesRegister.textInput}
                                placeholder="Senha"
                                placeholderTextColor="white"
                                secureTextEntry
                                value={this.state.passw}
                                onChangeText={(passw) => this.setState({passw})}
                            />
                            <TextInput
                                style={stylesRegister.textInput}
                                placeholder="Confirmar Senha"
                                placeholderTextColor="white"
                                secureTextEntry
                                value={this.state.confirmPassw}
                                onChangeText={(confirmPassw) => this.setState({confirmPassw})}
                            />
                            <TouchableOpacity style={stylesRegister.buttonRegister}
                                onPress={this.registry}>
                                <Text style={stylesRegister.textStyle}>
                                    Cadastrar
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ImageBackground >
        );
    }
}