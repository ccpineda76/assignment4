// src/components/Debits.js
//import AccountBalance from './AccountBalance';
import React, { Component } from 'react';

class Debits extends Component {
  constructor(props) {
    super(props);
    this.state =
    {
      statement: '',
      statement_list: [],
      debit_value: '',
      total_debit: 0,
    };

    //BINDING THIS TO MAKE FUNCTIONS WORK
    this.update = this.update.bind(this);
    this.numeric_update = this.numeric_update.bind(this);

  }

  update(event) {
    this.setState({
      statement: event.target.value
    });
  }

  numeric_update(event) {
    this.setState({
      debit_value: event.target.value
    });
  }


  render() {
    let balance = this.props.accountBalance - this.state.total_debit;
    return (
      <div>
        <h1>Debits</h1>
        <label>Amount</label>
        <input type="text" value={this.state.debit_value} onChange={this.numeric_update} />
        <label>Description</label>
        <input type="text" value={this.state.statement} onChange={this.update} />
        <button
          type="button"
          onClick={this.addDebit}>Add Statement</button>
        <h3>Account Balance: {balance}</h3>
      </div>
    )
  }
}
export default Debits;