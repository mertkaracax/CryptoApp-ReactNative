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

const CoinItem = ({item}) => {
  const [modalVisible, setModalVisible] = useState(false);
  let [coin, setCoin] = useState(item);
  let count = 0;

  useEffect(async () => {
    await client.ws.candles(`${item.name}USDT`, '1h', candle => {
      parseFloat(candle.close).toFixed(2);
      coin.price = parseFloat(candle.close).toFixed(2);
      const spent = coin.entryPrice * coin.quantity;
      const pnl = coin.price * coin.quantity - spent;
      const roe = (pnl / spent) * 100;
      let tempObj = item;
      tempObj.spent = spent;
      tempObj.pnl = pnl;
      tempObj.roe = roe;
      tempObj.price = coin.price;
      setCoin(tempObj);
      coin.pnl = pnl.toFixed(2);
      coin.roe = roe.toFixed(2);
      count++;
    });
    await console.log(coin.price);
  }, [count]);

  return (
    <TouchableOpacity style={styles.view} onPress={() => setModalVisible(true)}>
      <Modal
        style={{width: 0, height: 0}}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView} opacity={0.8}>
            <View
              style={{
                width: '100%',
                height: '13%',
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '15%',
              }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: 'black', //#C3D1DC
                }}>
                INVESTMENT DETAILS
              </Text>
            </View>

            <Text
              style={{
                textAlign: 'center',
                color: '#D5B30B',
                fontWeight: 'bold',
                fontSize: 23,
                marginBottom: '7%',
              }}>
              Coin Name : {coin.name}
            </Text>
            <Text style={styles.modalText}>
              Avg Buy Price: $
              {(coin.spent.toFixed(2) / coin.quantity).toFixed(2)}
            </Text>
            <Text style={styles.modalText}>
              Total Cost: ${coin.spent.toFixed(2)}
            </Text>
            <Text
              style={{
                textAlign: 'center',
                color: coin.pnl > 0 ? '#43D749' : '#D10101',
                fontSize: 23,
                marginBottom: '7%',
              }}>
              PNL: ${coin.pnl}
            </Text>
            <Text
              style={{
                textAlign: 'center',
                color: coin.roe > 0 ? '#43D749' : '#D10101',
                fontSize: 23,
                marginBottom: '7%',
              }}>
              PNL Ratio : %{coin.roe}
            </Text>
            <Text style={styles.modalText}>
              Quantity: {coin.quantity.toFixed(2)}
            </Text>

            <Pressable
              style={styles.buttonClose}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>x</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={styles.container}>
        <Text style={styles.text1}>{coin.name}</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.text2}>$ {coin.price}</Text>
      </View>
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 20,
            textAlign: 'center',
            fontWeight: 'bold',
            color: coin.pnl > 0 ? '#43D749' : '#EF3434',
          }}>
          $ {coin.pnl}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A232B',
    alignSelf: 'center',
    width: '100%',
    height: 90,
    borderRadius: 4, //4
    margin: 2, //3
    // borderWidth: 1.5,
    // borderColor: '#363F43',
  },

  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: '100%',
    width: '33.3%',
    borderRightWidth: 0.5,
    borderLeftWidth: 0.5,
    borderColor: 'black',
  },
  text1: {
    color: '#D5B30B', //0E68AD EEE8E8
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '500',
  },
  text2: {
    color: '#CED0D8',
    fontSize: 20,
    textAlign: 'center',
  },
  fadeText: {
    width: '33%',
  },
  centeredView: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '80%',
    height: '75%',
    margin: 0,
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    borderRadius: 20,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    right: 0,
    width: 40,
    height: 36,
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 35,
  },
  modalText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 23,
    marginBottom: '7%',
  },
});
export default CoinItem;
