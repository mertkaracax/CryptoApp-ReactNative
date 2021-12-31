import React, {useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import CoinItem from '../components/CoinItem';
import {useState} from 'react';
import client from '../Helpers/Client';
import Coin from '../classes/Coin';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import {getData} from '../storage/Storage';
// import {getMyObject} from '../storage/Storage';
const MainScreen = ({navigation, route}) => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoad] = useState(true);
  const [btc, setBtc] = useState('0');

  useEffect(() => {
    // LIVE BTC DATA
    // console.log(await client.prices()); //ALL COINS AND THEIR DATA
    client.ws.candles('BTCUSDT', '1h', candle => {
      // console.log(candle.close);
      setBtc(parseFloat(candle.close).toFixed(2));
    });
  }, []);

  useEffect(() => {
    async function getMyObject() {
      try {
        const jsonValue = await AsyncStorage.getItem('coins');
        setCoins(jsonValue != null ? JSON.parse(jsonValue) : null);
        console.log(JSON.parse(jsonValue));
      } catch (e) {
        // read error
      }
    }
    getMyObject();
    setLoad(false);
    let count = 0;
    count++;

    // let coinArray = await getData();
    // console.log(coinArray[0]);

    // await coinArray.push(new Coin('FTT', 0, 53.7, 6.3, 0, 0, 0));
    // await coinArray.push(new Coin('PSG', 0, 23.41, 10.73, 0, 0, 0));
    // await coinArray.push(new Coin('THETA', 0, 4.39, 11.3, 0, 0, 0));
    // await coinArray.push(new Coin('GRT', 0, 1.46, 115, 0, 0, 0));
    // await coinArray.push(new Coin('YGG', 0, 7.13, 12.9, 0, 0, 0));
    // await coinArray.push(new Coin('ICP', 0, 39.34, 0.76, 0, 0, 0));
    // await coinArray.push(new Coin('SUPER', 0, 3.1, 11.79, 0, 0, 0));
    // await coinArray.push(new Coin('ATM', 0, 11.87, 1.68, 0, 0, 0));
  }, []);
  return (
    <View style={styles.body}>
      <ActivityIndicator
        style={styles.indicator}
        size="large"
        color="red"
        animating={loading}
      />
      <View style={styles.header}>
        <View style={styles.textContainer}>
          <Text style={styles.text1}>COIN</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text1}>PRICE</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text1}>PNL</Text>
        </View>
      </View>
      <FlatList
        style={styles.flatList}
        data={coins}
        renderItem={({item}) => <CoinItem item={item}></CoinItem>}
        keyExtractor={(item, index) => index}></FlatList>
      <View>
        <Text style={{color: '#B2BACB', fontSize: 18, fontWeight: 'bold'}}>
          {'-    '} BITCOIN:{' '}
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            ${btc}
          </Text>
          {'    -'}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  body: {
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
    alignItems: 'center',
    paddingVertical: 5,
  },

  flatList: {
    width: '97%',
  },
  text1: {
    fontSize: 20,
    color: '#117F98', //D5B30B A0C0DE
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textContainer: {
    width: '33.3%',
    height: '100%',
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    width: '97%',
    height: '10%',
    backgroundColor: '#13171C', //#1A232B
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2,
  },
  indicator: {
    top: '50%',
    height: 1,
  },
});

export default MainScreen;

//-------------------
