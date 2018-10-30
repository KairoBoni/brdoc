import React from 'react';
import { View, TextInput, FlatList, Picker, ImageBackground, TouchableOpacity, Text, Image } from 'react-native';
import firebase from 'react-native-firebase';
import DocItem from '../Itens/DocItem'
import { stylesSearch } from '../styles/search_styles';
import { createMaterialTopTabNavigator } from 'react-navigation'
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
const backGroundImage = '../../images/search.jpg';




class Search extends React.Component {
    state = {
        docs: [],
        docSelected: 0,
        showLimit: 3,
    }

    getData = (ref, filter = {estado: "", especialidade: ""}) => {
        ref.get().then(function(querySnapshot) {
            let docs = []
            querySnapshot.forEach(function(doc) {
                docs.push({
                    CRM: doc.id,
                    cidade: doc.data().cidade,
                    estado: doc.data().estado,
                    nome: doc.data().nome,
                    nota: doc.data().nota,
                    situacao: doc.data().situacao,
                    esp: doc.data().esp,
                    qtd: doc.data().qtd,
                    avlist: doc.data().avlist,
                })
            });
            if (filter.estado !== "") {
                docs = docs.filter((doc) => doc.estado === filter.estado)
            }
            if (filter.especialidade !== "") {
                docs = docs.filter((doc) => doc.esp.includes(filter.especialidade.toUpperCase()));
            }
            console.log(docs);
            this.setState({
                docs: docs,
            })
        }.bind(this));
    }

    componentWillReceiveProps = () => {
        setTimeout(() => {
            let filter = this.props.navigation.state.params.filterState;
            if (filter) {
                let ref = firebase.firestore().collection("docs").orderBy("nota", "desc").limit(this.state.showLimit)
                    .where('nota', '>=', parseInt(filter.notaMinima));
                this.getData(ref, filter);
            }   
        }, 10);


    }


    componentDidMount = () => {
        console.log(this.props.navigation.state.params.user)
        let ref = firebase.firestore().collection("docs").orderBy("nota", "desc").limit(this.state.showLimit);
        this.getData(ref)
    }

    setDocSelected = (CRM) => {
        this.setState({
            docSelected: CRM
        });
        user = this.props.navigation.state.params.user;
        this.props.navigation.navigate('DoctorScreen', { user: user, CRM: CRM });

    }

    showMore = () => {
        let limit = this.state.showLimit + 3
        let filter = this.props.navigation.state.params.filterState;
        if (filter) {
            let ref = firebase.firestore().collection("docs").orderBy("nota", "desc").limit(limit)
                .where('nota', '>=', parseInt(filter.notaMinima));
            this.getData(ref, filter);
        }  else {
            ref = firebase.firestore().collection("docs").orderBy("nota", "desc").limit(limit);
            this.getData(ref);
        }
        this.setState({
          showLimit: limit
        })
    }
    render() {
        return (
            <ImageBackground style={stylesSearch.conteiner} source={require(backGroundImage)}
                blurRadius={5}>
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={this.state.docs}
                    renderItem={({ item }) => (
                        <DocItem
                            onPress={this.setDocSelected}
                            doc={item}
                        />
                    )}
                />

                <TouchableOpacity onPress={this.showMore}>
                    <Text style={stylesSearch.textRegistry}>
                        Mostrar Mais
          </Text>
                </TouchableOpacity>
            </ImageBackground>
        );
    }
}

class Filter extends React.Component {
    state = {
        especialidade: "",
        estado: "",
        notaMinima: 0,
        user: this.props.navigation.state.params.
            user.user._auth._user._user.email
    }

    setFilter = () => {
        this.props.navigation.navigate('Medicos', { filterState: this.state });
    }

