import React, {useEffect, useState} from 'react';
import {StyleSheet, FlatList, Text, View} from 'react-native';
import PieChart from 'react-native-pie-chart';
import client from '../Helpers/Client';
import api from '../Helpers/Api';
import ColorBoxItem from '../components/ColorBoxItem';

const Statistics = () => {
  let [accBalance, setAccBalance] = useState(0);
  let [values, setValues] = useState([]);
  let [sliceColor, setSliceColor] = useState([]);
  let [objects, setObjects] = useState([]);
  let [isLoad, setLoad] = useState(false);
  let totalBalance = 0;
  useEffect(async () => {
    let data = await client.accountInfo();
    let balances = data.balances;

    await balances.forEach(async coin => {
      if (parseInt(coin.free) != 0 || parseInt(coin.locked) != 0) {
        const amountFree = parseFloat(coin.free);
        const amountLocked = parseFloat(coin.locked);
        if (coin.asset == 'USDT') {
          setValues(prevItems => {
            return [...prevItems, 1 * amountFree + amountLocked];
          });
          totalBalance += 1 * (amountFree + amountLocked);
          setAccBalance(totalBalance.toFixed(2));
        } else {
          let response = await api.get(`${coin.asset}-usdt`); //Websitesinden veri çekerken böyle kullanılıyordu.
          let price = response.data.ticker.price;
          price = parseFloat(price).toFixed(2);
          setValues(prevItems => {
            return [...prevItems, price * (amountFree + amountLocked)];
          });
          totalBalance += price * (amountFree + amountLocked);
          setAccBalance(totalBalance.toFixed(2));
        }
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        if (coin.asset == 'USDT') {
          color = 'white';
        }
        setSliceColor(prevItems => {
          return [...prevItems, color];
        });

        setObjects(prevItems => {
          return [...prevItems, {name: coin.asset, color: color}];
        });
      }
    });

    setLoad(true);
  }, []);

  const widthAndHeight = 300;

  return (
    <View style={styles.mainView}>
      <View style={styles.part1}>
        <Text
          style={{
            fontSize: 25,
            textAlign: 'center',
            color: '#6C899A',
          }}>
          ACCOUNT BALANCE
        </Text>
        <Text
          style={{
            fontSize: 25,
            textAlign: 'center',
            color: 'white',
          }}>
          $ {accBalance}
        </Text>
      </View>
      <View style={styles.part2}>
        <PieChart
          widthAndHeight={widthAndHeight}
          series={values}
          sliceColor={sliceColor}
          doughnut={false}
        />
      </View>
      <View
        style={{
          height: '10%',
          width: '100%',
        }}>
        <FlatList
          horizontal
          data={objects}
          renderItem={({item}) =>
            isLoad ? <ColorBoxItem item={item}></ColorBoxItem> : null
          }
          keyExtractor={(item, index) => index}
          style={{width: '100%', height: '100%'}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    height: '100%',
    width: '100%',
    backgroundColor: '#1A232B',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '7%',
  },
  part1: {
    height: '20%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  part2: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '70%',
  },
  title: {
    fontSize: 24,
    margin: 10,
    color: 'white',
  },
});

export default Statistics;
