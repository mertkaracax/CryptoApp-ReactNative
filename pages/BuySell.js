import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {removeValue, storeObjectValue} from '../storage/Storage';
import Coin from '../classes/Coin';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BuySell = () => {
  const [tradeType, setTradeType] = useState('buy');
  const [coinName, setCoinName] = useState('');
  const [entryPrice, setEntryPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  let [coins, setCoins] = useState([
    {name: ' ', price: 0, entryPrice: 0, quantity: 0, spent: 0, pnl: 0, roe: 0},
  ]);

  useEffect(() => {
    async function getMyObject() {
      try {
        const jsonValue = await AsyncStorage.getItem('coins');
        let data = await JSON.parse(jsonValue);
        setCoins(data);
        console.log('getMyObject metodu çalıştı', JSON.parse(jsonValue));
      } catch (e) {
        // read error
      }
    }
    setTimeout(() => getMyObject(), 3000);
  }, []);

  return (
    <View style={styles.body}>
      <View
        style={{
          backgroundColor: 'black',
          height: responsiveHeight(14),
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 21,
            textAlign: 'center',
            color: '#C4D2DE',
            fontWeight: 'bold',
          }}>
          TRADE RECORDER
        </Text>
      </View>
      <View style={styles.buysell}>
        <TouchableOpacity
          style={styles.buy}
          onPress={() => {
            setTradeType('buy');
          }}>
          <Text style={styles.text1}>BUY</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sell}
          onPress={() => {
            setTradeType('sell');
          }}>
          <Text style={styles.text1}>SELL</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.form}>
        <TextInput
          autoCapitalize={'characters'}
          style={styles.inp1}
          placeholder="Coin Name"
          placeholderTextColor={'#A4AAAF'}
          fontSize={responsiveFontSize(2.5)}
          onChangeText={text => {
            setCoinName(text);
          }}></TextInput>
        <TextInput
          style={styles.inp1}
          keyboardType="numeric"
          placeholder="Price"
          placeholderTextColor={'#A4AAAF'}
          fontSize={responsiveFontSize(2.5)}
          onChangeText={text => {
            setEntryPrice(text);
          }}></TextInput>
        <TextInput
          style={styles.inp1}
          keyboardType="numeric"
          placeholder="Quantity"
          placeholderTextColor={'#A4AAAF'}
          fontSize={responsiveFontSize(2.5)}
          onChangeText={text => {
            setQuantity(text);
          }}></TextInput>
        <TouchableOpacity
          onPressIn={() => {
            let exist = false;
            if (coins != null && tradeType == 'buy') {
              coins.forEach(coin => {
                if (coinName == coin.name) {
                  exist = true;
                  let index = coins.indexOf(coin);
                  let totalBefore =
                    coins[index].entryPrice * coins[index].quantity;
                  let totalAfter =
                    totalBefore + parseFloat(quantity) * parseFloat(entryPrice);
                  let newQuantity =
                    parseFloat(quantity) + coins[index].quantity;
                  let newEntryPrice = totalAfter / newQuantity;
                  coins[index] = {
                    //update existing object
                    name: coin.name,
                    price: 0,
                    entryPrice: newEntryPrice,
                    quantity: newQuantity,
                    spent: 0,
                    pnl: 0,
                    roe: 0,
                  };
                }
              }); // array içinde coinin varlığı kontrol edildi. varsa güncellemesi yapıldı
              if (!exist && tradeType == 'buy') {
                setCoins(prevItems => {
                  return [
                    ...prevItems,
                    new Coin(
                      coinName,
                      0,
                      parseFloat(entryPrice),
                      parseFloat(quantity),
                      0,
                      0,
                      0,
                    ),
                  ];
                });
              } // array içinde coin olmadığı durumda çalıştı ve coini ekledi.
            }
            if (tradeType == 'sell') {
              const filtered = coins.filter(coin => coin.name != coinName);
              console.log('filtreden geçti: ');
              setCoins(filtered);
            }
            if (coins == null && tradeType == 'buy') {
              console.log('SON COND CALISIYO');
              let array = [];
              array.push(
                new Coin(
                  coinName,
                  0,
                  parseFloat(entryPrice),
                  parseFloat(quantity),
                  0,
                  0,
                  0,
                ),
              );
              setCoins(array);
            }
          }}
          onPress={() => {
            // setCoins(prevItems => {
            //   return [
            //     ...prevItems,
            //     new Coin(
            //       coinName,
            //       0,
            //       parseFloat(entryPrice),
            //       parseFloat(quantity),
            //       0,
            //       0,
            //       0,
            //     ),
            //   ];
            // });
            storeObjectValue('coins', coins);
            console.log('butona basıldı: ', coins);
            Alert.alert('', '                       Process Succeed', [
              {text: 'OK'},
            ]);
          }}
          style={{
            width: '100%',
            height: responsiveHeight(9),
            backgroundColor: tradeType == 'buy' ? '#0F7F1D' : '#8D1C13',
            borderRadius: 4,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: responsiveHeight(1),
          }}>
          <Text style={styles.text2}>
            {tradeType == 'buy' ? 'BUY' : 'SELL'} {coinName}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    width: '100%',
    height: responsiveHeight(100),
    backgroundColor: '#171F27',
    alignItems: 'center',
  },
  buysell: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A232B',
    alignSelf: 'center',
    width: '74%',
    height: responsiveHeight(9), // 10% of window height
    marginTop: responsiveHeight(10),
    marginBottom: responsiveHeight(0.8),
  },

  buy: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '50%',
    backgroundColor: '#0F7F1D',
    borderTopLeftRadius: 13,
  },
  sell: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '50%',
    backgroundColor: '#8D1C13',
    borderTopRightRadius: 13,
  },
  text1: {
    color: 'white', //0E68AD EEE8E8
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  text2: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '600',
  },
  form: {
    width: '74%',
    backgroundColor: '#171F27',
    borderWidth: 0,
    alignItems: 'center',
    alignSelf: 'center',
  },
  inp1: {
    width: '100%',
    height: responsiveHeight(11),
    backgroundColor: '#212A32',
    textAlign: 'center',
    marginBottom: responsiveHeight(0.8),
    color: 'white',
    borderRadius: 4,
  },
});
export default BuySell;
