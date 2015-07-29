import React from 'react';
import highlight from '../utils/highlight';
import './news.scss';

class News extends React.Component {
  renderDetailDialog() {
    const {news, newsId} = this.props.news || {};
    const newsItem = news.filter(newsItem => newsItem.title === newsId)[0];

    return (
      <div className={`dialog-overlay ${newsId && 'active'}`}>
        {!!newsItem && (
          <div className="dialog">
            <span className="close" onClick={this.props.selectNews.bind(this, null)}>&times;</span>
            <h3 className="title">{newsItem.title}</h3>
            <p className="desc">{newsItem.desc}</p>
            <ul className="image-list">
              {!!newsItem.imageurls && newsItem.imageurls.map((img, index) => {
                return <li key={index}><img className="image" src={img.url} /></li>;
              })}
            </ul>
          </div>
        )}
      </div>
    );
  }

  render() {
    const {newsReady, newsError, news, channelId, newsId, keyword} = this.props.news || {};
    return (
      <div className="news-container">
        {channelId && !newsReady && <span className="loading">新闻加载中……</span>}
        {newsError && <span className="error">新闻加载失败</span>}
        <ul className="news-list">
          {news && news.map((newsItem, index) => {
            return (
              <li key={index} className="news-item">
                <span className="source">[{newsItem.source.slice(0, 2)}]</span>
                <a href={newsItem.link} className="link" target="_blank">{newsItem.title}</a>
                <span className="detail-btn" onClick={this.props.selectNews.bind(this, newsItem.title)}>查看详情</span>
                <span className="date">{newsItem.pubDate}</span>
              </li>
            );
          })}
        </ul>
        {this.renderDetailDialog()}
      </div>
    );
  }
}

export default News;
