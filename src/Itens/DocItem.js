import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';

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
      <TouchableOpacity style={[styles.doc,
      doc.nota >= 4 && { backgroundColor: 'rgba(60,255,22,0.6)' },
      (doc.nota >= 3 &&  doc.nota < 4) && { backgroundColor: 'rgba(66,134,244,0.6)' },
      doc.nota < 2 && { backgroundColor: 'rgba(255,22,22,0.6)' }
      ]} onPress={this.handlePress} key={doc.CRM}>
        <Text style={styles.textStyle}>Nome: {doc.nome}</Text>
        <View style={styles.viewStyle}>
          <Text style={styles.textStyle}>Cidade: {doc.cidade}</Text>
          <Text style={styles.textStyle}>Estado: {doc.estado}</Text>
        </View>
        <View style={styles.viewStyle}>
          <Text style={styles.textStyle}>Nota: {doc.nota}</Text>
          <Text style={styles.textStyle}>Situacao: {doc.situacao}</Text>
        </View>
        <Text style={styles.textStyle}>Especialidade: {doc.esp}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  doc: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: "rgba(66,134,244,0.4)",
    flexDirection: 'column',
    justifyContent: "space-around",
    margin: 5,
  },

  viewStyle: {
    flexDirection: 'row',
    justifyContent: "space-around",
  },

  textStyle: {
    margin: 4,
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
});

export default DocItem;