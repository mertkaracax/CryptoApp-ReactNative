//Bu component ı ana dosyada kullanırken ({item}) parametresini (item) olarak değiştirince,
//item ın özelliklerine ulaşabilmek için normalde item.prop yaparken item.item.prop yapmam gerekti

import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Pressable,
} from 'react-native';
// import api from '../Helpers/Api';
import client from '../Helpers/Client';

const OrderBookItem = ({item}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0B5F10',
        alignSelf: 'center',
        width: '90%',
        height: 55,
        margin: 1,
      }}>
      <View style={styles.container}>
        <Text style={styles.text1}>
          $ {parseFloat(item.item.price).toFixed(2)}
        </Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.text2}>
          {parseFloat(item.item.quantity).toFixed(2)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: '100%',
    width: '50%',
  },
  text1: {
    color: '#EEE8E8',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  text2: {
    color: '#CED0D8',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '600',
  },
  fadeText: {
    width: '33%',
  },
});
export default OrderBookItem;
