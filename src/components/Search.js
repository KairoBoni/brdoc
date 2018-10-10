import React from 'react';
import { Text, View, TextInput, FlatList, Picker } from 'react-native';
import { stylesConteiner } from '../styles/conteiner_styles';
import PropTypes from 'prop-types';
//import Geocoder from 'react-native-geocoding';
import firebase from 'react-native-firebase';
import Doctor from './Doctor';
import DocItem from '../Itens/DocItem'
import { stylesSearch } from '../styles/search_styles' 

export default class Search extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  };

  state = {
    latitude: null,
    longitude: null,
    error: null,
    docs: [],
    docs2Show: [],
    docSelected: 0,
    loading: false,
    nameSearch: "",
    sitSearch: "",
    estSearch: "",
    citSearch: "",
    espSearch: "",
    rankSearch: 0,
  }

  onBackPress = () => {
    this.setState({
      docSelected: 0,
    })
  }
  /*
  função para pegar a localização
    getLocation = async () => {
      const apiKey = 'AIzaSyA52Q29OfGF-XJddWQ43QFI-3d1o8X10CA';
  
      Geocoder.init(apiKey);
      const latitude = this.state.latitude;
      const longitude = this.state.longitude;
      const location = await Geocoder.getFromLatLng(latitude, longitude);
      console.log(this.props.user);
  
    }
  */
  componentDidMount = () => {
    console.log(this.props.user.user._auth._user._user.email);
    const rootRef = firebase.database().ref();
    const docsRef = rootRef.child('docs');
    /*
      Rastrear e adquirir a localização por meio das cordenadas X e Y
      navigator.geolocation.requestAuthorization;
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null
          });
  
        },
        (error) => this.setState({ error: error.message }),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      );
      */
    docsRef.on('value', (childSnapshot) => {
      const docs = []
      childSnapshot.forEach((doc) => {
        docs.push({
          CRM: doc.toJSON().CRM,
          cidade: doc.toJSON().cidade,
          estado: doc.toJSON().estado,
          nome: doc.toJSON().nome,
          nota: doc.toJSON().nota,
          situacao: doc.toJSON().situacao,
          esp: doc.toJSON().esp,
          qtd: doc.toJSON().qtd,
          avlist: doc.toJSON().avlist,
        })

      });
      this.setState({
        docs: docs,
        docs2Show: docs,
        loading: true,
      })
    })
  }

  setDocSelected = (CRM) => {
    this.setState({
      docSelected: CRM
    });
  }

  filterSearch = async (filter, who) => {
    switch (who) {
      case 'nome':
        await this.setState({
          nameSearch: filter
        });
        break;
      case 'situacao':
        await this.setState({
          sitSearch: filter
        });
        break;
      case 'estado':
        await this.setState({
          estSearch: filter
        });
        break;
      case 'cidade':
        await this.setState({
          citSearch: filter
        });
        break;
      case 'especialidade':
        await this.setState({
          espSearch: filter
        });
        break;
      case 'rank':
        await this.setState({
          rankSearch: filter
        });
        break;
      default:
        console.log("Deu Ruim!")
        break;
    }

    if (this.state.sitSearch === "" && this.state.estSearch === "") {
      this.setState(
        {
          docs2Show: this.state.docs.filter((doc) =>
            doc.nome.includes(this.state.nameSearch.toUpperCase()) &&
            doc.cidade.includes(this.state.citSearch.toUpperCase()) &&
            doc.esp.includes(this.state.espSearch.toUpperCase()) &&
            doc.nota >= this.state.rankSearch
          )
        }
      )
    } else if (this.state.sitSearch === "") {
      this.setState(
        {
          docs2Show: this.state.docs.filter((doc) =>
            doc.nome.includes(this.state.nameSearch.toUpperCase()) &&
            doc.cidade.includes(this.state.citSearch.toUpperCase()) &&
            doc.esp.includes(this.state.espSearch.toUpperCase()) &&
            doc.nota >= this.state.rankSearch &&
            doc.estado === this.state.estSearch
          )
        }
      )
    } else if (this.state.estSearch === "") {
      this.setState(
        {
          docs2Show: this.state.docs.filter((doc) =>
            doc.nome.includes(this.state.nameSearch.toUpperCase()) &&
            doc.cidade.includes(this.state.citSearch.toUpperCase()) &&
            doc.esp.includes(this.state.espSearch.toUpperCase()) &&
            doc.nota >= this.state.rankSearch &&
            doc.situacao === this.state.sitSearch
          )
        }
      )
    } else {
      this.setState(
        {
          docs2Show: this.state.docs.filter((doc) =>
            doc.nome.includes(this.state.nameSearch.toUpperCase()) &&
            doc.cidade.includes(this.state.citSearch.toUpperCase()) &&
            doc.esp.includes(this.state.espSearch.toUpperCase()) &&
            doc.nota >= this.state.rankSearch &&
            doc.situacao === this.state.sitSearch &&
            doc.estado === this.state.estSearch

          )
        }
      )
    }
  }

  render() {
    if (this.state.docSelected) {
      return (<Doctor
        CRM={this.state.docSelected}
        docs={this.state.docs}
        user={this.props.user.user._auth._user._user.email}
        onBackPress={this.onBackPress}
      />);
    } else {
      return (
        <View style={stylesConteiner.containerSearch}>
          <View style={stylesSearch.filter}>
            <View style={stylesSearch.textPesq}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>Pesquisa</Text>
            </View>
            <View style={stylesSearch.camps}>
              <Text>Nome</Text>
              <TextInput style={{ width: "80%" }}
                value={this.state.nameSearch}
                onChangeText={filter => this.filterSearch(filter, 'nome')} />
            </View>
            <View style={stylesSearch.camps}>
              <Text>Situacao</Text>
              <Picker
                selectedValue={this.state.sitSearch}
                onValueChange={filter => this.filterSearch(filter, 'situacao')}
                style={{ width: "80%" }}>
                <Picker.Item label="Selecione" value="" />
                <Picker.Item label="Inativo" value="INATIVO" />
                <Picker.Item label="Ativo" value="ATIVO" />
              </Picker>

            </View>
            <View style={stylesSearch.camps}>
              <Text>Estado</Text>
              <Picker
                selectedValue={this.state.estSearch}
                onValueChange={filter => this.filterSearch(filter, 'estado')}
                style={{ width: "100%" }}>
                <Picker.Item label="Selecione" value="" />
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
            <View style={stylesSearch.camps}>
              <Text>Cidade</Text>
              <TextInput
                onChangeText={filter => this.filterSearch(filter, 'cidade')}
                style={{ width: "80%" }} />
            </View>
            <View style={stylesSearch.camps}>
              <Text>Especialidade</Text>
              <TextInput
                onChangeText={filter => this.filterSearch(filter, 'especialidade')}
                style={{ width: "80%" }} />
            </View>
            <View style={stylesSearch.camps}>
              <Text>Rank minimo</Text>
              <Picker
                selectedValue={this.state.rankSearch}
                onValueChange={filter => this.filterSearch(filter, 'rank')}
                style={{ width: "40%" }}>
                <Picker.Item label="0" value="0" />
                <Picker.Item label="1" value="1" />
                <Picker.Item label="2" value="2" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="4" value="4" />
                <Picker.Item label="5" value="5" />
              </Picker>
            </View>
          </View>
          <View style={stylesSearch.listDoc}>
            <View style={stylesSearch.textPesq}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>Médicos</Text>
            </View>
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={this.state.docs2Show}
              renderItem={({ item }) => (
                <DocItem
                  onPress={this.setDocSelected}
                  doc={item}
                />
              )}
            />
          </View>
        </View>
      );
    }
  }
}