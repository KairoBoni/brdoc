import React from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import firebase from 'react-native-firebase';
import Login from './Login';
import { stylesRegister } from '../styles/register_styles'

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
        if (this.state.isRegistred) {
            return (<Login />)
        } else {
            return (
                <View style={stylesRegister.base}>
                    <Text style={stylesRegister.registroText} >Registro</Text>
                    <View>
                        <Text>E-mail</Text>
                        <TextInput
                            style={stylesRegister.inputStyle}
                            value={this.state.user}
                            onChangeText={(user) => this.setState({ user })}
                        />
                    </View>
                    <View>
                        <Text>Senha</Text>
                        <TextInput
                            style={stylesRegister.inputStyle}
                            value={this.state.passw}
                            onChangeText={(passw) =>
                                this.setState({ passw })}
                            secureTextEntry={true}
                            textContentType={'password'}
                        />
                    </View>
                    <View>
                        <Text>Confirme a senha</Text>
                        <TextInput
                            style={stylesRegister.inputStyle}
                            value={this.state.confirmPassw}
                            onChangeText={(confirmPassw) => this.setState({ confirmPassw })}
                            secureTextEntry={true}
                            textContentType={'password'}
                        />
                    </View>
                    <Button
                        title={"Registrar"}
                        onPress={this.registry}
                    />
                </View>
            );
        }
    }
}