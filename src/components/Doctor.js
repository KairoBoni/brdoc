import React from 'react';
import { Text, View, TextInput, Button, FlatList, Picker } from 'react-native';
import PropTypes from 'prop-types';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import { setDoc } from '../action/insertAvaliation'
import AvaliacaoItem from '../Itens/AvaliacaoItem';
import { stylesDoctor } from '../styles/doctor_styles'


class Doctor extends React.Component {

  static propTypes = {
    CRM: PropTypes.string.isRequired,
    docs: PropTypes.array.isRequired,
    user: PropTypes.string.isRequired,
    onBackPress: PropTypes.func.isRequired,
  };

  componentWillMount = () => {
    let doct = this.props.docs.find((doc) => doc.CRM === this.props.CRM);
    let index = this.props.docs.findIndex((doc) => doc.CRM === this.props.CRM);
    this.setState({
      doc: doct,
      av: doct.avlist,
      index: index
    });
  }

  updateDoc = async () => {
    let newQtd = this.state.doc.qtd + 1;
    let newNota = (parseInt(this.state.doc.nota) * (newQtd - 1) + parseInt(this.state.nota)) / newQtd;
    let newComm = this.state.av;
    let date = new Date();
    if (newQtd === 1) {
      newComm[0] = {
        avaliacao: {
          comentario: this.state.comentario,
          user: this.props.user,
          time: date.toGMTString(),
          nota: this.state.nota,
        }
      }
    } else {
      newComm.push({
        avaliacao: {
          comentario: this.state.comentario,
          user: this.props.user,
          time: date.toGMTString(),
          nota: this.state.nota,
        }
      })
    }
    const rootRef = firebase.database().ref();
    const docRef = rootRef.child('docs/' + this.state.index);
    docRef.set({
      ...this.state.doc,
      nota: newNota,
      qtd: newQtd,
      avlist: newComm
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
  }

  render() {
    return (
      <View style={stylesDoctor.conteinerDoc}>
        <View>
          <Button onPress={this.props.onBackPress} title={"Voltar"} />
        </View>
        <View style={stylesDoctor.status}>
          <View style={stylesDoctor.statusText}>
            <Text>CRM: {this.state.doc.CRM}</Text>
            <Text>Nome: {this.state.doc.nome}</Text>
          </View>
          <View style={stylesDoctor.statusText}>
            <Text>Cidade: {this.state.doc.cidade}</Text>
            <Text>Estado: {this.state.doc.estado}</Text>
          </View>
          <View style={stylesDoctor.statusText}>
            <Text>Situacao: {this.state.doc.situacao}</Text>
            <Text>Especialidade: {this.state.doc.esp}</Text>
          </View>
          <View style={stylesDoctor.statusText}>
            <Text>Nota: {this.state.doc.nota}</Text>
            <Text>Quantidade de Avaliações: {this.state.doc.qtd}</Text>
          </View>
        </View>
        <View style={stylesDoctor.add}>
          <View style={stylesDoctor.addCom}>
            <View>
              <Text>Faça um Comentário</Text>
              <TextInput
                style={stylesDoctor.textCom}
                multiline={true} numberOfLines={5}
                maxLength={140}
                value={this.state.comentario}
                onChangeText={(comentario) => this.setState({ comentario })}
              ></TextInput>
            </View>
            <View>
              <Text>De sua Nota</Text>
              <Picker
                onValueChange={(nota) => this.setState({ nota })}
                selectedValue={this.state.nota}>
                <Picker.Item label="0" value="0" />
                <Picker.Item label="1" value="1" />
                <Picker.Item label="2" value="2" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="4" value="4" />
                <Picker.Item label="5" value="5" />
              </Picker>
              <Button title={"Comentar!"} onPress={this.updateDoc} />
            </View>
          </View>
        </View>
        <View style={stylesDoctor.cometarios}>
          <Text style={stylesDoctor.textComentario}>Comentários</Text>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={this.state.doc.avlist}
            renderItem={({ item }) => (
              <AvaliacaoItem avaliacao={item} key={Math.random()} keyExtractor={(item, index) => index} />
            )
            } />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    insert: state.reducer,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setDoc: (comentario, nota, qtd) => {
      dispatch(setDoc(comentario, nota, qtd))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);