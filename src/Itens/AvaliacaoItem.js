import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

class AvaliacaoItem extends React.Component {
  static propTypes = {
    avaliacao: PropTypes.object.isRequired,
  };

  render() {
    const { avaliacao } = this.props.avaliacao;
    console.log("Passou flatList");
    return (
      <View style={styles.avaliacao} key={Math.random()}>
        <Text>Usuario: {avaliacao.user}</Text>
        <Text>Data: {avaliacao.time}</Text>
        <Text>Nota: {avaliacao.nota}</Text>
        <Text>{avaliacao.comentario}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  avaliacao: {
    alignItems: 'center',
    borderBottomWidth: 1,
  },
});

export default AvaliacaoItem;