    render() {
        return (
            <ImageBackground style={stylesSearch.conteiner} source={require(backGroundImage)}
                blurRadius={30}>

                <View style={stylesSearch.viewConteiner}>
                    <TextInput
                        style={stylesSearch.textInput}
                        placeholderTextColor="white"
                        placeholder="Especialidade"
                        value={this.state.especialidade}
                        onChangeText={(especialidade) => this.setState({ especialidade })}
                    />

                    <View style={stylesSearch.viewPicker}>
                        <Picker
                            mode={'dialog'}
                            style={stylesSearch.pickerStyle}
                            itemStyle={stylesSearch.pickeItem}
                            placeholderTextColor="white"
                            placeholder="Estado"
                            selectedValue={this.state.estado}
                            onValueChange={(estado) => this.setState({ estado })}>
                            <Picker.Item label="Estados" value="" />
                            <Picker.Item label="Acre" value="AC" />
                            <Picker.Item label="Alagoas" value="AL" />
                            <Picker.Item label="Amapá" value="AP" />
                            <Picker.Item label="Amazonas" value="AM" />
                            <Picker.Item label="Bahia" value="BA" />
                            <Picker.Item label="Ceará" value="CE" />
                            <Picker.Item label="Distrito Federal" value="DF" />
                            <Picker.Item label="Espírito Santo" value="ES" />
                            <Picker.Item label="Goiás" value="GO" />
                            <Picker.Item label="Maranhão" value="MA" />
                            <Picker.Item label="Mato Grosso" value="MT" />
                            <Picker.Item label="Mato Grosso do Sul" value="MS" />
                            <Picker.Item label="Minas Gerais" value="MG" />
                            <Picker.Item label="Pará" value="PA" />
                            <Picker.Item label="Paraíba" value="PB" />
                            <Picker.Item label="Paraná" value="PR" />
                            <Picker.Item label="Pernambuco" value="PE" />
                            <Picker.Item label="Piauí" value="PI" />
                            <Picker.Item label="Rio de Janeiro" value="RJ" />
                            <Picker.Item label="Rio Grande do Norte" value="RN" />
                            <Picker.Item label="Rio Grande do Sul" value="RS" />
                            <Picker.Item label="Rondônia" value="RO" />
                            <Picker.Item label="Roraima" value="RR" />
                            <Picker.Item label="Santa Catarina" value="SC" />
                            <Picker.Item label="São Paulo" value="SP" />
                            <Picker.Item label="Sergipe" value="SE" />
                            <Picker.Item label="Tocantins" value="TO" />
                        </Picker>
                    </View>

                    <View style={stylesSearch.viewPicker}>
                        <Picker
                            mode={'dialog'}
                            style={stylesSearch.pickerStyle}
                            itemStyle={stylesSearch.pickeItem}
                            placeholderTextColor="white"
                            placeholder="Nota"
                            selectedValue={this.state.notaMinima}
                            onValueChange={(notaMinima) => this.setState({ notaMinima })}>
                            <Picker.Item label="Nota Minima" value="0" />
                            <Picker.Item label="1" value="1" />
                            <Picker.Item label="2" value="2" />
                            <Picker.Item label="3" value="3" />
                            <Picker.Item label="4" value="4" />
                            <Picker.Item label="5" value="5" />
                        </Picker>
                    </View>

                    <TouchableOpacity style={stylesSearch.buttonFilter}
                        onPress={this.setFilter}>
                        <Text style={stylesSearch.textStyle}>
                            Filtrar!
              </Text>
                    </TouchableOpacity>
                </View>

            </ImageBackground>
        );
    }
}

class Settings extends React.Component {
    state = {
        photo: "none",
        user: null,
        name: ""
    }

    Logout = async () => {
        await firebase
            .auth()
            .signOut()
            .catch(error => alert(error));

        this.props.navigation.navigate('LoginScreen', { logout: true });
    }

    componentWillMount = async () => {
        await this.setState({
            user: this.props.navigation.state.params.user
        })
        if (this.props.navigation.state.params.user.additionalUserInfo.providerId) {
            await this.setState({
                photo: this.props.navigation.state.params.user.additionalUserInfo.profile.picture.data.url,
                name: this.props.navigation.state.params.user.additionalUserInfo.profile.name
            })
        } else {
            await this.setState({
                photo: 'https://ibb.co/dsj98A'
            })
        }
        console.log(this.state);
    }

    render() {
        return (
            <ImageBackground style={stylesSearch.conteiner} source={require(backGroundImage)}
                blurRadius={30}>
                <View style={stylesSearch.viewConteiner}>
                    <Image
                        style={stylesSearch.perfilPhoto}
                        source=
                        {
                            { uri: this.state.photo }
                        } />
                    <Text style={stylesSearch.textStyle}>
                        {this.state.user.user._auth._user._user.email}
                    </Text>
                    <Text style={stylesSearch.textStyle}>
                        {this.state.name}
                    </Text>
                    <TouchableOpacity style={stylesSearch.buttonLogout}
                        onPress={this.Logout}>
                        <Text style={stylesSearch.textStyle}>
                            Logout! =(
              </Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        );
    }
}

export default createMaterialTopTabNavigator({
    Medicos: {

        screen: Search,
        navigationOptions: {
            tabBarLabel: 'Médicos',
            tabBarIcon: ({ tintColor }) => (
                <Icon name='face' color={tintColor} size={26} />
            )
        }
    },

    Filtros: {
        screen: Filter,
        navigationOptions: {
            tabBarLabel: 'Filtros',
            tabBarIcon: ({ tintColor }) => (
                <Icon name='search' color={tintColor} size={26} />
            )
        }
    },

    Config: {
        screen: Settings,
        navigationOptions: {
            tabBarLabel: 'Conta',
            tabBarIcon: ({ tintColor }) => (
                <Icon name='settings' color={tintColor} size={26} />
            )
        }
    }
}
    , {
        initialRouteName: 'Medicos',
        tabBarPosition: 'bottom',
        swipeEnabled: false,

        tabBarOptions: {
            showIcon: true,
            activeTintColor: 'black',
            style: {
                backgroundColor: '#4286f4'
            }
        },
    }
)
const mapStateToProps = (state) => {
    return {
        search: state.SearchReducer,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

connect(mapStateToProps, mapDispatchToProps)(Search);