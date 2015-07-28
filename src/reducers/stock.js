import {ADD_STOCK} from '../constants/ActionTypes';

export function stock(state = [], action) {
  switch(action.type) {
    case ADD_STOCK: {
      return [
        ...state,
        action.stockName
      ];
    }
    default: {
      return state;
    }
  }
}
