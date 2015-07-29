import React from 'react';
import './search.scss';

class Search extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value: ''
    }
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
       value: nextProps.news.keyword
     });
  }

  renderSearch() {
    return (
      <div className="search-wrapper">
        <input type="text" className="news-search" placeholder="请输入新闻关键词"
               onChange={::this.handleChange} value={this.state.value} />
        <a className="search-btn"
           onClick={this.props.searchNews.bind(this, this.state.value)}>搜索</a>
      </div>
    );
  }

  render() {
    const {channelsReady} = this.props.news || {};
    return channelsReady ? this.renderSearch() : null;
  }
}

export default Search;
