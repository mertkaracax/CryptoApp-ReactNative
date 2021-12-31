import AsyncStorage from '@react-native-async-storage/async-storage';

export async function storeData(key, value) {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
}
export async function getData(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    } else {
      console.log('This key is null');
    }
  } catch (e) {
    console.log(e);
  }
}

export async function storeObjectValue(key, value) {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(e);
  }

  console.log('Done.');
}

export async function getMyObject() {
  try {
    const jsonValue = await AsyncStorage.getItem('@key');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // read error
  }
  console.log('Done.');
}

export async function removeValue(key) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // remove error
  }
  console.log('Done.');
}
