import React from 'react';
import {createStore, bindActionCreators, combineReducers} from 'redux';
import {provide, connect} from 'react-redux';

import * as reducers from './reducers/stock';
import * as actions from './actions/StockActions';

import Stock from './components/Stock';


const store = createStore(combineReducers(reducers));
const boundActionCreators = bindActionCreators(actions, store.dispatch);

@provide(store)
@connect(function (state){
  return {
    stock: state.stock
  };
})
class App extends React.Component {
  render() {
    return (
      <Stock stock={this.props.stock} {...boundActionCreators} />
    );
  }
}


React.render(<App />, document.getElementById('container'));
