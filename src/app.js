import React from 'react';
import {createStore, bindActionCreators, combineReducers, applyMiddleware, compose} from 'redux';
import {provide, connect} from 'react-redux';

import {devTools, persistState} from 'redux-devtools';
import {DevTools} from 'redux-devtools/lib/react';

import getNewsMiddleware from './middlewares/getNewsMiddleware';

import DiffMonitor from 'redux-devtools-diff-monitor';

import * as reducers from './reducers/news';
import * as actions from './actions/NewsActions';

import Channels from './components/Channels';
import News from './components/News';
import Search from './components/Search';

import './main.scss';

const finalCreateStore = compose(
  applyMiddleware(getNewsMiddleware),
  devTools(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
  createStore
);

const store = finalCreateStore(combineReducers(reducers));
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
        <DevTools store={store}
                  select={(state) => {
                    const {channelsReady, channelId, newsReady, newsId} = state.news;
                    return {
                      channelsReady,
                      channelId,
                      newsReady,
                      newsId
                    };
                  }}
                  monitor={DiffMonitor} />
      </div>
    );
  }
}


React.render(<App />, document.getElementById('container'));
