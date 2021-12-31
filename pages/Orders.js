import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import OrderBookItem from '../components/OrderBookItem';
import OrderBookItem2 from '../components/OrderBookItem2';
import client from '../Helpers/Client';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

const Orders = ({navigation}) => {
  let [bids, setBids] = useState([
    {price: '0', quantity: 0},
    {price: '0', quantity: 0},
    {price: '0', quantity: 0},
    {price: '0', quantity: 0},
    {price: '0', quantity: 0},
  ]);

  let [asks, setAsks] = useState([
    {price: '0', quantity: 0},
    {price: '0', quantity: 0},
    {price: '0', quantity: 0},
    {price: '0', quantity: 0},
    {price: '0', quantity: 0},
  ]);

  useEffect(async () => {
    let quant = 0;
    client.ws.partialDepth({symbol: 'FTTUSDT', level: 5}, depth => {
      setBids(depth.bids);
      setAsks(depth.asks);
      // if (parseFloat(depth.bids[4].quantity) > quant * 1.2) {
      //   console.log('WHALE DETECTED!!');
      // }
      // console.log(depth.bids[4]);
      quant = parseFloat(depth.bids[4].quantity);
    });
  }, []);

  return (
    <View style={styles.body}>
      <View
        style={{
          height: responsiveHeight(14),
          backgroundColor: 'black',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 21, color: 'white'}}>FTT ORDERBOOK</Text>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',

          height: responsiveHeight(86),
        }}>
        <View style={styles.textContainer}>
          <Text style={styles.text1}>PRICE / QUANTITY</Text>
        </View>

        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FlatList
            style={styles.flatList}
            data={bids}
            renderItem={item => <OrderBookItem item={item}></OrderBookItem>}
            keyExtractor={(item, index) => index}></FlatList>
        </View>
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FlatList
            style={styles.flatList}
            data={bids}
            renderItem={item => <OrderBookItem2 item={item}></OrderBookItem2>}
            keyExtractor={(item, index) => index}></FlatList>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#1A232B',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  flatList: {
    width: '90%',
    borderColor: 'gray',
  },
  textContainer: {
    width: '100%',
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 10,
  },
  text1: {
    fontSize: 17,
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default Orders;
