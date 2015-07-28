import React from 'react';

class Stock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    }
  }

  handleInput(e) {
    this.setState({
      value: e.target.value
    });
  }

  render() {
    return (
      <div className="stock-container">
        <ul>
          {this.props.stock.map(stock => <li>{stock}</li>)}
        </ul>
        <h4>add stock again</h4>
        <input type="text" value={this.state.value} onChange={::this.handleInput}
               placeholder="stock names or code" />
        <button onClick={this.props.addStock.bind(this, this.state.value)}>add</button>
      </div>
    );
  }
}

export default Stock;
