import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, Platform } from 'react-native';
import { Picker } from '@react-native-community/picker';
import axios from 'axios';

const Formulario = () => {
  const [moneda, guardarModena] = useState('');
  const [criptomoneda, guardarCriptomoneda] = useState('');
  const [criptomonedas, guardarCriptomonedas] = useState('');
  
  useEffect(() => {
    const consultarAPI  = async () => {
      const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
      const resultado = await axios.get(url);
      guardarCriptomonedas(resultado.data.Data)
    }
    consultarAPI();
  }, [])

  const obtenerMoneda = moneda => {
   guardarModena(moneda)
  }
  return (
    <View>
      <Text style={styles.label}>Moneda</Text>
      <Picker
      selectedValue={moneda}
        onValueChange={moneda => obtenerMoneda(moneda)}
      >
        <Picker.Item label="- Selecione -" value="" />
        <Picker.Item label="Dolar de Estados Unidos" value="USD" />
        <Picker.Item label="Peso Mexicano" value="MXN" />
        <Picker.Item label="Euro" value="EUR" />
        <Picker.Item label="Libra Esterlina" value="GBP" />
      </Picker>
      <Text style={styles.label}>Criptomoneda</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Lato-Black',
    textTransform: 'uppercase',
    fontSize: 22,
    marginVertical: 20,
  }
});

export default Formulario;
