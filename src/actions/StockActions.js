import {ADD_STOCK} from '../constants/ActionTypes';

export function addStock(stockName) {
  return {
    type: ADD_STOCK,
    stockName
  };
}
