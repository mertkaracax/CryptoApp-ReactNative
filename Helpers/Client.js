import Binance from 'binance-api-react-native';

// const client = Binance();

// Authenticated client, can make signed calls
const client = Binance({
  apiKey: 'ZHfCezQbSew4SaZ7r6MGRGqQq3LfF74uOztzp6nDboua6XSGUPYHxyyd0n1NPBlo',
  apiSecret: '9ynvjdgr8rSzNuykM54NOXNj3pb1ZiVtyPFL0yGTd9TSSMoWDERCuMkrlzHdqnRT',
});

export default client;
