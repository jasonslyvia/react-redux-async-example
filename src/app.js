import React from 'react';
import {createStore, bindActionCreators, combineReducers, applyMiddleware} from 'redux';
import {provide, connect} from 'react-redux';
import promiseMiddleware from 'redux-promise-middleware';

import * as reducers from './reducers/news';
import * as actions from './actions/NewsActions';

import Channels from './components/Channels';
import News from './components/News';
import Search from './components/Search';

import './main.scss';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore);
const store = createStoreWithMiddleware(combineReducers(reducers));
const boundActionCreators = bindActionCreators(actions, store.dispatch);

@provide(store)
@connect(function (state){
  return {
    news: state.news
  };
})
class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Search news={this.props.news} {...boundActionCreators} />
        <Channels news={this.props.news} {...boundActionCreators} />
        <News news={this.props.news} {...boundActionCreators} />
      </div>
    );
  }
}


React.render(<App />, document.getElementById('container'));
