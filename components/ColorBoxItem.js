import React, {useEffect, useState} from 'react';
import {StyleSheet, FlatList, Text, View} from 'react-native';

const ColorBoxItem = ({item}) => {
  return (
    <View>
      <View
        style={{
          width: 35,
          height: 35,
          backgroundColor: `${item.color}`,
          zIndex: 2,
          borderRadius: 50,
          marginHorizontal: 8,
          justifyContent: 'center',
          alignItems: 'center',
        }}></View>
      <Text
        style={{
          fontSize: 13,
          color: 'white',
          textAlign: 'center',
        }}>
        {item.name}
      </Text>
    </View>
  );
};
export default ColorBoxItem;
