// src/components/Debits.js
//import AccountBalance from './AccountBalance';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Debits extends Component {
  constructor(props) {
    super(props);
    this.state =
    {
    };
  }

  render() {
    return (
      <div>
        <h1>Debits</h1>
        <ul>
          {
            this.props.debit_array.map((statements) => {
              return <li>{statements}</li>
            })
          }
        </ul>
        <label>Amount</label>
        <input type="text" value={this.props.debit_value} onChange={this.props.debit_numeric_update} />
        <label>Description</label>
        <input type="text" value={this.props.debit_statement} onChange={this.props.debit_update} />
        <button
          type="button"
          onClick={this.props.addDebit}>Add Statement</button>
        <h2>Total Debit Value: {this.props.debitBalance}</h2>
        <h3>Total Credit Value: {this.props.creditBalance}</h3>
        <h4>Account Balance: {this.props.accountBalance}</h4>
        <Link to="/credits">Credits </Link>
        <br/>
        <Link to = "/">Home</Link>
      </div>
    )
  }
}
export default Debits;