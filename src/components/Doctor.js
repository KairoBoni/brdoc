import React from 'react';
import { Text, View, TextInput, Button, FlatList, Picker, ImageBackground, TouchableOpacity } from 'react-native';
import firebase from 'react-native-firebase';
import AvaliacaoItem from '../Itens/AvaliacaoItem';
import { stylesDoctor } from '../styles/doctor_styles';
import { createMaterialTopTabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

const backGroundImage = "../../images/doctor.jpg";

class Doctor extends React.Component {
  state = {
    doc: [],
    loading: false,
    user: "",
  }

  componentWillReceiveProps = () => {
    const {
      user,
      CRM,
    } = this.props.navigation.state.params;

    ref = firebase.firestore().collection('docs').doc(CRM);
    ref.get().then((querySnapshot) => {
      if (querySnapshot.exists) {
        doc = {
          CRM: querySnapshot.id,
          cidade: querySnapshot.data().cidade,
          estado: querySnapshot.data().estado,
          nome: querySnapshot.data().nome,
          nota: querySnapshot.data().nota,
          situacao: querySnapshot.data().situacao,
          esp: querySnapshot.data().esp,
          qtd: querySnapshot.data().qtd,
          avlist: querySnapshot.data().avlist,
        };
        this.setState({
          doc: doc,
          loading: true,
          av: doc.avlist,
          user: user.user._auth._user._user.email
        })
      } else {
        console.log("Cant find this document");
      }

    });
  }

  componentDidMount = async () => {
    const {
      user,
      CRM,
    } = this.props.navigation.state.params;
    ref = firebase.firestore().collection('docs').doc(CRM);
    await ref.get().then((querySnapshot) => {
      if (querySnapshot.exists) {
        doc = {
          CRM: querySnapshot.id,
          cidade: querySnapshot.data().cidade,
          estado: querySnapshot.data().estado,
          nome: querySnapshot.data().nome,
          nota: querySnapshot.data().nota,
          situacao: querySnapshot.data().situacao,
          esp: querySnapshot.data().esp,
          qtd: querySnapshot.data().qtd,
          avlist: querySnapshot.data().avlist,
        };
        this.setState({
          doc: doc,
          loading: true,
          av: doc.avlist,
          user: user.user._auth._user._user.email
        })
      } else {
        console.log("Cant find this document");
      }

    });
  }

  render() {
    return (
      <ImageBackground style={stylesDoctor.conteiner} source={require(backGroundImage)}
        blurRadius={5}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={this.state.doc.avlist}
          renderItem={({ item }) => (
            <AvaliacaoItem avaliacao={item} key={Math.random()} keyExtractor={(item, index) => index} />
          )
          } />
      </ImageBackground>
    );
  }
}

class AddComent extends React.Component {
  state = {
    doc: null,
    comm: "",
    nota: 0,
    av: null,
  }

  componentWillMount = async () => {
    const {
      user,
      CRM,
    } = this.props.navigation.state.params;

    ref = firebase.firestore().collection('docs').doc(CRM);
    await ref.get().then((querySnapshot) => {
      if (querySnapshot.exists) {
        doc = {
          CRM: querySnapshot.id,
          cidade: querySnapshot.data().cidade,
          estado: querySnapshot.data().estado,
          nome: querySnapshot.data().nome,
          nota: querySnapshot.data().nota,
          situacao: querySnapshot.data().situacao,
          esp: querySnapshot.data().esp,
          qtd: querySnapshot.data().qtd,
          avlist: querySnapshot.data().avlist,
        };
        this.setState({
          doc: doc,
          av: doc.avlist,
          user: user.user._auth._user._user.email,
          CRM: CRM
        })
      } else {
        console.log("Cant find this document");
      }
    });
    console.log(this.state);
  }

  updateDoc = async () => {
    console.log(this.state);
    let newQtd = this.state.doc.qtd + 1;
    let newNota = (parseInt(this.state.doc.nota) * (newQtd - 1) + parseInt(this.state.nota)) / newQtd;
    let newComm = this.state.av;
    let date = new Date();
    if (newQtd === 1) {
      newComm[0] = {
        avaliacao: {
          comentario: this.state.comm,
          user: this.state.user,
          time: date.toGMTString(),
          nota: this.state.nota,
        }
      }
    } else {
      newComm.push({
        avaliacao: {
          comentario: this.state.comm,
          user: this.state.user,
          time: date.toGMTString(),
          nota: this.state.nota,
        }
      })
    }
    ref = firebase.firestore().collection('docs').doc(this.state.CRM);
    await ref.set({
      ...this.state.doc,
      nota: newNota,
      avlist: newComm,
      qtd: newQtd,
    })
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      })

    await this.setState({
      ...this.state,
      doc: {
        ...this.state.doc,
        nota: newNota,
        qtd: newQtd,
        avlist: newComm
      }
    });

    this.props.navigation.navigate('Coment', {});
  }
  render() {
    return (
      <ImageBackground style={stylesDoctor.conteinerAddComent} source={require(backGroundImage)}
        blurRadius={30}>
        <TextInput
          style={stylesDoctor.textInput}
          multiline={true} numberOfLines={5}
          maxLength={140}
          placeholder={'Faça um comentário!'}
          placeholderTextColor={'white'}
          value={this.state.comm}
          onChangeText={(comm) => this.setState({ comm })}
        ></TextInput>
        <View style={stylesDoctor.viewPicker}>
          <Picker
            onValueChange={(nota) => this.setState({ nota })}
            selectedValue={this.state.nota}
            mode={'dialog'}
            style={stylesDoctor.pickerStyle}
            itemStyle={stylesDoctor.pickeItem}
            placeholderTextColor="white">
            <Picker.Item label="Dê Sua Nota!" value="" />
            <Picker.Item label="0" value="0" />
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="4" value="4" />
            <Picker.Item label="5" value="5" />
          </Picker>
        </View>
        <TouchableOpacity style={stylesDoctor.buttonComment}
          onPress={this.updateDoc}>
          <Text style={stylesDoctor.textStyle}>
            Comentar!
              </Text>
        </TouchableOpacity>
      </ImageBackground >
    );
  }
}



export default createMaterialTopTabNavigator({
  Coment: {
    screen: Doctor,
    navigationOptions: {
      tabBarLabel: 'Comentários',
      tabBarIcon: ({ tintColor }) => (
        <Icon name='comment' color={tintColor} size={26} />
      )
    }
  },
  AddComent: {
    screen: AddComent,
    navigationOptions: {
      tabBarLabel: 'Comentar',
      tabBarIcon: ({ tintColor }) => (
        <Icon name='edit' color={tintColor} size={26} />
      )
    }
  },
}
  , {
    initialRouteName: 'Coment',
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