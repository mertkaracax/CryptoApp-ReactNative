import axios from 'react-native-axios';

let api = axios.create({
  baseURL: 'https://api.cryptonator.com/api/ticker',
  timeout: 1500, //500
  headers: {application: 'json'},
});

export default api;
