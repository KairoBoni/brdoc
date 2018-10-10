import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

class DocItem extends React.Component {
  static propTypes = {
    doc: PropTypes.object.isRequired,
    onPress: PropTypes.func.isRequired,
  };

  handlePress = () => {
    this.props.onPress(this.props.doc.CRM);
  };

  render() {
    const { doc } = this.props;
    return (
        <TouchableOpacity style={styles.doc} onPress={this.handlePress} key={doc.CRM}>
            <Text>Nome: {doc.nome}</Text>
            <Text>Cidade: {doc.cidade}</Text>
            <Text>Estado: {doc.estado}</Text>
            <Text>Nota: {doc.nota}</Text>
            <Text>Situacao: {doc.situacao}</Text>
            <Text>Especialidade: {doc.esp}</Text>
          </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
    doc: {
        flex: 1,
        borderBottomWidth: 3,
      },
});

export default DocItem;