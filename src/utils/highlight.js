/**
 * @file   在字符串中高亮指定的文本
 * @author shuangyang.ys
 */
/* eslint new-cap:0 */

import React from 'react';

/**
 * 在 sentence 中匹配并高亮 keyword
 * @param  {string} sentence           被搜索文本
 * @param  {string} keyword            需要高亮的文本
 * @param  {number} maxLength          最多匹配多少个字符的文本，默认无限大
 * @param  {string} highlightClassName 高亮文本的className
 * @return {array}
 */
export default function highlight(sentence, keyword, maxLength, highlightClassName = 'highlight') {
  if (!sentence || !keyword) {
    return [];
  }

  let highlightItems = [], lastIndex = 0;
  let key = 0;
  maxLength = maxLength || Number.POSITIVE_INFINITY;

  sentence.replace(new RegExp(keyword, 'gi'), function(match, index, str){
    //如果匹配到的index已经大于最大长度，直接返回 sentence
    if (index > maxLength) {
      highlightItems.push(<span key={key++}>{sentence.substring(0, maxLength)}</span>);
      lastIndex = index;
      return;
    }
    //若匹配到 keyword 字段，把 0-index 部分存为一个 span，把 index-(keyword.length)
    //部分存为一个高亮的 span 。
    //同时判断要被高亮的 span 所在的 index 还在最大指标长度之内，若不在则直接跳过
    else if (match !== undefined && index !== undefined) {
      highlightItems.push(<span key={key++}>{str.substring(lastIndex, index)}</span>);
      lastIndex = index + match.length;
      if (lastIndex > maxLength) {
        return;
      }
      highlightItems.push(<span className={highlightClassName} key={key++}>{match}</span>);
    }
    //继续下一轮匹配
  });

  //若匹配完成还有剩余的sentence没有被加入，如
  //sentence 为「无线端访客数」， keyword 为 「访客」，经过上述匹配出的结果为
  // <span>无线端</span><span className="dip-highlight">访客</span>
  //则把剩余的「数」加入 <span>数</span>
  if (lastIndex < sentence.length && lastIndex < maxLength) {
    highlightItems.push(<span key={key++}>{sentence.substring(lastIndex)}</span>);
  }

  return highlightItems;
}
