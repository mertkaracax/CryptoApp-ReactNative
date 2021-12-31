// import api from '../Helpers/Api';
import client from '../Helpers/Client';

export default class Coin {
  constructor(name, price, entryPrice, quantity, spent, pnl, roe) {
    this.name = name;
    this.price = price;
    this.entryPrice = entryPrice;
    this.quantity = quantity;
    this.spent = spent;
    this.pnl = pnl;
    this.roe = roe;
  }
}

export async function coinObjectCreator(coinName, entryPrice, quantity) {
  // let response = await api.get(`${coinName}-usdt`); Websitesinden veri çekerken böyle kullanılıyordu.
  // price = client.ws.candles(`${coinName}USDT`, '1h', candle => {
  //   parseFloat(candle.close).toFixed(2);
  // });
  // const dotLoc = response.data.ticker.price.indexOf('.'); //OLD VERSION
  // const price = response.data.ticker.price.substr(0, dotLoc + 3);
  // const roe = (((parseFloat(price) - entryPrice) / entryPrice) * 100).toFixed(
  //   2,
  // );
  // const pnl = ((amount * roe) / 100).toFixed(2);
  // const spent = entryPrice * quantity;
  // const pnl = price * quantity - spent;
  // const roe = (pnl / spent) * 100;
  let newCoin = new Coin(
    coinName,
    0, //default
    entryPrice,
    quantity,
    0, //spent
    0,
    0,
  );
  return newCoin;
}
