import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

class AvaliacaoItem extends React.Component {
  static propTypes = {
    avaliacao: PropTypes.object.isRequired,
  };

  render() {
    const { avaliacao } = this.props.avaliacao;
    return (
      <View style={[styles.avaliacao,
      avaliacao.nota >= 4 && { backgroundColor: 'rgba(60,255,22,0.4)' },
      (avaliacao.nota >= 3 && avaliacao.nota < 4) && { backgroundColor: 'rgba(66,134,244,0.4)' },
      avaliacao.nota < 3 && { backgroundColor: 'rgba(255,22,22,0.4)' }]
      } key={Math.random()}>
        <Text style={styles.textStyle} >Usuario: {avaliacao.user}</Text>
        <Text style={styles.textStyle}>Data: {avaliacao.time}</Text>
        <Text style={styles.textStyle}>Nota: {avaliacao.nota}</Text>
        <Text style={styles.textStyle}>{avaliacao.comentario}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  avaliacao: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: "rgba(66,134,244,0.4)",
    flexDirection: 'column',
    justifyContent: "space-around",
    margin: 5,
  },

  textStyle: {
    margin: 4,
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
});

export default AvaliacaoItem;